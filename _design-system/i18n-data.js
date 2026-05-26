/* =====================================================================
   ЦПФСР.РФ — i18n data (inline, без fetch)
   4 языка: RU (default) · EN · FR · AR (RTL)
   Перевод премиум-уровня: финансовая, юридическая, регуляторная лексика
   ===================================================================== */
(function () {
  'use strict';

  window.CPFSR_I18N_DATA = {

    /* ===================== РУССКИЙ ===================== */
    ru: {
      _meta: { lang: 'ru', dir: 'ltr', name: 'Русский', flag: '🇷🇺' },
      brand: {
        short: 'ЦПФСР.РФ',
        name: 'Цифровая Платформа Финансирования Социального Развития',
        tagline: 'Институциональный контур социальных инвестиций · pre-Seed → Series A'
      },
      nav: {
        home: 'Главная',
        concept: 'Концепция',
        tech: 'Технология',
        legal: 'Правовой контур',
        finance: 'Финансовая модель',
        valuation: 'Оценка',
        business: 'Бизнес-план',
        dd: 'DD-аудит',
        expertise: 'Экспертиза',
        audit: 'Аудит',
        presentations: 'Презентации',
        design: 'Дизайн',
        brand: 'Бренд-бук',
        mobile: 'Мобильное приложение',
        dataroom: 'Data room',
        governance: 'Governance',
        rfp: 'RFP',
        sitemap: 'Карта сайта'
      },
      actions: {
        open: 'Открыть',
        download: 'Скачать',
        back_to_top: 'Наверх',
        back_to_home: 'На главную',
        more: 'Подробнее',
        menu: 'Меню',
        close: 'Закрыть',
        search: 'Поиск',
        language: 'Язык',
        theme: 'Тема'
      },
      themes: { light: 'Светлая', dark: 'Тёмная', sepia: 'Сепия' },
      hero: {
        eyebrow: 'Цифровая Платформа · pre-Seed → Series A',
        title_p1: 'Институциональный контур',
        title_em: 'финансирования социального развития',
        title_p2: ' на базе СЗПК и 259-ФЗ',
        lead: 'Wedge через альянс ВЭБ.РФ / Газпромбанк / Минэк / Атомайз. Базовая оценка post-money 95 млн долл. США, IRR 62 %, NPV 51,2 млрд ₽. Двухстадийная архитектура: Pilot Light в действующем 259-ФЗ → целевой контур.',
        cta_main: 'Презентация для инвесторов',
        cta_secondary: 'Доклад для Банка России'
      },
      kpi: {
        npv: 'NPV (базовый)',
        irr: 'IRR investor-level',
        wacc: 'Ставка дисконта (WACC)',
        payback: 'Окупаемость',
        postmoney: 'Post-money (базовый)',
        stake: 'Доля раунда'
      },
      sections: {
        blocks: {
          eyebrow: 'Структура проекта',
          title: 'Шестнадцать тематических блоков',
          lead: 'Полный документальный пакет — от технической документации до Governance Pack и Compliance Matrix',
          c01_title: 'Техническая документация', c01_desc: 'Концепт, функциональные и нефункциональные требования, DLT-реестр ЦФА, архитектурные диаграммы, дорожная карта',
          c02_title: 'Юридический фундамент', c02_desc: '259-ФЗ wedge через ВЭБ.РФ / Газпромбанк / Минэк / Атомайз, Stage 1 / Stage 2, pre-meeting briefs, учреждение АО',
          c03_title: 'Финансовая модель', c03_desc: 'SoT v3: NPV 51,2 / IRR 62 % / WACC 30 % / EM 12× / Payback 2,8. Monte Carlo, sensitivity, tornado, multi-stage TV',
          c04_title: 'Бизнес-план', c04_desc: 'Wedge-pilot-light, GTM-sequencing, Champion-map, unit-экономика, дорожная карта 2026-2034',
          c05_title: 'Бренд-бук', c05_desc: 'Палитра, типографика, логотип, применения, охранное поле',
          c07_title: 'Презентации', c07_desc: 'Pitch deck RU/EN (a16z канон), Доклад для ЦБ РФ, Pre-meeting briefs, One-pager',
          c08_title: 'Веб-сайт', c08_desc: 'Публичная страница проекта, SEO-разметка, заявки и контакты',
          c09_title: 'Мобильное приложение', c09_desc: 'PWA installable + Capacitor v6+, спецификация, КД (API, модель данных), Vitest / Playwright / Appium',
          c10_title: 'Рекламные материалы', c10_desc: 'Буклеты, баннеры, social-media kit, ATL/BTL',
          c11_title: 'Международная оценка', c11_desc: 'DCF, мультипликаторы, scenarios, fairness benchmark vs tier-1 fintech',
          c12_title: 'DD-отчёт', c12_desc: 'Stakeholder map, Government Champions, регуляторное окружение, риски, mitigants',
          c13_title: 'Экспертиза', c13_desc: 'Экспертное заключение по существу проекта',
          c14_title: 'Сводный аудит · 9,22 / 10', c14_desc: 'Пост-Горизонт-III: A·Tech / B·Legal / C·Fin / D·Strat / E·Design / F·QA / G·International',
          c15_title: 'RFP для внешней верификации', c15_desc: 'Big-4 Vendor DD, Legal Opinion, IT-сертификация (ФСТЭК → ISO 27001 → SOC 2), Market Study',
          c16_title: 'Governance и Compliance', c16_desc: 'Совет директоров 3/5 независимых, 4 комитета, Code of Conduct, ESG (SASB+TCFD), Compliance Matrix 12×75',
          c17_title: 'Data room', c17_desc: 'VDR-структура 10 разделов × ~75 документов в каноне Intralinks/Datasite, permission tiers',
          arrow: 'Открыть'
        },
        champion: {
          eyebrow: 'Government Champions',
          title: 'Champion-map · Stage 1',
          lead: 'Шесть институциональных партнёров для wedge-старта через действующий 259-ФЗ',
          c1_name: 'М. Г. Решетников', c1_role: 'Министр', c1_org: 'Минэкономразвития РФ · СЗПК-контур',
          c2_name: 'В. В. Колычев', c2_role: 'Заместитель министра', c2_org: 'Минфин РФ · бюджетный контур',
          c3_name: 'А. В. Сазанов', c3_role: 'Статс-секретарь — заместитель министра', c3_org: 'Минфин РФ · ЦФА и налоговый режим',
          c4_name: 'А. Г. Аксаков', c4_role: 'Председатель комитета', c4_org: 'Госдума РФ · финансовые рынки',
          c5_name: 'Р. Н. Минниханов', c5_role: 'Раис (глава)', c5_org: 'Республика Татарстан · пилот-регион',
          c6_name: 'А. В. Моор', c6_role: 'Губернатор', c6_org: 'Тюменская область · пилот-регион'
        },
        audit: {
          eyebrow: 'Сводный аудит',
          title: 'Пост-Горизонт-III · 9,22 / 10',
          lead: 'Series A institutional ready. 12 / 12 RED закрыто, 27 / 33 AMBER закрыто. Tier-1 fintech benchmarks подтверждены.'
        }
      },
      ticker: { live: 'Live' },
      footer: {
        tagline: 'ЦПФСР.РФ — суверенный по мандату, частный по исполнению.',
        contact: 'Контакты',
        documents: 'Документы',
        verification: 'Внешняя верификация',
        language_region: 'Язык и регион',
        rights: '© 2026 Кагиров А.-Х.А. · Center Group Company · св. №4011265 от 19.12.2024',
        engagement: 'Engagement reference: CPFSR-RF-DESIGN-2026'
      }
    },

    /* ===================== ENGLISH ===================== */
    /* Регистр: VC / institutional LP / Series A roadshow */
    en: {
      _meta: { lang: 'en', dir: 'ltr', name: 'English', flag: '🇬🇧' },
      brand: {
        short: 'CPFSR.RF',
        name: 'Digital Platform for Social Development Capital',
        tagline: 'Institutional rail for social-impact capital · pre-Seed to Series A'
      },
      nav: {
        home: 'Home',
        concept: 'Concept',
        tech: 'Technology',
        legal: 'Legal Framework',
        finance: 'Financial Model',
        valuation: 'Valuation',
        business: 'Business Plan',
        dd: 'Due Diligence',
        expertise: 'Expert Opinion',
        audit: 'Audit',
        presentations: 'Presentations',
        design: 'Design',
        brand: 'Brand Book',
        mobile: 'Mobile App',
        dataroom: 'Data Room',
        governance: 'Governance',
        rfp: 'RFPs',
        sitemap: 'Site Map'
      },
      actions: {
        open: 'Open',
        download: 'Download',
        back_to_top: 'Back to top',
        back_to_home: 'Back to home',
        more: 'Read more',
        menu: 'Menu',
        close: 'Close',
        search: 'Search',
        language: 'Language',
        theme: 'Theme'
      },
      themes: { light: 'Light', dark: 'Dark', sepia: 'Sepia' },
      hero: {
        eyebrow: 'Digital platform · pre-Seed → Series A',
        title_p1: 'An institutional rail for',
        title_em: 'social-development capital',
        title_p2: ' under SZPK and Federal Law 259-FZ',
        lead: 'A wedge anchored by VEB.RF, Gazprombank, the Ministry of Economic Development, and Atomyze. Base post-money valuation of USD 95M, investor-level IRR of 62 %, NPV of RUB 51.2 bn. A two-stage architecture: a Pilot Light inside the existing 259-FZ framework, scaling into the target perimeter.',
        cta_main: 'Investor pitch deck',
        cta_secondary: 'Briefing for the Bank of Russia'
      },
      kpi: {
        npv: 'NPV (Base case)',
        irr: 'Investor-level IRR',
        wacc: 'WACC discount rate',
        payback: 'Payback period',
        postmoney: 'Post-money (Base)',
        stake: 'Round stake'
      },
      sections: {
        blocks: {
          eyebrow: 'Project structure',
          title: 'Sixteen thematic blocks',
          lead: 'A complete documentation pack — from technical specifications to a Governance Pack and a Compliance Matrix',
          c01_title: 'Technical Documentation', c01_desc: 'Concept, functional and non-functional requirements, DLT register of DFAs, architecture diagrams, development roadmap',
          c02_title: 'Legal Foundation', c02_desc: '259-FZ wedge via VEB.RF / Gazprombank / MinEcon / Atomyze, Stage 1 / Stage 2, pre-meeting briefs, JSC incorporation',
          c03_title: 'Financial Model', c03_desc: 'SoT v3: NPV 51.2 / IRR 62% / WACC 30% / EM 12× / Payback 2.8. Monte Carlo, sensitivity, tornado, multi-stage TV',
          c04_title: 'Business Plan', c04_desc: 'Wedge-pilot-light, GTM sequencing, Champion-map, unit economics, 2026-2034 roadmap',
          c05_title: 'Brand Book', c05_desc: 'Palette, typography, logo, applications, exclusion zone',
          c07_title: 'Presentations', c07_desc: 'Pitch deck RU/EN (a16z canon), CBR Report, pre-meeting briefs, one-pager',
          c08_title: 'Web Site', c08_desc: 'Public project page, SEO markup, applications and contacts',
          c09_title: 'Mobile Application', c09_desc: 'PWA installable + Capacitor v6+, specification, design docs (API, data model), Vitest / Playwright / Appium',
          c10_title: 'Promotional Materials', c10_desc: 'Brochures, banners, social-media kit, ATL/BTL',
          c11_title: 'International Valuation', c11_desc: 'DCF, multiples, scenarios, fairness benchmark vs tier-1 fintech',
          c12_title: 'DD Report', c12_desc: 'Stakeholder map, Government Champions, regulatory environment, risks, mitigants',
          c13_title: 'Expertise', c13_desc: 'Expert opinion on the substance of the project',
          c14_title: 'Summary Audit · 9.22 / 10', c14_desc: 'Post-Horizon-III: A·Tech / B·Legal / C·Fin / D·Strat / E·Design / F·QA / G·International',
          c15_title: 'RFP for External Verification', c15_desc: 'Big-4 Vendor DD, Legal Opinion, IT certification (FSTEC → ISO 27001 → SOC 2), Market Study',
          c16_title: 'Governance and Compliance', c16_desc: 'Board 3/5 independent, 4 committees, Code of Conduct, ESG (SASB+TCFD), Compliance Matrix 12×75',
          c17_title: 'Data Room', c17_desc: 'VDR structure 10 sections × ~75 documents in Intralinks/Datasite canon, permission tiers',
          arrow: 'Open'
        },
        champion: {
          eyebrow: 'Government Champions',
          title: 'Stage-1 Champion Map',
          lead: 'Six institutional partners powering the wedge launch through the existing 259-FZ framework',
          c1_name: 'M. G. Reshetnikov', c1_role: 'Minister', c1_org: 'Ministry of Economic Development of the RF · SZPK circuit',
          c2_name: 'V. V. Kolychev', c2_role: 'Deputy Minister', c2_org: 'Ministry of Finance of the RF · budget circuit',
          c3_name: 'A. V. Sazanov', c3_role: 'State Secretary — Deputy Minister', c3_org: 'Ministry of Finance of the RF · DFA and tax regime',
          c4_name: 'A. G. Aksakov', c4_role: 'Committee Chairman', c4_org: 'State Duma of the RF · financial markets',
          c5_name: 'R. N. Minnikhanov', c5_role: 'Rais (Head)', c5_org: 'Republic of Tatarstan · pilot region',
          c6_name: 'A. V. Moor', c6_role: 'Governor', c6_org: 'Tyumen Region · pilot region'
        },
        audit: {
          eyebrow: 'Composite Audit',
          title: 'Post-Horizon III · 9.22 / 10',
          lead: 'Series A institutional-ready. 12 of 12 RED items closed; 27 of 33 AMBER closed. Tier-1 fintech benchmarks confirmed.'
        }
      },
      ticker: { live: 'Live' },
      footer: {
        tagline: 'CPFSR.RF — sovereign in mandate, private in execution.',
        contact: 'Contact',
        documents: 'Documents',
        verification: 'External verification',
        language_region: 'Language & region',
        rights: '© 2026 A.-Kh. A. Kagirov · Center Group Company · Deposit certificate No. 4011265 of 19.12.2024',
        engagement: 'Engagement reference: CPFSR-RF-DESIGN-2026'
      }
    },

    /* ===================== FRANÇAIS ===================== */
    /* Registre : VC institutionnels, family offices francophones (Paris, Genève, Luxembourg, Montréal, Casablanca) */
    fr: {
      _meta: { lang: 'fr', dir: 'ltr', name: 'Français', flag: '🇫🇷' },
      brand: {
        short: 'CPFSR.RF',
        name: 'Plateforme numérique de financement du développement social',
        tagline: 'Infrastructure institutionnelle du capital à impact social · pré-amorçage à Série A'
      },
      nav: {
        home: 'Accueil',
        concept: 'Concept',
        tech: 'Technologie',
        legal: 'Cadre juridique',
        finance: 'Modèle financier',
        valuation: 'Valorisation',
        business: 'Plan d’affaires',
        dd: 'Due diligence',
        expertise: 'Avis d’expert',
        audit: 'Audit',
        presentations: 'Présentations',
        design: 'Design',
        brand: 'Charte graphique',
        mobile: 'Application mobile',
        dataroom: 'Data room',
        governance: 'Gouvernance',
        rfp: 'Appels d’offres',
        sitemap: 'Plan du site'
      },
      actions: {
        open: 'Ouvrir',
        download: 'Télécharger',
        back_to_top: 'Haut de page',
        back_to_home: 'Retour à l’accueil',
        more: 'En savoir plus',
        menu: 'Menu',
        close: 'Fermer',
        search: 'Rechercher',
        language: 'Langue',
        theme: 'Thème'
      },
      themes: { light: 'Clair', dark: 'Sombre', sepia: 'Sépia' },
      hero: {
        eyebrow: 'Plateforme numérique · pré-amorçage → Série A',
        title_p1: 'Une infrastructure institutionnelle',
        title_em: 'pour le financement du développement social',
        title_p2: ' au titre des accords SZPK et de la loi fédérale 259-FZ',
        lead: 'Un point d’entrée porté par l’alliance VEB.RF / Gazprombank / ministère du Développement économique / Atomyze. Valorisation post-money de référence : 95 M USD ; TRI investisseur de 62 % ; VAN de 51,2 Md ₽. Architecture en deux temps : un Pilot Light dans le cadre existant 259-FZ, montant ensuite vers le périmètre cible.',
        cta_main: 'Pitch deck investisseurs',
        cta_secondary: 'Note pour la Banque centrale de Russie'
      },
      kpi: {
        npv: 'VAN (cas de base)',
        irr: 'TRI niveau investisseur',
        wacc: 'Taux d’actualisation (CMPC)',
        payback: 'Retour sur investissement',
        postmoney: 'Post-money (base)',
        stake: 'Part du tour'
      },
      sections: {
        blocks: {
          eyebrow: 'Structure du projet',
          title: 'Seize blocs thématiques',
          lead: 'Un dossier documentaire complet — des spécifications techniques au Governance Pack et à la matrice de conformité',
          c01_title: 'Documentation technique', c01_desc: 'Concept, exigences fonctionnelles et non fonctionnelles, registre DLT des AFN, diagrammes d''architecture, feuille de route',
          c02_title: 'Fondement juridique', c02_desc: 'Wedge FZ-259 via VEB.RF / Gazprombank / MinEco / Atomyze, étape 1 / 2, briefs pré-réunion, constitution SA',
          c03_title: 'Modèle financier', c03_desc: 'SoT v3 : NPV 51,2 / IRR 62 % / WACC 30 % / EM 12× / Payback 2,8. Monte Carlo, sensibilité, tornado, TV multi-étapes',
          c04_title: 'Plan d''affaires', c04_desc: 'Wedge-pilot-light, séquençage GTM, Champion-map, unit economics, feuille de route 2026-2034',
          c05_title: 'Brand book', c05_desc: 'Palette, typographie, logo, applications, zone d''exclusion',
          c07_title: 'Présentations', c07_desc: 'Pitch deck RU/EN (canon a16z), rapport pour la BdR, briefs pré-réunion, one-pager',
          c08_title: 'Site web', c08_desc: 'Page publique du projet, balisage SEO, demandes et contacts',
          c09_title: 'Application mobile', c09_desc: 'PWA installable + Capacitor v6+, spécification, documentation de conception (API, modèle de données), Vitest / Playwright / Appium',
          c10_title: 'Matériels promotionnels', c10_desc: 'Brochures, bannières, social-media kit, ATL/BTL',
          c11_title: 'Évaluation internationale', c11_desc: 'DCF, multiples, scénarios, benchmark d''équité vs fintech tier-1',
          c12_title: 'Rapport DD', c12_desc: 'Carte des parties prenantes, Government Champions, environnement réglementaire, risques, mitigants',
          c13_title: 'Expertise', c13_desc: 'Avis d''expert sur le fond du projet',
          c14_title: 'Audit synthétique · 9,22 / 10', c14_desc: 'Post-Horizon-III : A·Tech / B·Legal / C·Fin / D·Strat / E·Design / F·QA / G·International',
          c15_title: 'RFP pour vérification externe', c15_desc: 'Big-4 Vendor DD, Legal Opinion, certification IT (FSTEC → ISO 27001 → SOC 2), Market Study',
          c16_title: 'Gouvernance et conformité', c16_desc: 'Conseil 3/5 indépendants, 4 comités, Code of Conduct, ESG (SASB+TCFD), Compliance Matrix 12×75',
          c17_title: 'Data room', c17_desc: 'Structure VDR 10 sections × ~75 documents selon le canon Intralinks/Datasite, permission tiers',
          arrow: 'Ouvrir'
        },
        champion: {
          eyebrow: 'Champions gouvernementaux',
          title: 'Carte des champions · Étape 1',
          lead: 'Six partenaires institutionnels pour amorcer le wedge dans le cadre 259-FZ existant',
          c1_name: 'M. G. Rechetnikov', c1_role: 'Ministre', c1_org: 'Ministère du Développement économique de la FR · circuit SZPK',
          c2_name: 'V. V. Kolytchev', c2_role: 'Vice-ministre', c2_org: 'Ministère des Finances de la FR · circuit budgétaire',
          c3_name: 'A. V. Sazanov', c3_role: "Secrétaire d'État — Vice-ministre", c3_org: 'Ministère des Finances de la FR · AFN et régime fiscal',
          c4_name: 'A. G. Aksakov', c4_role: 'Président de la commission', c4_org: "Douma d'État de la FR · marchés financiers",
          c5_name: 'R. N. Minnikhanov', c5_role: 'Raïs (Chef)', c5_org: 'République du Tatarstan · région pilote',
          c6_name: 'A. V. Moor', c6_role: 'Gouverneur', c6_org: 'Région de Tioumen · région pilote'
        },
        audit: {
          eyebrow: 'Audit consolidé',
          title: 'Post-Horizon III · 9,22 / 10',
          lead: 'Prêt pour une Série A institutionnelle. 12 / 12 points RED traités ; 27 / 33 AMBER traités. Indicateurs Tier-1 fintech confirmés.'
        }
      },
      ticker: { live: 'En direct' },
      footer: {
        tagline: 'CPFSR.RF — souverain dans son mandat, privé dans son exécution.',
        contact: 'Contact',
        documents: 'Documents',
        verification: 'Vérification externe',
        language_region: 'Langue et région',
        rights: '© 2026 A.-Kh. A. Kaguirov · Center Group Company · certificat de dépôt n° 4011265 du 19.12.2024',
        engagement: 'Référence engagement : CPFSR-RF-DESIGN-2026'
      }
    },

    /* ===================== العربية ===================== */
    /* السجل: فصحى استثمارية رفيعة، موجَّهة إلى المستثمرين المؤسسيين في دول مجلس التعاون الخليجي والشرق الأوسط */
    ar: {
      _meta: { lang: 'ar', dir: 'rtl', name: 'العربية', flag: '🇸🇦' },
      brand: {
        short: 'CPFSR.RF',
        name: 'المنصة الرقمية لتمويل التنمية الاجتماعية',
        tagline: 'بنية تحتية مؤسسية لرأس المال ذي الأثر الاجتماعي · من مرحلة ما قبل التأسيس حتى الجولة A'
      },
      nav: {
        home: 'الرئيسية',
        concept: 'المفهوم',
        tech: 'التقنية',
        legal: 'الإطار القانوني',
        finance: 'النموذج المالي',
        valuation: 'التقييم',
        business: 'خطة العمل',
        dd: 'العناية الواجبة',
        expertise: 'رأي الخبير',
        audit: 'التدقيق',
        presentations: 'العروض التقديمية',
        design: 'التصميم',
        brand: 'دليل الهوية',
        mobile: 'تطبيق الجوال',
        dataroom: 'غرفة البيانات',
        governance: 'الحوكمة',
        rfp: 'طلبات العروض',
        sitemap: 'خريطة الموقع'
      },
      actions: {
        open: 'فتح',
        download: 'تنزيل',
        back_to_top: 'إلى الأعلى',
        back_to_home: 'إلى الرئيسية',
        more: 'اقرأ المزيد',
        menu: 'القائمة',
        close: 'إغلاق',
        search: 'بحث',
        language: 'اللغة',
        theme: 'السمة'
      },
      themes: { light: 'فاتح', dark: 'داكن', sepia: 'بنّي' },
      hero: {
        eyebrow: 'المنصة الرقمية · ما قبل التأسيس → الجولة A',
        title_p1: 'بنية تحتية مؤسسية',
        title_em: 'لتمويل التنمية الاجتماعية',
        title_p2: ' بموجب اتفاقيات SZPK والقانون الاتحادي 259-FZ',
        lead: 'منصة دخول مدعومة بتحالف يضم VEB.RF وبنك غازبروم ووزارة التنمية الاقتصادية وأتومايز. القيمة الأساسية بعد الاستثمار 95 مليون دولار أمريكي، ومعدل العائد الداخلي على مستوى المستثمر 62٪، وصافي القيمة الحالية 51.2 مليار روبل. بنية على مرحلتين: ضوء تجريبي ضمن إطار 259-FZ القائم، ثم التوسّع إلى المحيط المستهدف.',
        cta_main: 'العرض التقديمي للمستثمرين',
        cta_secondary: 'مذكرة موجَّهة إلى البنك المركزي الروسي'
      },
      kpi: {
        npv: 'صافي القيمة الحالية (الحالة الأساسية)',
        irr: 'معدل العائد الداخلي للمستثمر',
        wacc: 'معدل الخصم (WACC)',
        payback: 'فترة الاسترداد',
        postmoney: 'بعد الاستثمار (الأساسي)',
        stake: 'حصة الجولة'
      },
      sections: {
        blocks: {
          eyebrow: 'هيكل المشروع',
          title: 'ست عشرة كتلة موضوعية',
          lead: 'حزمة وثائقية متكاملة — من المواصفات التقنية إلى حزمة الحوكمة ومصفوفة الامتثال',
          c01_title: 'الوثائق التقنية', c01_desc: 'المفهوم، المتطلبات الوظيفية وغير الوظيفية، سجل DLT لـ DFA، المخططات المعمارية، خارطة الطريق',
          c02_title: 'الأساس القانوني', c02_desc: 'wedge FZ-259 عبر VEB.RF / Gazprombank / وزارة الاقتصاد / Atomyze، المرحلة 1 / 2، إحاطات قبل الاجتماع، تأسيس شركة مساهمة',
          c03_title: 'النموذج المالي', c03_desc: 'SoT v3: NPV 51,2 / IRR 62% / WACC 30% / EM 12× / Payback 2,8. Monte Carlo، الحساسية، tornado، TV متعدد المراحل',
          c04_title: 'خطة العمل', c04_desc: 'Wedge-pilot-light، تسلسل GTM، خريطة الرعاة، اقتصاديات الوحدة، خارطة الطريق 2026-2034',
          c05_title: 'دليل الهوية', c05_desc: 'لوحة الألوان، الطباعة، الشعار، التطبيقات، منطقة الحماية',
          c07_title: 'العروض التقديمية', c07_desc: 'Pitch deck RU/EN (معيار a16z)، تقرير لبنك روسيا، إحاطات قبل الاجتماع، one-pager',
          c08_title: 'الموقع الإلكتروني', c08_desc: 'الصفحة العامة للمشروع، ترميز SEO، الطلبات والاتصالات',
          c09_title: 'تطبيق الهاتف المحمول', c09_desc: 'PWA installable + Capacitor v6+، المواصفات، الوثائق التصميمية (API، نموذج البيانات)، Vitest / Playwright / Appium',
          c10_title: 'المواد الترويجية', c10_desc: 'الكتيبات، اللافتات، مجموعة وسائل التواصل الاجتماعي، ATL/BTL',
          c11_title: 'التقييم الدولي', c11_desc: 'DCF، المضاعفات، السيناريوهات، معيار العدالة مقابل fintech tier-1',
          c12_title: 'تقرير DD', c12_desc: 'خريطة أصحاب المصلحة، الرعاة الحكوميون، البيئة التنظيمية، المخاطر، التخفيفات',
          c13_title: 'الخبرة', c13_desc: 'رأي الخبير بشأن جوهر المشروع',
          c14_title: 'التدقيق المُلخَّص · 9,22 / 10', c14_desc: 'ما بعد-Horizon-III: A·Tech / B·Legal / C·Fin / D·Strat / E·Design / F·QA / G·International',
          c15_title: 'RFP للتحقق الخارجي', c15_desc: 'Big-4 Vendor DD، Legal Opinion، اعتماد IT (FSTEC → ISO 27001 → SOC 2)، Market Study',
          c16_title: 'الحوكمة والامتثال', c16_desc: 'مجلس 3/5 مستقلون، 4 لجان، Code of Conduct، ESG (SASB+TCFD)، Compliance Matrix 12×75',
          c17_title: 'Data room', c17_desc: 'هيكل VDR من 10 أقسام × ~75 مستنداً وفق معيار Intralinks/Datasite، طبقات الصلاحيات',
          arrow: 'فتح'
        },
        champion: {
          eyebrow: 'الرعاة الحكوميون',
          title: 'خريطة الرعاة · المرحلة 1',
          lead: 'ستة شركاء مؤسسيين لانطلاق نقطة الدخول ضمن إطار 259-FZ القائم',
          c1_name: 'م. غ. ريشيتنيكوف', c1_role: 'وزير', c1_org: 'وزارة التنمية الاقتصادية للاتحاد الروسي · دائرة SZPK',
          c2_name: 'ف. ف. كولوتشيف', c2_role: 'نائب الوزير', c2_org: 'وزارة المالية للاتحاد الروسي · الدائرة الميزانية',
          c3_name: 'أ. ف. سازانوف', c3_role: 'وزير الدولة — نائب الوزير', c3_org: 'وزارة المالية للاتحاد الروسي · DFA والنظام الضريبي',
          c4_name: 'أ. غ. أكساكوف', c4_role: 'رئيس اللجنة', c4_org: 'مجلس الدوما للاتحاد الروسي · الأسواق المالية',
          c5_name: 'ر. ن. منيخانوف', c5_role: 'الرئيس', c5_org: 'جمهورية تتارستان · المنطقة التجريبية',
          c6_name: 'أ. ف. مور', c6_role: 'المحافظ', c6_org: 'منطقة تيومين · المنطقة التجريبية'
        },
        audit: {
          eyebrow: 'التدقيق الموحَّد',
          title: 'ما بعد الأفق الثالث · 9.22 / 10',
          lead: 'جاهزية مؤسسية للجولة A. أُغلق 12 من 12 بنداً أحمر، وأُغلق 27 من 33 بنداً كهرمانيّاً. مؤشرات Tier-1 fintech مؤكَّدة.'
        }
      },
      ticker: { live: 'مباشر' },
      footer: {
        tagline: 'CPFSR.RF — سيادية في تفويضها، خاصة في تنفيذها.',
        contact: 'التواصل',
        documents: 'الوثائق',
        verification: 'التحقق الخارجي',
        language_region: 'اللغة والمنطقة',
        rights: '© 2026 أ.-خ. أ. كاغيروف · Center Group Company · شهادة الإيداع رقم 4011265 بتاريخ 19.12.2024',
        engagement: 'مرجع التكليف: CPFSR-RF-DESIGN-2026'
      }
    }

  };
})();
