# Build Android CPFSR

Instruction complète pour la construction de l'application Android native à partir de la PWA via Capacitor.

---

## 1. Préparation de l'environnement

```bash
# Installer Android Studio Hedgehog (2023.1.1) ou plus récent
# https://developer.android.com/studio

# Vérifier l'installation du SDK
sdkmanager "platforms;android-34" "build-tools;34.0.0" "platform-tools"
```

Définir les variables d'environnement :
```bash
export ANDROID_HOME=$HOME/Android/Sdk          # Linux/macOS
# ou
setx ANDROID_HOME "C:\Users\%USERNAME%\AppData\Local\Android\Sdk"  # Windows
```

## 2. Initialisation du projet Android

Depuis le dossier `Сборки/common` :

```bash
npm install
npx cap add android
npx cap sync android
```

Cela créera le dossier `Сборки/android/` avec le projet Gradle et chargera les ressources web depuis `Приложение/`.

## 3. Configuration Android

### 3.1. AndroidManifest.xml

Après la génération, vérifiez/éditez `android/app/src/main/AndroidManifest.xml` :

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="ru.rsfsr.app">

    <!-- Permissions réseau -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- Biométrie -->
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <uses-permission android:name="android.permission.USE_FINGERPRINT" />

    <!-- Caméra pour les documents -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />

    <!-- Push -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

    <!-- Système -->
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

`android/app/build.gradle` :
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

`android/app/src/main/res/xml/network_security_config.xml` :
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
              Pins de la clé publique du certificat TLS (SHA-256 de SubjectPublicKeyInfo).
              Substitués à l'étape CI/CD à partir de RSFSR_PIN_PRIMARY et RSFSR_PIN_BACKUP
              (voir ../common/.env.example). Le pin de secours est obligatoire en cas de rotation.

              Commande de génération du pin :
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

`android/app/proguard-rules.pro` :
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

## 4. Icônes

Générer les icônes et le splash screen depuis les sources :

```bash
# Depuis le dossier common
npm run resources                  # requiert @capacitor/assets
# ou manuellement :
# - mipmap-mdpi/ic_launcher.png      48×48
# - mipmap-hdpi/ic_launcher.png      72×72
# - mipmap-xhdpi/ic_launcher.png     96×96
# - mipmap-xxhdpi/ic_launcher.png    144×144
# - mipmap-xxxhdpi/ic_launcher.png   192×192
# - drawable/splash.png              2732×2732
```

Utilisez `Приложение/icons/icon-512.svg` comme source.

## 5. Signature de l'application

Générer une release keystore (une seule fois) :
```bash
keytool -genkey -v -keystore release.keystore \
        -alias rsfsr_release -keyalg RSA -keysize 2048 -validity 10000
```

**Ne commitez jamais le fichier keystore et les mots de passe dans git.** Utilisez les secrets CI/CD.

Créez `android/keystore.properties` (dans .gitignore) :
```properties
storeFile=../../release.keystore
storePassword=YOUR_PASSWORD
keyAlias=rsfsr_release
keyPassword=YOUR_PASSWORD
```

## 6. Build

### AAB pour RuStore / Google Play
```bash
cd android
./gradlew bundleRelease
```

Résultat : `android/app/build/outputs/bundle/release/app-release.aab`.

### APK pour distribution directe
```bash
cd android
./gradlew assembleRelease
```

Résultat : `android/app/build/outputs/apk/release/app-release.apk`.

## 7. Tests

### Sur un émulateur
```bash
npx cap run android
```

### Sur un appareil physique
1. Activez le mode développeur et le débogage USB.
2. Connectez l'appareil.
3. `adb devices` — assurez-vous que l'appareil est visible.
4. `./gradlew installRelease` — installer la build de release.

## 8. Publication

### 8.1. RuStore (recommandé pour la FR)

1. Inscrivez-vous comme développeur dans RuStore Console : https://console.rustore.ru
2. Préparez les matériels (voir `../../Публикация_RuStore/`).
3. Téléversez le fichier AAB.
4. Remplissez les métadonnées :
   - Nom : « CPFSR »
   - Description brève (jusqu'à 80 caractères).
   - Description complète (jusqu'à 4 000 caractères).
   - Catégorie : Finance.
   - Catégorie d'âge : 18+.
   - Captures d'écran (5–8 pièces).
   - Icône 512×512.
5. Envoyez à la modération (délai : 1–3 jours ouvrables).

### 8.2. Google Play
1. Google Play Console : https://play.google.com/console
2. Similaire à RuStore.
3. En plus : classification du contenu, public cible, confidentialité des données.

## 9. Compléments

### App Links / Deep Links
Le fichier `assetlinks.json` doit être placé à `https://app.dp-rsfsr.ru/.well-known/assetlinks.json` :
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
Il est recommandé d'intégrer un service de surveillance national (par ex. AppMetrica / Tracker by VK).

---

## 10. Check-list de préparation à la publication

- [ ] AndroidManifest.xml configuré.
- [ ] build.gradle avec versionCode/versionName corrects.
- [ ] Keystore générée et protégée.
- [ ] Règles ProGuard configurées.
- [ ] Icônes de toutes les densités.
- [ ] Splash screen.
- [ ] Network Security Config avec pinning.
- [ ] Tests internes passés.
- [ ] Matériels promotionnels prêts (voir ../../Публикация_RuStore/).
- [ ] Politique de confidentialité publiée sur le site.
- [ ] Marquage d'âge défini.
- [ ] Compte développeur dans RuStore Console confirmé.
