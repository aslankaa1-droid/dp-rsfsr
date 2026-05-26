# BUILD_PIPELINE — пересборка HTML-зеркал из MD

## Назначение

Проект содержит пары `*.md` (исходник) ↔ `*.html` (отображение для клиента). Чтобы избежать systematic-дефекта «MD исправлен, HTML отстал», вся пересборка HTML делается через единый pandoc-pipeline.

## Структура

```
ЦП РСФСР Исправленный/
├── _shared/
│   ├── brand.css                # глобальные стили
│   ├── doc-template.html        # pandoc-шаблон HTML
│   ├── i18n.js                  # переключение языков
│   ├── app.js                   # топ-бар + тема
│   └── finmodel.js              # IFRS-grade финкалькулятор
├── _tools/
│   ├── build_html.sh            # bash pipeline для пересборки
│   └── ci_invariants.ps1        # инвариант-чек перед коммитом
└── BUILD_PIPELINE.md            # этот файл
```

## Установка

Требования:
- Pandoc 3.0+ (Windows: `winget install pandoc` или `choco install pandoc`)
- Bash (Git Bash на Windows подходит)
- Python 3.10+ (для mermaid post-processing; путь `/c/Windows/py.exe`)
- PowerShell 5.1+ (для CI-инспектора)

Проверка:
```bash
pandoc --version              # должен быть ≥ 3.0
/c/Windows/py.exe -3 --version  # должен быть ≥ 3.10
```

## Использование

### Пересборка всех 11 файлов

```bash
cd "E:/Проекты Аслана/Приложение_РСФСР/ЦП РСФСР Исправленный"
bash _tools/build_html.sh all
```

### Пересборка одного файла

```bash
bash _tools/build_html.sh finmodel        # Финансовая модель
bash _tools/build_html.sh assumptions     # Допущения к финмодели
bash _tools/build_html.sh valuation       # Международная оценка
bash _tools/build_html.sh cbreport        # Доклад для ЦБ
bash _tools/build_html.sh concept         # Концепт
bash _tools/build_html.sh bp              # Бизнес-план
bash _tools/build_html.sh diagrams        # Архитектурные диаграммы (mermaid)
bash _tools/build_html.sh spec            # Спецификация мобильного приложения
bash _tools/build_html.sh dd              # DD отчёт
bash _tools/build_html.sh legal           # Юридический фундамент
bash _tools/build_html.sh brand           # Бренд-бук
```

### CI-инспектор (перед снапшотом)

```powershell
powershell -ExecutionPolicy Bypass -File _tools\ci_invariants.ps1
```

Проверяет:
- SoT-инварианты во всех MD/HTML: NPV 51,2 / IRR 62% / EM 12× / WACC 30% / Payback 2,8
- Отсутствие sed-residue: «X (вместо X)», «вместо самого себя»
- Отсутствие следов ИИ-маркеров: `v1.0`, `draft`, `AI-generated`, `TODO`, `FIXME`, `Claude`, `GPT`
- Согласованность hreflang в sitemap.xml
- Единые иконки SVG (нет emoji `☀ ☾` в navigation/sidebar)

## Workflow при правках

1. Правлю `*.md` (исходник истины).
2. Запускаю `bash _tools/build_html.sh <module>` — обновляет HTML-зеркало.
3. Запускаю CI-инспектор: `powershell ... _tools\ci_invariants.ps1`.
4. Если invariants OK — делаю снапшот в `_снапшоты/`.

## Pandoc-команда (под капотом)

```bash
pandoc INPUT.md \
  --from markdown \
  --to html5 \
  --template _shared/doc-template.html \
  --variable=title:"TITLE" \
  --variable=category:"CATEGORY" \
  --variable=shared-prefix:"PREFIX" \
  --output OUTPUT.html
```

Где `PREFIX`:
- `..` для файлов на одну вложенность от корня (например, `03_Финансовая_модель/`)
- `../..` для файлов на две вложенности (например, `07_Презентации/Для_госструктур_ЦБ/`)

## Mermaid

Файл `01_Техническая_документация/08_Архитектурные_диаграммы.md` содержит fenced-блоки ` ```mermaid`. Pandoc отрендерит их как `<pre class="mermaid"><code>...</code></pre>`; post-process удаляет внутренний `<code>` и декодирует HTML-entities, после чего подключается mermaid.js v10+ через CDN.

## Шаблоны (`_shared/doc-template.html`)

Pandoc-template содержит:
- `$title$` — заголовок документа
- `$category$` — eyebrow-категория над заголовком
- `$shared-prefix$` — относительный путь до корня (для resolving CSS/JS)
- `$body$` — место для контента из MD

Все HTML-зеркала наследуют:
- Топ-бар с language switcher (RU/EN/FR/AR), theme switcher (SVG-иконки), font size controls
- Sticky breadcrumb «К хабу документов» / «Большая презентация»
- Scroll progress bar
- Theme persistence via localStorage

## Что НЕ пересобирается через pipeline

- `07_Презентации/Большая_презентация/index.html` — кастомный slide-deck, не из MD
- `07_Презентации/Малая_презентация/index.html` — кастомный slide-deck
- `07_Презентации/Для_партнёров_инвесторов/Pitch_deck.html` — slide-deck в каноне a16z
- `09_Мобильное_приложение/Приложение/index.html` — PWA-приложение
- `09_Мобильное_приложение/Прототип/index.html` — Figma-style прототип
- `08_Веб-сайт/HTML_основной/index.html` — landing page
- `index.html` (корневой)

Эти файлы редактируются вручную; при правках по SoT v3 нужно сверять numbers вручную против `_Мастер/Единые_показатели_v2.md`.

## SoT v3 (Single Source of Truth)

Все числовые показатели проекта берутся из `_Мастер/Единые_показатели_v2.md`. При изменении SoT — обновить и пересобрать всё через `build_html.sh all`.

Ключевые инварианты SoT v3 (24.05.2026):
- NPV полная = 51,2 млрд ₽
- IRR project-level = 62%
- Payback = 2,8 года
- WACC = 30% (build-up: RF 15,5 + ERP×β 10,35 + stage 1,5 + liq 2,5)
- Equity Multiple = 12× (защитимый верхний ориентир)
- FX = 89,0 ₽/$
- Pre-money Base = $80M; Post-money = $95M; Доля инвестора = 15,8%

---

**Дата:** 24.05.2026 (Горизонт III.F: создание BUILD_PIPELINE)
