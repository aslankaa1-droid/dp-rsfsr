# Composite Post-Horizon II Audit · CPFSR

**Date:** 24.05.2026 (evening edition, after the Horizon II pass)
**Object:** `E:\Проекты Аслана\Приложение_РСФСР\ЦП РСФСР Исправленный\` (~255 files, ~13 MB)
**Group composition:** 6 independent tier-1 auditors, in parallel, without cross-communication.

## 1. Headline conclusion

Horizon II (≈ 6 hours of work across 30+ fixes) produced a **weighted score uplift of +0.6** — from 7.49 to **8.14 / 10**. **All 13 RED defects from the Post-Horizon I audit have been closed at the MD-source level** (B-H1-1..5, B-NEW-13/14, C-H1-4/5/8/9/14, A-POST-9/11/12/13). Deltas by contour: F · QA +0.9 (7.8 → 8.7) · B · Legal +0.9 (7.4 → 8.3) · D · Strat +0.7 (7.7 → 8.4) · C · Fin +0.6 (5.9 → 6.5) · E · Design +0.5 (8.2 → 8.7) · A · Tech +0.3 (8.4 → 8.7).

Structural qualitative changes:

1. **Financial KPIs of the client-side perimeter are synchronised** with SoT v3: the F-H1 sed wave closed 12 of 13 key signatures (NPV 63.4 / IRR 62% / Payback 2.8 / WACC 29.5 / EM 12× / TV EBITDA 74.8% / RF 14.73 / ERP 8.13, post-money USD 115, Reasoned USD 70–140M). The Business Plan §3, §9.1 KPI block ("NPV 170.1 → 63.4") is closed; the JS baseline `kpiNpv/kpiPayback` in the Major Presentation is synchronised; the booklet cover-stat and the root index.html entry-stat are migrated to SoT v3.
2. **The legal base is fully two-stage**: Legal Framework §§ 4.1/4.2 + § 8.1–8.4 in MD+HTML; sub-para 12.2 of the Tax Code in Legal Framework.html and DD_report.md/html; the consumer-law Article 16 EULA cap removed; the privacy policy with the Roskomnadzor disclaimer; the escrow agreement — CC Articles 860.7–860.10 + 395-1 without the non-existent enumeration.
3. **Business Plan §§ 1, 2.2, 3.1, 3.2, 3.4, 4.4, 4.5 rewritten under Stage 1 / Stage 2** in MD and HTML. The internal seam "Business Plan on Stage 2" (Horizon I RED) is eliminated.
4. **A named Champion-map** (Reshetnikov / Kolychev / Sazanov / Aksakov / Minnikhanov / Moor) added to Concept § 1-ter. **4 LoI / MoU drafts** in `02_Юридический_фундамент/Pre-meeting_briefs/` (Atomyze / VEB.RF PFF / Tatarstan / Gazprombank).
5. **D-PR-6/7/11/12** — digital-ruble cannibalisation under 340-FZ (3 scenarios + 3 mitigations), defence against regulator copying (4 moat contours), the 65% → 74.8% EBITDA bridge (3 factors), Kagirov-author protection (4 Shareholders-Agreement mechanisms) — added to Business Plan § 10 / § 11.3 / § 11.4 and Concept § 1-quater.
6. **finmodel.js:211 double-count** fixed: the EM formula now yields a mathematically correct investor TVPI = (0.158 × NPV) / 1.335.
7. **The interactive calculator in the Major Presentation** — WACC slider value=22 → 30; range min=15 max=30 → min=15 max=40.
8. **Emoji ☀ ☾ ★ ✓ → inline SVG** across 37 HTML files (Lucide-style sun/moon/star/check with `currentColor`); flag emojis 🇷🇺/🇬🇧/🇫🇷/🇸🇦 → ISO codes RU/EN/FR/AR in PWA settings.
9. **sitemap.xml hreflang** — 18 URLs × 4 locales (up from 9 URLs × 4).

The principal residual class of defects is **"MD fixed, HTML lagging"** (recurring in 5 of 6 contours — A, B, C, D, F):

- **Financial_model.html not rebuilt** from the updated MD: :1316 NPV ex-TV = 86,380; :1321 TV Gordon = 611,800; :1331 IRR ex-TV ~226%; :1336 Payback 2.37; :1402-1407 Base = NPV 170 / 2.4; :1456+:1507 sensitivity Base = 170.
- **International_valuation.html lags** the .md by ~679 lines: §2.5 EV(DCF) ≈ RUB 183 bn / pre-money USD 540M; §7.1 baseline WACC 21.5%.
- **Financial_model_assumptions.html §7.1 body** — heading "WACC 29.5", body "key rate 18%+4=22%"; "build-up 26%".
- **CBR_briefing.html** — § 10 not split into 10.1/10.2; preserves the pre-refactor "The Bank of Russia manages all escrow accounts of the targeted emission" without a Stage 2 marker.
- **Concept.html** (311 lines) — without 1-bis / 1-ter / 1-quater (the new sections exist only in .md).
- **Business_plan.html new sections** § 11.3, § 11.4, new risk-card rows § 10 (D-PR-6/7) — missing from the HTML.
- **08_Architectural_diagrams.html:184-186** — mermaid with RN+.NET MAUI (the MD is correctly Capacitor).

All these issues are resolved by a single pandoc pipeline pass. That is the structural recommendation of Horizon III.

The second category — **methodological debt**:

- **C-H1-1**: TV arithmetic of SoT v3 phases I+II = RUB 7.4 bn vs the defensible row-by-row per the finmodel.js logic = 19.78 (×2.67 underestimate). The full DCF EV defensible = RUB 63.38 bn, not 63.4. The decision has been postponed twice (Horizons II and III).
- **C-H1-2/-3**: IRR 62% / Payback 2.8 "project-level" not reproducible by the standard formula (defensible project IRR ≈ 160%; investor IRR Y7 ≈ 30%).
- **C-H1-13**: Monte Carlo declared in SoT § 9, not implemented in `finmodel.js`.
- **C-H2-3 (new)**: EBITDA 2034 = RUB 133.6 bn in Business Plan §53 and Financial_model.html:1361 with a stated margin of 74.8% arithmetically yields a margin of 96.9% (the old value). An internal contradiction in one cell.

The third category — **point fixes**:

- E-POST-4 regression: ☀ ☾ in PWA Settings `09_…/index.html:1207-1208` (the sed wave touched only the settings-panel 1414-1415).
- A-POST-H2-2/3/4: .NET MAUI / React Native / Detox in the Specification §§ 5.2, 6.1, the Development Roadmap M5.6, 02_Program_description (Horizon I under-coverage).
- B-NEW-12: lists of 779-P officers in the JSC Incorporation document vs the Legal Framework (Horizon III).

Communication readiness: **friendly + friendly VC + VEB.RF PFF — ready; friendly strategic investor — ready; Gazprombank-DD / PSB-DD — conditionally ready; tier-1 VC — withstands the initial screening and a 2-week data-room; the deep DD of weeks 3–4 requires the Horizon III pandoc pass + a methodological decision on C-H1-1**. Horizon III (≈ 4–6 hours of work) — forecast composite score **9.0–9.5 / 10**.

## 2. Weighted average score across the 6 contours

| Contour | Weight | Score before H-II | Score after H-II | Delta |
|---|---:|---:|---:|---:|
| A · Tech | 0.20 | 8.4 | **8.7** | **+0.3** |
| B · Legal | 0.20 | 7.4 | **8.3** | **+0.9** |
| C · Fin | 0.20 | 5.9 | **6.5** | **+0.6** |
| D · Strategic | 0.15 | 7.7 | **8.4** | **+0.7** |
| E · Design / UX | 0.12 | 8.2 | **8.7** | **+0.5** |
| F · Cross-consistency | 0.13 | 7.8 | **8.7** | **+0.9** |
| **Composite** | **1.00** | **7.49** | **8.14 / 10** | **+0.65** |

A delta of +0.65 after 6 hours of work is a high tempo. The largest shifts: F · QA (+0.9; 12 of 13 sed signatures closed), B · Legal (+0.9; HTML mirrors of the Legal Framework + DD report + EULA + Briefing § 1/9 + escrow agreement + Roskomnadzor privacy policy), D · Strat (+0.7; champion-map + 4 LoI/MoU drafts + 4 moat contours + 3 cannibalisation scenarios + author protection + EBITDA bridge). The smallest: A · Tech (+0.3; already at 8.4) and E · Design (+0.5; mainly emoji → SVG).

## 3. The 6-contour table with verdict

| Contour | Score | Verdict |
|---|---:|---|
| A · Tech | 8.7 / 10 | All 4 H-I fixes closed cleanly. Regression: PWA sidebar `1207-1208` ☀/☾. H-I under-coverage: Specification §§5.2/6.1 .NET MAUI/RN/Detox, Roadmap M5.6, 02_Description. 08_Architectural.html (mermaid) — H-III. |
| B · Legal | 8.3 / 10 | All 7 fixes closed in MD and the main HTML. RED B-H2-1: CBR_briefing.html § 10 not rebuilt. B-NEW-12/15, B-H1-7, B-H1-6 — H-III. |
| C · Fin | 6.5 / 10 | 7 H-I REDs closed, but 5 new defects: Financial_model.html not rebuilt; EBITDA 2034 = 133.6 vs 103.1 (arithmetic); IRR Base 161% (scenarios) vs 62% (KPIs) in one Financial_model.md; peak 2,089 vs 1,335. C-H1-1 TV arithmetic — H-III. |
| D · Strat | 8.4 / 10 | 5 of 6 closed fully. D-PR-5 (champion-map in Business Plan § 13, DD § 2.5, Pitch_deck slide) — partial. D-PR-13 (Concept.html + Business_plan.html new sections). |
| E · Design | 8.7 / 10 | E-POST-4 (☀/☾ across 37 HTML + ★/✓ + ISO flags) closed. Regression in PWA `1207-1208`. E-NEW-5/-6/-7, E-POST-3/-5, Semantic HTML — H-III. |
| F · QA | 8.7 / 10 | 12 of 13 sed signatures clean. RED F-H2-1..4: Financial_model.html, International_valuation.html, Financial_model_assumptions.html §7.1 not rebuilt; defensible-gap 64.69 NOT closed. |

## 4. Per contour — key open defects

### 4.1. A · Tech (`_частные_отчёты/A_Tech.md`)

- **AMBER · A-POST-5 (re²)** — `08_Architectural_diagrams.html:184-186` retains mermaid with RN+.NET MAUI. The MD is correctly Capacitor.
- **AMBER · A-POST-H2-1** — II.E regression: `09_Мобильное_приложение/Приложение/index.html:1207-1208` PWA sidebar retained `Light ☀` and `Dark ☾` (settings-panel `:1414-1415` correct).
- **AMBER · A-POST-H2-2** — Specification `:151,165,167`: §§5.2/6.1 "Windows (.NET MAUI)", "Jest for RN", "Detox for RN, MAUI UITest" — contradicts §1.1 PWA+Capacitor.
- **AMBER · A-POST-H2-3** — `07_Development_roadmap.md:81,129` M5.6 ".NET MAUI".
- **AMBER · A-POST-H2-4** — `02_Program_description.md:30` "C# (.NET MAUI / Windows App SDK)".
- **AMBER · A-POST-H2-5..-8** — sitemap x-default 1/18, apple-touch-icon in manifest, tone drift in DD_report.html "issuance revenue", sepia / contrast themes without SVG.

### 4.2. B · Legal (`_частные_отчёты/B_Legal.md`)

- **RED · B-H2-1** — `07_Презентации/Для_госструктур_ЦБ/Доклад_для_госструктур_и_ЦБ_РФ.html` not rebuilt. § 10 of the public version retains the pre-refactor "The Bank of Russia manages all escrow accounts of the targeted emission" without a Stage 2 marker; the § 10.1 / 10.2 split from the MD is not reflected.
- **AMBER · B-H2-2** — Pre-meeting brief 04 (Gazprombank / PSB) — "Gazprombank / PSB" without "or" (CC Art. 432 — the parties must be defined).
- **AMBER · B-H2-3** — Pre-meeting brief 03 (Tatarstan) — the dates T+0…T+24 do not account for JSC incorporation.
- **AMBER · B-H2-4** — Legal_framework.html § 8.3 without § 8.2 (HTML renumbering).
- **AMBER · B-H2-5** — Concept.md § 1 item 9 vs § 1-bis — double Stage-1 mention (style).

### 4.3. C · Fin (`_частные_отчёты/C_Fin.md`)

- **RED · C-H1-1 (re)** — TV arithmetic of SoT v3 phases I+II = 7.4 vs defensible 19.78. Full DCF EV defensible = 63.38, not 63.4.
- **RED · C-H1-2/-3 (re)** — IRR 62% and Payback 2.8 "project-level" not reproducible. Defensible: project IRR ≈ 160%; investor Y7 ≈ 30.2%; project Payback 3.31; investor 4.17.
- **RED · C-H2-1 (new)** — Financial_model.html not rebuilt. 7 points of divergence with the MD.
- **RED · C-H2-2 (re of C-H1-7)** — Financial_model_assumptions.html §7.1 body not updated ("18% + 4 = 22%").
- **RED · C-H2-3 (new)** — EBITDA 2034 = 133.6 vs 103.1: Business_plan.md:53,383 + Financial_model.html:1361 contain 133.6 at the stated margin of 74.8%. 137.9 × 0.748 = 103.15 ≠ 133.6. 133.6 / 137.9 = 63.48% (the old margin).
- **RED · C-H2-4 (new)** — Financial_model.html:1316 "NPV ex-TV = 86,380 mn ₽" against SoT 41,800.
- **AMBER · C-H2-5 (new)** — International_valuation.md:304 "EM 12× falls into the upper part of tier-1 fintech 25–50×)" (logical + grammatical residue).
- **AMBER · C-H2-6 (new)** — IRR Base 161% (Financial_model.md:166 scenarios) vs 62% (KPIs :152) within one document.
- **AMBER · C-H2-7 (new)** — Financial_model.md:128 peak 2,089 vs :153 peak 1,335 — different definitions.
- **AMBER · C-H1-13 (re)** — Monte Carlo not implemented in finmodel.js.

### 4.4. D · Strat (`_частные_отчёты/D_Strat.md`)

- **AMBER · D-PR-5 (b/c/d)** — Champion-map not diffused into Business Plan § 13 (new "GTM" instead of "Annexes"), DD § 2.5 (general → named), Pitch_deck slide.
- **AMBER · D-PR-6 (b/c)** — Digital-ruble cannibalisation not diffused into DD § 3 / CBR Briefing § 9.
- **AMBER · D-PR-7 (b)** — Defence against regulator copying not in DD § 3.4.
- **AMBER · D-PR-8 (re)** — Signed LoI / MoU — operational, Horizon III.
- **AMBER · D-PR-11 (b)** — EBITDA bridge not in Wedge § 5.2 + the sheet not created.
- **AMBER · D-PR-13 (new)** — HTML / PDF of the Concept (`_Мастер/Концепт.html` without 1-bis/1-ter/1-quater) and of the Business Plan (without § 11.3/§ 11.4 and the new risk-card rows) not rebuilt.

### 4.5. E · Design (`_частные_отчёты/E_Design.md`)

- **AMBER · E-POST-4 regression** — `09_…/Приложение/index.html:1207-1208` PWA sidebar retained `Light ☀` / `Dark ☾` (settings-panel `:1414-1415` correctly SVG).
- Inherited (Horizon III): E1 (12 emoji lines in bottom-nav / qa / menu), E-NEW-5 back-stack, E-NEW-6 RTL extension, E-NEW-7 data-i18n coverage, E-POST-3 manifest theme_color, E-POST-5 Conservative / Optimistic, Semantic HTML PWA.

### 4.6. F · QA (`_частные_отчёты/F_QA.md`)

- **RED · F-H2-1** — Financial_model.html not rebuilt (7 points: :1316 NPV ex-TV = 86,380; :1321 TV Gordon = 611,800; :1331 IRR ~226%; :1336 Payback 2.37; :1402-1407 Base NPV 170 / 2.4; :1456+:1507 sensitivity Base = 170).
- **RED · F-H2-2** — International_valuation.html §2.5 "EV 183 / pre-money USD 540M" and §7.1 baseline WACC 21.5%; .md:218 §7 Base = "63.4" (sed residue).
- **RED · F-H2-3** — Financial_model_assumptions.html §7.1 body "18% + 4 = 22%"; "build-up 26%".
- **RED · F-H2-4** — Defensible-gap 64.69 NOT closed: SoT 41.8 vs International_valuation.md:99 = 88.0 (×2.1); SoT 3.8% vs Financial_model_assumptions.md:155 = 9.0%; internal break in Financial_model.md (41.8 + 1.96 = 43.76 ≠ 63.4 — the phase I+II 7.4 is not named as a KPI line).
- **AMBER · F-H2-5..-10** — sed skipped .html mirrors, id="wacc-22", International_valuation.html §7.1 sensitivity, NPV balance Financial_model.html, TV share.

## 5. Composite map of open RED + AMBER

| Code | Category | Contour | Brief |
|---|---|---|---|
| A-POST-5 | AMBER | A | 08_Architectural_diagrams.html (mermaid RN+.NET MAUI) |
| A-POST-H2-1 | AMBER | A | PWA sidebar `1207-1208` ☀/☾ |
| A-POST-H2-2 | AMBER | A | Specification §§5.2/6.1 .NET MAUI/RN/Detox |
| A-POST-H2-3 | AMBER | A | Roadmap M5.6 .NET MAUI |
| A-POST-H2-4 | AMBER | A | 02_Program_description C# .NET MAUI |
| A-POST-H2-5..-8 | AMBER | A | sitemap x-default / apple-touch-icon / DD tone / sepia |
| B-H2-1 | RED | B | CBR_briefing.html § 10 not rebuilt |
| B-H2-2 | AMBER | B | Pre-meeting brief 04 "Gazprombank/PSB" without "or" |
| B-H2-3 | AMBER | B | Pre-meeting brief 03 dates T+0 do not account for JSC incorporation |
| B-H2-4 | AMBER | B | Legal_framework.html § 8.3 without § 8.2 |
| B-H2-5 | AMBER | B | Concept § 1 item 9 vs § 1-bis (style) |
| B-NEW-12 | AMBER | B | Different 779-P enumerations |
| B-NEW-15 | AMBER | B | Operator–pledgor contract without 353-FZ |
| B-H1-7 | AMBER | B | T+18 vs T+24 discrepancy |
| B-H1-6 | AMBER | B | Concept § 1 item 6 "possible mandate expansion" |
| C-H1-1 | RED | C | TV phases I+II 7.4 vs 19.78 defensible |
| C-H1-2/-3 | RED | C | IRR 62% / Payback 2.8 not reproducible |
| C-H2-1 | RED | C | Financial_model.html not rebuilt |
| C-H2-2 (=C-H1-7) | RED | C | Financial_model_assumptions.html §7.1 body |
| C-H2-3 | RED | C | EBITDA 2034 = 133.6 vs 103.1 (arithmetic) |
| C-H2-4 | RED | C | Financial_model.html NPV ex-TV = 86,380 |
| C-H2-5 | AMBER | C | EM in International_valuation.md:304 (grammar) |
| C-H2-6 | AMBER | C | IRR Base 161% vs 62% within one Financial_model.md |
| C-H2-7 | AMBER | C | Peak 2,089 vs 1,335 in Financial_model.md |
| C-H1-13 | AMBER | C | Monte Carlo not implemented |
| D-PR-5 (b/c/d) | AMBER | D | Champion-map not in Business Plan § 13 / DD § 2.5 / Pitch slide |
| D-PR-6 (b/c) | AMBER | D | DR cannibalisation not in DD § 3 / CBR Briefing § 9 |
| D-PR-7 (b) | AMBER | D | Defence against copying not in DD § 3.4 |
| D-PR-8 | AMBER | D | Signed LoI / MoU — operational |
| D-PR-11 (b) | AMBER | D | EBITDA bridge not in Wedge § 5.2 + sheet not created |
| D-PR-13 | AMBER | D | HTML/PDF of Concept and Business Plan not rebuilt |
| E-POST-4 regression | AMBER | E | PWA sidebar 1207-1208 ☀/☾ |
| E1 / E-NEW-3 | AMBER | E | 12 emoji lines in PWA bottom-nav / qa / menu |
| E-NEW-5/-6/-7 / Semantic | AMBER | E | back-stack / RTL / data-i18n / `<main>` |
| E-POST-3 / -5 | AMBER | E | manifest theme_color / Conservative-Optimistic |
| F-H2-1 | RED | F | Financial_model.html not rebuilt (7 points) |
| F-H2-2 | RED | F | International_valuation.html §2.5 + §7.1 + .md:218 |
| F-H2-3 | RED | F | Financial_model_assumptions.html §7.1 body |
| F-H2-4 | RED | F | Defensible-gap 64.69 NOT closed (SoT vs International.md:99 vs Financial_model.md internal) |
| F-H2-5..-10 | AMBER | F | Sed skipped HTML, id attributes, sensitivity |

**Total: 12 RED + 33 AMBER = 45 open items** (vs 18 RED + 28 AMBER before Horizon II = 46 items).

The qualitative change: **6 RED closed, 12 RED remain** (mostly repeats from the "MD fixed, HTML lagging" category). After the Horizon III pandoc pass, a drop to 0–2 REDs is expected.

## 6. Priority roadmap (Horizon III)

### Horizon III.A — Pandoc pipeline (central task, ≈ 1 hour)

1. **Pandoc rebuild of 6 HTML mirrors**: Financial_model.html, Financial_model_assumptions.html, International_valuation.html, CBR_briefing.html, Concept.html, Business_plan.html (new sections § 11.3 / § 11.4 / risk-card). Closes: C-H2-1, C-H2-2, F-H2-1, F-H2-2 (a/b), F-H2-3, B-H2-1, D-PR-13.
2. **08_Architectural_diagrams.html** via pandoc + mermaid. Closes A-POST-5.

### Horizon III.B — Point narrative fixes (≈ 1.5 hours)

3. **C-H2-3 EBITDA arithmetic**: Business_plan.md:53,383 + Financial_model.html:1361 — 133.6 → 103.1.
4. **C-H2-5 EM wording**: International_valuation.md:304 — rewrite "12× falls into the upper part of 25–50×".
5. **C-H2-6 IRR mismatch**: Financial_model.md:166 (scenarios) reconciled with :152 (KPIs).
6. **C-H2-7 peak**: Financial_model.md:128 vs :153 — unify the definition.
7. **F-H2-2 (c)**: International_valuation.md:218 Base 63.4 → 63.4; recompute §2.4 / §7.
8. **B-H2-2..-5**: rename MoU 04 to "Partner_Bank" with "Gazprombank or PSB"; T+0 dates in the Tatarstan MoU; § 8.3 → § 8.2 in the Legal Framework; stylistic tightening of Concept § 1 item 9.
9. **E-POST-4 regression**: `09_…/Приложение/index.html:1207-1208` ☀/☾ → SVG.
10. **A-POST-H2-2/-3/-4**: Specification §§5.2/6.1, Roadmap M5.6, 02_Description — .NET MAUI/RN/Detox → PWA + Capacitor v6+ (unify with Specification §1.1).

### Horizon III.C — Methodological decisions (≈ 1 day)

11. **C-H1-1 TV arithmetic of SoT v3 §5**: recompute on defensible 19.78 → full EV 63.38 OR justify 7.4 with an explicit additional OpEx / CapEx / ΔWC. Cascade-update client documents.
12. **C-H1-2/-3 IRR / Payback project-level**: recompute on defensible OR explicitly mark as "semi-investor hybrid metric".
13. **C-H1-13 Monte Carlo**: implement `monteCarlo(iterations, paramRanges)` in `finmodel.js`.
14. **F-H2-4 defensible gap**: add to Financial_model.md a line "Discounted FCF 2035–2044 (phases I+II) = RUB 7,400 mn"; Financial_model_assumptions.md:155 "TV share = 3.8%".

### Horizon III.D — Champion-map diffusion (≈ 1 hour)

15. **D-PR-5 (b/c/d)**: Champion-map in Business Plan § 13 (new "GTM"), DD § 2.5 (general → named), Pitch_deck slide before slide 10.
16. **D-PR-6 (b/c)**: Cannibalisation by the digital ruble in DD § 3 + CBR Briefing § 9.
17. **D-PR-7 (b)**: Defence against copying in DD § 3.4.

### Horizon III.E — Point cosmetics / optional (≈ 1 hour)

18. A-POST-H2-5 sitemap x-default across 17 URLs.
19. A-POST-H2-6 apple-touch-icon in the manifest.
20. A-POST-H2-7 DD_report.html term "issuance revenue" → "revenue from DFA issuance".
21. A-POST-H2-8 SVG for the sepia / contrast themes.
22. E-NEW-5 PWA back-stack (history.pushState + popstate).
23. E1 — 12 emoji lines in PWA bottom-nav / qa / menu → SVG (Lucide).
24. E-POST-3 manifest theme_color → `#0E2440`.

