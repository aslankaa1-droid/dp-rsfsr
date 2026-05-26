# Capacitor — общая инструкция сборки

## ЦП РСФСР — мобильное приложение

Эта папка содержит общую конфигурацию Capacitor для упаковки PWA-приложения `../../Приложение/` в нативные приложения для Android, iOS и Windows.

---

## 1. Требования к среде разработки

### Общие
- **Node.js** 18 LTS или новее.
- **npm** 9+ или **pnpm** 8+.
- **Git**.
- **Capacitor CLI** 6 (устанавливается через npm).

### Для Android
- **Android Studio** Hedgehog (2023.1.1) или новее.
- **JDK** 17.
- **Android SDK** API 34 (Android 14).
- **Gradle** 8.x.

### Для iOS
- **macOS** 13 (Ventura) или новее (рекомендуется macOS 14).
- **Xcode** 15.x.
- **CocoaPods** 1.14+.
- **Apple Developer Account** с подпиской 99 USD/год.
- **iOS Provisioning Profile** для distribution.

### Для Windows
- **Windows 10** (1809) или **Windows 11**.
- **Visual Studio 2022** Community/Professional/Enterprise.
- **Windows 10/11 SDK** последней версии.
- **.NET 8 SDK**.
- **WebView2 Runtime** (обычно предустановлен).

---

## 2. Первичная установка

```bash
# 1. Клонировать репозиторий
git clone <REPO_URL>
cd "Сборки/common"

# 2. Установить зависимости Capacitor
npm install

# 3. Инициализировать платформы (выполняется единожды)
npx cap add android
npx cap add ios          # только на macOS
# Windows инициализируется отдельно (см. ниже)

# 4. Синхронизировать веб-ресурсы
npx cap sync
```

---

## 3. Сборка Android

```bash
# Открыть Android Studio
npm run android:open

# Сборка из CLI: AAB (для RuStore / Google Play)
npm run android:build

# Сборка из CLI: APK (для прямого распространения)
npm run android:apk
```

Результаты сборки:
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`
- APK: `android/app/build/outputs/apk/release/app-release.apk`

Подпись осуществляется keystore-файлом, путь к которому указан в `capacitor.config.json`. Перед production-сборкой замените значения `keystorePassword` и `keystoreAliasPassword` на реальные.

См. `../android/README.md` для детальных инструкций.

---

## 4. Сборка iOS

Сборка возможна только на macOS.

```bash
# Открыть Xcode
npm run ios:open

# Сборка из CLI: archive
npm run ios:archive

# Экспорт IPA для App Store
npm run ios:export
```

Результат: `ios/App/build/App.ipa`.

Для публикации в App Store необходимы:
- Apple Distribution Certificate.
- App Store Provisioning Profile.
- App ID `ru.rsfsr.app` в Apple Developer Portal.
- Записи в App Store Connect.

См. `../ios/README.md`.

---

## 5. Сборка Windows

Windows-сборка использует подход **WinUI 3 + WebView2** через шаблон Capacitor для Windows. Альтернатива — упаковка PWA через **MSIX Packaging Tool** напрямую.

```bash
# Открыть Visual Studio
npm run windows:open

# Сборка MSIX для Microsoft Store
npm run windows:package
```

Результат: `windows/AppPackages/Bundle/App.msix(bundle)`.

См. `../windows/README.md`.

---

## 6. Версионирование

Версия указана в трёх местах и должна совпадать:
1. `common/package.json` — поле `version`.
2. `Приложение/manifest.json` — рассинхронизация недопустима.
3. Платформенные манифесты:
   - Android: `android/app/build.gradle` (`versionName`, `versionCode`).
   - iOS: `ios/App/App/Info.plist` (`CFBundleShortVersionString`, `CFBundleVersion`).
   - Windows: `windows/Package.appxmanifest` (`Version`).

Скрипт `npm run version-bump` (рекомендуется добавить) автоматизирует синхронизацию.

---

## 7. CI/CD

Рекомендуемая схема:

| Триггер | Действие |
|---|---|
| Push в `main` | Lint + Unit-тесты + SAST |
| Push в `release/*` | + сборка для всех платформ + DAST |
| Tag `v1.X.Y` | + распространение бета-сборок |
| Tag `release/v1.X.Y` | + публикация в магазины |

Рекомендуемые системы CI:
- GitLab CI (для on-prem).
- GitFlic CI (отечественный).
- GitHub Actions (для open-source компонентов).

---

## 8. Соответствие требованиям

- **RuStore**: см. `../../Публикация_RuStore/`.
- **App Store**: соответствие App Store Review Guidelines.
- **Google Play**: соответствие Google Play Developer Program Policies.
- **Microsoft Store**: соответствие Microsoft Store Policies.
- **Реестр Минцифры (ПП РФ №1236)**: документы — в составе КД.
- **ФСТЭК / ФСБ**: сертификация по требованиям КИИ 1 категории.

---

## 9. Ссылки

- Документация Capacitor: https://capacitorjs.com/docs
- RuStore документация: https://www.rustore.ru/help/developers
- Apple Developer: https://developer.apple.com
- Google Play Console: https://play.google.com/console
- Microsoft Partner Center: https://partner.microsoft.com
