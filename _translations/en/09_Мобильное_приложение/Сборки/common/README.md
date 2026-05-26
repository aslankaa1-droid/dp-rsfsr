# Capacitor — common build instruction

## CPFSR — mobile application

This folder contains the common Capacitor configuration for packaging the PWA application `../../Приложение/` into native applications for Android, iOS and Windows.

---

## 1. Development environment requirements

### Common
- **Node.js** 18 LTS or newer.
- **npm** 9+ or **pnpm** 8+.
- **Git**.
- **Capacitor CLI** 6 (installed via npm).

### For Android
- **Android Studio** Hedgehog (2023.1.1) or newer.
- **JDK** 17.
- **Android SDK** API 34 (Android 14).
- **Gradle** 8.x.

### For iOS
- **macOS** 13 (Ventura) or newer (macOS 14 recommended).
- **Xcode** 15.x.
- **CocoaPods** 1.14+.
- **Apple Developer Account** with a USD 99/year subscription.
- **iOS Provisioning Profile** for distribution.

### For Windows
- **Windows 10** (1809) or **Windows 11**.
- **Visual Studio 2022** Community/Professional/Enterprise.
- **Windows 10/11 SDK** of the latest version.
- **.NET 8 SDK**.
- **WebView2 Runtime** (usually pre-installed).

---

## 2. Initial installation

```bash
# 1. Clone the repository
git clone <REPO_URL>
cd "Сборки/common"

# 2. Install Capacitor dependencies
npm install

# 3. Initialise the platforms (performed once)
npx cap add android
npx cap add ios          # only on macOS
# Windows is initialised separately (see below)

# 4. Synchronise web resources
npx cap sync
```

---

## 3. Android build

```bash
# Open Android Studio
npm run android:open

# Build from the CLI: AAB (for RuStore / Google Play)
npm run android:build

# Build from the CLI: APK (for direct distribution)
npm run android:apk
```

Build results:
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`
- APK: `android/app/build/outputs/apk/release/app-release.apk`

Signing is performed by the keystore file whose path is specified in `capacitor.config.json`. Before a production build, replace the values of `keystorePassword` and `keystoreAliasPassword` with real ones.

See `../android/README.md` for detailed instructions.

---

## 4. iOS build

Building is possible only on macOS.

```bash
# Open Xcode
npm run ios:open

# Build from the CLI: archive
npm run ios:archive

# Export IPA for the App Store
npm run ios:export
```

Result: `ios/App/build/App.ipa`.

For publication on the App Store, the following are required:
- Apple Distribution Certificate.
- App Store Provisioning Profile.
- App ID `ru.rsfsr.app` in the Apple Developer Portal.
- Records in App Store Connect.

See `../ios/README.md`.

---

## 5. Windows build

The Windows build uses the **WinUI 3 + WebView2** approach via the Capacitor template for Windows. An alternative is packaging the PWA directly through the **MSIX Packaging Tool**.

```bash
# Open Visual Studio
npm run windows:open

# Build MSIX for the Microsoft Store
npm run windows:package
```

Result: `windows/AppPackages/Bundle/App.msix(bundle)`.

See `../windows/README.md`.

---

## 6. Versioning

The version is specified in three places and must match:
1. `common/package.json` — the `version` field.
2. `Приложение/manifest.json` — desynchronisation is not allowed.
3. Platform manifests:
   - Android: `android/app/build.gradle` (`versionName`, `versionCode`).
   - iOS: `ios/App/App/Info.plist` (`CFBundleShortVersionString`, `CFBundleVersion`).
   - Windows: `windows/Package.appxmanifest` (`Version`).

The `npm run version-bump` script (recommended to be added) automates synchronisation.

---

## 7. CI/CD

Recommended scheme:

| Trigger | Action |
|---|---|
| Push to `main` | Lint + Unit tests + SAST |
| Push to `release/*` | + build for all platforms + DAST |
| Tag `v1.X.Y` | + distribution of beta builds |
| Tag `release/v1.X.Y` | + publication to the stores |

Recommended CI systems:
- GitLab CI (for on-prem).
- GitFlic CI (domestic).
- GitHub Actions (for open-source components).

---

## 8. Compliance with requirements

- **RuStore**: see `../../Публикация_RuStore/`.
- **App Store**: compliance with App Store Review Guidelines.
- **Google Play**: compliance with the Google Play Developer Program Policies.
- **Microsoft Store**: compliance with Microsoft Store Policies.
- **Ministry of Digital Development register (RF Government Resolution No. 1236)**: documents — within the design documentation pack.
- **FSTEC / FSB**: certification under the requirements for CII of category 1.

---

## 9. Links

- Capacitor documentation: https://capacitorjs.com/docs
- RuStore documentation: https://www.rustore.ru/help/developers
- Apple Developer: https://developer.apple.com
- Google Play Console: https://play.google.com/console
- Microsoft Partner Center: https://partner.microsoft.com
