/* ============================================================
   ЦП РСФСР — i18n словари (RU / EN / FR / AR)
   Использование:
     - элементы с атрибутом data-i18n="key.path" получают перевод
     - элементы с атрибутом data-i18n-attr="placeholder|value|alt" — перевод этого атрибута
     - window.I18N.set('en') переключает язык; AR автоматически включает dir=rtl
   ============================================================ */

(function(global) {
  const DICT = {
    ru: {
      brand: { name: "ЦП РСФСР", tagline: "Российский Сервис Финансирования Социального Развития" },
      nav: {
        home: "Главная", about: "О платформе", how: "Как работает", potential: "Потенциал",
        effect: "Эффект", legal: "Правовой контур", tech: "Технология", roadmap: "Дорожная карта",
        mobileapp: "Приложение",
        finmodel: "Финмодель", valuation: "Оценка", hub: "Документы", contacts: "Контакты"
      },
      mobile: {
        eyebrow: "Готовое мобильное приложение",
        title: "Полнофункциональное приложение в формате PWA",
        lead: "23 пользовательских экрана, реализующих полный жизненный цикл из 19 шагов авторской концепции. Установка как нативное приложение на iOS, Android и Windows. Конструкторская документация по ГОСТ 19. Готовый комплект для подачи в RuStore.",
        screens: "экрана", platforms: "платформы", docs: "док.", langs: "языка",
        statScreens: "Полный жизненный цикл", statPlatforms: "iOS · Android · Windows · PWA",
        statKD: "КД по ГОСТ 19", statLangs: "RU · EN · FR · AR (RTL)",
        appTitle: "Приложение PWA",
        appDesc: "Полнофункциональный клиент с оффлайн-режимом, биометрией, push-уведомлениями. Подключение к ЕСИА, ЕБС, ЕГРН, Банку России.",
        openApp: "Открыть приложение",
        kdTitle: "Конструкторская документация",
        kdDesc: "12 документов по ГОСТ 19: техническое задание, описание программы, руководства, программа и методика испытаний, требования безопасности, спецификация.",
        openKD: "Открыть КД",
        publishTitle: "Готов к публикации",
        publishDesc: "Capacitor-сборки для Android (AAB), iOS (IPA), Windows (MSIX). Описание, политики, промо-материалы, чек-лист публикации в RuStore.",
        openPublish: "Чек-лист публикации"
      },
      ui: {
        light: "Светлая", dark: "Тёмная", sepia: "Мягкая", contrast: "Контраст",
        fontPlus: "Шрифт +", fontMinus: "Шрифт −", fontReset: "Сброс",
        openInNew: "Открыть в новом окне", openModal: "Открыть в модальном окне",
        close: "Закрыть", download: "Скачать",
        language: "Язык", theme: "Тема", a11y: "Доступность",
        viewSource: "Открыть источник", more: "Подробнее",
        send: "Отправить", reset: "Сброс", calculating: "Идёт расчёт..."
      },
      hero: {
        eyebrow: "Цифровая платформа · ЦФА · Залоговая инфраструктура",
        title: "Внебюджетное финансирование нацпроектов",
        subtitle: "Российский Сервис Финансирования Социального Развития",
        lead: "Операторская платформа выпуска ЦФА под залог имущества граждан и организаций. Целевое фондирование национальных и инфраструктурных проектов в pilot-light режиме 2026–2028 — через Фабрику проектного финансирования ВЭБ.РФ и Федеральное казначейство; Банк России — надзорный регулятор по ст. 4 86-ФЗ.",
        ctaPrimary: "Как работает",
        ctaSecondary: "Документы проекта"
      },
      stats: {
        emkost: "Залоговая ёмкость",
        total: "Стоимость недвижимости РФ",
        term: "Срок запуска",
        gost: "Защита по ГОСТ",
        npv: "NPV @ WACC 30%",
        payback: "Окупаемость",
        startCap: "Стартовая потребность",
        rev10: "Выручка год 10",
        irr: "IRR",
        years: "лет", months: "мес.", trn: "трлн ₽", bln: "млрд ₽", mln: "млн ₽"
      },
      problem: {
        eyebrow: "Проблематика",
        title: "Богатая страна — дефицит инвестиционной денежной массы",
        lead: "Огромный запас национального богатства не вовлечён в финансовый оборот, а национальные проекты конкурируют за ограниченный бюджет и дорогое заёмное фондирование.",
        c1Title: "Бюджет",
        c1: "Расходы федерального бюджета ограничены бюджетным правилом и социальным блоком.",
        c2Title: "Ставка",
        c2: "Высокая ключевая ставка делает заёмное фондирование инфраструктуры нерентабельным.",
        c3Title: "Капитал",
        c3: "Доступ к международным рынкам капитала ограничен.",
        c4Title: "Активы",
        c4: "«Спящие» частные активы — 507 трлн ₽ без оборота."
      },
      solution: {
        eyebrow: "Решение",
        title: "Платформа-оператор выпуска ЦФА под залог имущества",
        lead: "Под пул залоговых ЦФА в pilot-light режиме 2026–2028 организуется целевое фондирование через Фабрику проектного финансирования ВЭБ.РФ и Федеральное казначейство — на специальный эскроу-счёт. Средства идут на финансирование нацпроектов. На горизонте 2029+ возможно расширение мандата (модель целевой обеспеченной эмиссии Банка России) после положительного track-record и пакета НПА.",
        b1: "Залог", b1d: "Имущество остаётся у собственника; обременение временное. Оценка автоматизирована.",
        b2: "Выпуск ЦФА", b2d: "Технологическое партнёрство с лицензированным оператором ИС ЦФА по 779-П (статья 5 №259-ФЗ).",
        b3: "Целевое фондирование", b3d: "Pilot-light: ФПФ ВЭБ.РФ + Казначейство. Целевой эскроу-счёт. Горизонт 2029+: расширение мандата при поддержке регулятора.",
        b4: "Мена ЦФА", b4d: "Новый объект становится новым ЦФА в портфеле оператора; собственник получает доход."
      },
      potential: {
        eyebrow: "Потенциал",
        title: "Залоговая ёмкость — 25,5 трлн ₽",
        lead: "Консервативный расчёт авторской концепции: 10% активов × 50% стоимости из совокупной стоимости недвижимости РФ 507 трлн ₽. Даже 5% проникновения = 1,3 трлн ₽ внебюджетного финансирования.",
        sJil: "Жилой фонд РФ",
        sCom: "Коммерческая недвижимость",
        sZem: "Земельные участки",
        sAll: "Всего недвижимости",
        chartTitle: "Структура залоговой массы (трлн ₽)"
      },
      flow: {
        eyebrow: "Жизненный цикл",
        title: "Шесть ключевых этапов из 19 шагов",
        s1: "Регистрация", s1d: "ЕСИА / ЕБС",
        s2: "Оценка",       s2d: "135-ФЗ, страхование",
        s3: "Выпуск ЦФА",   s3d: "259-ФЗ, смарт-контракт",
        s4: "Фондирование", s4d: "ФПФ ВЭБ.РФ + Казначейство",
        s5: "Реализация",   s5d: "Казначейство → нацпроект",
        s6: "Мена ЦФА",      s6d: "Новый объект, доход"
      },
      effect: {
        eyebrow: "Эффект",
        title: "Сбалансированная модель для всех стейкхолдеров",
        gov: "Государство",
        gov1: "Внебюджетное финансирование нацпроектов",
        gov2: "Сокращение очерёдности финансирования",
        gov3: "Мультипликатор инвестиций 1,8–2,3",
        gov4: "Развитие цифровой экономики",
        cb: "Банк России",
        cb1: "Развитие финансового рынка РФ",
        cb2: "Расширение инструментария ЦФА в реальном секторе",
        cb3: "Поле для цифрового рубля в инфраструктурных расчётах",
        cb4: "Прозрачность целевого использования средств",
        people: "Население и бизнес",
        p1: "Доход от собственных активов",
        p2: "Рост занятости в инфраструктуре",
        p3: "Бесплатное страхование залога",
        p4: "Цифровая грамотность"
      },
      legal: {
        eyebrow: "Правовой контур",
        title: "Строго в правовом поле Российской Федерации",
        lead: "Базовый каркас уже существует. Для полного запуска требуется принятие пакета из 10 нормативных актов на федеральном и подзаконном уровнях.",
        fzTitle: "Применимые федеральные законы и нормативы",
        nProj: "Проект федерального закона",
        nDecree: "Постановление Правительства"
      },
      roadmap: {
        eyebrow: "Дорожная карта",
        title: "Три фазы реализации",
        p1t: "Подготовка",
        p1l: ["Согласование с Банком России", "Межведомственная группа", "Пакет НПА", "Разработка и сертификация"],
        p2t: "Пилот и основная фаза",
        p2l: ["Пилот на недвижимости физ./юр. лиц", "Верификация процессов", "Первые целевые выпуски ЦФА", "Масштабирование инфраструктуры"],
        p3t: "Тиражирование",
        p3l: ["Движимое имущество", "Фондовые активы", "Интеллектуальная собственность", "БРИКС+ / ЕАЭС"]
      },
      econ: {
        eyebrow: "Экономика проекта",
        title: "NPV 51,2 млрд ₽ при стартовом капитале 1,335 млрд ₽ (WACC 30%)",
        lead: "10-летняя модель: окупаемость 2,8 года в базовом сценарии (WACC 30%); даже консервативный сценарий даёт NPV ≈ 22 млрд ₽. Соотношение «потребность к ёмкости» — 1 : 20 000. EM 12x.",
        chartTitle: "Выручка и EBITDA, млрд ₽",
        labelRev: "Выручка",
        labelEbi: "EBITDA"
      },
      finmodel: {
        eyebrow: "Интерактивная финмодель",
        title: "Подсчитать сценарий вашего интереса",
        lead: "Меняйте ключевые параметры — модель пересчитывается в реальном времени. Все ключевые KPI обновляются автоматически.",
        share: "Доля от залоговой ёмкости (25,5 трлн ₽) к году 10",
        fee: "Совокупная комиссия оператора",
        wacc: "Ставка дисконтирования (WACC)",
        opex: "Операционные расходы (множитель)",
        npv: "NPV проекта",
        rev10: "Выручка год 10",
        ebitda10: "EBITDA год 10",
        payback: "Окупаемость",
        reset: "Сброс к базовому сценарию"
      },
      valuation: {
        eyebrow: "Международная оценка",
        title: "Reasoned Value $60–115 млн · Base $80 млн pre-money",
        lead: "Триангуляция четырёх методов оценки по международным стандартам IVS 2022, IFRS 13, ASA BV Standards. Base $80 млн pre-money; post-money $95 млн при раунде $15 млн (доля 15,8%). Refactor 24.05.2026 после сводного аудита.",
        dcf: "DCF (доходный)",
        multi: "Comparable Multiples",
        berkus: "Berkus / Risk-Adjusted",
        asset: "Asset / Replacement",
        reasoned: "Reasoned (взвешенно)"
      },
      hub: {
        eyebrow: "Хаб документов",
        title: "Полная база проектной документации",
        lead: "Все ключевые документы проекта доступны прямо здесь. Откройте в модальном окне без перезагрузки или в новой вкладке для печати и сохранения.",
        cat: {
          concept: "Концепция и стратегия",
          legal: "Юридический фундамент",
          tech: "Техническая документация",
          fin: "Финансовые материалы",
          design: "Дизайн и бренд",
          pres: "Презентации",
          web: "Веб и приложения",
          audit: "Оценка, DD и экспертиза"
        }
      },
      contacts: {
        eyebrow: "Связаться",
        title: "Контакты и обратная связь",
        lead: "Проект открыт к взаимодействию с Центральным банком Российской Федерации, Министерством финансов, Министерством экономического развития, Министерством цифрового развития и Федеральным казначейством.",
        formName: "Ваше имя",
        formOrg: "Организация",
        formEmail: "Email для ответа",
        formTopic: "Тема обращения",
        formMessage: "Сообщение",
        send: "Отправить",
        sent: "Спасибо. Сообщение подготовлено к отправке в почтовом клиенте.",
        author: "Автор и правообладатель",
        sviditelstvo: "Свидетельство о депонировании",
        hashLabel: "Хеш ГОСТ-Р 34.11-2012"
      },
      foot: {
        sections: "Разделы", documents: "Документы", rights: "Все права защищены.",
        rightsFull: "© Цифровая Платформа РСФСР. Концепция защищена свидетельством о депонировании №4011265 от 19.12.2024."
      }
    },

    en: {
      brand: { name: "DP RSFSR", tagline: "Russian Social Development Financing Service" },
      nav: {
        home: "Home", about: "About", how: "How it works", potential: "Potential",
        effect: "Impact", legal: "Legal framework", tech: "Technology", roadmap: "Roadmap",
        mobileapp: "App",
        finmodel: "Financial model", valuation: "Valuation", hub: "Documents", contacts: "Contacts"
      },
      mobile: {
        eyebrow: "Ready-to-deploy mobile app",
        title: "Full-feature Progressive Web App",
        lead: "23 user screens covering the full life cycle of the 19 steps of the author's concept. Installable as a native app on iOS, Android and Windows. Constructor documentation under GOST 19. Ready RuStore submission package.",
        screens: "screens", platforms: "platforms", docs: "docs", langs: "languages",
        statScreens: "Full life cycle", statPlatforms: "iOS · Android · Windows · PWA",
        statKD: "GOST-19 constructor docs", statLangs: "RU · EN · FR · AR (RTL)",
        appTitle: "PWA application",
        appDesc: "Full-feature client with offline mode, biometrics, push notifications. Integrated with ESIA, UBS, EGRN, Bank of Russia.",
        openApp: "Open application",
        kdTitle: "Constructor documentation",
        kdDesc: "12 documents under GOST 19: technical specification, program description, manuals, test program, security requirements, specification.",
        openKD: "Open constructor docs",
        publishTitle: "Ready to publish",
        publishDesc: "Capacitor builds for Android (AAB), iOS (IPA), Windows (MSIX). Description, policies, promo materials, RuStore publishing checklist.",
        openPublish: "Publishing checklist"
      },
      ui: {
        light: "Light", dark: "Dark", sepia: "Soft", contrast: "Contrast",
        fontPlus: "A+", fontMinus: "A−", fontReset: "Reset",
        openInNew: "Open in new window", openModal: "Open in modal",
        close: "Close", download: "Download",
        language: "Language", theme: "Theme", a11y: "Accessibility",
        viewSource: "View source", more: "More",
        send: "Send", reset: "Reset", calculating: "Calculating..."
      },
      hero: {
        eyebrow: "Digital platform · DFA · Collateral infrastructure",
        title: "Off-budget financing of national projects",
        subtitle: "Russian Social Development Financing Service",
        lead: "An operator platform for issuing Digital Financial Assets (DFA) collateralised by citizens' and organisations' property. In the 2026–2028 pilot-light, targeted funding flows through VEB.RF Project Finance Factory and the Federal Treasury; the Bank of Russia acts as general supervisor under Art. 4 of FL 86.",
        ctaPrimary: "How it works",
        ctaSecondary: "Project documents"
      },
      stats: {
        emkost: "Pledge capacity",
        total: "RF real-estate value",
        term: "Launch time",
        gost: "GOST protection",
        npv: "NPV @ WACC 30%",
        payback: "Payback",
        startCap: "Starting capital need",
        rev10: "Year 10 revenue",
        irr: "IRR",
        years: "yrs", months: "mo", trn: "trn ₽", bln: "bn ₽", mln: "mn ₽"
      },
      problem: {
        eyebrow: "The problem",
        title: "A wealthy country with a shortage of investment money",
        lead: "Enormous national wealth is not in financial circulation, while national projects compete for a limited budget and expensive debt financing.",
        c1Title: "Budget",
        c1: "Federal budget is constrained by fiscal rule and social priorities.",
        c2Title: "Rate",
        c2: "High key rate makes commercial debt financing unviable.",
        c3Title: "Capital",
        c3: "Access to international capital markets is restricted.",
        c4Title: "Assets",
        c4: "Dormant private assets — 507 trn ₽ outside circulation."
      },
      solution: {
        eyebrow: "Solution",
        title: "Operator platform for issuing DFA against pledged property",
        lead: "Against the pool of collateral DFA, the 2026–2028 pilot-light arranges targeted funding via VEB.RF Project Finance Factory and the Federal Treasury into a special escrow account. Funds flow into national projects. Horizon 2029+ allows expansion of mandate (targeted secured issuance by the Bank of Russia) after a positive track record and adoption of the regulatory package.",
        b1: "Pledge", b1d: "Property remains with the owner; encumbrance is temporary. Automated valuation.",
        b2: "DFA issuance", b2d: "Technological partnership with a licensed DFA IS operator under FL 779-P (Art. 5 of FL №259).",
        b3: "Targeted funding", b3d: "Pilot-light: VEB.RF PFF + Treasury. Targeted escrow account. Horizon 2029+: expansion of mandate with regulator support.",
        b4: "DFA exchange", b4d: "New asset becomes new DFA in the operator's portfolio; the owner gets income."
      },
      potential: {
        eyebrow: "Potential",
        title: "Pledge capacity — 25.5 trn ₽",
        lead: "Author's conservative calculation: 10% of assets × 50% of value of total RF real-estate of 507 trn ₽. Even 5% penetration = 1.3 trn ₽ of off-budget financing.",
        sJil: "RF residential stock",
        sCom: "Commercial real estate",
        sZem: "Land plots",
        sAll: "All real estate",
        chartTitle: "Pledge mass structure (trn ₽)"
      },
      flow: {
        eyebrow: "Life cycle",
        title: "Six key stages of 19 steps",
        s1: "Registration", s1d: "ESIA / UBS",
        s2: "Valuation",    s2d: "FL-135, insurance",
        s3: "DFA issuance", s3d: "FL-259, smart contract",
        s4: "Funding",      s4d: "VEB.RF PFF + Treasury",
        s5: "Disbursement", s5d: "Treasury → national project",
        s6: "DFA exchange", s6d: "New asset, income"
      },
      effect: {
        eyebrow: "Impact",
        title: "Balanced model for all stakeholders",
        gov: "Government",
        gov1: "Off-budget financing for national projects",
        gov2: "Reduced queueing for project financing",
        gov3: "Investment multiplier 1.8–2.3",
        gov4: "Digital economy development",
        cb: "Bank of Russia",
        cb1: "Financial market development",
        cb2: "Expanded DFA toolkit in the real economy",
        cb3: "Field for digital ruble in infrastructure settlements",
        cb4: "Transparency of targeted use of funds",
        people: "Citizens & business",
        p1: "Income from owned assets",
        p2: "Employment growth in infrastructure",
        p3: "Free property insurance during pledge",
        p4: "Digital literacy growth"
      },
      legal: {
        eyebrow: "Legal framework",
        title: "Strictly within Russian Federation law",
        lead: "The base framework already exists. Full launch requires a package of 10 legal acts at federal and sub-legal levels.",
        fzTitle: "Applicable federal laws and regulations",
        nProj: "Draft federal law",
        nDecree: "Government Decree"
      },
      roadmap: {
        eyebrow: "Roadmap",
        title: "Three implementation phases",
        p1t: "Preparation",
        p1l: ["Alignment with Bank of Russia", "Interagency working group", "Legal acts package", "Development & certification"],
        p2t: "Pilot & core phase",
        p2l: ["Pilot on real estate", "Process verification", "First targeted DFA issuances", "Infrastructure scaling"],
        p3t: "Rollout",
        p3l: ["Movable property", "Stock assets", "Intellectual property", "BRICS+ / EAEU"]
      },
      econ: {
        eyebrow: "Economics",
        title: "NPV ₽51.2 bn on a ₽1.335 bn starting capital (WACC 30%)",
        lead: "A 10-year model: 2.8-year payback in the base case (WACC 30%); even the conservative case yields NPV ≈ ₽22 bn. The need-to-capacity ratio — 1 : 20,000. EM 12x.",
        chartTitle: "Revenue & EBITDA, bn ₽",
        labelRev: "Revenue",
        labelEbi: "EBITDA"
      },
      finmodel: {
        eyebrow: "Interactive financial model",
        title: "Compute your own scenario",
        lead: "Change the key parameters — the model recalculates in real time. All KPIs update automatically.",
        share: "Market share of pledge capacity (25.5 trn ₽) by year 10",
        fee: "Combined operator commission",
        wacc: "Discount rate (WACC)",
        opex: "Operating expense multiplier",
        npv: "Project NPV",
        rev10: "Year 10 revenue",
        ebitda10: "Year 10 EBITDA",
        payback: "Payback",
        reset: "Reset to base case"
      },
      valuation: {
        eyebrow: "International valuation",
        title: "Reasoned Value $60–115 mn · Base $80 mn pre-money",
        lead: "Triangulation of four valuation methods under IVS 2022, IFRS 13, ASA BV Standards. Base $80 mn pre-money; post-money $95 mn at $15 mn round (15.8% stake). Refactor 24.05.2026 after the consolidated audit.",
        dcf: "DCF (income)",
        multi: "Comparable Multiples",
        berkus: "Berkus / Risk-Adjusted",
        asset: "Asset / Replacement",
        reasoned: "Reasoned (weighted)"
      },
      hub: {
        eyebrow: "Document hub",
        title: "Full project documentation base",
        lead: "All key project documents are available here. Open in a modal without page reload, or in a new tab for printing and saving.",
        cat: {
          concept: "Concept & strategy",
          legal: "Legal foundation",
          tech: "Technical documentation",
          fin: "Financial materials",
          design: "Design & brand",
          pres: "Presentations",
          web: "Web & apps",
          audit: "Valuation, DD & expertise"
        }
      },
      contacts: {
        eyebrow: "Get in touch",
        title: "Contacts & feedback",
        lead: "The project is open to interaction with the Central Bank of the Russian Federation, Ministry of Finance, Ministry of Economic Development, Ministry of Digital Development and the Federal Treasury.",
        formName: "Your name",
        formOrg: "Organisation",
        formEmail: "Reply email",
        formTopic: "Subject",
        formMessage: "Message",
        send: "Send",
        sent: "Thank you. The message has been prepared in your mail client.",
        author: "Author & rights holder",
        sviditelstvo: "Deposit certificate",
        hashLabel: "GOST-R 34.11-2012 hash"
      },
      foot: {
        sections: "Sections", documents: "Documents", rights: "All rights reserved.",
        rightsFull: "© Digital Platform RSFSR. The concept is protected by deposit certificate №4011265 of 19.12.2024."
      }
    },

    fr: {
      brand: { name: "PN RSFSR", tagline: "Service russe de financement du développement social" },
      nav: {
        home: "Accueil", about: "À propos", how: "Fonctionnement", potential: "Potentiel",
        effect: "Impact", legal: "Cadre juridique", tech: "Technologie", roadmap: "Feuille de route",
        mobileapp: "Application",
        finmodel: "Modèle financier", valuation: "Évaluation", hub: "Documents", contacts: "Contacts"
      },
      mobile: {
        eyebrow: "Application mobile prête",
        title: "Application Progressive Web App à fonctionnalités complètes",
        lead: "23 écrans utilisateur couvrant le cycle de vie complet en 19 étapes du concept de l'auteur. Installable comme application native sur iOS, Android et Windows. Documentation de conception selon GOST 19. Pack RuStore complet.",
        screens: "écrans", platforms: "plateformes", docs: "docs", langs: "langues",
        statScreens: "Cycle de vie complet", statPlatforms: "iOS · Android · Windows · PWA",
        statKD: "Doc. de conception GOST-19", statLangs: "RU · EN · FR · AR (RTL)",
        appTitle: "Application PWA",
        appDesc: "Client complet avec mode hors ligne, biométrie, notifications push. Intégrations ESIA, UBS, EGRN, Banque de Russie.",
        openApp: "Ouvrir l'application",
        kdTitle: "Documentation de conception",
        kdDesc: "12 documents selon GOST 19 : cahier des charges, description du programme, manuels, méthodologie d'essais, exigences de sécurité, spécification.",
        openKD: "Ouvrir la documentation",
        publishTitle: "Prêt pour publication",
        publishDesc: "Builds Capacitor pour Android (AAB), iOS (IPA), Windows (MSIX). Description, politiques, supports promotionnels, checklist RuStore.",
        openPublish: "Checklist de publication"
      },
      ui: {
        light: "Clair", dark: "Sombre", sepia: "Doux", contrast: "Contraste",
        fontPlus: "A+", fontMinus: "A−", fontReset: "Réinit.",
        openInNew: "Ouvrir dans une nouvelle fenêtre", openModal: "Ouvrir en modale",
        close: "Fermer", download: "Télécharger",
        language: "Langue", theme: "Thème", a11y: "Accessibilité",
        viewSource: "Voir la source", more: "Détails",
        send: "Envoyer", reset: "Réinitialiser", calculating: "Calcul en cours..."
      },
      hero: {
        eyebrow: "Plateforme numérique · AFN · Infrastructure de gage",
        title: "Financement hors-budget des projets nationaux",
        subtitle: "Service russe de financement du développement social",
        lead: "Plateforme-opérateur d'émission d'AFN gagés sur les biens des citoyens et organisations. En pilot-light 2026–2028, le financement ciblé transite par la Fabrique de financement de projets VEB.RF et le Trésor fédéral ; la Banque de Russie agit en superviseur général au titre de l'art. 4 de la LF 86.",
        ctaPrimary: "Comment ça marche",
        ctaSecondary: "Documents du projet"
      },
      stats: {
        emkost: "Capacité de gage",
        total: "Immobilier RF",
        term: "Délai de lancement",
        gost: "Protection GOST",
        npv: "VAN @ WACC 30%",
        payback: "Retour sur investissement",
        startCap: "Besoin initial",
        rev10: "CA année 10",
        irr: "TRI",
        years: "ans", months: "mois", trn: "Bn ₽", bln: "Mds ₽", mln: "M ₽"
      },
      problem: {
        eyebrow: "Problématique",
        title: "Pays riche, masse monétaire d'investissement déficitaire",
        lead: "L'énorme richesse nationale n'est pas en circulation financière, tandis que les projets nationaux se disputent un budget limité et un financement par emprunt coûteux.",
        c1Title: "Budget", c1: "Les dépenses budgétaires sont contraintes par la règle budgétaire.",
        c2Title: "Taux", c2: "Le taux directeur élevé rend le financement de dette non viable.",
        c3Title: "Capital", c3: "L'accès aux marchés internationaux est restreint.",
        c4Title: "Actifs", c4: "Actifs privés dormants — 507 Bn ₽ hors circulation."
      },
      solution: {
        eyebrow: "Solution",
        title: "Plateforme-opérateur d'émission d'AFN sur garantie",
        lead: "Face au pool d'AFN gagés, le pilot-light 2026–2028 organise un financement ciblé via la Fabrique de financement de projets VEB.RF et le Trésor fédéral sur un compte séquestre spécial. Les fonds vont aux projets nationaux. Horizon 2029+ : élargissement du mandat (émission ciblée garantie par la Banque de Russie) après un historique positif et l'adoption du paquet réglementaire.",
        b1: "Gage", b1d: "Le bien reste au propriétaire ; servitude temporaire. Évaluation automatisée.",
        b2: "Émission d'AFN", b2d: "Partenariat technologique avec un opérateur SI AFN agréé selon la LF 779-P (Art. 5 LF n°259).",
        b3: "Financement ciblé", b3d: "Pilot-light : FFP VEB.RF + Trésor. Compte séquestre ciblé. Horizon 2029+ : élargissement du mandat avec soutien du régulateur.",
        b4: "Échange d'AFN", b4d: "Nouveau bien devient nouvel AFN dans le portefeuille de l'opérateur ; le propriétaire reçoit un revenu."
      },
      potential: {
        eyebrow: "Potentiel",
        title: "Capacité de gage — 25,5 Bn ₽",
        lead: "Calcul prudent de l'auteur : 10% des actifs × 50% de la valeur sur 507 Bn ₽ totaux. Même 5% de pénétration = 1,3 Bn ₽ de financement hors-budget.",
        sJil: "Parc résidentiel RF", sCom: "Immobilier commercial",
        sZem: "Terrains", sAll: "Total immobilier",
        chartTitle: "Structure de la masse à gager (Bn ₽)"
      },
      flow: {
        eyebrow: "Cycle de vie",
        title: "Six étapes clés sur 19",
        s1: "Inscription", s1d: "ESIA / UBS",
        s2: "Évaluation", s2d: "LF-135, assurance",
        s3: "Émission AFN", s3d: "LF-259, smart-contract",
        s4: "Financement", s4d: "FFP VEB.RF + Trésor",
        s5: "Décaissement", s5d: "Trésor → projet national",
        s6: "Échange AFN", s6d: "Nouveau bien, revenu"
      },
      effect: {
        eyebrow: "Impact",
        title: "Modèle équilibré pour toutes les parties",
        gov: "État",
        gov1: "Financement hors-budget", gov2: "Réduction des files d'attente",
        gov3: "Multiplicateur d'investissement 1,8–2,3", gov4: "Économie numérique",
        cb: "Banque de Russie",
        cb1: "Développement du marché financier", cb2: "Élargissement de la boîte à outils AFN dans l'économie réelle",
        cb3: "Champ pour le rouble numérique dans les règlements d'infrastructure", cb4: "Transparence de l'utilisation ciblée des fonds",
        people: "Population & entreprises",
        p1: "Revenu des actifs détenus", p2: "Croissance de l'emploi",
        p3: "Assurance gratuite pendant le gage", p4: "Alphabétisation numérique"
      },
      legal: {
        eyebrow: "Cadre juridique",
        title: "Strictement dans le droit de la Fédération de Russie",
        lead: "Le cadre de base existe déjà. Le lancement complet nécessite un paquet de 10 actes juridiques aux niveaux fédéral et sous-réglementaire.",
        fzTitle: "Lois fédérales et règlements applicables",
        nProj: "Projet de loi fédérale", nDecree: "Décret du Gouvernement"
      },
      roadmap: {
        eyebrow: "Feuille de route",
        title: "Trois phases de mise en œuvre",
        p1t: "Préparation",
        p1l: ["Coordination avec la Banque de Russie", "Groupe de travail interagences", "Paquet d'actes juridiques", "Développement et certification"],
        p2t: "Pilote et phase principale",
        p2l: ["Pilote sur l'immobilier", "Vérification des processus", "Premières émissions ciblées d'AFN", "Mise à l'échelle de l'infrastructure"],
        p3t: "Déploiement",
        p3l: ["Biens meubles", "Actifs boursiers", "Propriété intellectuelle", "BRICS+ / UEEA"]
      },
      econ: {
        eyebrow: "Économie",
        title: "VAN 51,2 Mds ₽ pour un capital initial de 1,335 Mds ₽ (CMPC 30%)",
        lead: "Modèle sur 10 ans : retour sur investissement de 2,8 ans dans le scénario de base (CMPC 30%) ; même le scénario prudent donne une VAN ≈ 22 Mds ₽. EM 12x.",
        chartTitle: "CA et EBITDA, Mds ₽",
        labelRev: "Chiffre d'affaires",
        labelEbi: "EBITDA"
      },
      finmodel: {
        eyebrow: "Modèle financier interactif",
        title: "Calculez votre propre scénario",
        lead: "Modifiez les paramètres clés — le modèle se recalcule en temps réel.",
        share: "Part de capacité de gage à l'année 10",
        fee: "Commission combinée de l'opérateur",
        wacc: "Taux d'actualisation (WACC)",
        opex: "Multiplicateur des charges",
        npv: "VAN du projet",
        rev10: "CA année 10",
        ebitda10: "EBITDA année 10",
        payback: "Retour sur investissement",
        reset: "Réinitialiser"
      },
      valuation: {
        eyebrow: "Évaluation internationale",
        title: "Valeur raisonnée 60–115 M $ · Base 80 M $ pre-money",
        lead: "Triangulation de quatre méthodes selon IVS 2022, IFRS 13, ASA BV Standards. Base 80 M $ pre-money ; post-money 95 M $ pour une levée de 15 M $ (part 15,8 %). Refactorisation 24.05.2026 après l'audit consolidé.",
        dcf: "DCF (revenu)", multi: "Multiples comparables",
        berkus: "Berkus / Ajusté", asset: "Actif / Remplacement", reasoned: "Raisonnée (pondérée)"
      },
      hub: {
        eyebrow: "Bibliothèque",
        title: "Base documentaire complète du projet",
        lead: "Tous les documents clés disponibles ici. Ouverture en modale sans rechargement ou dans un nouvel onglet.",
        cat: {
          concept: "Concept & stratégie",
          legal: "Fondement juridique",
          tech: "Documentation technique",
          fin: "Matériaux financiers",
          design: "Design & marque",
          pres: "Présentations",
          web: "Web & applications",
          audit: "Évaluation, DD & expertise"
        }
      },
      contacts: {
        eyebrow: "Nous contacter",
        title: "Contacts et retours",
        lead: "Le projet est ouvert à l'interaction avec la Banque centrale, le Ministère des finances, le Ministère du développement économique, le Ministère du développement numérique et le Trésor fédéral.",
        formName: "Votre nom", formOrg: "Organisation",
        formEmail: "Email de réponse", formTopic: "Sujet",
        formMessage: "Message", send: "Envoyer",
        sent: "Merci. Le message a été préparé dans votre client de messagerie.",
        author: "Auteur et titulaire des droits",
        sviditelstvo: "Certificat de dépôt",
        hashLabel: "Empreinte GOST-R 34.11-2012"
      },
      foot: {
        sections: "Sections", documents: "Documents", rights: "Tous droits réservés.",
        rightsFull: "© Plateforme Numérique RSFSR. Concept protégé par certificat de dépôt n°4011265 du 19.12.2024."
      }
    },

    ar: {
      brand: { name: "م ر ر س ف س ر", tagline: "الخدمة الروسية لتمويل التنمية الاجتماعية" },
      nav: {
        home: "الرئيسية", about: "حول", how: "كيف يعمل", potential: "الإمكانات",
        effect: "الأثر", legal: "الإطار القانوني", tech: "التكنولوجيا", roadmap: "خارطة الطريق",
        mobileapp: "التطبيق",
        finmodel: "النموذج المالي", valuation: "التقييم", hub: "المستندات", contacts: "اتصل بنا"
      },
      mobile: {
        eyebrow: "تطبيق جوال جاهز",
        title: "تطبيق ويب تقدمي كامل الميزات",
        lead: "23 شاشة مستخدم تغطي دورة الحياة الكاملة لـ 19 خطوة من مفهوم المؤلف. قابل للتثبيت كتطبيق أصلي على iOS و Android و Windows. وثائق التصميم وفقًا لـ GOST 19. حزمة جاهزة لمتجر RuStore.",
        screens: "شاشة", platforms: "منصات", docs: "وثيقة", langs: "لغات",
        statScreens: "دورة حياة كاملة", statPlatforms: "iOS · Android · Windows · PWA",
        statKD: "وثائق GOST-19", statLangs: "RU · EN · FR · AR (RTL)",
        appTitle: "تطبيق PWA",
        appDesc: "عميل كامل الميزات بوضع غير متصل وبصمات حيوية وإشعارات فورية. تكامل مع ESIA و UBS و EGRN وبنك روسيا.",
        openApp: "فتح التطبيق",
        kdTitle: "وثائق التصميم الإنشائي",
        kdDesc: "12 وثيقة وفقًا لـ GOST 19: المواصفات الفنية، وصف البرنامج، الأدلة، منهجية الاختبار، متطلبات الأمن، المواصفات.",
        openKD: "فتح الوثائق",
        publishTitle: "جاهز للنشر",
        publishDesc: "بنيات Capacitor لـ Android (AAB) و iOS (IPA) و Windows (MSIX). الوصف، السياسات، المواد الترويجية، قائمة التحقق لـ RuStore.",
        openPublish: "قائمة التحقق للنشر"
      },
      ui: {
        light: "فاتح", dark: "داكن", sepia: "ناعم", contrast: "تباين",
        fontPlus: "خط أكبر", fontMinus: "خط أصغر", fontReset: "إعادة",
        openInNew: "افتح في نافذة جديدة", openModal: "افتح في نافذة منبثقة",
        close: "إغلاق", download: "تنزيل",
        language: "اللغة", theme: "السمة", a11y: "إمكانية الوصول",
        viewSource: "عرض المصدر", more: "المزيد",
        send: "إرسال", reset: "إعادة تعيين", calculating: "جاري الحساب..."
      },
      hero: {
        eyebrow: "منصة رقمية · أصول مالية رقمية · بنية تحتية للضمان",
        title: "تمويل المشاريع الوطنية خارج الميزانية",
        subtitle: "الخدمة الروسية لتمويل التنمية الاجتماعية",
        lead: "منصة مشغّل لإصدار الأصول المالية الرقمية (DFA) بضمان عقارات المواطنين والمنظمات. في وضع pilot-light 2026–2028، يتدفق التمويل المستهدف عبر مصنع تمويل المشاريع VEB.RF والخزانة الفيدرالية؛ بنك روسيا — منظم رقابي عام بموجب المادة 4 من القانون الفيدرالي 86.",
        ctaPrimary: "كيف تعمل المنصة",
        ctaSecondary: "وثائق المشروع"
      },
      stats: {
        emkost: "السعة الضمانية",
        total: "قيمة العقارات في الاتحاد الروسي",
        term: "مدة الإطلاق",
        gost: "حماية GOST",
        npv: "صافي القيمة الحالية",
        payback: "فترة الاسترداد",
        startCap: "رأس المال الأولي",
        rev10: "إيرادات السنة 10",
        irr: "معدل العائد",
        years: "سنوات", months: "شهر", trn: "ترليون ₽", bln: "مليار ₽", mln: "مليون ₽"
      },
      problem: {
        eyebrow: "المشكلة",
        title: "دولة غنية تفتقر إلى الكتلة النقدية الاستثمارية",
        lead: "ثروة وطنية ضخمة خارج الدورة المالية، بينما تتنافس المشاريع الوطنية على ميزانية محدودة وتمويل قروض مكلف.",
        c1Title: "الميزانية", c1: "نفقات الميزانية الفيدرالية مقيدة بقاعدة الميزانية والأولويات الاجتماعية.",
        c2Title: "السعر", c2: "ارتفاع سعر الفائدة الرئيسي يجعل تمويل القروض غير مجدٍ.",
        c3Title: "رأس المال", c3: "الوصول إلى أسواق رأس المال الدولية مقيد.",
        c4Title: "الأصول", c4: "أصول خاصة خاملة — 507 ترليون روبل خارج الدورة."
      },
      solution: {
        eyebrow: "الحل",
        title: "منصة مشغّل لإصدار الأصول المالية الرقمية مقابل ضمانات",
        lead: "مقابل مجموعة الأصول المالية الرقمية المرهونة، ينظّم pilot-light 2026–2028 تمويلاً مستهدفاً عبر مصنع تمويل المشاريع VEB.RF والخزانة الفيدرالية إلى حساب ضمان خاص. تتدفق الأموال إلى المشاريع الوطنية. أفق 2029+: توسيع التفويض (إصدار مضمون مستهدف من بنك روسيا) بعد سجل أداء إيجابي واعتماد الحزمة التنظيمية.",
        b1: "الضمان", b1d: "العقار يبقى لدى المالك؛ الرهن مؤقت. تقييم آلي.",
        b2: "إصدار الأصول", b2d: "شراكة تكنولوجية مع مشغّل نظام معلوماتي مرخّص للأصول المالية الرقمية بموجب 779-P (المادة 5 القانون 259).",
        b3: "تمويل مستهدف", b3d: "Pilot-light: مصنع تمويل المشاريع VEB.RF + الخزانة. حساب ضمان مستهدف. أفق 2029+: توسيع التفويض بدعم المنظم.",
        b4: "تبادل الأصول", b4d: "الأصل الجديد يصبح أصلًا جديدًا في محفظة المشغّل؛ المالك يحصل على دخل."
      },
      potential: {
        eyebrow: "الإمكانات",
        title: "السعة الضمانية — 25.5 ترليون روبل",
        lead: "الحساب المتحفظ للمؤلف: 10٪ من الأصول × 50٪ من قيمة 507 ترليون روبل عقارات الاتحاد الروسي.",
        sJil: "المخزون السكني", sCom: "العقارات التجارية",
        sZem: "قطع الأراضي", sAll: "إجمالي العقارات",
        chartTitle: "هيكل الكتلة الضمانية (ترليون روبل)"
      },
      flow: {
        eyebrow: "دورة الحياة",
        title: "ست مراحل رئيسية من 19 خطوة",
        s1: "التسجيل", s1d: "ESIA / UBS",
        s2: "التقييم", s2d: "القانون 135، التأمين",
        s3: "إصدار الأصول", s3d: "القانون 259، عقد ذكي",
        s4: "التمويل", s4d: "مصنع تمويل المشاريع VEB.RF + الخزانة",
        s5: "الصرف", s5d: "الخزانة → مشروع وطني",
        s6: "تبادل الأصول", s6d: "أصل جديد، دخل"
      },
      effect: {
        eyebrow: "الأثر",
        title: "نموذج متوازن لجميع الأطراف",
        gov: "الدولة",
        gov1: "تمويل خارج الميزانية", gov2: "تقليل قوائم الانتظار للتمويل",
        gov3: "مضاعف الاستثمار 1.8–2.3", gov4: "تطوير الاقتصاد الرقمي",
        cb: "بنك روسيا",
        cb1: "تطوير السوق المالية", cb2: "توسيع مجموعة أدوات الأصول المالية الرقمية في الاقتصاد الحقيقي",
        cb3: "مجال للروبل الرقمي في تسويات البنية التحتية", cb4: "شفافية الاستخدام المستهدف للأموال",
        people: "السكان والأعمال",
        p1: "دخل من الأصول الخاصة", p2: "نمو التوظيف",
        p3: "تأمين مجاني خلال الرهن", p4: "الثقافة الرقمية"
      },
      legal: {
        eyebrow: "الإطار القانوني",
        title: "ضمن القانون الروسي حصراً",
        lead: "الإطار الأساسي موجود. الإطلاق الكامل يتطلب حزمة من 10 قوانين على المستوى الفيدرالي والتنظيمي.",
        fzTitle: "القوانين الفيدرالية والأنظمة المعمول بها",
        nProj: "مشروع قانون فيدرالي", nDecree: "مرسوم حكومي"
      },
      roadmap: {
        eyebrow: "خارطة الطريق",
        title: "ثلاث مراحل للتنفيذ",
        p1t: "التحضير",
        p1l: ["التنسيق مع بنك روسيا", "مجموعة عمل مشتركة", "حزمة القوانين", "التطوير والاعتماد"],
        p2t: "التجريب والمرحلة الأساسية",
        p2l: ["تجريب على العقارات", "التحقق من العمليات", "الإصدارات الأولى للأصول", "توسيع البنية"],
        p3t: "التوسع",
        p3l: ["العقارات المنقولة", "أصول البورصة", "الملكية الفكرية", "بريكس+ / الاتحاد الأوراسي"]
      },
      econ: {
        eyebrow: "الاقتصاد",
        title: "صافي القيمة الحالية 51.2 مليار روبل برأس مال 1.335 مليار روبل (WACC 30%)",
        lead: "نموذج لمدة 10 سنوات: استرداد خلال 2.8 سنة في السيناريو الأساسي (WACC 30%)؛ حتى السيناريو المتحفظ يعطي صافي قيمة حالية ≈ 22 مليار روبل. مضاعف 12×.",
        chartTitle: "الإيرادات و EBITDA، مليار روبل",
        labelRev: "الإيرادات",
        labelEbi: "EBITDA"
      },
      finmodel: {
        eyebrow: "نموذج مالي تفاعلي",
        title: "احسب سيناريوك الخاص",
        lead: "غيّر المعطيات الرئيسية — يُعاد حساب النموذج فورياً.",
        share: "حصة السعة الضمانية بحلول السنة 10",
        fee: "العمولة الموحدة للمشغّل",
        wacc: "معدل الخصم (WACC)",
        opex: "مضاعف المصاريف التشغيلية",
        npv: "صافي القيمة الحالية",
        rev10: "إيرادات السنة 10",
        ebitda10: "EBITDA السنة 10",
        payback: "فترة الاسترداد",
        reset: "إعادة الحالة الأساسية"
      },
      valuation: {
        eyebrow: "التقييم الدولي",
        title: "القيمة المعللة 60–115 مليون دولار · القاعدة 80 مليون دولار قبل المال",
        lead: "تثليث أربع طرق تقييم وفق IVS 2022, IFRS 13, ASA BV Standards. القاعدة 80 مليون دولار قبل المال؛ بعد المال 95 مليون دولار في جولة 15 مليون دولار (حصة 15.8٪). إعادة هيكلة 24.05.2026 بعد التدقيق الموحد.",
        dcf: "DCF (الدخل)", multi: "المضاعفات المقارنة",
        berkus: "بيركوس / المعدلة بالمخاطر", asset: "الأصول / الاستبدال",
        reasoned: "معللة (مرجحة)"
      },
      hub: {
        eyebrow: "مركز الوثائق",
        title: "قاعدة وثائق المشروع الكاملة",
        lead: "جميع الوثائق الرئيسية متاحة هنا. افتح في نافذة منبثقة أو في تبويب جديد.",
        cat: {
          concept: "المفهوم والاستراتيجية",
          legal: "الأساس القانوني",
          tech: "التوثيق التقني",
          fin: "المواد المالية",
          design: "التصميم والعلامة",
          pres: "العروض التقديمية",
          web: "الويب والتطبيقات",
          audit: "التقييم، DD، والخبرة"
        }
      },
      contacts: {
        eyebrow: "تواصل",
        title: "الاتصال والملاحظات",
        lead: "المشروع منفتح للتفاعل مع البنك المركزي للاتحاد الروسي، وزارة المالية، وزارة التنمية الاقتصادية، وزارة التطوير الرقمي، والخزانة الفيدرالية.",
        formName: "اسمك", formOrg: "المنظمة",
        formEmail: "بريد للرد", formTopic: "الموضوع",
        formMessage: "الرسالة", send: "إرسال",
        sent: "شكراً. تم تجهيز الرسالة في عميل البريد الخاص بك.",
        author: "المؤلف وصاحب الحقوق",
        sviditelstvo: "شهادة الإيداع",
        hashLabel: "بصمة GOST-R 34.11-2012"
      },
      foot: {
        sections: "الأقسام", documents: "الوثائق", rights: "جميع الحقوق محفوظة.",
        rightsFull: "© المنصة الرقمية RSFSR. المفهوم محمي بشهادة الإيداع رقم 4011265 بتاريخ 19.12.2024."
      }
    }
  };

  function get(dict, path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict);
  }

  const I18N = {
    current: 'ru',
    dict: DICT,
    set(lang) {
      if (!DICT[lang]) lang = 'ru';
      this.current = lang;
      const html = document.documentElement;
      html.lang = lang;
      html.dir = (lang === 'ar') ? 'rtl' : 'ltr';
      this.apply();
      document.querySelectorAll('[data-i18n-btn]').forEach(b => {
        b.classList.toggle('active', b.dataset.i18nBtn === lang);
      });
      try { localStorage.setItem('rsfsr-lang', lang); } catch(e) {}
      window.dispatchEvent(new CustomEvent('i18nchange', { detail: { lang } }));
    },
    apply() {
      const d = DICT[this.current] || DICT.ru;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const val = get(d, key);
        if (val == null) return;
        if (Array.isArray(val)) {
          el.innerHTML = val.map(v => `<li>${v}</li>`).join('');
        } else if (typeof val === 'string') {
          el.textContent = val;
        }
      });
      document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const attr = el.dataset.i18nAttr;
        const key = el.dataset.i18nKey || el.dataset.i18n;
        const val = get(d, key);
        if (val != null) el.setAttribute(attr, val);
      });
    },
    init() {
      let lang = 'ru';
      try { lang = localStorage.getItem('rsfsr-lang') || 'ru'; } catch(e) {}
      this.set(lang);
      document.querySelectorAll('[data-i18n-btn]').forEach(b => {
        b.addEventListener('click', () => this.set(b.dataset.i18nBtn));
      });
    }
  };

  global.I18N = I18N;
  if (document.readyState !== 'loading') I18N.init();
  else document.addEventListener('DOMContentLoaded', () => I18N.init());

})(window);
