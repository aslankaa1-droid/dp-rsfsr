# بناء iOS CPFSR

تعليمات بناء ونشر تطبيق iOS عبر Capacitor.

---

## 1. المتطلبات

- **macOS** 13 (Ventura) أو أحدث.
- **Xcode** 15.x أو أحدث.
- **CocoaPods** 1.14+.
- **Apple Developer Program** (99 دولار/سنوياً).
- **Apple ID** بالمصادقة بعاملَين.

```bash
# تثبيت Xcode من App Store
# تثبيت CocoaPods
sudo gem install cocoapods

# تثبيت Capacitor CLI (إن لم يكن مثبَّتاً)
npm install -g @capacitor/cli
```

## 2. تهيئة مشروع iOS

من المجلد `Сборки/common` (على macOS):

```bash
npm install
npx cap add ios
npx cap sync ios
npx cap open ios
```

سيُنشَأ بذلك المجلد `Сборки/ios/` بمشروع Xcode.

## 3. إعداد iOS

### 3.1. Info.plist

`ios/App/App/Info.plist` — أضف:

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

<!-- التوطين -->
<key>CFBundleLocalizations</key>
<array>
    <string>ru</string>
    <string>en</string>
    <string>fr</string>
    <string>ar</string>
</array>
<key>CFBundleDevelopmentRegion</key>
<string>ru</string>

<!-- الأذونات -->
<key>NSFaceIDUsageDescription</key>
<string>يُستخدَم للتأكيد الآمن لعمليات CPFSR</string>

<key>NSCameraUsageDescription</key>
<string>يُستخدَم لتصوير المستندات</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>يُستخدَم لإرفاق المستندات بالطلبات</string>

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

<!-- الحد الأدنى لإصدار iOS -->
<key>MinimumOSVersion</key>
<string>15.0</string>
```

### 3.2. Capabilities

في Xcode → Project → Target → Signing & Capabilities أضف:
- **Associated Domains**: لـ universal links.
- **Push Notifications**: للإشعارات push.
- **Background Modes**: Remote notifications، Background processing.
- **Sign in with Apple**: اختياري.
- **Keychain Sharing**: لـ keychain مشترك بين الامتدادات.

### 3.3. التوقيع

1. Apple Developer Portal → Identifiers → أنشئ App ID `ru.rsfsr.app` مع الـ capabilities المطلوبة.
2. أنشئ Provisioning Profile (Distribution → App Store).
3. أنشئ Apple Distribution Certificate.
4. في Xcode، اختر Team وProvisioning Profile.

### 3.4. الأيقونات

`ios/App/App/Assets.xcassets/AppIcon.appiconset/` — املأ مجموعة الأيقونات:
- 20pt: 40×40، 60×60
- 29pt: 58×58، 87×87
- 40pt: 80×80، 120×120
- 60pt: 120×120، 180×180
- 76pt: 152×152
- 83,5pt: 167×167
- 1024×1024 — لـ App Store

استخدم `Приложение/icons/icon-512.svg` كمصدر؛ التوسيع عبر `@capacitor/assets`.

### 3.5. Launch Screen

Storyboard `LaunchScreen.storyboard` — أضف الأيقونة وخلفية #0B2B5C.

## 4. البناء

### Archive
في Xcode: Product → Archive (Cmd+Shift+B → Archive).

أو من CLI:
```bash
cd ios/App
xcodebuild -workspace App.xcworkspace \
           -scheme App \
           -configuration Release \
           archive \
           -archivePath build/App.xcarchive
```

### Export IPA
أنشئ `ExportOptions.plist`:
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

ثم:
```bash
xcodebuild -exportArchive \
           -archivePath build/App.xcarchive \
           -exportPath build \
           -exportOptionsPlist ExportOptions.plist
```

النتيجة: `ios/App/build/App.ipa`.

## 5. TestFlight

1. App Store Connect → My Apps → أنشئ تطبيقاً جديداً `ru.rsfsr.app`.
2. ارفع IPA عبر Xcode (Window → Organizer → Distribute App) أو Transporter (تطبيق Apple منفصل).
3. في TestFlight: أضف مختبرين داخليين وخارجيين.
4. انتظر اعتماد External Testing (24–48 ساعة).

## 6. النشر في App Store

1. App Store Connect → App Information:
   - الاسم: «CPFSR»
   - العنوان الفرعي: «الخدمة الروسية لتمويل التنمية الاجتماعية»
   - الفئة: Finance / Productivity
2. Pricing: مجاناً.
3. App Privacy: حدِّد جميع البيانات المجموعة.
4. App Review Information: جهات اتصال للمراجِع، حساب تجريبي.
5. Version Information:
   - نص ترويجي (حتى 170 حرفاً).
   - الوصف (حتى 4000 حرف).
   - الكلمات المفتاحية (حتى 100 حرف).
   - لقطات الشاشة (لجميع أحجام الشاشات).
6. أرسِل للمراجعة (المدة: 1–3 أيام).

### قائمة Apple Review
- امنح المراجِع وصولاً تجريبياً (يُقبَل وضع mock بدون ESIA).
- قدِّم سياسة الخصوصية برابط على الموقع.
- قدِّم Terms of Service.
- أكِّد امتلاك التراخيص اللازمة (بنك روسيا).

### الصعوبات المحتملة
- تصنيف العملات المشفَّرة: DFA **ليست عملات مشفَّرة**. حضِّر التبرير.
- الحجب الإقليمي: عند الحاجة يمكن قصر التوزيع على أراضي الاتحاد الروسي فقط.

## 7. إضافات

### Universal Links
ملف `apple-app-site-association` (بلا امتداد، JSON) على `https://app.dp-rsfsr.ru/.well-known/apple-app-site-association`:
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

### تقارير الأعطال
يُوصى بـ AppMetrica أو بديل لـ Crashlytics.

---

## 8. قائمة الاستعداد للنشر

- [ ] إعداد Info.plist.
- [ ] إضافة جميع الـ capabilities.
- [ ] Apple Distribution Certificate وProvisioning Profile سليمَين.
- [ ] الأيقونات بجميع الأحجام.
- [ ] LaunchScreen.
- [ ] إعداد Universal Links.
- [ ] اختبار داخلي عبر TestFlight.
- [ ] المواد الترويجية (لقطات شاشة لجميع الأجهزة).
- [ ] سياسة الخصوصية.
- [ ] حساب تجريبي للمراجِع.
- [ ] تعبئة App Store Connect.
