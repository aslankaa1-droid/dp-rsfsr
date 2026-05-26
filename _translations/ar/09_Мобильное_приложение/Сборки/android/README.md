# بناء Android CPFSR

التعليمات الكاملة لبناء تطبيق Android الأصلي من PWA عبر Capacitor.

---

## 1. تحضير البيئة

```bash
# تثبيت Android Studio Hedgehog (2023.1.1) أو أحدث
# https://developer.android.com/studio

# التحقق من تثبيت SDK
sdkmanager "platforms;android-34" "build-tools;34.0.0" "platform-tools"
```

ضبط متغيرات البيئة:
```bash
export ANDROID_HOME=$HOME/Android/Sdk          # Linux/macOS
# أو
setx ANDROID_HOME "C:\Users\%USERNAME%\AppData\Local\Android\Sdk"  # Windows
```

## 2. تهيئة مشروع Android

من المجلد `Сборки/common`:

```bash
npm install
npx cap add android
npx cap sync android
```

سيُنشَأ بذلك المجلد `Сборки/android/` بمشروع Gradle، وسيسحب موارد الويب من `Приложение/`.

## 3. إعداد Android

### 3.1. AndroidManifest.xml

بعد التوليد، تحقق/حرِّر `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="ru.rsfsr.app">

    <!-- أذونات الشبكة -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- البيومترية -->
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <uses-permission android:name="android.permission.USE_FINGERPRINT" />

    <!-- الكاميرا للمستندات -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />

    <!-- Push -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

    <!-- النظام -->
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
              دبابيس المفتاح العام لشهادة TLS (SHA-256 من SubjectPublicKeyInfo).
              تُستبدَل في مرحلة CI/CD من RSFSR_PIN_PRIMARY وRSFSR_PIN_BACKUP
              (انظر ../common/.env.example). الدبوس الاحتياطي إلزامي في حال التدوير.

              أمر توليد الدبوس:
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

## 4. الأيقونات

توليد الأيقونات وشاشة splash من المصادر:

```bash
# من مجلد common
npm run resources                  # يستلزم @capacitor/assets
# أو يدوياً:
# - mipmap-mdpi/ic_launcher.png      48×48
# - mipmap-hdpi/ic_launcher.png      72×72
# - mipmap-xhdpi/ic_launcher.png     96×96
# - mipmap-xxhdpi/ic_launcher.png    144×144
# - mipmap-xxxhdpi/ic_launcher.png   192×192
# - drawable/splash.png              2732×2732
```

استخدم `Приложение/icons/icon-512.svg` كمصدر.

## 5. توقيع التطبيق

أنشئ release keystore (مرة واحدة):
```bash
keytool -genkey -v -keystore release.keystore \
        -alias rsfsr_release -keyalg RSA -keysize 2048 -validity 10000
```

**لا تُلزِق أبداً ملف keystore وكلمات المرور إلى git.** استخدم أسرار CI/CD.

أنشئ `android/keystore.properties` (في .gitignore):
```properties
storeFile=../../release.keystore
storePassword=YOUR_PASSWORD
keyAlias=rsfsr_release
keyPassword=YOUR_PASSWORD
```

## 6. البناء

### AAB لـ RuStore / Google Play
```bash
cd android
./gradlew bundleRelease
```

النتيجة: `android/app/build/outputs/bundle/release/app-release.aab`.

### APK للتوزيع المباشر
```bash
cd android
./gradlew assembleRelease
```

النتيجة: `android/app/build/outputs/apk/release/app-release.apk`.

## 7. الاختبار

### على المحاكي
```bash
npx cap run android
```

### على جهاز فعلي
1. فعِّل وضع المطوِّر وتصحيح USB.
2. وصِّل الجهاز.
3. `adb devices` — تأكد من ظهور الجهاز.
4. `./gradlew installRelease` — تثبيت بناء الإصدار.

## 8. النشر

### 8.1. RuStore (موصى به للاتحاد الروسي)

1. سجِّل كمطوِّر في RuStore Console: https://console.rustore.ru
2. حضِّر المواد (انظر `../../Публикация_RuStore/`).
3. ارفع ملف AAB.
4. عبِّئ بيانات الوصف:
   - الاسم: «CPFSR»
   - وصف موجز (حتى 80 حرفاً).
   - وصف كامل (حتى 4000 حرف).
   - الفئة: المالية.
   - الفئة العمرية: 18+.
   - لقطات الشاشة (5–8 قطع).
   - أيقونة 512×512.
5. أرسِل للمراجعة (المدة: 1–3 أيام عمل).

### 8.2. Google Play
1. Google Play Console: https://play.google.com/console
2. مماثل لـ RuStore.
3. إضافة: تصنيف المحتوى، الجمهور المستهدف، خصوصية البيانات.

## 9. إضافات

### App Links / Deep Links
يجب وضع ملف `assetlinks.json` على `https://app.dp-rsfsr.ru/.well-known/assetlinks.json`:
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

### تقارير الأعطال
يُوصى بدمج خدمة رصد محلية (مثل AppMetrica / Tracker by VK).

---

## 10. قائمة الاستعداد للنشر

- [ ] إعداد AndroidManifest.xml.
- [ ] build.gradle بـ versionCode/versionName الصحيحَين.
- [ ] إنشاء keystore وحمايته.
- [ ] إعداد قواعد ProGuard.
- [ ] الأيقونات بجميع الكثافات.
- [ ] شاشة splash.
- [ ] Network Security Config مع pinning.
- [ ] اجتياز الاختبار الداخلي.
- [ ] جاهزية المواد الترويجية (انظر ../../Публикация_RuStore/).
- [ ] نشر سياسة الخصوصية على الموقع.
- [ ] ضبط تصنيف العمر.
- [ ] تأكيد حساب المطوِّر في RuStore Console.
