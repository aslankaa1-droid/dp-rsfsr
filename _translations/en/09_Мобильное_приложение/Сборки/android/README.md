# CPFSR Android build

Complete instructions for building the native Android application from PWA via Capacitor.

---

## 1. Environment preparation

```bash
# Install Android Studio Hedgehog (2023.1.1) or newer
# https://developer.android.com/studio

# Verify the SDK installation
sdkmanager "platforms;android-34" "build-tools;34.0.0" "platform-tools"
```

Set environment variables:
```bash
export ANDROID_HOME=$HOME/Android/Sdk          # Linux/macOS
# or
setx ANDROID_HOME "C:\Users\%USERNAME%\AppData\Local\Android\Sdk"  # Windows
```

## 2. Android project initialisation

From the `Сборки/common` folder:

```bash
npm install
npx cap add android
npx cap sync android
```

This creates the `Сборки/android/` folder with the Gradle project and pulls web resources from `Приложение/`.

## 3. Android configuration

### 3.1. AndroidManifest.xml

After generation, check/edit `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="ru.rsfsr.app">

    <!-- Network permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- Biometrics -->
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <uses-permission android:name="android.permission.USE_FINGERPRINT" />

    <!-- Camera for documents -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />

    <!-- Push -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

    <!-- System -->
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <application
        android:label="CPFSR"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:theme="@style/AppTheme"
        android:requestLegacyExternalStorage="false"
        android:usesCleartextTraffic="false"
        android:networkSecurityConfig="@xml/network_security_config">

        <activity
            android:name=".MainActivity"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:launchMode="singleTask"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            <!-- Deep links -->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="https"
                      android:host="app.dp-rsfsr.ru" />
                <data android:scheme="ru.rsfsr.app" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

### 3.2. build.gradle (app)

`android/app/build.gradle`:
```gradle
android {
    compileSdkVersion 34
    defaultConfig {
        applicationId "ru.rsfsr.app"
        minSdkVersion 28           // Android 9
        targetSdkVersion 34         // Android 14
        versionCode 1
        versionName "1.0.0"
    }
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }
}
```

### 3.3. Network Security Config

`android/app/src/main/res/xml/network_security_config.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="false">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
    <domain-config>
        <domain includeSubdomains="true">dp-rsfsr.ru</domain>
        <pin-set expiration="2027-12-31">
            <!--
              Pins of the TLS-certificate public key (SHA-256 of SubjectPublicKeyInfo).
              Substituted at the CI/CD stage from RSFSR_PIN_PRIMARY and RSFSR_PIN_BACKUP
              (see ../common/.env.example). The backup pin is mandatory in case of rotation.

              Pin generation command:
                openssl s_client -servername app.dp-rsfsr.ru -connect app.dp-rsfsr.ru:443 < /dev/null \
                | openssl x509 -pubkey -noout \
                | openssl pkey -pubin -outform DER \
                | openssl dgst -sha256 -binary \
                | openssl enc -base64
            -->
            <pin digest="SHA-256">${RSFSR_PIN_PRIMARY}</pin>
            <pin digest="SHA-256">${RSFSR_PIN_BACKUP}</pin>
        </pin-set>
    </domain-config>
</network-security-config>
```

### 3.4. ProGuard

`android/app/proguard-rules.pro`:
```
# Capacitor
-keep public class com.getcapacitor.** { *; }
-keep public class * extends com.getcapacitor.Plugin

# WebView JavaScript bridge
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
```

## 4. Icons

Generate icons and the splash screen from the sources:

```bash
# From the common folder
npm run resources                  # requires @capacitor/assets
# or manually:
# - mipmap-mdpi/ic_launcher.png      48×48
# - mipmap-hdpi/ic_launcher.png      72×72
# - mipmap-xhdpi/ic_launcher.png     96×96
# - mipmap-xxhdpi/ic_launcher.png    144×144
# - mipmap-xxxhdpi/ic_launcher.png   192×192
# - drawable/splash.png              2732×2732
```

Use `Приложение/icons/icon-512.svg` as the source.

## 5. Application signing

Generate a release keystore (once):
```bash
keytool -genkey -v -keystore release.keystore \
        -alias rsfsr_release -keyalg RSA -keysize 2048 -validity 10000
```

**Never commit the keystore file and passwords to git.** Use CI/CD secrets.

Create `android/keystore.properties` (in .gitignore):
```properties
storeFile=../../release.keystore
storePassword=YOUR_PASSWORD
keyAlias=rsfsr_release
keyPassword=YOUR_PASSWORD
```

## 6. Build

### AAB for RuStore / Google Play
```bash
cd android
./gradlew bundleRelease
```

Result: `android/app/build/outputs/bundle/release/app-release.aab`.

### APK for direct distribution
```bash
cd android
./gradlew assembleRelease
```

Result: `android/app/build/outputs/apk/release/app-release.apk`.

## 7. Testing

### On an emulator
```bash
npx cap run android
```

### On a physical device
1. Enable developer mode and USB debugging.
2. Connect the device.
3. `adb devices` — ensure the device is visible.
4. `./gradlew installRelease` — install the release build.

## 8. Publication

### 8.1. RuStore (recommended for the RF)

1. Register as a developer in RuStore Console: https://console.rustore.ru
2. Prepare the materials (see `../../Публикация_RuStore/`).
3. Upload the AAB file.
4. Fill in the metadata:
   - Name: "CPFSR"
   - Brief description (up to 80 characters).
   - Full description (up to 4,000 characters).
   - Category: Finance.
   - Age category: 18+.
   - Screenshots (5–8 pieces).
   - 512×512 icon.
5. Submit for moderation (period: 1–3 business days).

### 8.2. Google Play
1. Google Play Console: https://play.google.com/console
2. Similar to RuStore.
3. Additionally: content rating, target audience, data privacy.

## 9. Additional

### App Links / Deep Links
The `assetlinks.json` file must be placed at `https://app.dp-rsfsr.ru/.well-known/assetlinks.json`:
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "ru.rsfsr.app",
    "sha256_cert_fingerprints": ["SHA256_OF_YOUR_KEYSTORE"]
  }
}]
```

### Crash reporting
It is recommended to integrate a domestic monitoring service (e.g. AppMetrica / Tracker by VK).

---

## 10. Publication readiness checklist

- [ ] AndroidManifest.xml configured.
- [ ] build.gradle with correct versionCode/versionName.
- [ ] Keystore generated and protected.
- [ ] ProGuard rules configured.
- [ ] Icons of all densities.
- [ ] Splash screen.
- [ ] Network Security Config with pinning.
- [ ] Internal testing passed.
- [ ] Promotional materials ready (see ../../Публикация_RuStore/).
- [ ] Privacy Policy published on the website.
- [ ] Age rating set.
- [ ] Developer account in RuStore Console confirmed.
