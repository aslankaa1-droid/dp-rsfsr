# بناء Windows CPFSR

تعليمات بناء تطبيق Windows (MSIX) للتوزيع عبر Microsoft Store ولقنوات المؤسسات.

---

## 1. مناهج بناء Windows

يُدعَم منهجان:

### A. PWA + MSIX (موصى به)
الطريق الأسرع: تحزيم PWA القائمة في حزمة MSIX عبر **PWA Builder** أو مباشرة عبر **Microsoft Edge WebView2**.

### B. .NET MAUI + WebView2
تطبيق Windows أصلي كامل مع تكامل PWA عبر متحكم WebView2. يوفر إمكانات أكبر (البيومترية الأصلية Windows Hello، المخزن المحمي)، لكنه يستلزم عملاً أكبر.

كلا المنهجَين موصوف أدناه.

---

## 2. المنهج A: PWA Builder

### المتطلبات
- Windows 10/11.
- Edge أو Chrome بدعم PWA.
- حساب Microsoft Partner Center (للنشر).

### تثبيت PWA Builder CLI
```bash
npm install -g @pwabuilder/cli
```

### توليد حزمة MSIX

1. انشر PWA على نطاق مؤقت (يمكن استخدام خادم HTTPS محلي للاختبار):
```bash
# في جذر CPFSR
npx http-server -S -p 8443    # يستلزم شهادة self-signed
```

2. ولِّد MSIX:
```bash
pwa-builder https://app.dp-rsfsr.ru \
            --package windows \
            --output ./windows-build
```

النتيجة: `windows-build/RU.RSFSR.App.msix`.

### توقيع MSIX

```bash
# إنشاء self-signed للاختبارات
makecert -r -h 0 -n "CN=RU.RSFSR.App" -eku 1.3.6.1.5.5.7.3.3 \
         -pe -sv rsfsr.pvk rsfsr.cer
pvk2pfx -pvk rsfsr.pvk -spc rsfsr.cer -pfx rsfsr.pfx -po PASSWORD

# التوقيع
signtool sign /f rsfsr.pfx /p PASSWORD \
              /fd SHA256 /tr http://timestamp.digicert.com /td SHA256 \
              ./windows-build/RU.RSFSR.App.msix
```

لبناء الإنتاج تُستخدَم شهادة EV Code Signing (سلطات شهادات محلية: SkyDNS، RU-CENTER).

---

## 3. المنهج B: .NET MAUI + WebView2

### المتطلبات
- Visual Studio 2022 مع workload «Mobile development with .NET».
- .NET 8 SDK.
- Windows 10/11 SDK.

### إنشاء المشروع

1. Visual Studio → New Project → .NET MAUI App.
2. الاسم: `RU.RSFSR.App`.
3. الموقع: `Сборки/windows/`.
4. الإطار: .NET 8.

### الهيكل

```
windows/
  App/
    Platforms/
      Windows/
        Package.appxmanifest
        App.xaml
    Resources/
      AppIcon/
      Splash/
    MauiProgram.cs
    MainPage.xaml          ← WebView2 مع PWA
    App.csproj
  AppPackages/
  build/
```

### MainPage.xaml
```xml
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="RU.RSFSR.App.MainPage"
             BackgroundColor="#0B2B5C">
    <WebView x:Name="webView"
             Source="https://app.dp-rsfsr.ru"
             HorizontalOptions="Fill"
             VerticalOptions="Fill" />
</ContentPage>
```

### Package.appxmanifest

