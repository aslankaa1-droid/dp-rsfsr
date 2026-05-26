# E · Дизайн / UX-аудит (уточняющий, 24.05.2026)

## Итоговый балл контура: **7,7 / 10** (+0,3 vs прошлый 7,4)

## Резюме

Структурно дизайн-система выдержанная: 4 темы (включая WCAG AAA Contrast), Pantone+CMYK на все цвета бренд-бука, production-grade PWA-манифест с 4 screenshots 1080×1920, корректный i18n.js с автопереключением RTL, добротный offline.html. Однако журнал рефактора 24.05.2026 преувеличивает закрытие: **эмодзи остались** (24 строки в PWA), semantic HTML не добавлен, RTL покрыт втрое уже обещанного, Pitch_deck не адаптирован под мобильные и не синхронизирован с финмоделью. Для ЦБ-аудитории и инвесторов это критично.

## Сильные стороны (после рефактора)

1. Дизайн-система выдержанная: 4 темы (daylight/midnight/sepia/contrast AAA), полные токены, shadow scale, ease-функции.
2. PWA-манифест production-grade: 9 иконок, 4 screenshots 1080×1920, shortcuts, edge_side_panel, share_target.
3. Templates empty/error/offline с inline SVG + ARIA.
4. `offline.html` отдельный, с inline SVG и брендовым градиентом.
5. `i18n.js` 832 строки словарей RU/EN/FR/AR + автопереключение `dir="rtl"`.
6. AAA-контраст для базовых пар (12,1:1 и 15,6:1).
7. Бренд-бук production-grade: 14 цветов с HEX/RGB/CMYK/Pantone (включая 871 C).
8. OG-теги и hreflang полные.
9. Большая презентация — 9 `@media` (1100/980/640/600/540 px).
10. `app.js` модульный (Theme/FontScale/Reveal/Progress/NavActive/Burger/Modal/Smooth), persisted state.

## Закрытие прошлых AMBER: 3 ✅ / 1 ⚠️ / 2 ❌

| Код | Что было | Что сделано | Статус | Доказательство |
|---|---|---|---|---|
| E1 | Эмодзи + Unicode вперемешку | Inline SVG только в empty/error/offline; в PWA-меню, темах, уведомлениях, language-switcher эмодзи **остались** | **❌ НЕ закрыт** | grep emoji в `09_…/Приложение/index.html` → 24 строки (включая 🇷🇺🇬🇧🇫🇷🇸🇦 в language-switcher) |
| E2 | focus-visible не учитывает золото на золоте | Глобальный `outline:3px solid var(--accent); outline-offset:2px`; «белая обводка» только на 3 PWA-селекторах | ⚠️ частично | `_shared/brand.css:594-598`, `09_…/index.html:648-654` |
| E3 | PWA-нав 4 пункта при 23 экранах | Drawer-навигация | ✅ | 40 упоминаний `drawer` в PWA |
| E4 | empty/error/offline не нарисованы | 3 template + inline SVG + ARIA + `offline.html` + SW v2 | ✅ | `09_…/index.html:1377-1403`, `offline.html` 124 строки |
| E5 | Захардкоженный `#16A06A` | Остался | **❌ НЕ закрыт** | `09_…/Приложение/index.html:1636` |
| E6 | Pitch deck без mobile-layout | 0 `@media` в Pitch_deck | **❌ НЕ закрыт** | `07_…/Pitch_deck.html` 346 строк, grep `@media` → 0 |

## PWA UX (23 экрана) — состояние

- `_shared/i18n.js` и `app.js` подключены (defer).
- `data-i18n` в PWA — **8 элементов** (≈99% UI на русском).
- `theme_color` в manifest зафиксирован `#0B2B5C` — на iOS темах не подстроится.
- Breadcrumb / back-stack — отсутствует.
- aria-label — 30 (журнал обещал 19, перевыполнено).
- Semantic HTML — **отсутствует целиком**: `<main>`, `<header>`, `<nav role="navigation">` не введены в PWA.
- Network-status toast — есть (строки 1814, 1831, 1968).
- Screenshots 1080×1920 — 4 штуки.
- PNG-иконки — полный набор.

