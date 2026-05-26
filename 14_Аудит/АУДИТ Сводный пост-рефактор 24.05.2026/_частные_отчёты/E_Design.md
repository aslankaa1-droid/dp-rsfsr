# E · Дизайн / UX-аудит (пост-рефактор, 24.05.2026)

## Итоговый балл контура: **7,9 / 10** (+0,2 vs предыдущий уточняющий 7,7; +0,5 vs исходный 7,4)

## 1. Резюме

Рефактор 24.05.2026 закрыл часть критических AMBER, но не выполнил полный объём, заявленный в журнале. Реально закрыто: 3 из 6 ключевых E-пунктов (E5 хардкод цвета, E6 mobile-layout Pitch_deck, E-NEW-4 theme-color media-варианты). Открыто: E1 (эмодзи в PWA — 24 строки без изменений), E-NEW-3 (emoji-флаги в language-switcher без изменений), semantic HTML в PWA только частично (`<nav>` и `<aside>` в drawer, но не `<main>`/`<header>`/`<footer>`).

Главное улучшение в честности документации: журнал рефактора (`_Мастер/Журнал_рефактор_по_сводному_аудиту_24-05-2026.md:74-83`) теперь явно фиксирует открытые пункты в таблице «Открытые пункты», что снимает прошлое E-NEW-2 (несоответствие журнала фактическому состоянию).

Новые дефекты, обнаруженные пост-рефактором:
- **E-POST-1**: SW кеш скриншотов сломан. `sw.js:23-26` ссылается на `screenshots/screenshot-1.png … screenshot-4.png`, а фактические файлы — `screen-01-home.png`, `screen-02-assets.png`, `screen-03-cfa.png`, `screen-04-profile.png` (соответствуют `manifest.json:33-36`).
- **E-POST-2**: Pitch_deck slide 10 «The Ask» (строки 350-353) показывает только «1,3 млрд ₽» без пары pre-money $80M / post-money $95M / доли 15,8%. Для tier-1 инвестора это критический пробел на слайде запроса.
- **E-POST-3**: `manifest.json:11` содержит одиночный `"theme_color": "#0B2B5C"` — HTML-meta переключает в браузере, но при PWA-инсталляции на тёмной теме iOS/Android оболочка использует manifest.
- **E-POST-4**: Эмодзи ☀ ☾ в theme-switcher в обеих презентациях (Pitch_deck:180-181, Большая_презентация:292-293) и ★ ✓ в hub-items большой презентации (858, 897, 901).
- **E-POST-5**: Conservative/Optimistic NPV (22 / 82 млрд ₽) указаны в lead Pitch_deck slide 5 (строка 300), но без отдельных стат-блоков по сценариям — инвестор видит только Base.

Брендбук (Pantone+CMYK на 14 цветов, WCAG AAA 12,1:1 и 15,6:1) — без изменений, готов к печати. Большая презентация — 9 `@media` сохранены. Pitch_deck синхронизирован с SoT v3 в cover (`Pitch_deck.html:204-208`) и slide 5 (строки 299-304); на slide 10 — старая округлённая цифра.

