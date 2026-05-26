# CPFSR Windows build

Instruction for building the Windows application (MSIX) for distribution via the Microsoft Store and the Enterprise channel.

---

## 1. Approaches to the Windows build

Two approaches are supported:

### A. PWA + MSIX (recommended)
The fastest path: packaging the existing PWA into an MSIX package via **PWA Builder** or directly through **Microsoft Edge WebView2**.

### B. .NET MAUI + WebView2
A full-fledged native Windows application with PWA integration via the WebView2 control. Provides more capabilities (native Windows Hello biometrics, protected storage), but requires more work.

Both approaches are described below.

---

## 2. Approach A: PWA Builder

### Requirements
- Windows 10/11.
- Edge or Chrome with PWA support.
- Microsoft Partner Center account (for publication).

### Installing PWA Builder CLI
```bash
npm install -g @pwabuilder/cli
```

### Generation of the MSIX package

1. Publish the PWA on a temporary domain (a local HTTPS server can be used for testing):
```bash
# In the CPFSR root
npx http-server -S -p 8443    # requires a self-signed certificate
```

2. Generate the MSIX:
```bash
pwa-builder https://app.dp-rsfsr.ru \
            --package windows \
            --output ./windows-build
```

Result: `windows-build/RU.RSFSR.App.msix`.

### MSIX signing

```bash
# Create self-signed for tests
makecert -r -h 0 -n "CN=RU.RSFSR.App" -eku 1.3.6.1.5.5.7.3.3 \
         -pe -sv rsfsr.pvk rsfsr.cer
pvk2pfx -pvk rsfsr.pvk -spc rsfsr.cer -pfx rsfsr.pfx -po PASSWORD

# Sign
signtool sign /f rsfsr.pfx /p PASSWORD \
              /fd SHA256 /tr http://timestamp.digicert.com /td SHA256 \
              ./windows-build/RU.RSFSR.App.msix
```

For a production build, an EV Code Signing Certificate is used (domestic CAs: SkyDNS, RU-CENTER).

---

## 3. Approach B: .NET MAUI + WebView2

### Requirements
- Visual Studio 2022 with the "Mobile development with .NET" workload.
- .NET 8 SDK.
- Windows 10/11 SDK.

### Project creation

1. Visual Studio → New Project → .NET MAUI App.
2. Name: `RU.RSFSR.App`.
3. Location: `Сборки/windows/`.
4. Framework: .NET 8.

### Structure

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
    MainPage.xaml          ← WebView2 with PWA
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
                          Description="Russian Service for Social Development Financing"
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

### Icons

Required sizes (Windows 11):
- `Square44x44Logo.png` — 44×44 (taskbar, jumplist)
- `Square71x71Logo.png` — 71×71 (small tile)
- `Square150x150Logo.png` — 150×150 (medium tile)
- `Wide310x150Logo.png` — 310×150 (wide tile)
- `Square310x310Logo.png` — 310×310 (large tile)
- `StoreLogo.png` — 50×50 (Store listing)
- `SplashScreen.png` — 620×300

Generate from `Приложение/icons/icon-512.svg`.

### Build

```bash
# From the windows folder
msbuild App.sln /p:Configuration=Release /p:Platform=x64

# MSIX bundle
msbuild App.sln /t:Publish /p:Configuration=Release /p:Platform=x64 \
       /p:AppxBundlePlatforms="x64|arm64" \
       /p:AppxBundle=Always \
       /p:UapAppxPackageBuildMode=StoreUpload
```

Result: `windows/AppPackages/App_1.0.0.0_x64_arm64_bundle.msixbundle`.

## 4. Publication in the Microsoft Store

1. Microsoft Partner Center: https://partner.microsoft.com
2. Create a Microsoft Store App.
3. Reserve the name: "CPFSR".
4. Fill in the metadata:
   - Description (4 languages).
   - Screenshots (for various sizes).
   - 512×512 icon.
   - Age category.
   - Category: Finance.
5. Upload the MSIX bundle.
6. Submit for certification (period: 24–48 hours).

## 5. Distribution outside the Store

For corporate distribution:
- **Microsoft Intune** — MDM.
- **PowerShell installation**: `Add-AppxPackage -Path App.msixbundle`.
- **Web installer**: an AppInstaller file on a host.

---

## 6. Publication readiness checklist

- [ ] Package.appxmanifest configured.
- [ ] Icons of all sizes.
- [ ] Splash screen.
- [ ] Code signing certificate signature.
- [ ] Tested on Windows 10 and Windows 11.
- [ ] Tested on x64 and ARM64.
- [ ] WebView2 Runtime installed/verified.
- [ ] Promotional materials for the Store.
- [ ] Privacy Policy.
- [ ] Microsoft Partner Center account.
