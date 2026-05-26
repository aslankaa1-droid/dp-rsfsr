# Audit consolidé post-Horizon II · CPFSR

**Date :** 24.05.2026 (édition du soir, après l'application de l'Horizon II)
**Objet :** `E:\Проекты Аслана\Приложение_РСФСР\ЦП РСФСР Исправленный\` (~255 fichiers, ~13 Mo)
**Composition du groupe :** 6 auditeurs indépendants tier-1, en parallèle, sans communication croisée.

## 1. Conclusion principale

L'Horizon II (≈ 6 heures de travail sur 30+ corrections) a apporté un **gain pondéré de score +0,6** — de 7,49 à **8,14 / 10**. **L'ensemble des 13 REDs de l'audit post-Horizon I est clos au moins au niveau des sources MD** (B-H1-1..5, B-NEW-13/14, C-H1-4/5/8/9/14, A-POST-9/11/12/13). Deltas par contour : F · QA +0,9 (7,8 → 8,7) · B · Legal +0,9 (7,4 → 8,3) · D · Strat +0,7 (7,7 → 8,4) · C · Fin +0,6 (5,9 → 6,5) · E · Design +0,5 (8,2 → 8,7) · A · Tech +0,3 (8,4 → 8,7).

Changements structurels qualitatifs :

1. **Les KPI financiers du périmètre client sont synchronisés** avec le SoT v3 : la vague sed F-H1 a clos 12 des 13 signatures-clés (VAN 51,2 / TRI 62 % / Payback 2,8 / CMPC 30 % / EM 12× / EBITDA TV 74,8 % / RF 15,5 % / ERP 9 %, post-money 95 M $, Reasoned 60–115 M $). Le bloc KPI du Plan d'affaires §3, §9.1 (« VAN 170,1 → 51,2 ») est clos ; la baseline JS `kpiNpv/kpiPayback` dans la Grande présentation est synchronisée ; le cover-stat de la brochure et l'entry-stat du index.html racine sont migrés vers le SoT v3.
2. **La base juridique est pleinement à deux étapes** : Cadre juridique §§ 4.1/4.2 + § 8.1–8.4 en MD+HTML ; al. 12.2 du CI dans Cadre_juridique.html et dans DD_report.md/html ; le plafond EULA de l'art. 16 de la loi de protection du consommateur est levé ; la politique de confidentialité avec le disclaimer Roskomnadzor ; le contrat d'entiercement — art. 860.7–860.10 CC + 395-1 sans énumération inexistante.
3. **Le Plan d'affaires §§ 1, 2.2, 3.1, 3.2, 3.4, 4.4, 4.5 réécrit en Étape 1 / Étape 2** en MD et HTML. La couture interne « Plan d'affaires sur l'Étape 2 » (RED de l'Horizon I) est éliminée.
4. **Une Champion-map nominale** (Réchetnikov / Kolytchev / Sazanov / Aksakov / Minnikhanov / Moor) est ajoutée dans Concept § 1-ter. **4 drafts LoI / MoU** dans `02_Юридический_фундамент/Pre-meeting_briefs/` (Atomyze / VEB.RF PFF / Tatarstan / Gazprombank).
5. **D-PR-6/7/11/12** — cannibalisation par le rouble numérique 340-FZ (3 scénarios + 3 mitigations), défense contre la copie par le régulateur (4 contours moat), bridge EBITDA 65 % → 74,8 % (3 facteurs), protection de l'auteur Kaguirov (4 mécanismes du Pacte d'actionnaires) — ajoutés dans le Plan d'affaires § 10/§ 11.3/§ 11.4 et Concept § 1-quater.
6. **finmodel.js:211 double-count** corrigé : la formule EM donne désormais un investor TVPI mathématiquement correct = (0,158 × VAN) / 1,335.
7. **Le calculateur interactif de la Grande présentation** — slider CMPC value=22 → 30 ; range min=15 max=30 → min=15 max=40.
8. **Emoji ☀ ☾ ★ ✓ → SVG inline** dans 37 fichiers HTML (sun/moon/star/check style Lucide avec `currentColor`) ; emoji-drapeaux 🇷🇺/🇬🇧/🇫🇷/🇸🇦 → codes ISO RU/EN/FR/AR dans les paramètres PWA.
9. **sitemap.xml hreflang** — 18 URL × 4 locales (vs 9 URL × 4).

La classe résiduelle principale est **« MD corrigé, HTML en retard »** (récurrente sur 5 des 6 contours — A, B, C, D, F) :

- **Modèle_financier.html non reconstruit** depuis le MD actualisé : :1316 VAN hors TV = 86 380 ; :1321 TV Gordon = 611 800 ; :1331 TRI hors TV ~226 % ; :1336 Payback 2,37 ; :1402-1407 Base = VAN 170 / 2,4 ; :1456+:1507 sensibilité Base = 170.
- **Évaluation_internationale.html en retard** sur .md de ~679 lignes : §2.5 EV(DCF) ≈ 183 Md ₽ / pre-money 540 M $ ; §7.1 baseline CMPC 21,5 %.
- **Modèle_financier_hypothèses.html §7.1 body** — titre « CMPC 30 % », corps « taux directeur 18 %+4=22 % » ; « build-up 26 % ».
- **Note_BCR.html** — § 10 non scindé en 10.1/10.2 ; conserve le texte pré-refactor « La BCR gère tous les comptes d'entiercement de l'émission ciblée » sans marqueur Étape 2.
- **Concept.html** (311 lignes) — sans 1-bis / 1-ter / 1-quater (les nouvelles sections n'existent qu'en .md).
- **Plan d'affaires.html nouvelles sections** § 11.3, § 11.4, nouvelles lignes risk-card § 10 (D-PR-6/7) — absentes du HTML.
- **08_Diagrammes_architecturaux.html:184-186** — mermaid avec RN+.NET MAUI (le MD est correctement Capacitor).

Tout cela est résolu en un seul pandoc pipeline pass. C'est la recommandation structurelle de l'Horizon III.

Deuxième catégorie — **dette méthodologique** :

- **C-H1-1** : arithmétique TV SoT v3 phases I+II = 7,4 Md ₽ vs defensible row-by-row selon la logique finmodel.js = 19,78 (×2,67 underestimate). EV DCF totale defensible = 63,38 Md ₽, pas 51,2. La décision a été reportée deux fois (Horizons II et III).
- **C-H1-2/-3** : TRI 62 % / Payback 2,8 « project-level » non reproductibles par la formule standard (defensible : TRI project ≈ 160 % ; TRI investisseur Y7 ≈ 30 %).
- **C-H1-13** : Monte-Carlo déclaré dans SoT § 9, non implémenté dans `finmodel.js`.
- **C-H2-3 (nouveau)** : EBITDA 2034 = 133,6 Md ₽ dans le Plan d'affaires §53 et Modèle_financier.html:1361 avec une marge déclarée de 74,8 % donne arithmétiquement une marge de 96,9 % (ancienne). Contradiction interne dans une cellule.

Troisième catégorie — **point fixes** :

- E-POST-4 régression : ☀ ☾ dans PWA Paramètres `09_…/index.html:1207-1208` (la vague sed n'a touché que le settings-panel 1414-1415).
- A-POST-H2-2/3/4 : .NET MAUI / React Native / Detox dans la Spécification §§ 5.2, 6.1, la Feuille de route M5.6, 02_Description_du_programme (sous-couverture H-I).
- B-NEW-12 : listes d'officiers 779-P dans l'incorporation JSC vs Cadre juridique (Horizon III).

Maturité de communication : **friendly + VC friendly + VEB.RF PFF — prêts ; investisseur stratégique friendly — prêt ; Gazprombank-DD / PSB-DD — conditionnellement prêt ; tier-1 VC — passe le screening initial et la data-room de 2 semaines ; la deep DD de semaines 3-4 nécessite le pass pandoc d'Horizon III + une décision méthodologique sur C-H1-1**. Horizon III (≈ 4-6 heures de travail) — prévision du score consolidé **9,0–9,5 / 10**.

## 2. Score pondéré moyen sur les 6 contours

| Contour | Poids | Score avant H-II | Score après H-II | Delta |
|---|---:|---:|---:|---:|
| A · Technique | 0,20 | 8,4 | **8,7** | **+0,3** |
| B · Juridique | 0,20 | 7,4 | **8,3** | **+0,9** |
| C · Financier | 0,20 | 5,9 | **6,5** | **+0,6** |
| D · Stratégique | 0,15 | 7,7 | **8,4** | **+0,7** |
| E · Design / UX | 0,12 | 8,2 | **8,7** | **+0,5** |
| F · Cohérence transverse | 0,13 | 7,8 | **8,7** | **+0,9** |
| **Consolidé** | **1,00** | **7,49** | **8,14 / 10** | **+0,65** |

Delta +0,65 après 6 heures — tempo élevé. Plus grands shifts : F · QA (+0,9 ; 12 des 13 signatures sed closes), B · Legal (+0,9 ; miroirs HTML Cadre juridique + DD-report + EULA + Note § 1/9 + contrat escrow + Politique RKN), D · Strat (+0,7 ; champion-map + 4 drafts LoI/MoU + 4 contours moat + 3 scénarios cannibalisation + protection auteur + bridge EBITDA). Plus petits : A · Tech (+0,3 ; déjà à 8,4) et E · Design (+0,5 ; surtout emoji → SVG).

## 3. Tableau 6-contours avec verdict

| Contour | Score | Verdict |
|---|---:|---|
| A · Tech | 8,7 / 10 | Les 4 corrections H-I sont closes proprement. Régression : sidebar PWA `1207-1208` ☀/☾. Sous-couverture H-I : Spécification §§5.2/6.1 .NET MAUI/RN/Detox, Roadmap M5.6, 02_Description. 08_Architectural.html (mermaid) — H-III. |
| B · Legal | 8,3 / 10 | Les 7 corrections sont closes en MD et dans les HTML principaux. RED B-H2-1 : Note_BCR.html § 10 non reconstruite. B-NEW-12/15, B-H1-7, B-H1-6 — H-III. |
| C · Fin | 6,5 / 10 | 7 REDs H-I closes, mais 5 nouveaux défauts : Modèle_financier.html non reconstruit ; EBITDA 2034 = 133,6 vs 103,1 (arithmétique) ; TRI Base 161 % (scénarios) vs 62 % (KPI) dans le même Modèle_financier.md ; pic 2 089 vs 1 335. C-H1-1 arithmétique TV — H-III. |
| D · Strat | 8,4 / 10 | 5 sur 6 closes complètement. D-PR-5 (champion-map dans le Plan d'affaires § 13, DD § 2.5, slide Pitch_deck) — partiel. D-PR-13 (Concept.html + Plan_d_affaires.html nouvelles sections). |
| E · Design | 8,7 / 10 | E-POST-4 (☀/☾ sur 37 HTML + ★/✓ + drapeaux ISO) clos. Régression PWA `1207-1208`. E-NEW-5/-6/-7, E-POST-3/-5, Semantic HTML — H-III. |
| F · QA | 8,7 / 10 | 12 des 13 signatures sed propres. RED F-H2-1..4 : Modèle_financier.html, Évaluation_internationale.html, Modèle_financier_hypothèses.html §7.1 non reconstruits ; gap-defensible 64,69 NOT closed. |

## 4. Par contour — défauts ouverts clés

### 4.1. A · Tech (`_частные_отчёты/A_Tech.md`)

- **AMBER · A-POST-5 (re²)** — `08_Diagrammes_architecturaux.html:184-186` conserve mermaid avec RN+.NET MAUI. Le MD est correctement Capacitor.
- **AMBER · A-POST-H2-1** — régression II.E : `09_Мобильное_приложение/Приложение/index.html:1207-1208` la sidebar PWA conserve `Clair ☀` et `Sombre ☾` (settings-panel `:1414-1415` correct).
- **AMBER · A-POST-H2-2** — Spécification `:151,165,167` : §§5.2/6.1 « Windows (.NET MAUI) », « Jest pour RN », « Detox pour RN, MAUI UITest » — contredit §1.1 PWA+Capacitor.
- **AMBER · A-POST-H2-3** — `07_Feuille_de_route_de_développement.md:81,129` M5.6 « .NET MAUI ».
- **AMBER · A-POST-H2-4** — `02_Description_du_programme.md:30` « C# (.NET MAUI/Windows App SDK) ».
- **AMBER · A-POST-H2-5..-8** — sitemap x-default 1/18, apple-touch-icon dans manifest, dérive de tone dans DD_report.html « revenu d'émission », thèmes sepia/contrast sans SVG.

### 4.2. B · Legal (`_частные_отчёты/B_Legal.md`)

- **RED · B-H2-1** — `07_Презентации/Для_госструктур_ЦБ/Доклад_для_госструктур_и_ЦБ_РФ.html` non reconstruit. § 10 de la version publique conserve le texte pré-refactor « La BCR gère tous les comptes d'entiercement de l'émission ciblée » sans marqueur Étape 2 ; la séparation § 10.1/10.2 du MD n'est pas reflétée.
- **AMBER · B-H2-2** — Pre-meeting brief 04 (Gazprombank/PSB) — « Gazprombank / PSB » sans désignation « ou » (CC art. 432 — les parties doivent être définies).
- **AMBER · B-H2-3** — Pre-meeting brief 03 (Tatarstan) — les dates T+0…T+24 ne tiennent pas compte de l'immatriculation de la JSC.
- **AMBER · B-H2-4** — Cadre_juridique.html § 8.3 sans § 8.2 (renumérotation HTML).
- **AMBER · B-H2-5** — Concept.md § 1 item 9 vs § 1-bis — double mention Étape 1 (style).

### 4.3. C · Fin (`_частные_отчёты/C_Fin.md`)

- **RED · C-H1-1 (répétition)** — arithmétique TV SoT v3 phases I+II = 7,4 vs defensible 19,78. EV DCF totale defensible = 63,38, pas 51,2.
- **RED · C-H1-2/-3 (répétition)** — TRI 62 % et Payback 2,8 « project-level » non reproductibles. Defensible : TRI project ≈ 160 % ; investisseur Y7 ≈ 30,2 % ; Payback project 3,31 ; investisseur 4,17.
- **RED · C-H2-1 (nouveau)** — Modèle_financier.html non reconstruit. 7 points de divergence avec le MD.
- **RED · C-H2-2 (=C-H1-7)** — Modèle_financier_hypothèses.html §7.1 body non actualisé (« 18 % + 4 = 22 % »).
- **RED · C-H2-3 (nouveau)** — EBITDA 2034 = 133,6 vs 103,1 : Plan_d_affaires.md:53,383 + Modèle_financier.html:1361 contiennent 133,6 avec une marge déclarée de 74,8 %. 137,9 × 0,748 = 103,15 ≠ 133,6. 133,6/137,9 = 96,88 % (ancienne marge).
- **RED · C-H2-4 (nouveau)** — Modèle_financier.html:1316 « VAN hors TV = 86 380 M ₽ » alors que SoT 41 800.
- **AMBER · C-H2-5 (nouveau)** — Évaluation_internationale.md:304 « EM 12× tombe dans le haut de la fourchette tier-1 fintech 25–50×) » (résidu logique + grammatical).
- **AMBER · C-H2-6 (nouveau)** — TRI Base 161 % (Modèle_financier.md:166 scénarios) vs 62 % (KPI :152) dans un même document.
- **AMBER · C-H2-7 (nouveau)** — Modèle_financier.md:128 pic 2 089 vs :153 pic 1 335 — définitions différentes.
- **AMBER · C-H1-13 (répétition)** — Monte-Carlo non implémenté dans finmodel.js.

### 4.4. D · Strat (`_частные_отчёты/D_Strat.md`)

- **AMBER · D-PR-5 (b/c/d)** — Champion-map non diffusée dans Plan d'affaires § 13 (nouveau « GTM » au lieu de « Annexes »), DD § 2.5 (general → named), slide Pitch_deck.
- **AMBER · D-PR-6 (b/c)** — Cannibalisation par le RN non diffusée dans DD § 3 / Note § 9.
- **AMBER · D-PR-7 (b)** — Défense contre la copie non dans DD § 3.4.
- **AMBER · D-PR-8 (répétition)** — LoI/MoU signés — opérationnel, Horizon III.
- **AMBER · D-PR-11 (b)** — Bridge EBITDA non dans Wedge § 5.2 + onglet non créé.
- **AMBER · D-PR-13 (nouveau)** — HTML/PDF du Concept (`_Мастер/Концепт.html` sans 1-bis/1-ter/1-quater) et du Plan d'affaires (sans § 11.3/§ 11.4 et nouvelles lignes risk-card) non reconstruits.

### 4.5. E · Design (`_частные_отчёты/E_Design.md`)

- **AMBER · E-POST-4 régression** — `09_…/Приложение/index.html:1207-1208` sidebar PWA conserve `Clair ☀` / `Sombre ☾` (settings-panel `:1414-1415` correctement SVG).
- Hérité (Horizon III) : E1 (12 lignes emoji dans bottom-nav/qa/menu), E-NEW-5 back-stack, E-NEW-6 extension RTL, E-NEW-7 couverture data-i18n, E-POST-3 manifest theme_color, E-POST-5 Conservateur/Optimiste, Semantic HTML PWA.

### 4.6. F · QA (`_частные_отчёты/F_QA.md`)

- **RED · F-H2-1** — Modèle_financier.html non reconstruit (7 points : :1316 VAN hors TV = 86 380 ; :1321 TV Gordon = 611 800 ; :1331 TRI ~226 % ; :1336 Payback 2,37 ; :1402-1407 Base VAN 170 / 2,4 ; :1456+:1507 sensibilité Base = 170).
- **RED · F-H2-2** — Évaluation_internationale.html §2.5 « EV 183 / pre-money 540 M $ » et §7.1 baseline CMPC 21,5 % ; .md:218 §7 Base = « 96,8 » (résidu sed).
- **RED · F-H2-3** — Modèle_financier_hypothèses.html §7.1 body « 18 % + 4 = 22 % » ; « build-up 26 % ».
- **RED · F-H2-4** — Gap defensible 64,69 NOT closed : SoT 41,8 vs Évaluation_internationale.md:99 = 88,0 (×2,1) ; SoT 3,8 % vs Modèle_financier_hypothèses.md:155 = 9,0 % ; rupture interne Modèle_financier.md (41,8 + 1,96 = 43,76 ≠ 51,2 — phases I+II 7,4 non nommées comme ligne KPI).
- **AMBER · F-H2-5..-10** — sed a sauté les miroirs HTML, id="wacc-22", Évaluation_internationale.html §7.1 sensibilité, équilibre VAN Modèle_financier.html, part de la TV.

## 5. Carte consolidée des RED + AMBER ouverts

| Code | Catégorie | Contour | Bref |
|---|---|---|---|
| A-POST-5 | AMBER | A | 08_Diagrammes_architecturaux.html (mermaid RN+.NET MAUI) |
| A-POST-H2-1 | AMBER | A | sidebar PWA `1207-1208` ☀/☾ |
| A-POST-H2-2 | AMBER | A | Spécification §§5.2/6.1 .NET MAUI/RN/Detox |
| A-POST-H2-3 | AMBER | A | Roadmap M5.6 .NET MAUI |
| A-POST-H2-4 | AMBER | A | 02_Description_du_programme C# .NET MAUI |
| A-POST-H2-5..-8 | AMBER | A | sitemap x-default / apple-touch-icon / DD tone / sepia |
| B-H2-1 | RED | B | Note_BCR.html § 10 non reconstruite |
| B-H2-2 | AMBER | B | Pre-meeting brief 04 « Gazprombank/PSB » sans « ou » |
| B-H2-3 | AMBER | B | Pre-meeting brief 03 dates T+0 ne tiennent pas compte de l'immatriculation |
| B-H2-4 | AMBER | B | Cadre_juridique.html § 8.3 sans § 8.2 |
| B-H2-5 | AMBER | B | Concept § 1 item 9 vs § 1-bis (style) |
| B-NEW-12 | AMBER | B | Listes 779-P différentes |
| B-NEW-15 | AMBER | B | Contrat opérateur–gageur sans 353-FZ |
| B-H1-7 | AMBER | B | Écart T+18 vs T+24 |
| B-H1-6 | AMBER | B | Concept § 1 item 6 « extension possible du mandat » |
| C-H1-1 | RED | C | Phases TV I+II 7,4 vs 19,78 defensible |
| C-H1-2/-3 | RED | C | TRI 62 % / Payback 2,8 non reproductibles |
| C-H2-1 | RED | C | Modèle_financier.html non reconstruit |
| C-H2-2 (=C-H1-7) | RED | C | Modèle_financier_hypothèses.html §7.1 body |
| C-H2-3 | RED | C | EBITDA 2034 = 133,6 vs 103,1 (arithmétique) |
| C-H2-4 | RED | C | Modèle_financier.html VAN hors TV = 86 380 |
| C-H2-5 | AMBER | C | EM dans Évaluation_internationale.md:304 (grammaire) |
| C-H2-6 | AMBER | C | TRI Base 161 % vs 62 % dans un même Modèle_financier.md |
| C-H2-7 | AMBER | C | Pic 2 089 vs 1 335 dans Modèle_financier.md |
| C-H1-13 | AMBER | C | Monte-Carlo non implémenté |
| D-PR-5 (b/c/d) | AMBER | D | Champion-map non dans Plan d'affaires § 13 / DD § 2.5 / slide Pitch |
| D-PR-6 (b/c) | AMBER | D | Cannibalisation RN non dans DD § 3 / Note § 9 |
| D-PR-7 (b) | AMBER | D | Défense contre la copie non dans DD § 3.4 |
| D-PR-8 | AMBER | D | LoI/MoU signés — opérationnel |
| D-PR-11 (b) | AMBER | D | Bridge EBITDA non dans Wedge § 5.2 + onglet non créé |
| D-PR-13 | AMBER | D | HTML/PDF du Concept et du Plan d'affaires non reconstruits |
| E-POST-4 régression | AMBER | E | sidebar PWA 1207-1208 ☀/☾ |
| E1 / E-NEW-3 | AMBER | E | 12 lignes emoji dans PWA bottom-nav/qa/menu |
| E-NEW-5/-6/-7 / Semantic | AMBER | E | back-stack / RTL / data-i18n / `<main>` |
| E-POST-3 / -5 | AMBER | E | manifest theme_color / Conservateur-Optimiste |
| F-H2-1 | RED | F | Modèle_financier.html non reconstruit (7 points) |
| F-H2-2 | RED | F | Évaluation_internationale.html §2.5 + §7.1 + .md:218 |
| F-H2-3 | RED | F | Modèle_financier_hypothèses.html §7.1 body |
| F-H2-4 | RED | F | Gap defensible 64,69 NOT closed (SoT vs Évaluation.md:99 vs Modèle_financier.md interne) |
| F-H2-5..-10 | AMBER | F | Sed a sauté HTML, id-attributs, sensibilité |

**Total : 12 RED + 33 AMBER = 45 points ouverts** (vs 18 RED + 28 AMBER avant Horizon II = 46 points).

Changement qualitatif : **6 RED clos, 12 RED restent** (la majorité — répétitions de la catégorie « MD corrigé, HTML en retard »). Après le pandoc-pass d'Horizon III on attend une chute à 0-2 RED.

## 6. Feuille de route prioritaire (Horizon III)

### Horizon III.A — Pandoc pipeline (tâche centrale, ≈ 1 heure)

1. **Pandoc rebuild de 6 miroirs HTML** : Modèle_financier.html, Modèle_financier_hypothèses.html, Évaluation_internationale.html, Note_BCR.html, Concept.html, Plan_d_affaires.html (nouvelles sections § 11.3 / § 11.4 / risk-card). Clôt : C-H2-1, C-H2-2, F-H2-1, F-H2-2 (a/b), F-H2-3, B-H2-1, D-PR-13.
2. **08_Diagrammes_architecturaux.html** via pandoc + mermaid. Clôt A-POST-5.

### Horizon III.B — Corrections narratives ciblées (≈ 1,5 heure)

3. **C-H2-3 arithmétique EBITDA** : Plan_d_affaires.md:53,383 + Modèle_financier.html:1361 — 133,6 → 103,1.
4. **C-H2-5 formulation EM** : Évaluation_internationale.md:304 — réécrire « 12× tombe dans le haut de la fourchette 25–50× ».
5. **C-H2-6 désync TRI** : Modèle_financier.md:166 (scénarios) aligné avec :152 (KPI).
6. **C-H2-7 pic** : Modèle_financier.md:128 vs :153 — unifier la définition.
7. **F-H2-2 (c)** : Évaluation_internationale.md:218 Base 96,8 → 51,2 ; recalculer §2.4 / §7.
8. **B-H2-2..-5** : renommer MoU 04 en « Banque_Partenaire » avec « Gazprombank ou PSB » ; dates T+0 dans MoU Tatarstan ; § 8.3 → § 8.2 dans le Cadre juridique ; durcissement stylistique Concept § 1 item 9.
9. **E-POST-4 régression** : `09_…/Приложение/index.html:1207-1208` ☀/☾ → SVG.
10. **A-POST-H2-2/-3/-4** : Spécification §§5.2/6.1, Roadmap M5.6, 02_Description — .NET MAUI/RN/Detox → PWA+Capacitor v6+ (unifier avec §1.1 Spécification).

### Horizon III.C — Décisions méthodologiques (≈ 1 jour)

11. **C-H1-1 arithmétique TV SoT v3 §5** : recompter sur defensible 19,78 → EV totale 63,38 OU justifier 7,4 avec un OpEx/CapEx/ΔBFR additionnel explicite. Mettre à jour les documents clients en cascade.
12. **C-H1-2/-3 TRI/Payback project-level** : recompter sur defensible OU marquer explicitement « métrique hybride semi-investisseur ».
13. **C-H1-13 Monte-Carlo** : implémenter `monteCarlo(iterations, paramRanges)` dans `finmodel.js`.
14. **F-H2-4 gap defensible** : ajouter dans Modèle_financier.md une ligne « FCF actualisés 2035–2044 (phases I+II) = 7 400 M ₽ » ; Modèle_financier_hypothèses.md:155 « part TV = 3,8 % ».

### Horizon III.D — Diffusion de la Champion-map (≈ 1 heure)

15. **D-PR-5 (b/c/d)** : Champion-map dans Plan d'affaires § 13 (nouveau « GTM »), DD § 2.5 (general → named), slide Pitch_deck avant slide 10.
16. **D-PR-6 (b/c)** : Cannibalisation RN dans DD § 3 + Note § 9.
17. **D-PR-7 (b)** : Défense contre la copie dans DD § 3.4.

### Horizon III.E — Cosmétiques ciblés / optionnel (≈ 1 heure)

18. A-POST-H2-5 sitemap x-default sur 17 URL.
19. A-POST-H2-6 apple-touch-icon dans le manifest.
20. A-POST-H2-7 DD_report.html terme « revenu d'émission » → « revenu d'émission de DFA ».
21. A-POST-H2-8 SVG pour les thèmes sepia / contrast.
22. E-NEW-5 back-stack PWA (history.pushState + popstate).
23. E1 — 12 lignes emoji bottom-nav/qa/menu PWA → SVG (Lucide).
24. E-POST-3 manifest theme_color → `#0E2440`.

