# CPFSR iOS build

Instruction for building and publishing the iOS application via Capacitor.

---

## 1. Requirements

- **macOS** 13 (Ventura) or newer.
- **Xcode** 15.x or newer.
- **CocoaPods** 1.14+.
- **Apple Developer Program** ($99/year).
- **Apple ID** with two-factor authentication.

```bash
# Install Xcode from the App Store
# Install CocoaPods
sudo gem install cocoapods

# Install Capacitor CLI (if not installed)
npm install -g @capacitor/cli
```

## 2. iOS project initialisation

From the `Сборки/common` folder (on macOS):

```bash
npm install
npx cap add ios
npx cap sync ios
npx cap open ios
```

This will create the `Сборки/ios/` folder with the Xcode project.

## 3. iOS configuration

### 3.1. Info.plist

`ios/App/App/Info.plist` — add:

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
<string>Used for secure confirmation of CPFSR operations</string>

<key>NSCameraUsageDescription</key>
<string>Used for photographing documents</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Used for attaching documents to requests</string>

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

<!-- Minimum iOS version -->
<key>MinimumOSVersion</key>
<string>15.0</string>
```

### 3.2. Capabilities

In Xcode → Project → Target → Signing & Capabilities add:
- **Associated Domains**: for universal links.
- **Push Notifications**: for push.
- **Background Modes**: Remote notifications, Background processing.
- **Sign in with Apple**: optional.
- **Keychain Sharing**: for a shared keychain between extensions.

### 3.3. Signing

1. Apple Developer Portal → Identifiers → create App ID `ru.rsfsr.app` with the required capabilities.
2. Create a Provisioning Profile (Distribution → App Store).
3. Create an Apple Distribution Certificate.
4. In Xcode, select the Team and the Provisioning Profile.

### 3.4. Icons

`ios/App/App/Assets.xcassets/AppIcon.appiconset/` — fill in the icon set:
- 20pt: 40×40, 60×60
- 29pt: 58×58, 87×87
- 40pt: 80×80, 120×120
- 60pt: 120×120, 180×180
- 76pt: 152×152
- 83.5pt: 167×167
- 1024×1024 — for the App Store

Use `Приложение/icons/icon-512.svg` as the source; scale via `@capacitor/assets`.

### 3.5. Launch Screen

Storyboard `LaunchScreen.storyboard` — add the icon and background #0B2B5C.

## 4. Build

### Archive
In Xcode: Product → Archive (Cmd+Shift+B → Archive).

Or from the CLI:
```bash
cd ios/App
xcodebuild -workspace App.xcworkspace \
           -scheme App \
           -configuration Release \
           archive \
           -archivePath build/App.xcarchive
```

### Export IPA
Create `ExportOptions.plist`:
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

Then:
```bash
xcodebuild -exportArchive \
           -archivePath build/App.xcarchive \
           -exportPath build \
           -exportOptionsPlist ExportOptions.plist
```

Result: `ios/App/build/App.ipa`.

## 5. TestFlight

1. App Store Connect → My Apps → create a new application `ru.rsfsr.app`.
2. Upload IPA via Xcode (Window → Organizer → Distribute App) or Transporter (a separate Apple application).
3. In TestFlight: add internal and external testers.
4. Wait for External Testing approval (24–48 hours).

## 6. Publication on the App Store

1. App Store Connect → App Information:
   - Name: "CPFSR"
   - Subtitle: "Russian Service for Social Development Financing"
   - Category: Finance / Productivity
2. Pricing: Free.
3. App Privacy: indicate all data collected.
4. App Review Information: reviewer contacts, demo account.
5. Version Information:
   - Promotional text (up to 170 characters).
   - Description (up to 4,000 characters).
   - Keywords (up to 100 characters).
   - Screenshots (for all screen sizes).
6. Submit for review (period: 1–3 days).

### Apple Review checklist
- Give the reviewer demo access (a mock mode without ESIA is acceptable).
- Provide the privacy policy with the URL on the site.
- Provide the Terms of Service.
- Confirm that you have the necessary licences (Bank of Russia).

### Possible difficulties
- Cryptocurrency classification: DFAs **are not a cryptocurrency**. Prepare justification.
- Regional blocking: if necessary, distribution can be restricted to the territory of the RF only.

## 7. Additional

### Universal Links
The `apple-app-site-association` file (no extension, JSON) at `https://app.dp-rsfsr.ru/.well-known/apple-app-site-association`:
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
AppMetrica or a Crashlytics alternative is recommended.

---

## 8. Publication readiness checklist

- [ ] Info.plist configured.
- [ ] All capabilities added.
- [ ] Apple Distribution Certificate and Provisioning Profile in order.
- [ ] Icons of all sizes.
- [ ] LaunchScreen.
- [ ] Universal Links configured.
- [ ] Internal testing through TestFlight.
- [ ] Promotional materials (screenshots for all devices).
- [ ] Privacy Policy.
- [ ] Demo account for the reviewer.
- [ ] App Store Connect filled in.
