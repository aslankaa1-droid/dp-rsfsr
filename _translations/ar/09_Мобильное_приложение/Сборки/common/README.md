# Capacitor — تعليمات البناء المشتركة

## CPFSR — تطبيق الهاتف المحمول

يحتوي هذا المجلد على إعداد Capacitor المشترك لتحزيم تطبيق PWA `../../Приложение/` إلى تطبيقات أصلية لـ Android وiOS وWindows.

---

## 1. متطلبات بيئة التطوير

### العامة
- **Node.js** 18 LTS أو أحدث.
- **npm** 9+ أو **pnpm** 8+.
- **Git**.
- **Capacitor CLI** 6 (يُثبَّت عبر npm).

### لـ Android
- **Android Studio** Hedgehog (2023.1.1) أو أحدث.
- **JDK** 17.
- **Android SDK** API 34 (Android 14).
- **Gradle** 8.x.

### لـ iOS
- **macOS** 13 (Ventura) أو أحدث (موصى به macOS 14).
- **Xcode** 15.x.
- **CocoaPods** 1.14+.
- **Apple Developer Account** باشتراك 99 USD/سنوياً.
- **iOS Provisioning Profile** للتوزيع.

### لـ Windows
- **Windows 10** (1809) أو **Windows 11**.
- **Visual Studio 2022** Community/Professional/Enterprise.
- **Windows 10/11 SDK** آخر إصدار.
- **.NET 8 SDK**.
- **WebView2 Runtime** (مثبَّت مسبقاً عادةً).

---

## 2. التثبيت الأوّلي

```bash
# 1. استنساخ المستودع
git clone <REPO_URL>
cd "Сборки/common"

# 2. تثبيت تبعيات Capacitor
npm install

# 3. تهيئة المنصات (تجري مرة واحدة)
npx cap add android
npx cap add ios          # على macOS فقط
# Windows تُهيَّأ منفصلة (انظر أدناه)

# 4. مزامنة موارد الويب
npx cap sync
```

---

## 3. بناء Android

```bash
# فتح Android Studio
npm run android:open

# البناء من CLI: AAB (لـ RuStore / Google Play)
npm run android:build

# البناء من CLI: APK (للتوزيع المباشر)
npm run android:apk
```

نتائج البناء:
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`
- APK: `android/app/build/outputs/apk/release/app-release.apk`

يتم التوقيع بواسطة ملف keystore المُحدَّد مساره في `capacitor.config.json`. قبل بناء الإنتاج، استبدل قيم `keystorePassword` و`keystoreAliasPassword` بقيم حقيقية.

انظر `../android/README.md` للتعليمات التفصيلية.

---

## 4. بناء iOS

البناء ممكن على macOS فقط.

```bash
# فتح Xcode
npm run ios:open

# البناء من CLI: archive
npm run ios:archive

# تصدير IPA لـ App Store
npm run ios:export
```

النتيجة: `ios/App/build/App.ipa`.

للنشر في App Store يلزم:
- Apple Distribution Certificate.
- App Store Provisioning Profile.
- App ID `ru.rsfsr.app` في Apple Developer Portal.
- سجلات في App Store Connect.

انظر `../ios/README.md`.

---

## 5. بناء Windows

يستخدم بناء Windows نهج **WinUI 3 + WebView2** عبر قالب Capacitor لـ Windows. والبديل — تحزيم PWA مباشرة عبر **MSIX Packaging Tool**.

```bash
# فتح Visual Studio
npm run windows:open

# بناء MSIX لـ Microsoft Store
npm run windows:package
```

النتيجة: `windows/AppPackages/Bundle/App.msix(bundle)`.

انظر `../windows/README.md`.

---

## 6. الإصدارات

تُذكَر النسخة في ثلاثة مواضع ويجب أن تتطابق:
1. `common/package.json` — حقل `version`.
2. `Приложение/manifest.json` — لا يُسمَح بعدم التزامن.
3. بيانات المنصات:
   - Android: `android/app/build.gradle` (`versionName`، `versionCode`).
   - iOS: `ios/App/App/Info.plist` (`CFBundleShortVersionString`، `CFBundleVersion`).
   - Windows: `windows/Package.appxmanifest` (`Version`).

نص `npm run version-bump` (يُوصى بإضافته) يُؤتمت المزامنة.

---

## 7. CI/CD

المخطط الموصى به:

| المُشغِّل | الإجراء |
|---|---|
| Push إلى `main` | Lint + اختبارات الوحدة + SAST |
| Push إلى `release/*` | + البناء لجميع المنصات + DAST |
| Tag `v1.X.Y` | + توزيع نسخ بيتا |
| Tag `release/v1.X.Y` | + النشر في المتاجر |

أنظمة CI الموصى بها:
- GitLab CI (لـ on-prem).
- GitFlic CI (محلي).
- GitHub Actions (للمكوّنات مفتوحة المصدر).

---

## 8. الامتثال للمتطلبات

- **RuStore**: انظر `../../Публикация_RuStore/`.
- **App Store**: المطابقة لـ App Store Review Guidelines.
- **Google Play**: المطابقة لـ Google Play Developer Program Policies.
- **Microsoft Store**: المطابقة لـ Microsoft Store Policies.
- **سجل وزارة التطوير الرقمي (قرار الحكومة رقم 1236)**: المستندات — ضمن حزمة KD.
- **FSTEC / FSB**: الاعتماد وفق متطلبات CII من الفئة 1.

---

## 9. روابط

- توثيق Capacitor: https://capacitorjs.com/docs
- توثيق RuStore: https://www.rustore.ru/help/developers
- Apple Developer: https://developer.apple.com
- Google Play Console: https://play.google.com/console
- Microsoft Partner Center: https://partner.microsoft.com