### Horizon III.F — Structurel (≈ 1-2 jours)

25. **BUILD_PIPELINE.md + inspecteur CI** — pandoc + mermaid + grep terminologique (RN / .NET MAUI / Detox / ☀ / ☾ / emoji-drapeaux / marqueur Étape 2) au git push. Clôt architecturalement la classe « MD corrigé — HTML en retard ».
26. B-NEW-12 séparer les listes 779-P (à concorder avec la BCR vs intra-corporatives).
27. B-NEW-15 point 353-FZ dans le Contrat opérateur–gageur.
28. B-H1-7 explicitation T+18 (première émission) vs T+24 (exploitation industrielle).
29. Pack contractuel : PVK Rosfinmonitoring.
30. Plan chapitre 72 CC (invention par voie de mena DFA).

**Au total : ≈ 4-6 heures pour Horizons III.A + III.B + III.D + III.E + 1 jour pour III.C (décisions méthodologiques) + 1-2 jours pour III.F (BUILD_PIPELINE + pack contractuel).** Prévision du score consolidé après Horizons III.A-D : **9,0–9,5 / 10**.

## 7. Résolution finale

| Audience | Statut avant H-II | Statut après H-II | Condition |
|---|---|---|---|
| Intérieur Center Group | Prêt | Prêt | — |
| Friendly / capital familial | Prêt | Prêt | — |
| Investisseur stratégique friendly | Prêt | Prêt | Sans réserves |
| VEB.RF PFF | Prêt | Prêt | Draft 02 de lettre consultative prêt |
| Gazprombank-DD / PSB-DD | Conditionnellement prêt | **Conditionnellement prêt** | DD_report.html reconstruit ; Modèle_financier.html (H-III pandoc) |
| Tier-1 VC | Conditionnel (screening) | **Conditionnellement prêt au screening + data-room 2 semaines ; ne tient pas une deep DD 3-4 semaines** | H-III.A (pandoc 6 HTML) + H-III.C (méthodologie TV/TRI/Payback) obligatoires |
| Registre opérateurs SI DFA BCR | Conditionnel | Conditionnel | Immatriculation JSC + SKZI T+9…T+18 ; B-H2-1 (Note HTML) |
| Publication RuStore | Conditionnel | **Conditionnellement prêt** | E-POST-4 régression sidebar ; A-POST-1/2 sans régressions |