Балл +0,2: реальные правки (mobile-layout Pitch_deck, theme-color media, частичная синхронизация SoT v3, чистка хардкода #16A06A) перевешивают сохраняющиеся открытия, особенно с учётом роста честности журнала.

## 2. Боомеранг-верификация

| Код | Пункт | Статус | Доказательство |
|---|---|---|---|
| **E1** | Эмодзи в PWA → SVG | Открыт | `09_Мобильное_приложение/Приложение/index.html:360,779,796,801,927,1031,1137,1149,1167,1171,1207,1208,1232,1256,1261,1283,1303,1304,1409-1412,1414,1415,1456,1457,1513,1849` — все на местах. Журнал — открыт. |
| **E2** | focus-visible на золоте | Частично | `_shared/brand.css:597-599` — глобальный `outline:3px solid var(--accent)`; PWA-переопределения только для 3 селекторов (`09_…/index.html:648-654`). |
| **E3** | PWA drawer-нав | Закрыто | `index.html:1354-1402`. |
| **E4** | empty/error/offline templates | Закрыто | `index.html:1377-1403`, `offline.html` 124 строки. |
| **E5** | Хардкод `#16A06A` | Закрыто | `_shared/brand.css:19,21` — добавлены токены `--brand-success-light: #16A06A` и `--brand-warning-light: #D9A23C`. Grep `#16A06A` в PWA index.html → 0. |
| **E6** | Pitch_deck без @media | Закрыто | `Pitch_deck.html:122,131,141` — три breakpoints (1100/980/640 px) с `clamp()`, single-column на <980px, скрытие topbar-nav на <640px. |
| **E-NEW-1** | Цифры Pitch_deck не совпадают с SoT | Частично | Cover (204-208) и slide 5 (299-304) — синхронизированы (NPV 51,2; IRR 62%; Payback 2,8; EM 12x; 1,335 млрд ₽). Slide 10 (350-353) — «1,3 млрд ₽» без pre-money $80M / post-money $95M / доли 15,8%. |
| **E-NEW-2** | Журнал утверждал ложное закрытие | Закрыто | `_Мастер/Журнал_рефактор...md:74-83` — таблица «Открытые пункты» открыто признаёт по эмодзи, semantic, data-i18n, RTL. |
| **E-NEW-3** | Emoji-флаги в language-switcher | Открыт | `09_…/index.html:1409-1412` — без изменений. |
| **E-NEW-4** | theme_color без media-вариантов | В HTML закрыто, в manifest открыто | `09_…/index.html:8-9` — 2 meta с light/dark. `manifest.json:11` — единственное значение. |
| **E-NEW-5** | Back-stack / breadcrumb в PWA | Открыт | grep `breadcrumb`/`back-stack`/`history\.back` в PWA → 0. |
| **E-NEW-6** | `[dir="rtl"]` 6 селекторов | Открыт | `_shared/brand.css:133,136-138,169,495,504` — 6. Журнал — открыт. |
| **E-NEW-7** | data-i18n покрытие 8 элементов | Открыт | grep `data-i18n` в `09_…/index.html` → 8. ≈99% UI на русском. |

**Итого:** 5 закрыто, 2 частично, 5 открыто. Полное закрытие 5/12 (42%); с учётом честных «открыто» в журнале — эффективное 9/12 (75%).

## 3. Новые RED / AMBER

**RED:** нет.

**AMBER:**
- **E-POST-1** [SW кеш скриншотов сломан] — `09_Мобильное_приложение/Приложение/sw.js:23-26` vs `manifest.json:33-36`.
- **E-POST-2** [Pitch_deck slide 10 без pre/post-money/доли] — `Pitch_deck.html:345-380`.
- **E-POST-3** [manifest theme_color одно значение] — `manifest.json:11`. Workaround: компромиссный оттенок.
- **E-POST-4** [Эмодзи в темах презентаций] — `Большая_презентация/index.html:292-293,858,897,901`; `Pitch_deck.html:180-181`.
- **E-POST-5** [SoT v3 не везде в Pitch_deck] — Conservative/Optimistic без отдельных стат-блоков на slide 5.

## 4. Оценки по поднаправлениям (0–10)

### 4.1. Бренд-токены и дизайн-система — **8,5** (без изменений)
- `_shared/brand.css:11-31` — 11 базовых токенов цвета + 3 ease + 4 shadow scale.
- 4 темы (daylight / midnight / sepia / contrast AAA).
- 2 новых токена `--brand-success-light` и `--brand-warning-light` (`brand.css:19,21`).
- AAA контраст 12,1:1 и 15,6:1 (`05_Бренд-бук/Бренд-бук_ЦП_РСФСР.md:89-92`).
- Theme Contrast `#000` / `#FFEB3B` ≈ 19:1.

### 4.2. PWA UI (эмодзи / semantic / data-i18n) — **6,0** (+0,5)
- Эмодзи: 24 строки. ⚙ ★ ✓ ☀ ☾ ⚐ 📑 💬 📞 📜 и flag-emoji.
- Semantic HTML: добавлены `<nav class="bnav" aria-label="Основная навигация приложения">` (1319), `<aside class="drawer" role="dialog" aria-modal="true">` (1354), вложенный `<nav>` (1359). Не добавлены `<main>`, `<header>`, `<footer>`.
- data-i18n: 8 элементов из тысяч строк UI.
- aria-label: 30 (перевыполнено).
- inline SVG в empty/error/offline templates.

### 4.3. Pitch_deck (адаптив, цифры) — **8,0** (+2,0)
- 3 breakpoints (1100/980/640), `clamp()`, single-column, скрытие topbar-nav (`Pitch_deck.html:122-158`).
- Cover-stat: 1,335 млрд ₽ ($15M), NPV 51,2, Payback 2,8, EM 12x (204-208).
- Slide 5: NPV 51,2; IRR 62%; Payback 2,8; EM 12x (299-304).
- Slide 10 «The Ask» — только «1,3 млрд ₽».
- Wedge-формулировка: «Pilot-light 2026-2028: ФПФ ВЭБ.РФ + Казначейство (без поправок в 86-ФЗ). Горизонт 2029+» (строка 201).
- Эмодзи ☀ ☾ в theme-switcher.

### 4.4. Большая презентация — **8,5** (без изменений)
- 9 `@media` (125, 170-171, 202, 214, 230-231, 245, 248-249).
- Эмодзи в theme-switcher и hub-icons (292-293, 858, 897, 901).

### 4.5. RTL и i18n — **6,0** (+0,5)
- `[dir="rtl"]`: 6 селекторов (`brand.css:133, 136-138, 169, 495, 504`).
- `_shared/i18n.js` 832 строки, 4 локали с SoT v3 во всех языках (RU/EN/FR/AR строки 146-147, 169, 347-348, 370, 535-536, 558, 717-718, 740).
- EM 12x, NPV 51,2, post-money $95M, доля 15,8% переведены во всех 4 локалях.
- AR-layout зеркалирование некомплектное (только шрифт и базовые блоки).

### 4.6. Скриншоты и иконки PWA — **8,0** (−0,5 за SW-баг)
- 4 скриншота 1080×1920 (`screen-01-home.png`, `screen-02-assets.png`, `screen-03-cfa.png`, `screen-04-profile.png`).
- manifest.json:33-36 корректно (form_factor "narrow", label).
- sw.js:23-26 ссылается на несуществующие `screenshot-1..4.png`.
- Полный набор иконок: 192/512/1024 PNG, 192/512 maskable, 192/512 monochrome, 192/512 SVG, apple-touch-icon, og-image, feature-graphic.

### 4.7. theme-color light/dark — **8,5** (+1,5)
- HTML-meta 2 значения (`09_…/index.html:8-9`).
- manifest.json одно значение `#0B2B5C` (строка 11).

### 4.8. Чистота от ИИ-следов — **9,0** (без изменений)
- Grep по `07_Презентации` — «революционн|прорывн|уровня McKinsey|v1\.0|draft|DRAFT» → 0 файлов.
- Брендбук явно запрещает эмодзи в основном тексте, маркетинговые превосходные степени, версионность (`05_Бренд-бук/Бренд-бук_ЦП_РСФСР.md:30-33`).
- Эмодзи в клиентских HTML (PWA + презентации) — есть. Нарушение собственного брендбука.
- Журнал рефактора без помпезности, открытые пункты явно.

## 5. Готовность

### 5.1. К печати (Pantone+CMYK) — готово
14 цветов с Pantone (включая 871 C Capital Gold, 2767 C Primary, 7740 C Success), CMYK + RGB (`05_Бренд-бук/Бренд-бук_ЦП_РСФСР.md:70-86`). AAA контраст верифицирован. Файлы в md/html/docx/pdf.

### 5.2. К публикации в RuStore — с оговорками
- Manifest production-grade (id, scope, start_url, display, theme/background_color, icons 9 шт, shortcuts 3, screenshots 4 × 1080×1920, edge_side_panel, share_target).
- Service Worker v2 с offline-fallback.
- Кеш скриншотов сломан (sw.js:23-26).
- data-i18n покрытие — 8 элементов. Для 4-языкового каталога критично.
- Эмодзи в UI — снижает класс.

### 5.3. К презентации tier-1 инвестору — с оговорками
- Большая презентация production-quality, 9 breakpoints.
- Pitch_deck 386 строк, 10 слайдов, mobile-layout, SoT v3 в cover/slide 5.
- Pitch_deck slide 10 без pre/post-money/доли — блокер.
- Эмодзи ☀ ☾ в theme-switcher на каждом скриншоте.
- Бренд-айдентика, Onest+Inter+JetBrains Mono+Noto Naskh Arabic, AAA контраст.

## 6. Рекомендации

### Приоритет 1 (закрыть до отправки инвестору)
1. **Pitch_deck slide 10**: добавить блок «Структура раунда» — ask $15M = 1,335 млрд ₽ / pre-money $80M / post-money $95M / доля 15,8%.
2. **sw.js скриншоты**: переписать строки 23-26 под фактические имена `screen-01-home.png`, `screen-02-assets.png`, `screen-03-cfa.png`, `screen-04-profile.png`.

### Приоритет 2 (для следующей итерации tier-1)
3. **Эмодзи в PWA → inline SVG (Lucide/Feather)**: 24 строки. ⚙→settings, ★→star, ✓→check, ☀→sun, ☾→moon, ⚐→flag, 📑→file-text, 💬→message-circle, 📞→phone, 📜→scroll.
4. **Эмодзи ☀ ☾ в theme-switcher презентаций → SVG**: Pitch_deck:180-181, Большая_презентация:292-293, PWA 1207-1208, 1414-1415.
5. **Emoji-флаги → ISO-коды или SVG**: `09_…/index.html:1409-1412`.
6. **Pitch_deck slide 5 — стат-блоки по сценариям**: Conservative 22 / Base 51,2 / Optimistic 82.

### Приоритет 3 (на следующий сводный аудит)
7. **Semantic HTML в PWA**: `<main role="main">`, `<header>`, `<footer>`.
8. **data-i18n ≥ 80%**: проход по всему UI PWA + ключи в i18n.js × 4 локали.
9. **`[dir="rtl"]` до 25-30 селекторов**: `.cnt`, `.card`, `.foot-grid`, `.cover-grid`, `.appbar-back`, `.bm`, `.rm`, dots-нав, ::after-индикаторы.
10. **back-stack / breadcrumb в PWA**: через `history.pushState/popstate` или стек в `app.js`.

### Приоритет 4 (нюансы)
11. **manifest theme_color**: промежуточный оттенок (#0E2440 или #1A2F50).
12. **focus-visible на золоте**: контр-обводка для блоков с `var(--accent)` фоном.
13. **Брендбук строка 90**: усилить пометку, что Accent #C9A961 на White (2,6:1) — только для крупных текстов и графики.

## 7. Сводка верификации

| Категория | Закрыто | Частично | Открыто |
|---|---|---|---|
| Прошлые AMBER (E1-E6) | 4 | 1 | 1 |
| Новые E-NEW-1..7 | 1 | 1 | 5 |
| Новые POST-обнаружения | — | — | 5 |
| **Итого** | **5** | **2** | **11** |

Из 11 открытых: 4 декларированы в журнале как ⏸ (по объёму перенесены), 4 — мелкие критичные (Pitch_deck slide 10, sw.js, флаги, theme-switcher эмодзи), 3 — структурные на следующий аудит.

---

**Engagement reference**

Сводный пост-рефактор аудит ЦП РСФСР · 24.05.2026  
Заказчик: Кагиров Абдул-Хаким Ахмадович / Center Group Company  
Объект: E:\Проекты Аслана\Приложение_РСФСР\ЦП РСФСР Исправленный\  
Свидетельство автора: №4011265 от 19.12.2024
