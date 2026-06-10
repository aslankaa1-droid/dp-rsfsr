# Post–Horizon-I Consolidated Audit of CP RSFSR

**Date:** 24.05.2026 (evening edition, after applying Horizon I)
**Subject:** `E:\Проекты Аслана\Приложение_РСФСР\ЦП РСФСР Исправленный\` (~254 files total, ~235 excluding `14_Аудит`)
**Panel composition:** 6 independent tier-1 auditors, working in parallel, without cross-communication.

## 1. Executive Summary

Horizon I (evening iteration of 24.05.2026, ≈4 hours of work across 18 targeted corrections) produced a **weighted-average score uplift of +0.95** — from 6.54 to **7.49 / 10**. All 13 RED defects from the post-refactor audit are **closed at least at the MD-source level**. Deltas by contour: A · Tech +1.2 (7.2 → 8.4) · B · Legal +0.6 (6.8 → 7.4) · C · Fin +0.5 (5.4 → 5.9) · D · Strat +1.3 (6.4 → 7.7) · E · Design +0.3 (7.9 → 8.2) · F · QA +2.0 (5.8 → 7.8).

Structural qualitative changes:

1. **Stage 1 (pilot-light 2026–2028) / Stage 2 (horizon 2029+) — two-stage architecture** is now uniform across seven anchor artefacts (Concept § 1-bis, Legal Foundation § 4 / § 8.1-8.4, Business Plan §§ 1, 3.1, 3.2, 4.5, 10, 12.1, DD Report §§ 2.1, 2.3, 3.3, 4.1, 4.3, CBR Address §§ 3.1-3.4, 6, 10.1-10.2, 12, Wedge_pilot-light, _shared/i18n.js × 4 locales).
2. **EULA cap on "12-month commissions" — removed** (B-NEW-7); EULA is brought into line with articles 13, 15 of the Consumer Rights Protection Act + articles 393, 1064, 1095 of the Civil Code. The RuStore-publication blocker is eliminated.
3. **Live PWA and RuStore promo** — rewritten for Stage 1; phrasings such as "targeted Bank of Russia emission" have been removed from installable artefacts and from the RuStore catalogue card.
4. **Mobile application specification** — migrated from React Native 0.74+ to PWA + Capacitor v6+ in MD sources and in the HTML mirrors of the Specification and PMI documents.
5. **Financial KPIs** — synchronised in the hero-cover-stat of 5+ key artefacts (Large Deck, Small Deck, HTML_main, HTML_short, Pitch Deck, root index.html partially); Business Plan §9.2 re-laid out with project-level KPIs and an investor-level footnote; sub-clauses 12.2 of clause 2, art. 149 of the Tax Code are fixed in the MD of the Legal Foundation and DD Report.
6. **Pitch Deck slide 10 "The Ask"** — now carries the full term-sheet preview: ask $15M = ₽1.335 bn @ FX 71.55 / pre-money $100M Base (Reasoned $70–140) / post-money $115M / stake 13.04 / use-of-funds across 5 categories with Stage markers.
7. **finmodel.js EM formula** — rewritten away from TVPI logic to the investor-share formula (although this introduced a new defect — double-count of tvDisc; see below).
8. **sw.js SHELL_ASSETS** — screenshot paths aligned with the actual files; the PWA offline cache is restored.
9. **D-PR-4 "targeted infrastructure funding"** — sed-residue cleaned in 8 hero-leads of public artefacts.
10. **Legal Foundation § 8.2 → § 8.3 → § 8.4** — duplicate numbering removed.

At the same time, Horizon I uncovered a **new defect class** in the C/F blocks — **sed-collision "in place of itself"** and **desynchronisation of HTML mirrors with updated MD sources**. The main open blockers for tier-1 communication:

1. **DD_отчёт.html has not been regenerated from MD** — it still carries NPV 170 / Payback 2.4 / EBITDA 97% / WACC 22% (although the MD source is Stage-marked and updated). Gazprombank-DD / VTB-DD will open DD_отчёт.html as the very first move — a stop-signal in 30 seconds.
2. **TV arithmetic of SoT v3 phases I+II = 7.4 vs defensible ₽21.03 bn (×2.84 underestimate)** — the sed wave aligned all client documents on the declared ₽63.4 bn, but the defensible full-DCF EV = ₽64.69 bn. Any independent DCF reconstruction by a tier-1 valuation team will detect the discrepancy.
3. **`finmodel.js:211` double-count of tvDisc** — `fullEV = npv + tvDisc` while `npv` already includes `tvDisc`. The code outputs EM ≈ 10.37× instead of the declared 12×.
4. **Business Plan §3, §9.1 KPI table contains "NPV ₽170.1 bn"** — sed did not match the mask with the decimal part "170.1" (without `<em>`). Internal contradiction with §9.2 Base 63.4.
5. **Финмодель.md sensitivity matrices (lines 166-188)** contain baseline 63.4 at WACC 29.5, which does not derive from SoT (defensible 41.78 without TV or 64.69 with TV). The HTML mirror `.html:1403, 1456, 1507` gives "170" — three different values for the same quantity.
6. **sed-collision "74.8% instead of 74.8%" / "12× (instead of 12×)"** — in 4 files sed processed the old and the new value with the same mask and left tautologies of the form "was/became with identical values".
7. **Business Plan §2.2, §3.4, §4.4** (outside the Horizon I scope) — retain the Stage 2 emission model as the operational/base category; the HTML mirror `Бизнес-план_ЦП_РСФСР.html` lines 140, 277, 311, 321, 366, 432, 916, 1022, 1079-1080 — same.
8. **Champion map (D-PR-5), cannibalisation by the digital rouble (D-PR-6), copying protection (D-PR-7), LoI/MoU (D-PR-8)** — four strategic items kept out of Horizon I scope; they form the core of the Horizon II strategic roadmap.

Communication readiness: **friendly + amicable VC + VEB.RF Industrial Projects Factory — ready; Gazprombank-DD — on the edge (cover-stat OK, DD report not); tier-1 VC — will pass the initial screening, but not the deep DD of weeks 2-4**. Horizon II (sed wave + pandoc HTML rebuild + champion-map diffusion + LoI/MoU drafts + manual editing of 6 emission-related files) — 1-2 working days and should lift the aggregate score to **8.5-9.0 / 10**.

## 2. Weighted Score Across 6 Contours

| Contour | Weight | Score before Horizon I | Score after | Delta |
|---|---:|---:|---:|---:|
| A · Technical | 0.20 | 7.2 | **8.4** | **+1.2** |
| B · Legal | 0.20 | 6.8 | **7.4** | **+0.6** |
| C · Financial | 0.20 | 5.4 | **5.9** | **+0.5** |
| D · Strategic | 0.15 | 6.4 | **7.7** | **+1.3** |
| E · Design / UX | 0.12 | 7.9 | **8.2** | **+0.3** |
| F · Cross-consistency | 0.13 | 5.8 | **7.8** | **+2.0** |
| **Composite** | **1.00** | **6.54** | **7.49 / 10** | **+0.95** |

A delta of +0.95 after 4 hours of work is a very effective effort-to-result ratio. The biggest shifts: F · QA (+2.0; the sed wave across 15 files closed 8 of 11 key SoT parameters), D · Strat (+1.3; three REDs across the Business Plan / DD Report / CBR Address are closed and sed residue cleaned), A · Tech (+1.2; all three REDs on live PWA / RuStore / DD_отчёт.md are closed). The smallest delta — C · Fin (+0.5): code rewritten, but contains a new defect; SoT v3 TV arithmetic not recomputed; the Финмодель sensitivity matrices are patchwork.

## 3. Six-Contour Verdict Table

| Contour | Score | Verdict |
|---|---:|---|
| A · Tech | 8.4 / 10 | All three REDs lifted. RuStore / FSTEC / Bank of Russia 779-P — "conditionally ready". Open: A-POST-5 (08_Архитектурные_диаграммы.html RN), A-POST-7 (hreflang 9/17), A-POST-9 (Brandbook Vision), A-POST-11 (Prototype RN+MAUI in footer), A-POST-12 (DD_отчёт.html not rebuilt), A-POST-13 (04_Интеграции without Stage marker). |
| B · Legal | 7.4 / 10 | B-NEW-7 EULA closed. B-NEW-8 § 4 / § 15 closed in MD. B-NEW-10 numbering closed. Open: B-H1-1 (Юр.фундамент.html:619 sub-cl. 1/38), B-H1-2 (DD report on VAT), B-H1-3 (Business Plan §§2.2, 3.4, 4.4 — emission as basis), B-H1-4 (Small Deck slide 11), B-H1-5 (CBR Address § 1, § 9). |
| C · Fin | 5.9 / 10 | WACC build-up and 10-year NPV reproducible; hero-cover-stat consistent. 9 RED + 6 AMBER open: C-H1-1 (TV ×2.84 underestimate), C-H1-2/3 (project-level IRR/Payback not reproducible), C-H1-4 (double-count in finmodel.js), C-H1-5..C-H1-9 (Финмодель/Business Plan §9.1/DD.html/Финмодель_допущения.html/Large Deck calculator). |
| D · Strat | 7.7 / 10 | All 3 REDs closed (D-PR-1/2/3). Wedge uniform across 7 artefacts. Gazprombank-DD + VEB.RF IPF readiness. Open: D-PR-5 (champion map isolated), D-PR-6 (digital-rouble cannibalisation single line), D-PR-7 (copying protection 0), D-PR-8 (LoI/MoU 0), D-PR-11 (EBITDA bridge 65%→74.8%), D-PR-12 (author protection). |
| E · Design | 8.2 / 10 | Pitch Deck slide 10 fully closed. SW screenshot cache restored. Open (outside Horizon I scope): emoji ☀ ☾ ★ ✓ in decks + PWA (24 lines), flag-emoji, semantic HTML, data-i18n coverage, RTL extension, manifest theme_color. |
| F · QA | 7.8 / 10 | 8 of 11 SoT parameters synchronised. Open: F-H1-1 (sed-collision in 4 files), F-H1-2 (Large Deck JS-input), F-H1-3 (Booklet cover-stat), F-H1-4 (Финмодель sensitivity), F-H1-5 (index.html:198 63.4), F-H1-6 (HTML_main 2.4), F-H1-7 ("₽170.1 bn" in 3 files), F-H1-8 (DD_отчёт.html not rebuilt). |

## 4. Key Open Defects by Contour

### 4.1. A · Tech (`_частные_отчёты/A_Tech.md`)

- **AMBER · A-POST-5** — `08_Архитектурные_диаграммы.html:184-185` retains `(React Native)`; the MD source is Capacitor.
- **AMBER · A-POST-7** — `sitemap.xml:105-175`: 9 of 17 URLs only `hreflang="ru"`.
- **AMBER · A-POST-9** — `05_Бренд-бук/Бренд-бук_ЦП_РСФСР.md:14` — "Become the sovereign operator level of the targeted secured emission of the RF" as core-vision without a Stage 2 marker.
- **AMBER · A-POST-11** — `Прототип/index.html:538` — "React Native + .NET MAUI" in the footer.
- **AMBER · A-POST-12** — `DD_отчёт.html:230,345` tonal drift; the .html is not rebuilt from the updated .md.
- **AMBER · A-POST-13** — `04_Интеграции_с_ГИС.md` §§ 2.5–2.6 described as the operating model without Stage marking.

Horizon II on A: 30 minutes of targeted edits + pandoc pipeline → score 9.0+.

### 4.2. B · Legal (`_частные_отчёты/B_Legal.md`)

- **RED · B-H1-1** — `Юридический_фундамент_ЦП_РСФСР.html:619` retains "sub-clauses 1 and 38 of clause 2 of art. 149 of the Tax Code of the RF" (medical goods); the MD has been corrected, the HTML not rebuilt.
- **RED · B-H1-2** — `DD_отчёт.md:245` + `.html:443` — same. A blocker for filing with the Ministry of Finance and for tier-1 VC DD.
- **RED · B-H1-3** — `Бизнес-план_ЦП_РСФСР.md:73` (§2.2), `:131` (§3.4), `:173-178` (§4.4), `:192-196` (§4.5) — retain the Stage 2 emission model as the base category.
- **AMBER · B-H1-4** — `Малая_презентация/index.html:376` — "secured targeted emission" as a unique signal.
- **AMBER · B-H1-5** — `Доклад_для_госструктур_и_ЦБ_РФ.md:25, :207` — phrasings without a Stage 2 marker.
- **AMBER · B-NEW-12 / -13 / -14 / -15** — post-refactor legacy (779-P inventories, escrow contract, PD disclaimer, operator–pledgor contract without 353-FZ).
- **AMBER · B-H1-7** — T+18 (Wedge) vs T+24 (Учреждение_АО) divergence of 6 months.

Horizon II on B: 6 must-fix items (B-H1-1..B-H1-5 + B-NEW-12) + nice-to-have. After that the score should reach 8.5+ and Gazprombank-DD will be ready.

### 4.3. C · Fin (`_частные_отчёты/C_Fin.md`)

- **RED · C-H1-1** — SoT v3 § 5 TV arithmetic: phases I+II declared 7.4 vs defensible **₽21.03 bn** (×2.84). Full defensible DCF EV = **₽64.69 bn**, not 63.4.
- **RED · C-H1-2** — IRR 62% (project-level) is not reproducible by the standard formula. Project-level defensible ≈ 161%; Investor Y7 (NPV 63.4) = 28.6%; Investor Y7 (NPV 64.69) = 33.5%.
- **RED · C-H1-3** — Payback 2.8 is not reproducible by any of three methods (project 3.24 / investor cash distribution 4.21 / investor disc stake 5.32).
- **RED · C-H1-4** — `finmodel.js:211` tvDisc double-count: `fullEV = npv + tvDisc` while `npv` already includes `tvDisc` → EM ≈ 10.37× instead of 12×.
- **RED · C-H1-5** — `Финансовая_модель_ЦП_РСФСР.md` is "patchwork": a mixture of new and old values in the same table.
- **RED · C-H1-6** — `DD_отчёт.html:323-328`: NPV 170 / Payback 2.4 / EBITDA 97% / WACC 29.5 (only WACC has been updated).
- **RED · C-H1-7** — `Финмодель_допущения_и_расчёты.html:351`: heading "WACC 29.5" vs body "KS 18% + 4 = 22%".
- **RED · C-H1-8** — `Большая_презентация/index.html:744,746`: WACC slider `value="22"`; `:760-761` JS baseline NPV 170 / Payback 2.4.
- **RED · C-H1-9** — Business Plan §9.1 NPV 170.1 vs §9.2 Base 63.4 (internal contradiction).
- **AMBER · C-H1-10 / C-H1-11** — sed inversion of EM 48× and EBITDA 74.8% in Финмодель.md:240-241.
- **AMBER · C-H1-12** — Финмодель.md:166-168 scenario table with old Base 63.4 / EV 105.1.
- **AMBER · C-H1-13** — Monte Carlo in finmodel.js not implemented.
- **AMBER · C-H1-14** — Cash-runway bridge: three figures (200/750/450 mn).
- **AMBER · C-H1-15** — Share of TV in NPV: 3 values (3.8% / 9.0% / defensible 2.9%).

Horizon II on C: 14 P0 + 7 P1 (1–2 working days). The main task — recompute TV SoT v3 phases I+II to defensible 21.03 (full EV 64.69) and cascade-update the client documents; alternatively, justify 7.4 explicitly via additional OpEx/CapEx/ΔWC.

### 4.4. D · Strat (`_частные_отчёты/D_Strat.md`)

- **AMBER · D-PR-5** — Champion map (Reshetnikov / Kolychev / Sazanov / Aksakov / Minnikhanov / Moor) is isolated in `Wedge_pilot-light.md:51-61`; a grep across 8 key artefacts — 0 hits.
- **AMBER · D-PR-6** — Cannibalisation by the 340-FZ digital rouble — a single declarative line.
- **AMBER · D-PR-7** — Regulatory copying protection — 0 mentions.
- **AMBER · D-PR-8** — LoI / MoU / consultative letter — 0 signed.
- **AMBER · D-PR-11 (new)** — EBITDA margin: the gap 65%→74.8% (2030→2034) between `Wedge_pilot-light.md:131-137` (§5.2) and the Business Plan / DD / Pitch Deck with no bridging line.
- **AMBER · D-PR-12 (new)** — Protection of author A.Kh.A. Kagirov against squeeze-out by an institutional shareholder (know-how rights holder + inalienable Board seat until Series B + covenants in the Shareholders Agreement) is not formalised.

Horizon II on D: 6 edits (champion-map diffusion, digital-rouble and copying risk sections, LoI/MoU drafts, EBITDA bridge, author protection). ~3 working days. Then — score 8.5+ and readiness for tier-1 VC.

### 4.5. E · Design (`_частные_отчёты/E_Design.md`)

- **AMBER · E-POST-4** (priority 1) — emoji ☀ ☾ in the theme switcher of Pitch Deck (180-181) and Large Deck (292-293); ★ ✓ in hub-items of the Large Deck (858, 897, 901). After E-POST-2 is closed, this is the only visual blemish on the deck screenshots.
- Inherited unchanged: E1 PWA emoji 24 lines; E-NEW-3 flag-emoji; E-POST-3 manifest theme_color single; E-POST-5 Conservative/Optimistic without separate stat blocks; E-NEW-5 back-stack PWA; E-NEW-6 RTL 6 selectors; E-NEW-7 data-i18n 8 elements; Semantic HTML PWA.

Horizon II on E: the first task — emoji → SVG (12 replacements, ~30 minutes). Then — score 9.0+.

### 4.6. F · QA (`_частные_отчёты/F_QA.md`)

- **RED · F-H1-1** — sed-collision "in place of itself" in 4 files (`Финмодель.md:240-241`, `Финмодель_допущения.md:106`, `Международная_оценка.md:24,302,304`).
- **RED · F-H1-2** — Большая_презентация:760-761 JS baseline NPV 170 / Payback 2.4.
- **RED · F-H1-3** — Booklet.html:182-183 cover-stat 170 / 2.4.
- **RED · F-H1-4** — Финмодель.md sensitivity baseline 63.4 (`:166, :178, :187`) + HTML mirror 170 (`:1403, :1456, :1507`).
- **RED · F-H1-5** — index.html:198 entry-stat 63.4.
- **RED · F-H1-6** — HTML_основной:302 Payback 2.4 (data-i18n).
- **RED · F-H1-7** — "₽170.1 bn" in Бизнес-план.md/html and Финмодель.html.
- **RED · F-H1-8** — DD_отчёт.html not rebuilt (NPV 170 / Payback 2.4 / EBITDA 97%).
- **AMBER · F-H1-9 / -10 / -11** — Международная_оценка.html ERP 6%, summary 21.5% (rounded to 22%); Финмодель_допущения.html sed-collision "ERP 8.13 = 8-10%"; KS 18% in sensitivity column label.
- **AMBER · F-H1-12** — Emission of the CBR as the MAIN category in 6 files without a Stage 2 marker.

Horizon II on F: a single sed pass (commands ready in the report, ~5 minutes) + pandoc HTML rebuild (~10 minutes) + manual editing of 6 files (~30 minutes) + recomputation of the sensitivity matrices (~90 minutes). Forecast: score 9.0-9.3.

## 5. Aggregated Map of Open RED + AMBER

| Code | Category | Contour | Brief |
|---|---|---|---|
| A-POST-5 | AMBER | A | 08_Архитектурные_диаграммы.html RN; MD Capacitor |
| A-POST-7 | AMBER | A | sitemap.xml hreflang 9/17 URLs |
| A-POST-9 | AMBER | A | Brandbook Vision Stage 2 as core |
| A-POST-11 | AMBER | A | Прототип:538 RN+MAUI |
| A-POST-12 | AMBER | A | DD_отчёт.html not rebuilt (tonal drift) |
| A-POST-13 | AMBER | A | 04_Интеграции §§ 2.5-2.6 without Stage marker |
| B-H1-1 | RED | B | Юр.фундамент.html:619 sub-cl. 1/38 Tax Code |
| B-H1-2 | RED | B | DD report on VAT not updated |
| B-H1-3 | RED | B | Business Plan §§ 2.2, 3.4, 4.4 — emission as base |
| B-H1-4 | AMBER | B | Small Deck slide 11 "secured targeted emission" |
| B-H1-5 | AMBER | B | CBR Address § 1, § 9 without Stage 2 marker |
| B-NEW-12 | AMBER | B | 779-P inventories differ |
| B-NEW-13 | AMBER | B | Escrow contract — reference to a non-existent inventory |
| B-NEW-14 | AMBER | B | Policy — no Roskomnadzor disclaimer |
| B-NEW-15 | AMBER | B | Operator–pledgor contract without 353-FZ |
| B-H1-7 | AMBER | B | T+18 vs T+24 divergence |
| C-H1-1 | RED | C | TV phases I+II 7.4 vs defensible 21.03 |
| C-H1-2 | RED | C | IRR 62% not reproducible |
| C-H1-3 | RED | C | Payback 2.8 not reproducible |
| C-H1-4 | RED | C | finmodel.js:211 tvDisc double-count |
| C-H1-5 | RED | C | Финмодель.md "patchwork" |
| C-H1-6 | RED | C | DD_отчёт.html not rebuilt |
| C-H1-7 | RED | C | Финмодель_допущения.html heading vs body |
| C-H1-8 | RED | C | Large Deck WACC slider = 22 |
| C-H1-9 | RED | C | Business Plan §9.1 NPV 170.1 vs §9.2 63.4 |
| C-H1-10..15 | AMBER | C | sed inversions, Monte Carlo, bridge, TV share |
| D-PR-5 | AMBER | D | Champion map isolated |
| D-PR-6 | AMBER | D | Digital-rouble cannibalisation single line |
| D-PR-7 | AMBER | D | Copying protection 0 |
| D-PR-8 | AMBER | D | LoI / MoU 0 signed |
| D-PR-11 | AMBER | D | EBITDA bridge 65%→74.8% unexplained |
| D-PR-12 | AMBER | D | Protection of author A.Kh.A. Kagirov |
| E-POST-4 | AMBER | E | Emoji ☀ ☾ ★ ✓ in decks + PWA |
| E1 / E-NEW-3 | AMBER | E | PWA emoji 24 lines + flag-emoji |
| E-NEW-5 / -6 / -7 | AMBER | E | Back-stack / RTL / data-i18n coverage |
| E-POST-3 / -5 | AMBER | E | manifest theme_color / Conservative-Optimistic |
| F-H1-1 | RED | F | sed-collision in 4 files |
| F-H1-2 / -3 | RED | F | Large Deck JS-input + Booklet cover-stat |
| F-H1-4 | RED | F | Финмодель sensitivity baseline 63.4 / HTML 170 |
| F-H1-5 / -6 | RED | F | index.html:198 63.4 + HTML_main Payback 2.4 |
| F-H1-7 | RED | F | "₽170.1 bn" in 3 files |
| F-H1-8 | RED | F | DD_отчёт.html not rebuilt |
| F-H1-9..13 | AMBER | F | Международная_оценка.html ERP / WACC summary / KS / CBR emission |

**Total: 18 RED + 28 AMBER = 46 open items** (vs 13 RED + 31 AMBER before Horizon I).

The paradox: the number of REDs has risen from 13 to 18 because new specific defects have been uncovered (sed-collision, double-count in code, desync of HTML mirrors). At the same time, all 13 original REDs are closed at the MD-source level. After Horizon II (sed + pandoc + manual editing of 6 files), 0-3 REDs are expected.

## 6. Priority Roadmap (Horizon II)

### Horizon II.A — Sed + pandoc rebuild (4 hours)

1. **F-H1 sed pass**: ready commands in `_частные_отчёты/F_QA.md` § 6 — will close 12 of 12 F-H1 residue + sed-collision + JS-input KPI + entry-stat + Business Plan KPI / DD_отчёт.html / Международная_оценка.html ERP/summary / Финмодель_допущения. ≈ 5 minutes.
2. **Pandoc regeneration of .html from .md** for Финмодель, Business Plan, DD Report, Expert Opinion, International Valuation, Legal Foundation, 08_Архитектурные_диаграммы, Brandbook, Promo Materials via `_shared/doc-template.html`. ≈ 15 minutes (if pandoc is installed; otherwise manual synchronisation).
3. **B-H1-1**: rebuild `Юридический_фундамент_ЦП_РСФСР.html` (after step 2 — automatic).
4. **B-H1-2**: edit `DD_отчёт.md:245` sub-cl. 1/38 → sub-cl. 12.2 + automatic rebuild of the `.html`.
5. **C-H1-4**: fix `_shared/finmodel.js:211` — `const fullEV = npv;` (without `+ tvDisc`).
6. **C-H1-8**: `Большая_презентация/index.html:744,746,760-761,1182` — WACC slider `value="30"`; JS baseline NPV 63.4 / Payback 2.8.
7. **A-POST-11**: `Прототип/index.html:538` — RN+MAUI → PWA+Capacitor v6+.
8. **A-POST-13**: `04_Интеграции_с_ГИС.md` §§ 2.5–2.6 — Stage marker.
9. **A-POST-9**: `Брендбук_ЦП_РСФСР.md:14` Vision — two-stage marking.

### Horizon II.B — Manual narrative editing (3 hours)

10. **B-H1-3 / D-PR-3**: rewrite `Бизнес-план_ЦП_РСФСР.md` §§ 2.2, 3.4, 4.4 under Stage 1 / Stage 2. Rebuild the .html.
11. **B-H1-4**: `Малая_презентация/index.html:376` — reformulate "secured targeted emission" via the two-stage architecture.
12. **B-H1-5**: `Доклад_для_госструктур_и_ЦБ_РФ.md:25, :207` — Stage 2 markers.
13. **C-H1-1 / SoT v3 TV arithmetic** — decide: either recompute to defensible 21.03 (full EV 64.69) and cascade-update client documents, or justify 7.4 via explicit additional OpEx/CapEx/ΔWC.
14. **C-H1-2 / -3**: recompute IRR/Payback on the defensible basis (project IRR 161% or investor Y7 28.6%); cascade-update the hero-cover-stat.
15. **C-H1-5**: rebuild `Финансовая_модель_ЦП_РСФСР.md` in full from SoT v3, not by sed patching.
16. **C-H1-9**: Business Plan §9.1 KPI table — replace NPV 170.1 with 63.4; align with §9.2.

### Horizon II.C — Strategic edits (3 working days)

17. **D-PR-5**: champion-map diffusion into Concept.md (after §1-bis), Business Plan.md (new §13 "GTM"), DD_отчёт.md (§2.5), Pitch Deck (new slide). 6 pre-meeting briefs in `02_Юридический_фундамент/Pre-meeting_briefs/`.
18. **D-PR-6**: section "Digital rouble 340-FZ" in Business Plan §10 + DD §3 + CBR Address §9 (3 cannibalisation scenarios).
19. **D-PR-7**: section "Defensive contours against copying" in Business Plan §22 + DD §3.4 (network effects + IP portfolio + speed + contractual moat with Atomyze).
20. **D-PR-8**: LoI with Atomyze (3-year exclusivity); consultative letter to VEB.RF IPF via the Ministry of Economic Development; MoU with Tatarstan; MoU with Gazprombank.
21. **D-PR-11**: EBITDA bridge 65%→74.8% — a bridging line in Business Plan §12 + Wedge §5.2 + DD §4.1.
22. **D-PR-12**: protection of author A.Kh.A. Kagirov — Concept.md 1-ter + Business Plan §11.2 (know-how rights holder + inalienable Board seat until Series B + covenants in the Shareholders Agreement).

### Horizon II.D — Financial methodology (1-2 working days)

23. **C-H1-13**: implement Monte Carlo in `finmodel.js` (1000 iterations, 6 parameters).
24. **C-H1-14**: unify the cash-runway bridge to ₽0.75 bn.
25. **C-H1-12**: recompute Финмодель sensitivity matrices under WACC = 29.5, baseline KS = 14.5.
26. **B-NEW-12**: split the table § 1.3 of Учреждение_АО into "subject to CBR approval (7+1)" and "intra-corporate".

### Horizon II.E — Design (half a day)

27. **E-POST-4**: emoji ☀ ☾ ★ ✓ → inline SVG (12 replacements).
28. **E-POST-5**: Pitch Deck slide 5 — scenario stat blocks.
29. **E-NEW-3**: emoji flags → SVG or ISO-2.

### Horizon II.F — Optional (1-3 working days)

30. apple-touch-icon in manifest.json.
31. **B-NEW-13/-14/-15**: escrow contract / Policy disclaimer / operator contract 353-FZ.
32. Plan for Civil Code Chapter 72 (invention).
33. **A-POST-7**: extend sitemap-hreflang to the remaining 9 URLs.
34. Create `BUILD_PIPELINE.md` with the pandoc pipeline and mermaid rendering — closes the architectural class "MD corrected — HTML lagging".

**Aggregate: ≈ 1.5-2 working days for Horizons II.A + II.B + II.D + II.E. + 3 working days for II.C (strategic edits and LoI/MoU drafts).** Forecast for the aggregate score after Horizon II.A-F: **8.5-9.0 / 10**.

## 7. Final Resolution

| Audience | Status before Horizon I | Status after | Condition |
|---|---|---|---|
| **Inside Center Group** | Ready | Ready | — |
| **Friendly / family capital** | Ready | Ready | — |
| **Amicable strategic investor** | Conditionally ready | **Ready** | Without reservations |
| **VEB.RF IPF as co-investor** | Not ready | **Ready** | Consultative letter via the Ministry of Economic Development channel |
| **Gazprombank-DD / PSB-DD** | Not ready | **Conditionally ready** | Cover-stat OK; DD_отчёт.html needs to be rebuilt (5 minutes) |
| **Tier-1 VC (a16z / Sequoia / Index)** | Not ready | **Conditionally ready for initial screening; will not survive deep DD** | Horizon II.A + II.D + II.E mandatory |
| **Bank of Russia DFA Operator Register** | Not ready | **Conditionally ready** | Incorporation of the JSC + CIPF T+9…T+18 (formal path) |
| **RuStore publication** | Not ready | **Conditionally ready** | A-POST-1/2 closed; production keystore + assetlinks.json required (DevSecOps) |

**Defensible position "as is after Horizon I"**: friendly + amicable VC + VEB.RF IPF + Ministry of Economic Development. Strategic ceiling: **$50-80M pre-money** via wedge-pilot justification.

**Defensible position after Horizon II.A-F (5-7 working days)**: Gazprombank / PSB DD / tier-1 VC seed-stage. Strategic ceiling: **$80-120M pre-money Base** (or $100-140M at NPV-defensible 64.7 after C-H1-1 is resolved).

**Defensible position after Horizon II.C (LoI/MoU signed, champion map active, 3-6 months)**: tier-1 VC Series A + VEB.RF Ventures + Gazprombank Capital. Strategic ceiling: **$120-180M pre-money** subject to successful T+30 / T+90 meetings.

## 8. Methodology and Reservations

1. **Parallelism.** 6 auditors worked independently, without cross-communication. Aggregate score = weighted average (weights 0.20 / 0.20 / 0.20 / 0.15 / 0.12 / 0.13).
2. **Boomerang verification.** For each of the 18 Horizon I corrections, an independent grep / Read verification was carried out with a fact-status (closed / partial / not executed / defect-in-correction).
3. **Evidentiary standard.** Every assertion — with a reference to `file:line`. Financial conclusions — with line-by-line recomputation of FCF / WACC / NPV / TV / EM / IRR / Payback. Legal conclusions — with references to specific articles of legal acts.
4. **Read-only.** Project files were not modified during the audit.
5. **NPV reservation.** SoT v3 declares full NPV 63.4. The defensible recomputation gives 64.69. The final decision rests with the financial-model owner. All Horizon I client documents are aligned to 63.4; if the defensible 64.69 is chosen, a new sed wave will be required.
6. **Wedge logic as baseline.** All strategic assessments were made on the assumption that Stage 1 is the correct strategy for the current regulatory landscape.
7. **Score vs auditor self-assessment divergence.** B · Legal self-rated 7.4 (with a −0.3 penalty for B-H1-1/2/3); C · Fin self-rated 5.9 (despite the double-count in the code). These scores are accepted as is; the tier-1 principle is to trust the domain auditor.

## 9. Engagement Reference

Post–Horizon-I consolidated audit of CP RSFSR · 24.05.2026 (evening)
Client: Abdul-Khakim Akhmadovich Kagirov / Center Group Company
Subject: `E:\Проекты Аслана\Приложение_РСФСР\ЦП РСФСР Исправленный\`
Author's concept certificate: No. 4011265 dated 19.12.2024
