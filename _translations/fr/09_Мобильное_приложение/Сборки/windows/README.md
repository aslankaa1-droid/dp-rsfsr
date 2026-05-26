# Build Windows CPFSR

Instruction de build de l'application Windows (MSIX) pour distribution via le Microsoft Store et l'Entreprise.

---

## 1. Approches du build Windows

Deux approches sont prises en charge :

### A. PWA + MSIX (recommandé)
La voie la plus rapide : empaquetage de la PWA existante dans un paquet MSIX via **PWA Builder** ou directement via **Microsoft Edge WebView2**.

### B. .NET MAUI + WebView2
Application Windows native à part entière avec intégration de la PWA via le contrôle WebView2. Offre davantage de possibilités (biométrie native Windows Hello, stockage protégé), mais demande plus de travail.

Les deux approches sont décrites ci-dessous.

---

## 2. Approche A : PWA Builder

### Exigences
- Windows 10/11.
- Edge ou Chrome avec prise en charge PWA.
- Compte Microsoft Partner Center (pour publication).

### Installation de PWA Builder CLI
```bash
npm install -g @pwabuilder/cli
```

### Génération du paquet MSIX

1. Publiez la PWA sur un domaine temporaire (un serveur HTTPS local peut servir pour le test) :
```bash
# À la racine de CPFSR
npx http-server -S -p 8443    # requiert un certificat self-signed
```

2. Générez le MSIX :
```bash
pwa-builder https://app.dp-rsfsr.ru \
            --package windows \
            --output ./windows-build
```

Résultat : `windows-build/RU.RSFSR.App.msix`.

### Signature MSIX

```bash
# Créer self-signed pour les tests
makecert -r -h 0 -n "CN=RU.RSFSR.App" -eku 1.3.6.1.5.5.7.3.3 \
         -pe -sv rsfsr.pvk rsfsr.cer
pvk2pfx -pvk rsfsr.pvk -spc rsfsr.cer -pfx rsfsr.pfx -po PASSWORD

# Signer
signtool sign /f rsfsr.pfx /p PASSWORD \
              /fd SHA256 /tr http://timestamp.digicert.com /td SHA256 \
              ./windows-build/RU.RSFSR.App.msix
```

Pour la build de production, on utilise un EV Code Signing Certificate (autorités de certification nationales : SkyDNS, RU-CENTER).

---

## 3. Approche B : .NET MAUI + WebView2

### Exigences
- Visual Studio 2022 avec le workload « Mobile development with .NET ».
- .NET 8 SDK.
- Windows 10/11 SDK.

### Création du projet

1. Visual Studio → New Project → .NET MAUI App.
2. Nom : `RU.RSFSR.App`.
3. Emplacement : `Сборки/windows/`.
4. Framework : .NET 8.

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
    MainPage.xaml          ← WebView2 avec PWA
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
                          Description="Service Russe de Financement du Développement Social"
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

### Icônes

Tailles requises (Windows 11) :
- `Square44x44Logo.png` — 44×44 (taskbar, jumplist)
- `Square71x71Logo.png` — 71×71 (small tile)
- `Square150x150Logo.png` — 150×150 (medium tile)
- `Wide310x150Logo.png` — 310×150 (wide tile)
- `Square310x310Logo.png` — 310×310 (large tile)
- `StoreLogo.png` — 50×50 (Store listing)
- `SplashScreen.png` — 620×300

Générez à partir de `Приложение/icons/icon-512.svg`.

### Build

```bash
# Depuis le dossier windows
msbuild App.sln /p:Configuration=Release /p:Platform=x64

# MSIX bundle
msbuild App.sln /t:Publish /p:Configuration=Release /p:Platform=x64 \
       /p:AppxBundlePlatforms="x64|arm64" \
       /p:AppxBundle=Always \
       /p:UapAppxPackageBuildMode=StoreUpload
```

Résultat : `windows/AppPackages/App_1.0.0.0_x64_arm64_bundle.msixbundle`.

## 4. Publication dans Microsoft Store

1. Microsoft Partner Center : https://partner.microsoft.com
2. Créez un Microsoft Store App.
3. Réservez le nom : « CPFSR ».
4. Remplissez les métadonnées :
   - Description (4 langues).
   - Captures d'écran (pour différentes tailles).
   - Icône 512×512.
   - Catégorie d'âge.
   - Catégorie : Finance.
5. Téléversez le MSIX-bundle.
6. Envoyez à la certification (délai : 24–48 heures).

## 5. Distribution hors Store

Pour la distribution corporative :
- **Microsoft Intune** — MDM.
- **Installation PowerShell** : `Add-AppxPackage -Path App.msixbundle`.
- **Web-installer** : fichier AppInstaller sur un hôte.

---

## 6. Check-list de préparation à la publication

- [ ] Package.appxmanifest configuré.
- [ ] Icônes de toutes les tailles.
- [ ] Splash screen.
- [ ] Signature par code signing certificate.
- [ ] Tests sous Windows 10 et Windows 11.
- [ ] Tests sur x64 et ARM64.
- [ ] WebView2 Runtime installé/vérifié.
- [ ] Matériels promotionnels pour le Store.
- [ ] Politique de confidentialité.
- [ ] Compte Microsoft Partner Center.
