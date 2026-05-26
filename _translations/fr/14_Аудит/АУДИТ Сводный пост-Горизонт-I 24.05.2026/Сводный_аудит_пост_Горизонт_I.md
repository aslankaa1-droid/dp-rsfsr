# Audit consolidé post-Horizon I de la PN RSFSR

**Date :** 24.05.2026 (édition du soir, après application de l'Horizon I)
**Objet :** `E:\Проекты Аслана\Приложение_РСФСР\ЦП РСФСР Исправленный\` (~254 fichiers au total, ~235 hors `14_Аудит`)
**Composition du panel :** 6 auditeurs indépendants de niveau tier-1, en parallèle, sans communication croisée.

## 1. Conclusion principale

L'Horizon I (itération du soir du 24.05.2026, ≈4 heures de travail sur 18 correctifs ponctuels) a produit un **gain de note moyen pondéré de +0,95** — de 6,54 à **7,49 / 10**. Les 13 défauts RED de l'audit post-refactor sont **fermés au moins au niveau des sources MD**. Deltas par contour : A · Tech +1,2 (7,2 → 8,4) · B · Juridique +0,6 (6,8 → 7,4) · C · Financier +0,5 (5,4 → 5,9) · D · Stratégique +1,3 (6,4 → 7,7) · E · Design +0,3 (7,9 → 8,2) · F · QA +2,0 (5,8 → 7,8).

Changements qualitatifs structurels :

1. **Stage 1 (pilot-light 2026–2028) / Stage 2 (horizon 2029+) — architecture biphasée** désormais uniforme dans sept artefacts d'ancrage (Concept § 1-bis, Fondement juridique § 4 / § 8.1-8.4, Plan d'affaires §§ 1, 3.1, 3.2, 4.5, 10, 12.1, Rapport DD §§ 2.1, 2.3, 3.3, 4.1, 4.3, Rapport pour la BC §§ 3.1-3.4, 6, 10.1-10.2, 12, Wedge_pilot-light, _shared/i18n.js × 4 locales).
2. **Plafond du CLUF « commissions pour 12 mois » — supprimé** (B-NEW-7) ; le CLUF est aligné sur les articles 13, 15 de la LPC + articles 393, 1064, 1095 du Code civil. Le bloqueur de publication RuStore est levé.
3. **Live PWA et promo RuStore** — réécrits sous Stage 1 ; les formulations « émission cible de la Banque de Russie » sont retirées des artefacts installables et de la fiche du catalogue RuStore.
4. **Spécification de l'application mobile** — migrée de React Native 0.74+ à PWA + Capacitor v6+ dans les sources MD et les miroirs HTML de la Spécification et du PMI.
5. **KPI financiers** — synchronisés dans le hero-cover-stat de 5+ artefacts clés (Grande présentation, Petite présentation, HTML_principal, HTML_court, Pitch deck, index.html racine partiellement) ; Plan d'affaires §9.2 reformaté avec KPI au niveau projet et note de bas de page au niveau investisseur ; al. 12.2 du paragraphe 2 de l'art. 149 du CGI est inscrit dans le MD du Fondement juridique et du Rapport DD.
6. **Pitch deck slide 10 « The Ask »** — porte désormais le term-sheet complet en aperçu : ask 15 M $ = 1,335 Md ₽ @ FX 89,0 / pre-money 80 M $ Base (Reasoned 60–115 M $) / post-money 95 M $ / part 15,8 % / use-of-funds en 5 catégories avec marqueurs Stage.
7. **Formule EM dans finmodel.js** — réécrite, abandonnant la logique TVPI au profit de la formule investor-share (introduisant cependant un nouveau défaut — double-comptage de tvDisc ; voir ci-dessous).
8. **sw.js SHELL_ASSETS** — chemins des captures alignés sur les fichiers réels ; le cache hors-ligne de la PWA est restauré.
9. **D-PR-4 « financement infrastructurel ciblé »** — résidu sed nettoyé dans 8 hero-leads d'artefacts publics.
10. **Fondement juridique § 8.2 → § 8.3 → § 8.4** — numérotation en double supprimée.

En parallèle, l'Horizon I a révélé une **nouvelle classe de défauts** dans les blocs C/F — **sed-collision « à la place de soi-même »** et **désynchronisation des miroirs HTML par rapport aux sources MD mises à jour**. Principaux bloqueurs ouverts pour la communication tier-1 :

1. **DD_отчёт.html n'a pas été regénéré à partir du MD** — il contient encore NPV 170 / Payback 2,4 / EBITDA 97 % / WACC 22 % (alors que le MD est marqué Stage et mis à jour). Le DD de Gazprombank / VTB ouvrira DD_отчёт.html en premier — signal d'arrêt en 30 secondes.
2. **Arithmétique TV de SoT v3 phases I+II = 7,4 vs defensible 21,03 Md ₽ (×2,84 sous-estimation)** — la vague sed a aligné tous les documents clients sur les 51,2 Md ₽ déclarés, mais la VE complète DCF defensible = 64,69 Md. Toute reconstruction DCF indépendante par une équipe de valuation tier-1 détectera l'écart.
3. **`finmodel.js:211` double-comptage de tvDisc** — `fullEV = npv + tvDisc` alors que `npv` inclut déjà `tvDisc`. Le code restitue EM ≈ 10,37× au lieu des 12× déclarés.
4. **Plan d'affaires §3, le tableau KPI §9.1 contient « NPV 170,1 Md ₽ »** — sed n'a pas matché le masque avec la partie décimale « 170,1 » (sans `<em>`). Contradiction interne avec §9.2 Base 51,2.
5. **Финмодель.md matrices de sensibilité (lignes 166-188)** contiennent baseline 96,8 à WACC 30 %, ce qui ne dérive pas du SoT (defensible 41,78 sans TV ou 64,69 avec TV). Le miroir HTML `.html:1403, 1456, 1507` donne « 170 » — trois valeurs distinctes pour une même grandeur.
6. **sed-collision « 74,8 % au lieu de 74,8 % » / « 12× (au lieu de 12×) »** — dans 4 fichiers, sed a traité l'ancienne et la nouvelle valeur avec le même masque et a laissé des tautologies de type « était/est devenu avec des valeurs identiques ».
7. **Plan d'affaires §2.2, §3.4, §4.4** (hors périmètre de l'Horizon I) — conservent le modèle d'émission Stage 2 comme catégorie opérationnelle/de base ; le miroir HTML `Бизнес-план_ЦП_РСФСР.html` lignes 140, 277, 311, 321, 366, 432, 916, 1022, 1079-1080 — idem.
8. **Champion map (D-PR-5), cannibalisation par le rouble numérique (D-PR-6), protection contre la copie (D-PR-7), LoI/MoU (D-PR-8)** — quatre items stratégiques laissés hors périmètre de l'Horizon I ; ils constituent le cœur de la feuille de route stratégique de l'Horizon II.

État de préparation à la communication : **friendly + VC amical + VEB.RF Fabrique de projets — prêts ; Gazprombank-DD — à la limite (cover-stat OK, rapport DD non) ; VC tier-1 — passera le screening initial, mais pas la DD approfondie des semaines 2 à 4**. Horizon II (vague sed + reconstruction pandoc des HTML + diffusion du champion-map + drafts LoI/MoU + édition manuelle de 6 fichiers d'émission) — 1-2 jours ouvrés et devrait porter la note consolidée à **8,5-9,0 / 10**.

## 2. Note pondérée sur 6 contours

| Contour | Poids | Note avant Horizon I | Note après | Delta |
|---|---:|---:|---:|---:|
| A · Technique | 0,20 | 7,2 | **8,4** | **+1,2** |
| B · Juridique | 0,20 | 6,8 | **7,4** | **+0,6** |
| C · Financier | 0,20 | 5,4 | **5,9** | **+0,5** |
| D · Stratégique | 0,15 | 6,4 | **7,7** | **+1,3** |
| E · Design / UX | 0,12 | 7,9 | **8,2** | **+0,3** |
| F · Cohérence transverse | 0,13 | 5,8 | **7,8** | **+2,0** |
| **Composite** | **1,00** | **6,54** | **7,49 / 10** | **+0,95** |

Un delta de +0,95 après 4 heures de travail constitue un ratio effort/résultat très efficace. Plus grands déplacements : F · QA (+2,0 ; la vague sed sur 15 fichiers a fermé 8 des 11 paramètres SoT clés), D · Strat (+1,3 ; trois RED sur Plan d'affaires / Rapport DD / Rapport BC fermés + résidu sed nettoyé), A · Tech (+1,2 ; les trois RED sur live PWA / RuStore / DD_отчёт.md fermés). Plus petit delta — C · Fin (+0,5) : code réécrit, mais contient un nouveau défaut ; arithmétique TV SoT v3 non recalculée ; matrices de sensibilité Финмодель en patchwork.

## 3. Tableau de verdict des 6 contours

| Contour | Note | Verdict |
|---|---:|---|
| A · Tech | 8,4 / 10 | Les trois RED sont levés. RuStore / FSTEC / Banque de Russie 779-P — « prêt sous conditions ». Ouverts : A-POST-5 (08_Архитектурные_диаграммы.html RN), A-POST-7 (hreflang 9/17), A-POST-9 (Brandbook Vision), A-POST-11 (Prototype RN+MAUI en pied), A-POST-12 (DD_отчёт.html non reconstruit), A-POST-13 (04_Интеграции sans marqueur Stage). |
| B · Juridique | 7,4 / 10 | B-NEW-7 CLUF fermé. B-NEW-8 § 4 / § 15 fermé en MD. B-NEW-10 numérotation fermée. Ouverts : B-H1-1 (Юр.фундамент.html:619 al. 1/38), B-H1-2 (DD sur TVA), B-H1-3 (Plan d'affaires §§2.2, 3.4, 4.4 — émission comme base), B-H1-4 (Petite présentation slide 11), B-H1-5 (Rapport BC § 1, § 9). |
| C · Fin | 5,9 / 10 | Build-up WACC et NPV 10 ans reproductibles ; hero-cover-stat cohérent. 9 RED + 6 AMBER ouverts : C-H1-1 (TV ×2,84 sous-estimation), C-H1-2/3 (IRR/Payback niveau projet non reproductibles), C-H1-4 (double-comptage dans finmodel.js), C-H1-5..C-H1-9 (Финмодель/Plan d'affaires §9.1/DD.html/Финмодель_допущения.html/calculateur Grande présentation). |
| D · Strat | 7,7 / 10 | Les 3 RED fermés (D-PR-1/2/3). Wedge uniforme dans 7 artefacts. Préparation Gazprombank-DD + VEB.RF FPF. Ouverts : D-PR-5 (champion map isolé), D-PR-6 (cannibalisation rouble num. une ligne), D-PR-7 (protection contre copie 0), D-PR-8 (LoI/MoU 0), D-PR-11 (bridge EBITDA 65 %→74,8 %), D-PR-12 (protection de l'auteur). |
| E · Design | 8,2 / 10 | Pitch deck slide 10 entièrement fermé. Cache SW des captures restauré. Ouverts (hors périmètre Horizon I) : emoji ☀ ☾ ★ ✓ dans les decks + PWA (24 lignes), drapeaux-emoji, HTML sémantique, couverture data-i18n, extension RTL, manifest theme_color. |
| F · QA | 7,8 / 10 | 8 des 11 paramètres SoT synchronisés. Ouverts : F-H1-1 (sed-collision dans 4 fichiers), F-H1-2 (JS-input Grande présentation), F-H1-3 (Booklet cover-stat), F-H1-4 (sensibilité Финмодель), F-H1-5 (index.html:198 96,8), F-H1-6 (HTML_principal 2,4), F-H1-7 (« 170,1 Md ₽ » dans 3 fichiers), F-H1-8 (DD_отчёт.html non reconstruit). |

## 4. Pour chaque contour — défauts ouverts clés

### 4.1. A · Tech (`_частные_отчёты/A_Tech.md`)

- **AMBER · A-POST-5** — `08_Архитектурные_диаграммы.html:184-185` conserve `(React Native)` ; la source MD est Capacitor.
- **AMBER · A-POST-7** — `sitemap.xml:105-175` : 9 URL sur 17 uniquement `hreflang="ru"`.
- **AMBER · A-POST-9** — `05_Бренд-бук/Бренд-бук_ЦП_РСФСР.md:14` — « Devenir le niveau opérateur souverain de l'émission ciblée garantie de la FR » comme vision sans marqueur Stage 2.
- **AMBER · A-POST-11** — `Прототип/index.html:538` — « React Native + .NET MAUI » dans le pied de page.
- **AMBER · A-POST-12** — `DD_отчёт.html:230,345` dérive tonale ; le .html n'est pas reconstruit à partir du .md mis à jour.
- **AMBER · A-POST-13** — `04_Интеграции_с_ГИС.md` §§ 2.5–2.6 décrits comme modèle opérationnel sans marquage Stage.

Horizon II sur A : 30 minutes d'éditions ponctuelles + pipeline pandoc → note 9,0+.

### 4.2. B · Juridique (`_частные_отчёты/B_Legal.md`)

- **RED · B-H1-1** — `Юридический_фундамент_ЦП_РСФСР.html:619` conserve « al. 1 et 38 du § 2 de l'art. 149 du CGI de la FR » (biens médicaux) ; le MD est corrigé, le HTML non reconstruit.
- **RED · B-H1-2** — `DD_отчёт.md:245` + `.html:443` — idem. Bloqueur pour le dépôt au ministère des Finances et la DD d'un VC tier-1.
- **RED · B-H1-3** — `Бизнес-план_ЦП_РСФСР.md:73` (§2.2), `:131` (§3.4), `:173-178` (§4.4), `:192-196` (§4.5) — conservent le modèle d'émission Stage 2 comme catégorie de base.
- **AMBER · B-H1-4** — `Малая_презентация/index.html:376` — « émission ciblée garantie » comme signal unique.
- **AMBER · B-H1-5** — `Доклад_для_госструктур_и_ЦБ_РФ.md:25, :207` — formulations sans marqueur Stage 2.
- **AMBER · B-NEW-12 / -13 / -14 / -15** — héritage post-refactor (listes 779-P, contrat d'entiercement, disclaimer DP, contrat opérateur-gageur sans 353-FZ).
- **AMBER · B-H1-7** — écart T+18 (Wedge) vs T+24 (Учреждение_АО) de 6 mois.

Horizon II sur B : 6 must-fix (B-H1-1..B-H1-5 + B-NEW-12) + nice-to-have. Après cela la note dépassera 8,5 et Gazprombank-DD sera prêt.

### 4.3. C · Fin (`_частные_отчёты/C_Fin.md`)

- **RED · C-H1-1** — Arithmétique TV SoT v3 § 5 : phases I+II déclarées 7,4 vs defensible **21,03 Md ₽** (×2,84). VE complète DCF defensible = **64,69 Md ₽**, et non 51,2.
- **RED · C-H1-2** — IRR 62 % (niveau projet) non reproductible par la formule standard. Project-level defensible ≈ 161 % ; Investor Y7 (NPV 51,2) = 28,6 % ; Investor Y7 (NPV 64,69) = 33,5 %.
- **RED · C-H1-3** — Payback 2,8 non reproductible par aucune des trois méthodes (project 3,24 / investor cash distribution 4,21 / investor disc stake 5,32).
- **RED · C-H1-4** — `finmodel.js:211` double-comptage tvDisc : `fullEV = npv + tvDisc` alors que `npv` inclut déjà `tvDisc` → EM ≈ 10,37× au lieu de 12×.
- **RED · C-H1-5** — `Финансовая_модель_ЦП_РСФСР.md` en « patchwork » : mélange de valeurs anciennes et nouvelles dans un même tableau.
- **RED · C-H1-6** — `DD_отчёт.html:323-328` : NPV 170 / Payback 2,4 / EBITDA 97 % / WACC 30 % (seul WACC est mis à jour).
- **RED · C-H1-7** — `Финмодель_допущения_и_расчёты.html:351` : titre « WACC 30 % » vs corps « KS 18 % + 4 = 22 % ».
- **RED · C-H1-8** — `Большая_презентация/index.html:744,746` : slider WACC `value="22"` ; `:760-761` baseline JS NPV 170 / Payback 2,4.
- **RED · C-H1-9** — Plan d'affaires §9.1 NPV 170,1 vs §9.2 Base 51,2 (contradiction interne).
- **AMBER · C-H1-10 / C-H1-11** — inversion sed EM 48× et EBITDA 74,8 % dans Финмодель.md:240-241.
- **AMBER · C-H1-12** — Финмодель.md:166-168 tableau de scénarios avec ancien Base 96,8 / VE 105,1.
- **AMBER · C-H1-13** — Monte Carlo dans finmodel.js non implémenté.
- **AMBER · C-H1-14** — Bridge cash-runway : trois montants (200/750/450 M).
- **AMBER · C-H1-15** — Part de TV dans NPV : 3 valeurs (3,8 % / 9,0 % / defensible 2,9 %).

Horizon II sur C : 14 P0 + 7 P1 (1-2 jours ouvrés). Tâche principale — recalculer TV SoT v3 phases I+II sur defensible 21,03 (VE complète 64,69) et propager en cascade aux documents clients ; ou justifier 7,4 explicitement par OpEx/CapEx/ΔWC additionnels.

### 4.4. D · Strat (`_частные_отчёты/D_Strat.md`)

- **AMBER · D-PR-5** — Champion map (Réchetnikov / Kolytchev / Sazanov / Aksakov / Minnikhanov / Moor) isolée dans `Wedge_pilot-light.md:51-61` ; grep sur 8 artefacts clés — 0 occurrence.
- **AMBER · D-PR-6** — Cannibalisation par le rouble numérique 340-FZ — une seule ligne déclarative.
- **AMBER · D-PR-7** — Protection contre la copie par le régulateur — 0 mention.
- **AMBER · D-PR-8** — LoI / MoU / lettre consultative — 0 signées.
- **AMBER · D-PR-11 (nouveau)** — Marge EBITDA : écart 65 %→74,8 % (2030→2034) entre `Wedge_pilot-light.md:131-137` (§5.2) et Plan d'affaires/DD/Pitch deck sans ligne de transition.
- **AMBER · D-PR-12 (nouveau)** — Protection de l'auteur A.Kh.A. Kagirov contre le squeeze-out par un actionnaire institutionnel (titulaire du savoir-faire + siège inaliénable au CA jusqu'à la Série B + covenants dans le Pacte d'actionnaires) non formalisée.

Horizon II sur D : 6 correctifs (diffusion du champion-map, sections risque rouble numérique et copie, drafts LoI/MoU, bridge EBITDA, protection de l'auteur). ~3 jours ouvrés. Ensuite — note 8,5+ et préparation pour un VC tier-1.

### 4.5. E · Design (`_частные_отчёты/E_Design.md`)

- **AMBER · E-POST-4** (priorité 1) — emoji ☀ ☾ dans le commutateur de thème du Pitch deck (180-181) et de la Grande présentation (292-293) ; ★ ✓ dans les hub-items de la Grande présentation (858, 897, 901). Après fermeture de E-POST-2, c'est le seul défaut visuel sur les captures du deck.
- Hérités sans changement : E1 emoji PWA 24 lignes ; E-NEW-3 drapeaux-emoji ; E-POST-3 manifest theme_color unique ; E-POST-5 Conservative/Optimistic sans blocs stat séparés ; E-NEW-5 back-stack PWA ; E-NEW-6 RTL 6 sélecteurs ; E-NEW-7 data-i18n 8 éléments ; HTML sémantique PWA.

Horizon II sur E : première tâche — emoji → SVG (12 remplacements, ~30 minutes). Ensuite — note 9,0+.

### 4.6. F · QA (`_частные_отчёты/F_QA.md`)

- **RED · F-H1-1** — sed-collision « à la place de soi-même » dans 4 fichiers (`Финмодель.md:240-241`, `Финмодель_допущения.md:106`, `Международная_оценка.md:24,302,304`).
- **RED · F-H1-2** — Большая_презентация:760-761 baseline JS NPV 170 / Payback 2,4.
- **RED · F-H1-3** — Buklet.html:182-183 cover-stat 170 / 2,4.
- **RED · F-H1-4** — Финмодель.md sensitivity baseline 96,8 (`:166, :178, :187`) + miroir HTML 170 (`:1403, :1456, :1507`).
- **RED · F-H1-5** — index.html:198 entry-stat 96,8.
- **RED · F-H1-6** — HTML_основной:302 Payback 2,4 (data-i18n).
- **RED · F-H1-7** — « 170,1 Md ₽ » dans Бизнес-план.md/html et Финмодель.html.
- **RED · F-H1-8** — DD_отчёт.html non reconstruit (NPV 170 / Payback 2,4 / EBITDA 97 %).
- **AMBER · F-H1-9 / -10 / -11** — Международная_оценка.html ERP 6 %, summary 21,5 % (arrondi à 22 %) ; Финмодель_допущения.html sed-collision « ERP 9 % = 8-10 % » ; KS 18 % en libellé de colonne de sensibilité.
- **AMBER · F-H1-12** — Émission de la BC comme catégorie PRINCIPALE dans 6 fichiers sans marqueur Stage 2.

Horizon II sur F : un seul passage sed (commandes prêtes dans le rapport, ~5 minutes) + reconstruction pandoc des HTML (~10 minutes) + édition manuelle de 6 fichiers (~30 minutes) + recalcul des matrices de sensibilité (~90 minutes). Prévision : note 9,0-9,3.

## 5. Carte agrégée des RED + AMBER ouverts

| Code | Catégorie | Contour | Bref |
|---|---|---|---|
| A-POST-5 | AMBER | A | 08_Архитектурные_диаграммы.html RN ; MD Capacitor |
| A-POST-7 | AMBER | A | sitemap.xml hreflang 9/17 URL |
| A-POST-9 | AMBER | A | Brandbook Vision Stage 2 comme core |
| A-POST-11 | AMBER | A | Прототип:538 RN+MAUI |
| A-POST-12 | AMBER | A | DD_отчёт.html non reconstruit (dérive tonale) |
| A-POST-13 | AMBER | A | 04_Интеграции §§ 2.5-2.6 sans marqueur Stage |
| B-H1-1 | RED | B | Юр.фундамент.html:619 al. 1/38 CGI |
| B-H1-2 | RED | B | DD TVA non mis à jour |
| B-H1-3 | RED | B | Plan d'affaires §§ 2.2, 3.4, 4.4 — émission comme base |
| B-H1-4 | AMBER | B | Petite présentation slide 11 « émission ciblée garantie » |
| B-H1-5 | AMBER | B | Rapport BC § 1, § 9 sans marqueur Stage 2 |
| B-NEW-12 | AMBER | B | Listes 779-P divergentes |
| B-NEW-13 | AMBER | B | Contrat d'entiercement — référence à une liste inexistante |
| B-NEW-14 | AMBER | B | Politique — pas de disclaimer RKN |
| B-NEW-15 | AMBER | B | Contrat opérateur-gageur sans 353-FZ |
| B-H1-7 | AMBER | B | Écart T+18 vs T+24 |
| C-H1-1 | RED | C | TV phases I+II 7,4 vs defensible 21,03 |
| C-H1-2 | RED | C | IRR 62 % non reproductible |
| C-H1-3 | RED | C | Payback 2,8 non reproductible |
| C-H1-4 | RED | C | finmodel.js:211 double-comptage tvDisc |
| C-H1-5 | RED | C | Финмодель.md « patchwork » |
| C-H1-6 | RED | C | DD_отчёт.html non reconstruit |
| C-H1-7 | RED | C | Финмодель_допущения.html titre vs corps |
| C-H1-8 | RED | C | Grande présentation slider WACC=22 |
| C-H1-9 | RED | C | Plan d'affaires §9.1 NPV 170,1 vs §9.2 51,2 |
| C-H1-10..15 | AMBER | C | inversions sed, Monte Carlo, bridge, part de TV |
| D-PR-5 | AMBER | D | Champion map isolée |
| D-PR-6 | AMBER | D | Cannibalisation rouble num. une ligne |
| D-PR-7 | AMBER | D | Protection contre la copie 0 |
| D-PR-8 | AMBER | D | LoI / MoU 0 signées |
| D-PR-11 | AMBER | D | Bridge EBITDA 65 %→74,8 % non expliqué |
| D-PR-12 | AMBER | D | Protection de l'auteur A.Kh.A. Kagirov |
| E-POST-4 | AMBER | E | Emoji ☀ ☾ ★ ✓ dans les decks + PWA |
| E1 / E-NEW-3 | AMBER | E | Emoji PWA 24 lignes + drapeaux-emoji |
| E-NEW-5 / -6 / -7 | AMBER | E | Back-stack / RTL / couverture data-i18n |
| E-POST-3 / -5 | AMBER | E | manifest theme_color / Conservative-Optimistic |
| F-H1-1 | RED | F | sed-collision dans 4 fichiers |
| F-H1-2 / -3 | RED | F | Grande présentation JS-input + Booklet cover-stat |
| F-H1-4 | RED | F | Финмодель sensibilité baseline 96,8 / HTML 170 |
| F-H1-5 / -6 | RED | F | index.html:198 96,8 + HTML_principal Payback 2,4 |
| F-H1-7 | RED | F | « 170,1 Md ₽ » dans 3 fichiers |
| F-H1-8 | RED | F | DD_отчёт.html non reconstruit |
| F-H1-9..13 | AMBER | F | Международная_оценка.html ERP / WACC summary / KS / émission BC |

**Total : 18 RED + 28 AMBER = 46 items ouverts** (vs 13 RED + 31 AMBER avant Horizon I).

Paradoxe : le nombre de RED est passé de 13 à 18 car de nouveaux défauts spécifiques ont été révélés (sed-collision, double-comptage dans le code, désynchronisation des miroirs HTML). Dans le même temps, les 13 RED initiaux sont fermés au niveau des sources MD. Après Horizon II (sed + pandoc + édition manuelle de 6 fichiers), 0-3 RED sont attendus.

## 6. Feuille de route prioritaire (Horizon II)

### Horizon II.A — Sed + reconstruction pandoc (4 heures)

1. **Passage sed F-H1** : commandes prêtes dans `_частные_отчёты/F_QA.md` § 6 — fermeront 12 des 12 résidus F-H1 + sed-collision + KPI JS-input + entry-stat + KPI Plan d'affaires / DD_отчёт.html / Международная_оценка.html ERP/summary / Финмодель_допущения. ≈ 5 minutes.
2. **Régénération pandoc des .html depuis les .md** pour Финмодель, Plan d'affaires, Rapport DD, Avis d'expert, Valuation internationale, Fondement juridique, 08_Архитектурные_диаграммы, Brandbook, Promo via `_shared/doc-template.html`. ≈ 15 minutes (si pandoc installé ; sinon synchronisation manuelle).
3. **B-H1-1** : reconstruction de `Юридический_фундамент_ЦП_РСФСР.html` (après l'étape 2 — automatique).
4. **B-H1-2** : édition de `DD_отчёт.md:245` al. 1/38 → al. 12.2 + reconstruction automatique du `.html`.
5. **C-H1-4** : corriger `_shared/finmodel.js:211` — `const fullEV = npv;` (sans `+ tvDisc`).
6. **C-H1-8** : `Большая_презентация/index.html:744,746,760-761,1182` — slider WACC `value="30"` ; baseline JS NPV 51,2 / Payback 2,8.
7. **A-POST-11** : `Прототип/index.html:538` — RN+MAUI → PWA+Capacitor v6+.
8. **A-POST-13** : `04_Интеграции_с_ГИС.md` §§ 2.5–2.6 — marqueur Stage.
9. **A-POST-9** : `Брендбук_ЦП_РСФСР.md:14` Vision — marquage biphasé.

### Horizon II.B — Édition manuelle du narratif (3 heures)

10. **B-H1-3 / D-PR-3** : réécrire `Бизнес-план_ЦП_РСФСР.md` §§ 2.2, 3.4, 4.4 sous Stage 1 / Stage 2. Reconstruire le .html.
11. **B-H1-4** : `Малая_презентация/index.html:376` — reformuler « émission ciblée garantie » via l'architecture biphasée.
12. **B-H1-5** : `Доклад_для_госструктур_и_ЦБ_РФ.md:25, :207` — marqueurs Stage 2.
13. **C-H1-1 / arithmétique TV SoT v3** — décider : soit recalculer sur defensible 21,03 (VE complète 64,69) et propager en cascade aux documents clients, soit justifier 7,4 par OpEx/CapEx/ΔWC additionnels explicites.
14. **C-H1-2 / -3** : recalculer IRR/Payback sur la base defensible (project IRR 161 % ou investor Y7 28,6 %) ; mettre à jour en cascade le hero-cover-stat.
15. **C-H1-5** : reconstruire `Финансовая_модель_ЦП_РСФСР.md` intégralement à partir de SoT v3, non par patch sed.
16. **C-H1-9** : tableau KPI §9.1 du Plan d'affaires — remplacer NPV 170,1 par 51,2 ; aligner avec §9.2.

### Horizon II.C — Édits stratégiques (3 jours ouvrés)

17. **D-PR-5** : diffusion du champion map dans Concept.md (après §1-bis), Plan d'affaires.md (nouveau §13 « GTM »), DD_отчёт.md (§2.5), Pitch deck (nouveau slide). 6 pre-meeting briefs dans `02_Юридический_фундамент/Pre-meeting_briefs/`.
18. **D-PR-6** : section « Rouble numérique 340-FZ » dans Plan d'affaires §10 + DD §3 + Rapport BC §9 (3 scénarios de cannibalisation).
19. **D-PR-7** : section « Contours défensifs contre la copie » dans Plan d'affaires §22 + DD §3.4 (effets de réseau + portefeuille de PI + vitesse + moat contractuel avec Atomyze).
20. **D-PR-8** : LoI avec Atomyze (exclusivité 3 ans) ; lettre consultative à VEB.RF FPF via le ministère du Développement économique ; MoU avec le Tatarstan ; MoU avec Gazprombank.
21. **D-PR-11** : bridge EBITDA 65 %→74,8 % — ligne de transition dans Plan d'affaires §12 + Wedge §5.2 + DD §4.1.
22. **D-PR-12** : protection de l'auteur A.Kh.A. Kagirov — Concept.md 1-ter + Plan d'affaires §11.2 (titulaire du savoir-faire + siège inaliénable au CA jusqu'à la Série B + covenants dans le Pacte d'actionnaires).

### Horizon II.D — Méthodologie financière (1-2 jours ouvrés)

23. **C-H1-13** : implémenter Monte Carlo dans `finmodel.js` (1000 itérations, 6 paramètres).
24. **C-H1-14** : unifier le bridge cash-runway à 0,75 Md ₽.
25. **C-H1-12** : recalculer les matrices de sensibilité Финмодель sous WACC = 30 %, baseline KS = 21 %.
26. **B-NEW-12** : scinder le tableau § 1.3 de Учреждение_АО en « soumis à approbation BC (7+1) » et « intra-corporate ».

### Horizon II.E — Design (demi-journée)

27. **E-POST-4** : emoji ☀ ☾ ★ ✓ → SVG en ligne (12 remplacements).
28. **E-POST-5** : Pitch deck slide 5 — blocs stat de scénarios.
29. **E-NEW-3** : drapeaux-emoji → SVG ou ISO-2.

### Horizon II.F — Optionnel (1-3 jours ouvrés)

30. apple-touch-icon dans manifest.json.
31. **B-NEW-13/-14/-15** : contrat d'entiercement / Politique disclaimer / contrat opérateur 353-FZ.
32. Plan du chap. 72 du CC (invention).
33. **A-POST-7** : étendre sitemap-hreflang aux 9 URL restantes.
34. Créer `BUILD_PIPELINE.md` avec le pipeline pandoc et le rendu mermaid — ferme la classe architecturale « MD corrigé — HTML en retard ».

**Total : ≈ 1,5-2 jours ouvrés pour les Horizons II.A + II.B + II.D + II.E + 3 jours ouvrés pour II.C (édits stratégiques et drafts LoI/MoU).** Prévision de la note consolidée après Horizon II.A-F : **8,5-9,0 / 10**.

## 7. Résolution finale

| Audience | Statut avant Horizon I | Statut après | Condition |
|---|---|---|---|
| **À l'intérieur de Center Group** | Prêt | Prêt | — |
| **Friendly / capital familial** | Prêt | Prêt | — |
| **Investisseur stratégique amical** | Prêt sous conditions | **Prêt** | Sans réserves |
| **VEB.RF FPF en co-investisseur** | Non prêt | **Prêt** | Lettre consultative via le canal du ministère du Développement économique |
| **Gazprombank-DD / PSB-DD** | Non prêt | **Prêt sous conditions** | Cover-stat OK ; DD_отчёт.html à reconstruire (5 minutes) |
| **VC tier-1 (a16z / Sequoia / Index)** | Non prêt | **Prêt sous conditions pour le screening initial ; ne tiendra pas la DD approfondie** | Horizon II.A + II.D + II.E obligatoires |
| **Registre des opérateurs AFN de la Banque de Russie** | Non prêt | **Prêt sous conditions** | Constitution de la SA + CIPF T+9…T+18 (voie formelle) |
| **Publication sur RuStore** | Non prêt | **Prêt sous conditions** | A-POST-1/2 fermés ; keystore de production + assetlinks.json requis (DevSecOps) |

**Position défendable « telle quelle après Horizon I »** : friendly + VC amical + VEB.RF FPF + ministère du Développement économique. Plafond stratégique : **50-80 M $ pre-money** via la justification wedge-pilote.

**Position défendable après Horizon II.A-F (5-7 jours ouvrés)** : Gazprombank / PSB DD / VC tier-1 seed-stage. Plafond stratégique : **80-120 M $ pre-money Base** (ou 100-140 M $ à NPV defensible 64,7 après résolution de C-H1-1).

**Position défendable après Horizon II.C (LoI/MoU signés, champion map active, 3-6 mois)** : VC tier-1 Série A + VEB.RF Ventures + Gazprombank Capital. Plafond stratégique : **120-180 M $ pre-money** sous réserve de réunions T+30 / T+90 réussies.

## 8. Méthodologie et réserves

1. **Parallélisme.** 6 auditeurs ont travaillé indépendamment, sans communication croisée. Note consolidée = moyenne pondérée (poids 0,20 / 0,20 / 0,20 / 0,15 / 0,12 / 0,13).
2. **Vérification boomerang.** Pour chacun des 18 correctifs de l'Horizon I, une vérification grep / Read indépendante a été menée avec un statut factuel (fermé / partiel / non exécuté / défaut-en-correction).
3. **Norme de preuve.** Chaque assertion — avec une référence à `fichier:ligne`. Conclusions financières — avec recalcul ligne par ligne de FCF / WACC / NPV / TV / EM / IRR / Payback. Juridiques — avec références aux articles précis des actes normatifs.
4. **Lecture seule.** Les fichiers du projet n'ont pas été modifiés pendant l'audit.
5. **Réserve sur la NPV.** SoT v3 déclare une NPV complète de 51,2. Le recalcul defensible donne 64,69. La décision finale revient au titulaire du modèle financier. Tous les documents clients de l'Horizon I sont alignés sur 51,2 ; en cas de choix de defensible 64,69, une nouvelle vague sed sera nécessaire.
6. **Logique wedge comme baseline.** Toutes les évaluations stratégiques ont été menées en supposant que le Stage 1 est la stratégie correcte pour le champ réglementaire actuel.
7. **Divergence note vs auto-évaluation auditeur.** B · Juridique s'est auto-noté 7,4 (avec une pénalité de −0,3 pour B-H1-1/2/3) ; C · Fin s'est auto-noté 5,9 (malgré le double-comptage dans le code). Ces notes sont acceptées telles quelles ; le principe tier-1 consiste à faire confiance à l'auditeur de domaine.

## 9. Référence de mission

Audit consolidé post-Horizon I de la PN RSFSR · 24.05.2026 (soir)
Client : Abdul-Khakim Akhmadovitch Kagirov / Center Group Company
Objet : `E:\Проекты Аслана\Приложение_РСФСР\ЦП РСФСР Исправленный\`
Certificat d'auteur du concept : n° 4011265 du 19.12.2024
