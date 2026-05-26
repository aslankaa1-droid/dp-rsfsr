# Capacitor — instruction commune de build

## CPFSR — application mobile

Ce dossier contient la configuration commune Capacitor pour l'empaquetage de l'application PWA `../../Приложение/` en applications natives pour Android, iOS et Windows.

---

## 1. Exigences de l'environnement de développement

### Communes
- **Node.js** 18 LTS ou plus récent.
- **npm** 9+ ou **pnpm** 8+.
- **Git**.
- **Capacitor CLI** 6 (installé via npm).

### Pour Android
- **Android Studio** Hedgehog (2023.1.1) ou plus récent.
- **JDK** 17.
- **Android SDK** API 34 (Android 14).
- **Gradle** 8.x.

### Pour iOS
- **macOS** 13 (Ventura) ou plus récent (macOS 14 recommandé).
- **Xcode** 15.x.
- **CocoaPods** 1.14+.
- **Apple Developer Account** avec abonnement 99 USD/an.
- **iOS Provisioning Profile** pour distribution.

### Pour Windows
- **Windows 10** (1809) ou **Windows 11**.
- **Visual Studio 2022** Community/Professional/Enterprise.
- **Windows 10/11 SDK** dernière version.
- **.NET 8 SDK**.
- **WebView2 Runtime** (habituellement préinstallé).

---

## 2. Installation initiale

```bash
# 1. Cloner le dépôt
git clone <REPO_URL>
cd "Сборки/common"

# 2. Installer les dépendances Capacitor
npm install

# 3. Initialiser les plateformes (une seule fois)
npx cap add android
npx cap add ios          # uniquement sur macOS
# Windows s'initialise séparément (voir ci-dessous)

# 4. Synchroniser les ressources web
npx cap sync
```

---

## 3. Build Android

```bash
# Ouvrir Android Studio
npm run android:open

# Build depuis la CLI : AAB (pour RuStore / Google Play)
npm run android:build

# Build depuis la CLI : APK (pour distribution directe)
npm run android:apk
```

Résultats du build :
- AAB : `android/app/build/outputs/bundle/release/app-release.aab`
- APK : `android/app/build/outputs/apk/release/app-release.apk`

La signature s'effectue via le fichier keystore dont le chemin est indiqué dans `capacitor.config.json`. Avant la build de production, remplacez les valeurs de `keystorePassword` et `keystoreAliasPassword` par les vraies.

Voir `../android/README.md` pour des instructions détaillées.

---

## 4. Build iOS

Le build n'est possible que sur macOS.

```bash
# Ouvrir Xcode
npm run ios:open

# Build depuis la CLI : archive
npm run ios:archive

# Export IPA pour l'App Store
npm run ios:export
```

Résultat : `ios/App/build/App.ipa`.

Pour la publication sur l'App Store, les éléments suivants sont nécessaires :
- Apple Distribution Certificate.
- App Store Provisioning Profile.
- App ID `ru.rsfsr.app` dans Apple Developer Portal.
- Enregistrements dans App Store Connect.

Voir `../ios/README.md`.

---

## 5. Build Windows

Le build Windows utilise l'approche **WinUI 3 + WebView2** via le modèle Capacitor pour Windows. Une alternative — l'empaquetage direct de la PWA via le **MSIX Packaging Tool**.

```bash
# Ouvrir Visual Studio
npm run windows:open

# Build MSIX pour le Microsoft Store
npm run windows:package
```

Résultat : `windows/AppPackages/Bundle/App.msix(bundle)`.

Voir `../windows/README.md`.

---

## 6. Versionnage

La version est indiquée à trois endroits et doit coïncider :
1. `common/package.json` — champ `version`.
2. `Приложение/manifest.json` — la désynchronisation est interdite.
3. Manifestes par plateforme :
   - Android : `android/app/build.gradle` (`versionName`, `versionCode`).
   - iOS : `ios/App/App/Info.plist` (`CFBundleShortVersionString`, `CFBundleVersion`).
   - Windows : `windows/Package.appxmanifest` (`Version`).

Le script `npm run version-bump` (recommandé à ajouter) automatise la synchronisation.

---

## 7. CI/CD

Schéma recommandé :

| Déclencheur | Action |
|---|---|
| Push vers `main` | Lint + tests unitaires + SAST |
| Push vers `release/*` | + build pour toutes les plateformes + DAST |
| Tag `v1.X.Y` | + distribution des builds bêta |
| Tag `release/v1.X.Y` | + publication dans les stores |

Systèmes CI recommandés :
- GitLab CI (pour on-prem).
- GitFlic CI (national).
- GitHub Actions (pour composants open-source).

---

## 8. Conformité aux exigences

- **RuStore** : voir `../../Публикация_RuStore/`.
- **App Store** : conformité aux App Store Review Guidelines.
- **Google Play** : conformité aux Google Play Developer Program Policies.
- **Microsoft Store** : conformité aux Microsoft Store Policies.
- **Registre du ministère du Développement numérique (décret du Gouvernement N° 1236)** : documents — au sein du pack KD.
- **FSTEC / FSB** : certification selon les exigences pour IIC de catégorie 1.

---

## 9. Liens

- Documentation Capacitor : https://capacitorjs.com/docs
- Documentation RuStore : https://www.rustore.ru/help/developers
- Apple Developer : https://developer.apple.com
- Google Play Console : https://play.google.com/console
- Microsoft Partner Center : https://partner.microsoft.com
