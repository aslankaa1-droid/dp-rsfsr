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
        lead: 'Wedge через альянс институт развития / банк-партнёр / профильное министерство / оператор 779-П. Базовая оценка post-money 273 млн долл. США, окупаемость 2,73 года, стоимость бизнеса 63,0 млрд ₽. Двухстадийная архитектура: Pilot Light в действующем 259-ФЗ → целевой контур.',
        cta_main: 'Презентация для инвесторов',
        cta_secondary: 'Доклад для Банка России'
      },
      kpi: {
        npv: 'Стоимость бизнеса',
        irr: 'Кратность для инвестора',
        wacc: 'Ставка дисконтирования',
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
          c02_title: 'Юридический фундамент', c02_desc: '259-ФЗ wedge через институт развития / банк-партнёр / профильное министерство / оператор 779-П, Stage 1 / Stage 2, pre-meeting briefs, учреждение АО',
          c03_title: 'Финансовая модель', c03_desc: 'свод показателей v5: 63,0 / окупаемость 2,73 года / WACC 29,58 % / кратность 18,4× / Payback 2,73. Monte Carlo, sensitivity, tornado, multi-stage TV',
          c04_title: 'Бизнес-план', c04_desc: 'Wedge-pilot-light, GTM-sequencing, Champion-map, unit-экономика, дорожная карта 2027-2036',
          c05_title: 'Бренд-бук', c05_desc: 'Палитра, типографика, логотип, применения, охранное поле',
          c07_title: 'Презентации', c07_desc: 'Pitch deck RU/EN (a16z канон), Доклад для ЦБ РФ, Pre-meeting briefs, One-pager',
          c08_title: 'Веб-сайт', c08_desc: 'Публичная страница проекта, SEO-разметка, заявки и контакты',
          c09_title: 'Мобильное приложение', c09_desc: 'PWA installable + Capacitor v6+, спецификация, КД (API, модель данных), Vitest / Playwright / Appium',
          c10_title: 'Рекламные материалы', c10_desc: 'Буклеты, баннеры, social-media kit, ATL/BTL',
          c11_title: 'Международная оценка', c11_desc: 'DCF, мультипликаторы, scenarios, fairness benchmark vs tier-1 fintech',
          c12_title: 'DD-отчёт', c12_desc: 'Stakeholder map, Government Champions, регуляторное окружение, риски, mitigants',
          c13_title: 'Экспертиза', c13_desc: 'Экспертное заключение по существу проекта',
          c14_title: 'Аудит и ревизия', c14_desc: 'Ревизия финансовой части 07.09.2026 и сводные аудиты 24.05.2026',
          c15_title: 'RFP для внешней верификации', c15_desc: 'Big-4 Vendor DD, Legal Opinion, IT-сертификация (ФСТЭК → ISO 27001 → SOC 2), Market Study',
          c16_title: 'Governance и Compliance', c16_desc: 'Совет директоров 3/5 независимых, 4 комитета, Code of Conduct, ESG (SASB+TCFD), Compliance Matrix 12×75',
          c17_title: 'Data room', c17_desc: 'VDR-структура 10 разделов × ~75 документов в каноне Intralinks/Datasite, permission tiers',
          arrow: 'Открыть'
        },
        champion: {
          eyebrow: 'Government Relations',
          title: 'Карта согласований · Stage 1',
          lead: 'Шесть институциональных контуров для wedge-старта через действующий 259-ФЗ',
          c1_name: 'Минэкономразвития РФ', c1_role: 'Профильное министерство', c1_org: 'СЗПК-контур · нацпроекты',
          c2_name: 'Минфин РФ', c2_role: 'Бюджетный блок', c2_org: 'Внебюджетный канал финансирования',
          c3_name: 'Минфин РФ', c3_role: 'Налоговый блок', c3_org: 'Налоговый режим ЦФА',
          c4_name: 'Госдума РФ', c4_role: 'Комитет по фин. рынку', c4_org: 'Законодательный контур 259-ФЗ',
          c5_name: 'Пилотный регион', c5_role: 'Субъект РФ', c5_org: 'Первый пилот размещений',
          c6_name: 'Пилотный регион', c6_role: 'Субъект РФ (резерв)', c6_org: 'Резервный пилот'
        },
        audit: {
          eyebrow: 'Сводный аудит',
          title: 'Ревизия финансовой части · 07.09.2026',
          lead: 'Финансовая модель пересчитана заново и переведена на расчётный движок: один набор допущений, документы собираются из него, сходимость проверяется автоматически. Устранены двадцать расхождений прежних редакций.'
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
        lead: 'A wedge anchored by VEB.RF, partner bank, the Ministry of Economic Development, and Atomyze. Base post-money valuation of USD 95M, investor-level IRR of 62 %, NPV of RUB 51.2 bn. A two-stage architecture: a Pilot Light inside the existing 259-FZ framework, scaling into the target perimeter.',
        cta_main: 'Investor pitch deck',
        cta_secondary: 'Briefing for the Bank of Russia'
      },
      kpi: {
        npv: 'Enterprise value',
        irr: 'Investor return multiple',
        wacc: 'Discount rate',
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
          c02_title: 'Legal Foundation', c02_desc: '259-FZ wedge via VEB.RF / partner bank / MinEcon / Atomyze, Stage 1 / Stage 2, pre-meeting briefs, JSC incorporation',
          c03_title: 'Financial Model', c03_desc: 'свод показателей v5: 63.0 / payback 2.73 yrs / WACC 29,58% / multiple 18.4x / Payback 2.8. Monte Carlo, sensitivity, tornado, multi-stage TV',
          c04_title: 'Business Plan', c04_desc: 'Wedge-pilot-light, GTM sequencing, Champion-map, unit economics, 2027-2036 roadmap',
          c05_title: 'Brand Book', c05_desc: 'Palette, typography, logo, applications, exclusion zone',
          c07_title: 'Presentations', c07_desc: 'Pitch deck RU/EN (a16z canon), CBR Report, pre-meeting briefs, one-pager',
          c08_title: 'Web Site', c08_desc: 'Public project page, SEO markup, applications and contacts',
          c09_title: 'Mobile Application', c09_desc: 'PWA installable + Capacitor v6+, specification, design docs (API, data model), Vitest / Playwright / Appium',
          c10_title: 'Promotional Materials', c10_desc: 'Brochures, banners, social-media kit, ATL/BTL',
          c11_title: 'International Valuation', c11_desc: 'DCF, multiples, scenarios, fairness benchmark vs tier-1 fintech',
          c12_title: 'DD Report', c12_desc: 'Stakeholder map, Government Champions, regulatory environment, risks, mitigants',
          c13_title: 'Expertise', c13_desc: 'Expert opinion on the substance of the project',
          c14_title: 'Audit and revision', c14_desc: 'Post-Horizon-III: A·Tech / B·Legal / C·Fin / D·Strat / E·Design / F·QA / G·International',
          c15_title: 'RFP for External Verification', c15_desc: 'Big-4 Vendor DD, Legal Opinion, IT certification (FSTEC → ISO 27001 → SOC 2), Market Study',
          c16_title: 'Governance and Compliance', c16_desc: 'Board 3/5 independent, 4 committees, Code of Conduct, ESG (SASB+TCFD), Compliance Matrix 12×75',
          c17_title: 'Data Room', c17_desc: 'VDR structure 10 sections × ~75 documents in Intralinks/Datasite canon, permission tiers',
          arrow: 'Open'
        },
        champion: {
          eyebrow: 'Government Relations',
          title: 'Stage-1 Approval Map',
          lead: 'Six institutional circuits powering the wedge launch through the existing 259-FZ framework',
          c1_name: 'Ministry of Economic Development', c1_role: 'Sectoral ministry', c1_org: 'SZPK circuit · national projects',
          c2_name: 'Ministry of Finance', c2_role: 'Budget unit', c2_org: 'Off-budget financing channel',
          c3_name: 'Ministry of Finance', c3_role: 'Tax unit', c3_org: 'CFA tax regime',
          c4_name: 'State Duma', c4_role: 'Financial Market Committee', c4_org: '259-FZ legislative circuit',
          c5_name: 'Pilot region', c5_role: 'RF subject', c5_org: 'First placement pilot',
          c6_name: 'Pilot region', c6_role: 'RF subject (reserve)', c6_org: 'Reserve pilot'
        },
        audit: {
          eyebrow: 'Composite Audit',
          title: 'Financial revision · 07.09.2026',
          lead: 'The financial model has been rebuilt as a calculation engine: a single set of assumptions, documents generated from it, convergence checked automatically. Twenty inconsistencies of earlier editions have been removed.'
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
        lead: 'Un point d’entrée porté par l’alliance VEB.RF / partner bank / ministère du Développement économique / Atomyze. Valorisation post-money de référence : 95 M USD ; TRI investisseur de 62 % ; VAN de 51,2 Md ₽. Architecture en deux temps : un Pilot Light dans le cadre existant 259-FZ, montant ensuite vers le périmètre cible.',
        cta_main: 'Pitch deck investisseurs',
        cta_secondary: 'Note pour la Banque centrale de Russie'
      },
      kpi: {
        npv: 'Valeur de l’entreprise',
        irr: 'Multiple pour l’investisseur',
        wacc: 'Taux d’actualisation',
        payback: 'Retour sur investissement',
        postmoney: 'Post-money (base)',
        stake: 'Part du tour'
      },
      sections: {
        blocks: {
          eyebrow: 'Structure du projet',
          title: 'Seize blocs thématiques',
          lead: 'Un dossier documentaire complet — des spécifications techniques au Governance Pack et à la matrice de conformité',
          c01_title: 'Documentation technique', c01_desc: "Concept, exigences fonctionnelles et non fonctionnelles, registre DLT des AFN, diagrammes d'architecture, feuille de route",
          c02_title: 'Fondement juridique', c02_desc: 'Wedge FZ-259 via VEB.RF / partner bank / MinEco / Atomyze, étape 1 / 2, briefs pré-réunion, constitution SA',
          c03_title: 'Modèle financier', c03_desc: 'свод показателей v5 : 63,0 / amortissement 2,73 ans / WACC 29,58 % / multiple 18.4x / Payback 2,73. Monte Carlo, sensibilité, tornado, TV multi-étapes',
          c04_title: "Plan d'affaires", c04_desc: 'Wedge-pilot-light, séquençage GTM, Champion-map, unit economics, feuille de route 2027-2036',
          c05_title: 'Brand book', c05_desc: "Palette, typographie, logo, applications, zone d'exclusion",
          c07_title: 'Présentations', c07_desc: 'Pitch deck RU/EN (canon a16z), rapport pour la BdR, briefs pré-réunion, one-pager',
          c08_title: 'Site web', c08_desc: 'Page publique du projet, balisage SEO, demandes et contacts',
          c09_title: 'Application mobile', c09_desc: 'PWA installable + Capacitor v6+, spécification, documentation de conception (API, modèle de données), Vitest / Playwright / Appium',
          c10_title: 'Matériels promotionnels', c10_desc: 'Brochures, bannières, social-media kit, ATL/BTL',
          c11_title: 'Évaluation internationale', c11_desc: "DCF, multiples, scénarios, benchmark d'équité vs fintech tier-1",
          c12_title: 'Rapport DD', c12_desc: 'Carte des parties prenantes, Government Champions, environnement réglementaire, risques, mitigants',
          c13_title: 'Expertise', c13_desc: "Avis d'expert sur le fond du projet",
          c14_title: 'Audit et révision', c14_desc: 'Post-Horizon-III : A·Tech / B·Legal / C·Fin / D·Strat / E·Design / F·QA / G·International',
          c15_title: 'RFP pour vérification externe', c15_desc: 'Big-4 Vendor DD, Legal Opinion, certification IT (FSTEC → ISO 27001 → SOC 2), Market Study',
          c16_title: 'Gouvernance et conformité', c16_desc: 'Conseil 3/5 indépendants, 4 comités, Code of Conduct, ESG (SASB+TCFD), Compliance Matrix 12×75',
          c17_title: 'Data room', c17_desc: 'Structure VDR 10 sections × ~75 documents selon le canon Intralinks/Datasite, permission tiers',
          arrow: 'Ouvrir'
        },
        champion: {
          eyebrow: 'Relations gouvernementales',
          title: 'Carte des approbations · Étape 1',
          lead: 'Six circuits institutionnels pour amorcer le wedge dans le cadre 259-FZ existant',
          c1_name: 'Ministère du Développement économique', c1_role: 'Ministère sectoriel', c1_org: 'circuit SZPK · projets nationaux',
          c2_name: 'Ministère des Finances', c2_role: 'Direction du budget', c2_org: 'canal de financement hors-budget',
          c3_name: 'Ministère des Finances', c3_role: 'Direction fiscale', c3_org: 'régime fiscal AFN',
          c4_name: "Douma d'État", c4_role: 'Commission du marché financier', c4_org: 'circuit législatif 259-FZ',
          c5_name: 'Région pilote', c5_role: 'Sujet de la FR', c5_org: 'Premier pilote de placements',
          c6_name: 'Région pilote', c6_role: 'Sujet de la FR (réserve)', c6_org: 'Pilote de réserve'
        },
        audit: {
          eyebrow: 'Audit consolidé',
          title: 'Révision financière · 07.09.2026',
          lead: 'Le modèle financier a été recalculé et confié à un moteur de calcul : un seul jeu d’hypothèses, des documents générés à partir de celui-ci, une vérification automatique de la cohérence. Vingt incohérences des éditions précédentes ont été corrigées.'
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
        lead: 'منصة دخول مدعومة بتحالف يضم VEB.RF وبنك غازبروم ووزارة التنمية الاقتصادية وأتومايز. القيمة الأساسية بعد الاستثمار 273 مليون دولار أمريكي، ومعدل العائد الداخلي على مستوى المستثمر 62٪، وصافي القيمة الحالية 51.2 مليار روبل. بنية على مرحلتين: ضوء تجريبي ضمن إطار 259-FZ القائم، ثم التوسّع إلى المحيط المستهدف.',
        cta_main: 'العرض التقديمي للمستثمرين',
        cta_secondary: 'مذكرة موجَّهة إلى البنك المركزي الروسي'
      },
      kpi: {
        npv: 'قيمة المشروع',
        irr: 'مضاعف عائد المستثمر',
        wacc: 'معدل الخصم',
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
          c02_title: 'الأساس القانوني', c02_desc: 'wedge FZ-259 عبر VEB.RF / partner bank / وزارة الاقتصاد / Atomyze، المرحلة 1 / 2، إحاطات قبل الاجتماع، تأسيس شركة مساهمة',
          c03_title: 'النموذج المالي', c03_desc: 'свод показателей v5: 63,0 / فترة الاسترداد 2.73 سنة / WACC 29,58% / مضاعف 18.4x / Payback 2,73. Monte Carlo، الحساسية، tornado، TV متعدد المراحل',
          c04_title: 'خطة العمل', c04_desc: 'Wedge-pilot-light، تسلسل GTM، خريطة الرعاة، اقتصاديات الوحدة، خارطة الطريق 2027-2036',
          c05_title: 'دليل الهوية', c05_desc: 'لوحة الألوان، الطباعة، الشعار، التطبيقات، منطقة الحماية',
          c07_title: 'العروض التقديمية', c07_desc: 'Pitch deck RU/EN (معيار a16z)، تقرير لبنك روسيا، إحاطات قبل الاجتماع، one-pager',
          c08_title: 'الموقع الإلكتروني', c08_desc: 'الصفحة العامة للمشروع، ترميز SEO، الطلبات والاتصالات',
          c09_title: 'تطبيق الهاتف المحمول', c09_desc: 'PWA installable + Capacitor v6+، المواصفات، الوثائق التصميمية (API، نموذج البيانات)، Vitest / Playwright / Appium',
          c10_title: 'المواد الترويجية', c10_desc: 'الكتيبات، اللافتات، مجموعة وسائل التواصل الاجتماعي، ATL/BTL',
          c11_title: 'التقييم الدولي', c11_desc: 'DCF، المضاعفات، السيناريوهات، معيار العدالة مقابل fintech tier-1',
          c12_title: 'تقرير DD', c12_desc: 'خريطة أصحاب المصلحة، الرعاة الحكوميون، البيئة التنظيمية، المخاطر، التخفيفات',
          c13_title: 'الخبرة', c13_desc: 'رأي الخبير بشأن جوهر المشروع',
          c14_title: 'التدقيق والمراجعة', c14_desc: 'ما بعد-Horizon-III: A·Tech / B·Legal / C·Fin / D·Strat / E·Design / F·QA / G·International',
          c15_title: 'RFP للتحقق الخارجي', c15_desc: 'Big-4 Vendor DD، Legal Opinion، اعتماد IT (FSTEC → ISO 27001 → SOC 2)، Market Study',
          c16_title: 'الحوكمة والامتثال', c16_desc: 'مجلس 3/5 مستقلون، 4 لجان، Code of Conduct، ESG (SASB+TCFD)، Compliance Matrix 12×75',
          c17_title: 'Data room', c17_desc: 'هيكل VDR من 10 أقسام × ~75 مستنداً وفق معيار Intralinks/Datasite، طبقات الصلاحيات',
          arrow: 'فتح'
        },
        champion: {
          eyebrow: 'العلاقات الحكومية',
          title: 'خريطة الموافقات · المرحلة 1',
          lead: 'ستة مسارات مؤسسية لانطلاق نقطة الدخول ضمن إطار 259-FZ القائم',
          c1_name: 'وزارة التنمية الاقتصادية', c1_role: 'وزارة قطاعية', c1_org: 'دائرة SZPK · المشاريع الوطنية',
          c2_name: 'وزارة المالية', c2_role: 'إدارة الميزانية', c2_org: 'قناة تمويل خارج الميزانية',
          c3_name: 'وزارة المالية', c3_role: 'الإدارة الضريبية', c3_org: 'النظام الضريبي للأصول الرقمية',
          c4_name: 'مجلس الدوما', c4_role: 'لجنة السوق المالي', c4_org: 'الدائرة التشريعية 259-FZ',
          c5_name: 'منطقة تجريبية', c5_role: 'أحد أقاليم الاتحاد', c5_org: 'أول تجربة إصدار',
          c6_name: 'منطقة تجريبية', c6_role: 'أحد أقاليم الاتحاد (احتياطي)', c6_org: 'تجربة احتياطية'
        },
        audit: {
          eyebrow: 'التدقيق الموحَّد',
          title: 'مراجعة الجزء المالي · 07.09.2026',
          lead: 'أُعيد بناء النموذج المالي على محرك حسابي: مجموعة واحدة من الافتراضات، والوثائق تُولَّد منها، والاتساق يُفحص تلقائياً. جرى تصحيح عشرين تعارضاً من الإصدارات السابقة.'
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
