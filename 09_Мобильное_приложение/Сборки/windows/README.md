# Windows-сборка ЦП РСФСР

Инструкция сборки Windows-приложения (MSIX) для распространения через Microsoft Store и Enterprise.

---

## 1. Подходы к сборке Windows

Поддерживаются два подхода:

### A. PWA + MSIX (рекомендуется)
Самый быстрый путь: упаковка существующей PWA в MSIX-пакет через **PWA Builder** или прямую сборку через **Microsoft Edge WebView2**.

### B. .NET MAUI + WebView2
Полноценное нативное приложение Windows с интеграцией PWA через WebView2 control. Даёт больше возможностей (нативная биометрия Windows Hello, защищённое хранилище), но требует больше работы.

Ниже описаны оба подхода.

---

## 2. Подход A: PWA Builder

### Требования
- Windows 10/11.
- Edge или Chrome с поддержкой PWA.
- Аккаунт Microsoft Partner Center (для публикации).

### Установка PWA Builder CLI
```bash
npm install -g @pwabuilder/cli
```

### Генерация MSIX-пакета

1. Опубликуйте PWA на временный домен (можно использовать локальный HTTPS-сервер для теста):
```bash
# В корне ЦП РСФСР
npx http-server -S -p 8443    # требует self-signed сертификат
```

2. Сгенерируйте MSIX:
```bash
pwa-builder https://app.dp-rsfsr.ru \
            --package windows \
            --output ./windows-build
```

Результат: `windows-build/RU.RSFSR.App.msix`.

### Подпись MSIX

```bash
# Создать self-signed для тестов
makecert -r -h 0 -n "CN=RU.RSFSR.App" -eku 1.3.6.1.5.5.7.3.3 \
         -pe -sv rsfsr.pvk rsfsr.cer
pvk2pfx -pvk rsfsr.pvk -spc rsfsr.cer -pfx rsfsr.pfx -po PASSWORD

# Подписать
signtool sign /f rsfsr.pfx /p PASSWORD \
              /fd SHA256 /tr http://timestamp.digicert.com /td SHA256 \
              ./windows-build/RU.RSFSR.App.msix
```

Для production-сборки используется EV Code Signing Certificate (отечественные УЦ: SkyDNS, RU-CENTER).

---

## 3. Подход B: .NET MAUI + WebView2

### Требования
- Visual Studio 2022 с workload «Mobile development with .NET».
- .NET 8 SDK.
- Windows 10/11 SDK.

### Создание проекта

1. Visual Studio → New Project → .NET MAUI App.
2. Название: `RU.RSFSR.App`.
3. Локация: `Сборки/windows/`.
4. Framework: .NET 8.

### Структура

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
    MainPage.xaml          ← WebView2 с PWA
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
    <DisplayName>ЦП РСФСР</DisplayName>
    <PublisherDisplayName>А.-Х. А. Кагиров</PublisherDisplayName>
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
      <uap:VisualElements DisplayName="ЦП РСФСР"
                          Description="Российский Сервис Финансирования Социального Развития"
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

### Иконки

Требуемые размеры (Windows 11):
- `Square44x44Logo.png` — 44×44 (taskbar, jumplist)
- `Square71x71Logo.png` — 71×71 (small tile)
- `Square150x150Logo.png` — 150×150 (medium tile)
- `Wide310x150Logo.png` — 310×150 (wide tile)
- `Square310x310Logo.png` — 310×310 (large tile)
- `StoreLogo.png` — 50×50 (Store listing)
- `SplashScreen.png` — 620×300

Сгенерируйте из `Приложение/icons/icon-512.svg`.

### Сборка

```bash
# Из папки windows
msbuild App.sln /p:Configuration=Release /p:Platform=x64

# MSIX-bundle
msbuild App.sln /t:Publish /p:Configuration=Release /p:Platform=x64 \
       /p:AppxBundlePlatforms="x64|arm64" \
       /p:AppxBundle=Always \
       /p:UapAppxPackageBuildMode=StoreUpload
```

Результат: `windows/AppPackages/App_1.0.0.0_x64_arm64_bundle.msixbundle`.

## 4. Публикация в Microsoft Store

1. Microsoft Partner Center: https://partner.microsoft.com
2. Создайте Microsoft Store App.
3. Зарезервируйте имя: «ЦП РСФСР».
4. Заполните метаданные:
   - Описание (4 языка).
   - Скриншоты (для разных размеров).
   - Иконка 512×512.
   - Возрастная категория.
   - Категория: Finance.
5. Загрузите MSIX-bundle.
6. Отправьте на сертификацию (срок: 24–48 часов).

## 5. Распространение вне Store

Для корпоративного распространения:
- **Microsoft Intune** — MDM.
- **PowerShell-установка**: `Add-AppxPackage -Path App.msixbundle`.
- **Web-installer**: AppInstaller-файл на хосте.

---

## 6. Чек-лист готовности к публикации

- [ ] Package.appxmanifest настроен.
- [ ] Иконки всех размеров.
- [ ] Splash screen.
- [ ] Подпись code signing certificate.
- [ ] Тестирование на Windows 10 и Windows 11.
- [ ] Тестирование на x64 и ARM64.
- [ ] WebView2 Runtime установлен/проверка.
- [ ] Промо-материалы для Store.
- [ ] Политика конфиденциальности.
- [ ] Microsoft Partner Center аккаунт.