## Многоязычность и RTL

- `[dir="rtl"]` в `_shared/brand.css` — **6 селекторов** (131, 134-136, 167, 493, 502) вместо обещанных ~30.
- Не покрыто RTL: `.cnt`, `.card`, `.foot-grid`, `.cover-grid`, `.appbar-back`-стрелка, `.bm`, `.rm`, dots-нав, ::after-индикаторы.
- `data-i18n` в PWA — 8 элементов. AR-пользователь получит зеркалирование layout без перевода контента.

## a11y / WCAG

- Контраст AAA: 12,1:1 (Primary/White), 15,6:1 (Neutral 900/White).
- Тема Contrast: `#000` / `#FFEB3B` ≈ 19:1.
- Skip-link, focus-visible, prefers-reduced-motion — есть.
- FontScale (normal/large/xlarge) — есть.
- Semantic HTML в PWA — нет.

## Брендбук и презентации

- Бренд-бук в 4 форматах (md/html/docx/pdf), Pantone+CMYK на 14 цветов, Дизайн-токены.json, Логотип-концепция.svg (2 концепции).
- Большая презентация — 9 `@media`.
- Малая презентация — `index.html`.
- Pitch_deck.html — 0 `@media`.
- Доклад для ЦБ — 4 формата.

## Новые дефекты после рефактора: 7 AMBER

- **E-NEW-1**: цифры Pitch_deck (NPV 170 млрд ₽, IRR 228%, ask 1,3 млрд ₽) не соответствуют новому SoT `_Мастер/Единые_показатели_v2.md` (pre-money $80M / Equity Multiple 48x / NPV 96,8 млрд ₽).
- **E-NEW-2**: журнал рефактора содержит неверные утверждения о закрытии E1 и `<nav role="navigation">` (semantic HTML в PWA вообще отсутствует).
- **E-NEW-3**: emoji-флаги 🇷🇺🇬🇧🇫🇷🇸🇦 в language-switcher.
- **E-NEW-4**: `theme_color` в manifest зафиксирован одним значением — на тёмных темах iOS статус-бар не подстроится.
- **E-NEW-5**: в PWA нет back-stack/breadcrumb.
- **E-NEW-6**: `[dir="rtl"]` в `brand.css` — 6 селекторов вместо обещанных журналом ~30.
- **E-NEW-7**: `data-i18n` в PWA — 8 элементов (≈99% контента приложения захардкожено на русском).

## Оценки (0–10)

- Бренд-система (токены, темы) — **8,5**
- Типографика — **8,5**
- Цветовая дисциплина — **7,5**
- Иерархия — **8,0**
- Доступность (WCAG, ARIA, semantic) — **7,0**
- RTL-зрелость — **5,5**
- Готовность к ЦБ-аудитории — **8,0**
- Готовность к инвестор-аудитории — **7,0**

**ИТОГО (взвешенный балл контура): 7,7 / 10**

## Готовность к печати и публикации

- Печать (Pantone 871 C, CMYK) — ✅
- OG + hreflang + theme-color — ✅
- PWA в RuStore: manifest ✅, описание ✅, контент локализован на 8 элементов — ⚠️
- Pitch_deck на iPad/iPhone — ❌ (no mobile-layout)

## Рекомендации (по приоритету)

1. Удалить emoji из PWA (≥24 мест), заменить на inline SVG.
2. Добавить `<header>`, `<main>`, `<nav role="navigation">`, `<footer>` в PWA.
3. Убрать `#16A06A`, ввести токен `--brand-success-light`.
4. Добавить `@media` в Pitch_deck.html для <1100px.
5. Синхронизировать цифры Pitch_deck с `_Мастер/Единые_показатели_v2.md`.
6. Расширить `[dir="rtl"]` в `brand.css` до 25-30 селекторов.
7. Перенести строки PWA в i18n.js через `data-i18n` (≥80% покрытие).
8. Второй `<meta name="theme-color" media="(prefers-color-scheme: dark)">`.
9. Заменить emoji-флаги на ISO-коды текстом или SVG.
10. Реализовать back-stack в PWA.
11. Откорректировать журнал рефактора (E1 и E3-semantic — открыты).
