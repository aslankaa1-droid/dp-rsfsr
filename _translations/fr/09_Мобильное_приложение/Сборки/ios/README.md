# Build iOS CPFSR

Instruction de build et de publication de l'application iOS via Capacitor.

---

## 1. Exigences

- **macOS** 13 (Ventura) ou plus récent.
- **Xcode** 15.x ou plus récent.
- **CocoaPods** 1.14+.
- **Apple Developer Program** (99 $/an).
- **Apple ID** avec authentification à deux facteurs.

```bash
# Installer Xcode depuis l'App Store
# Installer CocoaPods
sudo gem install cocoapods

# Installer Capacitor CLI (s'il n'est pas installé)
npm install -g @capacitor/cli
```

## 2. Initialisation du projet iOS

Depuis le dossier `Сборки/common` (sous macOS) :

```bash
npm install
npx cap add ios
npx cap sync ios
npx cap open ios
```

Cela créera le dossier `Сборки/ios/` avec le projet Xcode.

## 3. Configuration iOS

### 3.1. Info.plist

`ios/App/App/Info.plist` — ajoutez :

```xml
<key>CFBundleDisplayName</key>
<string>CPFSR</string>

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

<!-- Localisation -->
<key>CFBundleLocalizations</key>
<array>
    <string>ru</string>
    <string>en</string>
    <string>fr</string>
    <string>ar</string>
</array>
<key>CFBundleDevelopmentRegion</key>
<string>ru</string>

<!-- Permissions -->
<key>NSFaceIDUsageDescription</key>
<string>Utilisé pour la confirmation sécurisée des opérations CPFSR</string>

<key>NSCameraUsageDescription</key>
<string>Utilisé pour photographier des documents</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Utilisé pour joindre des documents aux demandes</string>

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

<!-- Version iOS minimale -->
<key>MinimumOSVersion</key>
<string>15.0</string>
```

### 3.2. Capabilities

Dans Xcode → Project → Target → Signing & Capabilities, ajoutez :
- **Associated Domains** : pour les universal links.
- **Push Notifications** : pour les push.
- **Background Modes** : Remote notifications, Background processing.
- **Sign in with Apple** : optionnel.
- **Keychain Sharing** : pour un keychain commun entre extensions.

### 3.3. Signature

1. Apple Developer Portal → Identifiers → créez l'App ID `ru.rsfsr.app` avec les capabilities requises.
2. Créez un Provisioning Profile (Distribution → App Store).
3. Créez un Apple Distribution Certificate.
4. Dans Xcode, sélectionnez le Team et le Provisioning Profile.

### 3.4. Icônes

`ios/App/App/Assets.xcassets/AppIcon.appiconset/` — remplissez l'ensemble d'icônes :
- 20pt : 40×40, 60×60
- 29pt : 58×58, 87×87
- 40pt : 80×80, 120×120
- 60pt : 120×120, 180×180
- 76pt : 152×152
- 83,5pt : 167×167
- 1024×1024 — pour l'App Store

Utilisez `Приложение/icons/icon-512.svg` comme source ; mettez à l'échelle via `@capacitor/assets`.

### 3.5. Launch Screen

Storyboard `LaunchScreen.storyboard` — ajoutez l'icône et le fond #0B2B5C.

## 4. Build

### Archive
Dans Xcode : Product → Archive (Cmd+Maj+B → Archive).

Ou depuis la CLI :
```bash
cd ios/App
xcodebuild -workspace App.xcworkspace \
           -scheme App \
           -configuration Release \
           archive \
           -archivePath build/App.xcarchive
```

### Export IPA
Créez `ExportOptions.plist` :
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

Puis :
```bash
xcodebuild -exportArchive \
           -archivePath build/App.xcarchive \
           -exportPath build \
           -exportOptionsPlist ExportOptions.plist
```

Résultat : `ios/App/build/App.ipa`.

## 5. TestFlight

1. App Store Connect → My Apps → créez une nouvelle application `ru.rsfsr.app`.
2. Téléversez IPA via Xcode (Window → Organizer → Distribute App) ou Transporter (application Apple distincte).
3. Dans TestFlight : ajoutez des testeurs internes et externes.
4. Attendez l'approbation pour External Testing (24–48 heures).

## 6. Publication dans l'App Store

1. App Store Connect → App Information :
   - Nom : « CPFSR »
   - Sous-titre : « Service Russe de Financement »
   - Catégorie : Finance / Productivity
2. Pricing : Gratuit.
3. App Privacy : indiquez toutes les données collectées.
4. App Review Information : contacts pour le relecteur, compte démo.
5. Version Information :
   - Texte promotionnel (jusqu'à 170 caractères).
   - Description (jusqu'à 4 000 caractères).
   - Mots-clés (jusqu'à 100 caractères).
   - Captures d'écran (pour toutes les tailles d'écran).
6. Envoyez à la relecture (délai : 1–3 jours).

### Check-list Apple Review
- Donnez au relecteur un accès démo (un mode mock sans ESIA est admissible).
- Fournissez la politique de confidentialité avec l'URL sur le site.
- Fournissez les Terms of Service.
- Confirmez que vous disposez des licences nécessaires (BdR).

### Difficultés possibles
- Classification cryptomonnaie : les AFN **ne sont pas des cryptomonnaies**. Préparez une justification.
- Blocage régional : si nécessaire, la distribution peut être limitée au seul territoire de la FR.

## 7. Compléments

### Universal Links
Fichier `apple-app-site-association` (sans extension, JSON) à `https://app.dp-rsfsr.ru/.well-known/apple-app-site-association` :
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
AppMetrica ou alternative à Crashlytics est recommandé.

---

## 8. Check-list de préparation à la publication

- [ ] Info.plist configuré.
- [ ] Toutes les capabilities ajoutées.
- [ ] Apple Distribution Certificate et Provisioning Profile en ordre.
- [ ] Icônes de toutes les tailles.
- [ ] LaunchScreen.
- [ ] Universal Links configurés.
- [ ] Tests internes via TestFlight.
- [ ] Matériels promotionnels (captures d'écran pour tous les appareils).
- [ ] Politique de confidentialité.
- [ ] Compte démo pour le relecteur.
- [ ] App Store Connect rempli.