**Position défendable « telle quelle après Horizon II »** : friendly + VC friendly + VEB.RF PFF + Minéco + investisseur stratégique friendly. **Gazprombank-DD conditionnellement prêt**. Plafond stratégique : **60-90 M $ pre-money** via justification wedge-pilot.

**Position défendable après Horizons III.A-D (1-2 jours ouvrés)** : Gazprombank / PSB DD pass / tier-1 VC seed-stage. Plafond stratégique : **80-120 M $ pre-money Base** (ou 100-140 M $ à VAN-defensible 63,4 après décision C-H1-1).

**Position défendable après Horizon III.C (décision méthodologique + Monte-Carlo, 1 semaine)** : tier-1 VC Série A + VEB.RF Ventures + Gazprombank Capital. Plafond stratégique : **120-180 M $ pre-money** sous condition LoI/MoU signing.

## 8. Méthodologie et réserves

1. **Parallélisme.** 6 auditeurs indépendamment, sans communication croisée jusqu'à la consolidation. Poids : 0,20 / 0,20 / 0,20 / 0,15 / 0,12 / 0,13.
2. **Vérification boomerang.** Chacune des ≈30 corrections d'Horizon II est vérifiée par un grep / Read indépendant avec marque fact-status.
3. **Standard de preuve.** Chaque affirmation — `fichier:ligne` ou citation. Financier — recalcul ligne par ligne. Juridique — article d'acte. Technique — version du standard.
4. **Read-only.** Les fichiers projet n'ont pas été modifiés pendant l'audit.
5. **Réserve sur la VAN.** SoT v3 VAN totale = 51,2 Md ₽ ; defensible row-by-row selon la logique finmodel.js = 63,38. La décision revient au développeur du modèle financier.
6. **Logique wedge comme baseline.** L'Étape 1 est la stratégie correcte pour le champ réglementaire actuel.
7. **Finding structurel principal.** 5 des 6 contours (A, B, C, D, F) ont noté simultanément le défaut « MD corrigé — HTML en retard ». Signal de la nécessité d'un BUILD_PIPELINE + inspecteur CI comme solution structurelle plutôt qu'un cycle de corrections manuelles.

## 9. Référence engagement

Audit consolidé post-Horizon II · CPFSR · 24.05.2026 (soir)
Client : Abdoul-Khakim Akhmadovitch Kaguirov / Center Group Company
Objet : `E:\Проекты Аслана\Приложение_РСФСР\ЦП РСФСР Исправленный\`
Certificat de l'auteur du concept : n° 4011265 du 19.12.2024
