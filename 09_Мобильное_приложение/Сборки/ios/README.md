# iOS-сборка ЦП РСФСР

Инструкция сборки и публикации iOS-приложения через Capacitor.

---

## 1. Требования

- **macOS** 13 (Ventura) или новее.
- **Xcode** 15.x или новее.
- **CocoaPods** 1.14+.
- **Apple Developer Program** ($99/год).
- **Apple ID** с двухфакторной аутентификацией.

```bash
# Установить Xcode из App Store
# Установить CocoaPods
sudo gem install cocoapods

# Установить Capacitor CLI (если не установлен)
npm install -g @capacitor/cli
```

## 2. Инициализация iOS-проекта

Из папки `Сборки/common` (на macOS):

```bash
npm install
npx cap add ios
npx cap sync ios
npx cap open ios
```

Это создаст папку `Сборки/ios/` с Xcode-проектом.

## 3. Конфигурация iOS

### 3.1. Info.plist

`ios/App/App/Info.plist` — добавьте:

```xml
<key>CFBundleDisplayName</key>
<string>ЦП РСФСР</string>

<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
<key>CFBundleVersion</key>
<string>1</string>

<key>CFBundleIdentifier</key>
<string>ru.rsfsr.app</string>

<key>UISupportedInterfaceOrientations</key>
<array>
    <string>UIInterfaceOrientationPortrait</string>
    <string>UIInterfaceOrientationPortraitUpsideDown</string>
</array>

<key>UIRequiresFullScreen</key>
<false/>

<!-- Локализация -->
<key>CFBundleLocalizations</key>
<array>
    <string>ru</string>
    <string>en</string>
    <string>fr</string>
    <string>ar</string>
</array>
<key>CFBundleDevelopmentRegion</key>
<string>ru</string>

<!-- Разрешения -->
<key>NSFaceIDUsageDescription</key>
<string>Используется для безопасного подтверждения операций ЦП РСФСР</string>

<key>NSCameraUsageDescription</key>
<string>Используется для фотографирования документов</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Используется для прикрепления документов к заявкам</string>

<!-- Deep links -->
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>ru.rsfsr.app</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>ru.rsfsr.app</string>
        </array>
    </dict>
</array>

<!-- Universal Links -->
<key>com.apple.developer.associated-domains</key>
<array>
    <string>applinks:app.dp-rsfsr.ru</string>
    <string>applinks:dp-rsfsr.ru</string>
</array>

<!-- App Transport Security -->
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <false/>
    <key>NSExceptionDomains</key>
    <dict>
        <key>dp-rsfsr.ru</key>
        <dict>
            <key>NSIncludesSubdomains</key>
            <true/>
            <key>NSTemporaryExceptionMinimumTLSVersion</key>
            <string>TLSv1.3</string>
        </dict>
    </dict>
</dict>

<!-- Минимальная версия iOS -->
<key>MinimumOSVersion</key>
<string>15.0</string>
```

### 3.2. Capabilities

В Xcode → Project → Target → Signing & Capabilities добавьте:
- **Associated Domains**: для universal links.
- **Push Notifications**: для push.
- **Background Modes**: Remote notifications, Background processing.
- **Sign in with Apple**: опционально.
- **Keychain Sharing**: для общего keychain между расширениями.

### 3.3. Подпись

1. Apple Developer Portal → Identifiers → создайте App ID `ru.rsfsr.app` с нужными capabilities.
2. Создайте Provisioning Profile (Distribution → App Store).
3. Создайте Apple Distribution Certificate.
4. В Xcode выберите Team и Provisioning Profile.

### 3.4. Иконки

`ios/App/App/Assets.xcassets/AppIcon.appiconset/` — заполните набор иконок:
- 20pt: 40×40, 60×60
- 29pt: 58×58, 87×87
- 40pt: 80×80, 120×120
- 60pt: 120×120, 180×180
- 76pt: 152×152
- 83.5pt: 167×167
- 1024×1024 — для App Store

Используйте `Приложение/icons/icon-512.svg` как исходник; масштабируйте через `@capacitor/assets`.

### 3.5. Launch Screen

Storyboard `LaunchScreen.storyboard` — добавьте иконку и фон #0B2B5C.

## 4. Сборка

### Archive
В Xcode: Product → Archive (Cmd+Shift+B → Archive).

Или из CLI:
```bash
cd ios/App
xcodebuild -workspace App.xcworkspace \
           -scheme App \
           -configuration Release \
           archive \
           -archivePath build/App.xcarchive
```

### Export IPA
Создайте `ExportOptions.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
    <key>uploadBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
</dict>
</plist>
```

Затем:
```bash
xcodebuild -exportArchive \
           -archivePath build/App.xcarchive \
           -exportPath build \
           -exportOptionsPlist ExportOptions.plist
```

Результат: `ios/App/build/App.ipa`.

## 5. TestFlight

1. App Store Connect → My Apps → создайте новое приложение `ru.rsfsr.app`.
2. Загрузите IPA через Xcode (Window → Organizer → Distribute App) или Transporter (отдельное приложение Apple).
3. В TestFlight: добавьте внутренних и внешних тестировщиков.
4. Дождитесь одобрения для External Testing (24–48 часов).

## 6. Публикация в App Store

1. App Store Connect → App Information:
   - Название: «ЦП РСФСР»
   - Подзаголовок: «Российский Сервис Финансирования»
   - Категория: Finance / Productivity
2. Pricing: Free.
3. App Privacy: укажите все собираемые данные.
4. App Review Information: контакты для ревьюера, демо-аккаунт.
5. Version Information:
   - Promotional text (до 170 символов).
   - Описание (до 4000 символов).
   - Ключевые слова (до 100 символов).
   - Скриншоты (для всех размеров экранов).
6. Отправьте на ревью (срок: 1–3 дня).

### Apple Review checklist
- Дайте демо-доступ ревьюеру (можно мок-режим без ЕСИА).
- Приведите политику конфиденциальности с URL на сайте.
- Приведите Terms of Service.
- Подтвердите, что у вас есть необходимые лицензии (ЦБ РФ).

### Возможные сложности
- Криптовалютная классификация: ЦФА **не являются криптовалютой**. Подготовьте обоснование.
- Региональная блокировка: при необходимости можно ограничить распространение только территорией РФ.

## 7. Дополнительно

### Universal Links
Файл `apple-app-site-association` (без расширения, JSON) на `https://app.dp-rsfsr.ru/.well-known/apple-app-site-association`:
```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "YOUR_TEAM_ID.ru.rsfsr.app",
        "paths": ["*"]
      }
    ]
  }
}
```

### Crash reporting
Рекомендуется AppMetrica или Crashlytics-альтернатива.

---

## 8. Чек-лист готовности к публикации

- [ ] Info.plist настроен.
- [ ] Все capabilities добавлены.
- [ ] Apple Distribution Certificate и Provisioning Profile в порядке.
- [ ] Иконки всех размеров.
- [ ] LaunchScreen.
- [ ] Universal Links настроены.
- [ ] Внутреннее тестирование через TestFlight.
- [ ] Промо-материалы (скриншоты для всех устройств).
- [ ] Политика конфиденциальности.
- [ ] Демо-аккаунт для ревьюера.
- [ ] App Store Connect заполнен.