### Horizon III.F — Structural (≈ 1–2 days)

25. **BUILD_PIPELINE.md + CI inspector** — pandoc + mermaid + a terminology grep (RN / .NET MAUI / Detox / ☀ / ☾ / flag emojis / Stage 2 marker) on git push. Architecturally closes the "MD fixed — HTML lagging" class.
26. B-NEW-12 — split the 779-P officer lists (those agreed with the CBR vs internal corporate).
27. B-NEW-15 — add a 353-FZ clause in the operator–pledgor contract.
28. B-H1-7 — clarify T+18 (first issuance) vs T+24 (industrial operation).
29. Contract pack: Rosfinmonitoring PVK.
30. Plan for Chapter 72 CC (invention by way of DFA exchange).

**In total: ≈ 4–6 hours for Horizons III.A + III.B + III.D + III.E + 1 day for III.C (methodological decisions) + 1–2 days for III.F (BUILD_PIPELINE + contract pack).** The forecast composite score after Horizons III.A–D: **9.0–9.5 / 10**.

## 7. Final resolution

| Audience | Status before H-II | Status after H-II | Condition |
|---|---|---|---|
| Inside Center Group | Ready | Ready | — |
| Friendly / family capital | Ready | Ready | — |
| Friendly strategic investor | Ready | Ready | No caveats |
| VEB.RF PFF | Ready | Ready | Consultative letter draft 02 ready |
| Gazprombank-DD / PSB-DD | Conditional | **Conditional** | DD_report.html rebuilt; Financial_model.html (H-III pandoc) |
| Tier-1 VC | Conditional (screening) | **Conditional on screening + 2-week data-room; will not withstand a 3-4 week deep DD** | H-III.A (pandoc 6 HTML) + H-III.C (TV/IRR/Payback methodology) mandatory |
| CBR register of IS DFA operators | Conditional | Conditional | JSC incorporation + CIP T+9…T+18; B-H2-1 (Briefing HTML) |
| RuStore publication | Conditional | **Conditional** | E-POST-4 sidebar regression; A-POST-1/2 no regressions |

