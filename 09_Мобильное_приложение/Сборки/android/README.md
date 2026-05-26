# Android-сборка ЦП РСФСР

Полная инструкция сборки нативного приложения Android из PWA через Capacitor.

---

## 1. Подготовка окружения

```bash
# Установить Android Studio Hedgehog (2023.1.1) или новее
# https://developer.android.com/studio

# Проверить установку SDK
sdkmanager "platforms;android-34" "build-tools;34.0.0" "platform-tools"
```

Установите переменные среды:
```bash
export ANDROID_HOME=$HOME/Android/Sdk          # Linux/macOS
# или
setx ANDROID_HOME "C:\Users\%USERNAME%\AppData\Local\Android\Sdk"  # Windows
```

## 2. Инициализация Android-проекта

Из папки `Сборки/common`:

```bash
npm install
npx cap add android
npx cap sync android
```

Это создаст папку `Сборки/android/` с Gradle-проектом и подтянет веб-ресурсы из `Приложение/`.

## 3. Конфигурация Android

### 3.1. AndroidManifest.xml

После генерации проверьте/отредактируйте `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="ru.rsfsr.app">

    <!-- Сетевые разрешения -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- Биометрия -->
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <uses-permission android:name="android.permission.USE_FINGERPRINT" />

    <!-- Камера для документов -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />

    <!-- Push -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

    <!-- Системные -->
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <application
        android:label="ЦП РСФСР"
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
              Pins публичного ключа TLS-сертификата (SHA-256 от SubjectPublicKeyInfo).
              Подставляются на этапе CI/CD из RSFSR_PIN_PRIMARY и RSFSR_PIN_BACKUP
              (см. ../common/.env.example). Backup-пин обязателен на случай ротации.

              Команда генерации пина:
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

## 4. Иконки

Сгенерировать иконки и splash-screen из исходников:

```bash
# Из папки common
npm run resources                  # требует @capacitor/assets
# или вручную:
# - mipmap-mdpi/ic_launcher.png      48×48
# - mipmap-hdpi/ic_launcher.png      72×72
# - mipmap-xhdpi/ic_launcher.png     96×96
# - mipmap-xxhdpi/ic_launcher.png    144×144
# - mipmap-xxxhdpi/ic_launcher.png   192×192
# - drawable/splash.png              2732×2732
```

Используйте `Приложение/icons/icon-512.svg` как исходник.

## 5. Подпись приложения

Сгенерируйте release-keystore (один раз):
```bash
keytool -genkey -v -keystore release.keystore \
        -alias rsfsr_release -keyalg RSA -keysize 2048 -validity 10000
```

**Никогда не коммитьте keystore-файл и пароли в git.** Используйте секреты CI/CD.

Создайте `android/keystore.properties` (в .gitignore):
```properties
storeFile=../../release.keystore
storePassword=YOUR_PASSWORD
keyAlias=rsfsr_release
keyPassword=YOUR_PASSWORD
```

## 6. Сборка

### AAB для RuStore / Google Play
```bash
cd android
./gradlew bundleRelease
```

Результат: `android/app/build/outputs/bundle/release/app-release.aab`.

### APK для прямого распространения
```bash
cd android
./gradlew assembleRelease
```

Результат: `android/app/build/outputs/apk/release/app-release.apk`.

## 7. Тестирование

### На эмуляторе
```bash
npx cap run android
```

### На физическом устройстве
1. Включите режим разработчика и USB-отладку.
2. Подключите устройство.
3. `adb devices` — убедитесь, что устройство видно.
4. `./gradlew installRelease` — установить релизную сборку.

## 8. Публикация

### 8.1. RuStore (рекомендуемо для РФ)

1. Зарегистрируйтесь как разработчик в RuStore Console: https://console.rustore.ru
2. Подготовьте материалы (см. `../../Публикация_RuStore/`).
3. Загрузите AAB-файл.
4. Заполните метаданные:
   - Название: «ЦП РСФСР»
   - Краткое описание (до 80 символов).
   - Полное описание (до 4000 символов).
   - Категория: Финансы.
   - Возрастная категория: 18+.
   - Скриншоты (5–8 штук).
   - Иконка 512×512.
5. Отправьте на модерацию (срок: 1–3 рабочих дня).

### 8.2. Google Play
1. Google Play Console: https://play.google.com/console
2. Аналогично RuStore.
3. Дополнительно: содержание контента, целевая аудитория, конфиденциальность данных.

## 9. Дополнительно

### App Links / Deep Links
Файл `assetlinks.json` должен быть размещён на `https://app.dp-rsfsr.ru/.well-known/assetlinks.json`:
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
Рекомендуется интегрировать отечественный сервис мониторинга (например, AppMetrica / Tracker by VK).

---

## 10. Чек-лист готовности к публикации

- [ ] AndroidManifest.xml настроен.
- [ ] build.gradle с правильным versionCode/versionName.
- [ ] Keystore сгенерирован и защищён.
- [ ] ProGuard правила настроены.
- [ ] Иконки всех плотностей.
- [ ] Splash-screen.
- [ ] Network Security Config с pinning.
- [ ] Внутреннее тестирование пройдено.
- [ ] Промо-материалы готовы (см. ../../Публикация_RuStore/).
- [ ] Политика конфиденциальности опубликована на сайте.
- [ ] Возрастная маркировка установлена.
- [ ] Аккаунт разработчика в RuStore Console подтверждён.