```xml
<?xml version="1.0" encoding="utf-8"?>
<Package xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
         xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
         xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities"
         IgnorableNamespaces="uap rescap">

  <Identity Name="RU.RSFSR.App"
            Publisher="CN=Kagirov Abdul-Khakim Akhmadovich"
            Version="1.0.0.0" />

  <Properties>
    <DisplayName>CPFSR</DisplayName>
    <PublisherDisplayName>A.-Kh. A. Kagirov</PublisherDisplayName>
    <Logo>Resources\StoreLogo.png</Logo>
  </Properties>

  <Dependencies>
    <TargetDeviceFamily Name="Windows.Desktop"
                       MinVersion="10.0.17763.0"
                       MaxVersionTested="10.0.22621.0" />
  </Dependencies>

  <Resources>
    <Resource Language="ru-RU"/>
    <Resource Language="en-US"/>
    <Resource Language="fr-FR"/>
    <Resource Language="ar-SA"/>
  </Resources>

  <Applications>
    <Application Id="App"
                 Executable="App.exe"
                 EntryPoint="RU.RSFSR.App.App">
      <uap:VisualElements DisplayName="CPFSR"
                          Description="الخدمة الروسية لتمويل التنمية الاجتماعية"
                          BackgroundColor="#0B2B5C"
                          Square150x150Logo="Resources\Square150x150Logo.png"
                          Square44x44Logo="Resources\Square44x44Logo.png">
        <uap:DefaultTile Wide310x150Logo="Resources\Wide310x150Logo.png"
                         Square71x71Logo="Resources\Square71x71Logo.png"
                         Square310x310Logo="Resources\Square310x310Logo.png" />
        <uap:SplashScreen Image="Resources\SplashScreen.png"
                          BackgroundColor="#0B2B5C" />
      </uap:VisualElements>
    </Application>
  </Applications>

  <Capabilities>
    <Capability Name="internetClient" />
    <Capability Name="privateNetworkClientServer" />
    <uap:Capability Name="userAccountInformation" />
  </Capabilities>
</Package>
```

### الأيقونات

الأحجام المطلوبة (Windows 11):
- `Square44x44Logo.png` — 44×44 (شريط المهام، jumplist)
- `Square71x71Logo.png` — 71×71 (small tile)
- `Square150x150Logo.png` — 150×150 (medium tile)
- `Wide310x150Logo.png` — 310×150 (wide tile)
- `Square310x310Logo.png` — 310×310 (large tile)
- `StoreLogo.png` — 50×50 (Store listing)
- `SplashScreen.png` — 620×300

ولِّدها من `Приложение/icons/icon-512.svg`.

### البناء

```bash
# من مجلد windows
msbuild App.sln /p:Configuration=Release /p:Platform=x64

# MSIX bundle
msbuild App.sln /t:Publish /p:Configuration=Release /p:Platform=x64 \
       /p:AppxBundlePlatforms="x64|arm64" \
       /p:AppxBundle=Always \
       /p:UapAppxPackageBuildMode=StoreUpload
```

النتيجة: `windows/AppPackages/App_1.0.0.0_x64_arm64_bundle.msixbundle`.

## 4. النشر في Microsoft Store

1. Microsoft Partner Center: https://partner.microsoft.com
2. أنشئ Microsoft Store App.
3. احجز الاسم: «CPFSR».
4. عبِّئ بيانات الوصف:
   - الوصف (4 لغات).
   - لقطات الشاشة (لأحجام مختلفة).
   - أيقونة 512×512.
   - الفئة العمرية.
   - الفئة: المالية.
5. ارفع MSIX-bundle.
6. أرسِل للاعتماد (المدة: 24–48 ساعة).

## 5. التوزيع خارج Store

للتوزيع المؤسسي:
- **Microsoft Intune** — MDM.
- **التثبيت بـ PowerShell**: `Add-AppxPackage -Path App.msixbundle`.
- **Web-installer**: ملف AppInstaller على مضيف.

---

## 6. قائمة الاستعداد للنشر

- [ ] إعداد Package.appxmanifest.
- [ ] الأيقونات بجميع الأحجام.
- [ ] Splash screen.
- [ ] التوقيع بشهادة code signing.
- [ ] الاختبار على Windows 10 وWindows 11.
- [ ] الاختبار على x64 وARM64.
- [ ] تثبيت/فحص WebView2 Runtime.
- [ ] المواد الترويجية لـ Store.
- [ ] سياسة الخصوصية.
- [ ] حساب Microsoft Partner Center.