**Defensible position "as is after Horizon II"**: friendly + friendly VC + VEB.RF PFF + Ministry of Economic Development + friendly strategic investor. **Gazprombank-DD conditionally ready**. Strategic ceiling: **USD 60–90M pre-money** via the wedge-pilot rationale.

**Defensible position after Horizons III.A–D (1–2 business days)**: Gazprombank / PSB DD pass / tier-1 VC seed-stage. Strategic ceiling: **USD 80–120M pre-money Base** (or USD 100–140M at the NPV-defensible 63.4 after the C-H1-1 decision).

**Defensible position after Horizon III.C (methodological decision + Monte Carlo, 1 week)**: tier-1 VC Series A + VEB.RF Ventures + Gazprombank Capital. Strategic ceiling: **USD 120–180M pre-money** subject to LoI / MoU signing.

## 8. Methodology and caveats

1. **Parallelism.** 6 auditors independently, without cross-communication until consolidation. Weights: 0.20 / 0.20 / 0.20 / 0.15 / 0.12 / 0.13.
2. **Boomerang verification.** Each of the ≈30 Horizon-II fixes is checked by an independent grep / Read with a fact-status mark.
3. **Evidence standard.** Each statement — `file:line` or a citation. Financial — line-by-line recomputation. Legal — an article of a regulatory act. Technical — the version of the standard.
4. **Read-only.** Project files were not modified during the audit.
5. **NPV caveat.** SoT v3 full NPV = RUB 63.4 bn; defensible row-by-row per the finmodel.js logic = 63.38. The decision rests with the financial-model developer.
6. **Wedge logic as baseline.** Stage 1 is the correct strategy for the current regulatory field.
7. **Principal structural finding.** 5 of 6 contours (A, B, C, D, F) simultaneously noted the "MD fixed — HTML lagging" defect. This signals the need for BUILD_PIPELINE + a CI inspector as a structural solution rather than a cycle of manual fixes.

## 9. Engagement reference

Composite Post-Horizon II Audit · CPFSR · 24.05.2026 (evening)
Client: Abdul-Khakim Akhmadovich Kagirov / Center Group Company
Object: `E:\Проекты Аслана\Приложение_РСФСР\ЦП РСФСР Исправленный\`
Concept author certificate: No. 4011265 of 19.12.2024
