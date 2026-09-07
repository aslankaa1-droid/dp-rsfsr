# -*- coding: utf-8 -*-
"""
Сборка документа «Финансовая модель» на английском, французском и арабском.

Структура повторяет русскую сборку `собрать_документ.py`; отличается только
таблица фраз и локальные правила записи чисел (EN/AR — разделитель разрядов
запятая, дробная точка; FR — неразрывный пробел и дробная запятая).

Правило сопровождения: при изменении русского генератора править и этот файл.
Расхождение ловится сценарием `_tools/проверка_переводов.py`.

Запуск: python собрать_документ_i18n.py [en|fr|ar]
"""

import io
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import model as M  # noqa: E402

ROOT = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.abspath(os.path.join(ROOT, "..", "..", "_translations"))
REL = os.path.join("03_Финансовая_модель", "Финансовая_модель_ЦП_РСФСР.md")

NBSP = u" "


# --------------------------------------------------------------------------
# запись чисел по локали
# --------------------------------------------------------------------------

def make_fmt(lang):
    if lang == "fr":
        group, dec = NBSP, ","
    else:
        group, dec = ",", "."

    def n(x, d=0):
        if x is None:
            return "—"
        s = "%.*f" % (d, x)
        neg = s.startswith("-")
        s = s.lstrip("-")
        ip, _, fp = s.partition(".")
        out = ""
        while len(ip) > 3:
            out = group + ip[-3:] + out
            ip = ip[:-3]
        out = ip + out
        if fp:
            out += dec + fp
        return (u"−" if neg else "") + out

    def pct(x, d=1):
        if x is None:
            return "—"
        v = ("%.*f" % (d, x * 100)).replace(".", dec)
        return v + (NBSP + "%" if lang == "fr" else "%")

    def num(x, d=2):
        return ("%.*f" % (d, x)).replace(".", dec)

    return n, pct, num


def dt(s):
    try:
        y, m, d = s.split("-")
        return "%s.%s.%s" % (d, m, y)
    except Exception:
        return s


def row(cells):
    return "| " + " | ".join(str(c) for c in cells) + " |"


def head(cols, align):
    return row(cols) + "\n" + row(align)


# --------------------------------------------------------------------------
# таблица фраз
# --------------------------------------------------------------------------

T = {
"en": {
 "title": "Financial model of the CP RSFSR platform",
 "author": ("**Author and rights holder:** Kagirov A.-Kh.A. Deposit certificate No. 4011265 "
            "of 19.12.2024 — fixing the priority date and the hash of the work; protection "
            "regime — know-how (Art. 1465 Civil Code) plus computer programme (Art. 1262 "
            "Civil Code; registration with Rospatent in progress)."),
 "edition": ("**Edition:** %s of %s. **Horizon:** %d years (%d–%d) plus terminal value. "
             "**Valuation date:** %s. **Currency:** roubles; unless stated otherwise, RUB mn."),
 "note_engine": ("> **Every figure in this document is computed programmatically** from a single "
                 "set of assumptions in `Модель/assumptions.json`. The document is assembled by "
                 "`Модель/собрать_документ_i18n.py`; figures must not be edited in the text — they "
                 "are overwritten at the next build. Machine-readable export: `Модель/Выгрузка/*.csv`."),
 "note_selfcheck": ("> **Convergence self-check passed:** total revenue equals the sum of its lines, "
                    "operating expenses equal payroll plus other costs, EBITDA equals revenue less "
                    "operating expenses, free cash flow equals EBITDA less profit tax, less the "
                    "increase in working capital and less capital expenditure, and enterprise value "
                    "equals discounted cash flows plus discounted terminal value."),
 "changes_h": "What changed in edition v5",
 "changes_lead": ("Edition v5 is a recalculation, not a cosmetic edit. Below is what was corrected "
                  "in substance."),
 "changes_cols": ("What it was", "What it became and why"),
 "changes": [
  ("Total revenue did not equal the sum of its lines (in 2034 the lines added up to RUB 175,492 mn "
   "against a stated total of RUB 137,905 mn)",
   "The total is computed as the sum of the lines. A discrepancy is impossible by construction"),
  ("Appraisal and insurance services (0.8% of volume) were booked as platform revenue in full, "
   "although the notes to the model marked them as pass-through with 85% offsetting costs",
   "Recognised net: only the platform's own margin (0.12% of volume) enters revenue. Gross billings "
   "are disclosed on a separate memorandum line"),
  ("Profit tax rate of 20%",
   "25% — effective from 1 January 2025 (Federal Law 176-FZ of 12.07.2024). The previous rate was "
   "no longer in force"),
  ("Losses of the early years were not carried forward",
   "Loss carry-forward is applied, capped at 50% of the tax base"),
  ("Payroll was not derived from headcount and salary (the 2029 line implied roughly twice the "
   "stated headcount, the 2026 line roughly half of it)",
   "Payroll = headcount × salary × 12 × 1.30. Other costs = an indexed base plus a variable share "
   "of revenue"),
  ("The horizon began in 2025; the first CFA issue was planned for 2026",
   "Horizon %d–%d. At the date of recalculation there is no information-system operator licence, no "
   "regulatory framework and no issues — so the first issue is placed in %d"),
  ("Terminal value was computed sometimes by Gordon with g=2%, sometimes by a three-stage method; "
   "the business plan stated g=4%",
   "A single method: Gordon on a normalised cash flow (capital expenditure set equal to "
   "depreciation), g = %s"),
  ("The cash-flow series in the valuation report was not derived from the profit and loss account "
   "(it ignored working capital and contained unexplained residuals)",
   "The series is derived from the accounts and verified programmatically"),
  ("The 60% stage discount was applied twice: inside the income approach and then again on top of "
   "the reconciliation of methods",
   "Applied once, and only to approaches that produce the value of a mature business"),
  ("A payback of 2.8 years while cumulative cash flow crossed zero in the fourth year",
   "Computed programmatically: %s years simple, %s years discounted"),
 ],
 "s1": "Sheet 1. Assumptions",
 "s11": "1.1. Macroeconomic parameters",
 "macro_cols": ("Parameter", "Value", "Source and date"),
 "m_key": "Bank of Russia key rate",
 "m_key_src": "Board of Directors decision of ",
 "m_ofz": "10-year OFZ yield",
 "m_ofz_src": "market data as at ",
 "m_erp": "Equity risk premium",
 "m_beta": "Beta (financial services)",
 "m_stage": "Stage premium",
 "m_liq": "Illiquidity premium",
 "m_wacc": "**Discount rate (WACC)**",
 "m_wacc_src": "sum of components",
 "m_infl": "Inflation target",
 "m_infl_src": "Bank of Russia benchmark",
 "m_fx": "USD/RUB rate",
 "m_fx_src": "official rate as at ",
 "macro_note": ("> The key rate was updated as at %s. The 10-year OFZ yield and the exchange rate are "
                "fixed as at May 2026 and should be refreshed at the date of negotiations before "
                "approaching an external investor. The key rate does not affect the discount rate: "
                "the latter is built on the OFZ yield, while the key rate serves only as a "
                "cross-check."),
 "s12": "1.2. Market",
 "market_lead": ("Collateral capacity of the market as at 2025 — **RUB %s bn**: 10%% of assets drawn "
                 "into circulation, valued for collateral purposes at 50%% of market value, out of the "
                 "combined stock of housing, commercial real estate and land plots (RUB 507 tn). "
                 "Indexation — %s per year."),
 "stack_lead": ("The circulating stack is the sum of issues over the last %d years (the average life "
                "of an issue)."),
 "r_cap": "Collateral capacity, RUB bn",
 "r_share": "Platform share, %",
 "r_issue": "CFA issuance, RUB mn",
 "r_stack": "Circulating stack, RUB mn",
 "market_note": ("> The market-share trajectory is the author's key assumption and the main source of "
                 "uncertainty in the model. It is not corroborated externally: not by a pilot, not by "
                 "contracts, not by an analogue. Everything else in the model is arithmetic derived "
                 "from that line."),
 "s13": "1.3. Tariffs",
 "tar_cols": ("Line", "Rate", "Base"),
 "t_issue": "Issuance fee", "t_issue_b": "annual issuance volume",
 "t_serv": "Servicing fee", "t_serv_b": "circulating stack",
 "t_platf": "Platform fee", "t_platf_b": "issuance volume",
 "t_lic": "B2B2G licences", "t_lic_b": "issuance volume", "t_lic_v": "from 0 to ",
 "t_int": "Technology integrations", "t_int_b": "fixed connection payments", "t_int_v": "from %s to %s RUB mn",
 "t_app_g": "Appraisal and insurance — gross tariff", "t_app_b": "issuance volume",
 "t_app_c": "Appraisal and insurance — offsetting costs", "t_app_c_b": "of the gross tariff",
 "t_app_n": "**Appraisal and insurance — own margin**",
 "t_app_n_b": "issuance volume; only this part enters revenue",
 "s14": "1.4. Costs",
 "cost_lead1": ("Payroll is calculated as headcount × average salary × 12 × 1.30 (social contributions "
                "%s). First-year salary — RUB %s thousand per month, indexed at %s per year."),
 "cost_lead2": ("Other operating costs = a base of RUB %s mn indexed at %s per year plus a variable "
                "share of %s of revenue. The variable part covers acquiring, infrastructure under "
                "load, compliance, cybersecurity, legal support and customer acquisition; its size is "
                "calibrated so that the mature-year margin sits at the level of comparable "
                "infrastructure operators."),
 "c_fte": "Headcount", "c_sal": "Average salary, RUB k/month",
 "c_payroll": "Payroll incl. contributions, RUB mn", "c_other": "Other operating costs, RUB mn",
 "c_capex": "Capital expenditure, RUB mn", "c_amort": "Depreciation, RUB mn",
 "capex_total": "Capital expenditure over the horizon — **RUB %s mn**. Depreciation period %d years.",
 "s15": "1.5. Taxes and working capital",
 "tax_cols": ("Parameter", "Value", "Basis"),
 "x_tax": "Profit tax", "x_tax_src": "Federal Law 176-FZ of 12.07.2024, in force from 01.01.2025", "x_nol": "Cap on carry-forward of prior-year losses",
 "x_nol_src": "Art. 283 of the Tax Code", "x_soc": "Social contributions",
 "x_soc_src": "Ch. 34 of the Tax Code", "x_wc": "Working capital", "x_wc_src": "of revenue",
 "tax_note1": ("> The profit-tax relief available to accredited IT organisations is not built into the "
               "base case — it is separate upside, not an assumption."),
 "tax_note2": ("> **VAT.** Transactions in digital financial assets are not subject to value added tax: "
               "such assets are classified as securities, and the sale of securities is VAT-exempt "
               "(sub-clause 12, clause 2, Art. 149 of the Tax Code). The position was confirmed by the "
               "owner of the project on 07.09.2026 and is built into the model."),
 "s2": "Sheet 2. Revenue",
 "rev_lead": "All amounts in RUB mn. The total equals the sum of the lines.",
 "rev_line_col": "Line",
 "rev_total": "**TOTAL revenue**",
 "memo_col": "Memorandum",
 "gross_line": "Memorandum: gross billings",
 "gross_note": ("Gross billings are the entire amount passing through the platform, including "
                "offsetting payments to appraisers and insurers. The difference between gross billings "
                "and revenue is third-party money; presenting it as platform revenue is incorrect."),
 "s3": "Sheet 3. Profit and loss",
 "p_rev": "Revenue", "p_payroll": "Payroll incl. contributions", "p_other": "Other operating costs",
 "p_opex": "**Total operating expenses**", "p_ebitda": "**EBITDA**", "p_margin": "EBITDA margin, %",
 "p_amort": "Depreciation", "p_ebit": "**EBIT**", "p_tax": "Profit tax",
 "p_net": "**Net profit**",
 "margin_note": ("Mature-year margin — %s. Benchmarks of comparable companies: infrastructure exchange "
                 "and depository operators 65–75%%, international payment systems 60–70%%."),
 "s4": "Sheet 4. Cash flow",
 "f_ebitda": "EBITDA", "f_tax": "Profit tax", "f_wc": "Increase in working capital",
 "f_capex": "Capital expenditure", "f_fcf": "**Free cash flow**", "f_cum": "Cumulative cash flow",
 "f_df": "Discount factor", "f_pv": "Discounted cash flow",
 "peak_lead": ("**Peak funding requirement — RUB %s mn** (the largest negative cumulative cash flow). "
               "The starting round of RUB %s mn covers %s of it."),
 "s5": "Sheet 5. Enterprise value",
 "v_pv": "Sum of discounted cash flows over %d years", "v_norm": "Normalised cash flow for the terminal period",
 "v_tv": "Terminal value at the end of the horizon", "v_pvtv": "Discounted terminal value",
 "v_share": "Share of terminal value in enterprise value", "v_ev": "**Enterprise value**",
 "v_usd": "The same in US dollars at a rate of %s", "v_irr": "Project internal rate of return",
 "v_pb": "Simple payback", "v_pbd": "Discounted payback", "v_years": " years",
 "irr_note": ("> **Caveat on the internal rate of return.** The value of %s is obtained on project cash "
              "flows where the inputs are small (a peak of RUB %s mn) while the mature flows run to tens "
              "of billions. Such a return is not an advantage of the project: it shows that the model "
              "does not reflect the full cost of entering this market — the capital of an "
              "information-system operator, reserves, the cost of acquiring pledgors. The figure is "
              "given for completeness; negotiations should rest on enterprise value and on the investor "
              "calculation (Sheet 8)."),
 "s6": "Sheet 6. Scenarios",
 "sc_cols": ("Scenario", "Market share year 10", "Weight", "Revenue year 10, RUB mn",
             "Enterprise value, RUB bn", "Payback, years"),
 "sc_names": {"Консервативный": "Conservative", "Базовый": "Base", "Оптимистичный": "Optimistic"},
 "sc_expected": "**Expected value**",
 "sc_note": ("Scenarios differ only in the target market share in year ten; the trajectory is scaled "
             "proportionally. The weights are set by the author of the project."),
 "s7": "Sheet 7. Sensitivity",
 "s71": "7.1. Discount rate and market share",
 "s71_lead": "Enterprise value, RUB mn.",
 "s71_col": "WACC \\\\ market share year 10",
 "s72": "7.2. Operating costs",
 "s72_col": "Deviation of costs",
 "s72_row": "Enterprise value, RUB mn",
 "s72_note": ("Sensitivity to costs is low: even a 30%% increase changes the valuation by %s. This means "
              "that the entire value is determined by revenue assumptions — that is, by the market-share "
              "trajectory."),
 "s73": "7.3. Launch delay — the principal risk",
 "s73_cols": ("Delay of the first issue", "First year with issuance", "Revenue year 10, RUB mn",
              "Enterprise value, RUB bn", "Peak requirement, RUB mn"),
 "s73_none": "none", "s73_year": "+%d year(s)",
 "s73_note": ("Every year of delay removes roughly a quarter of the value and increases the cash "
              "requirement. The stated round assumes a launch without delay; a one-year slip raises the "
              "requirement to RUB %s mn, a two-year slip to RUB %s mn."),
 "s74": "7.4. Simulation",
 "s74_lead": ("%d iterations, generator with a fixed seed %d — the calculation is reproducible. The "
              "following are varied: market share in year 10 (triangular distribution 7–25%%, mode 18%%), "
              "discount rate (uniform 27–33%%), deviation of costs (uniform from minus 10%% to plus 30%%), "
              "launch delay (0/1/2/3 years with probabilities 40/30/20/10%%)."),
 "s74_cols": ("Percentile", "P5", "P10", "P25", "Median", "P75", "P90", "P95"),
 "s74_row": "Enterprise value, RUB bn",
 "s74_prob": "Probability of a value above RUB 50 bn — %s. Probability of a negative value — %s.",
 "s74_note": ("> The median of the simulation (RUB %s bn) is markedly below the base case (RUB %s bn). "
              "This is not an error: the base case assumes a launch without delay, while the simulation "
              "allows for delay being likely. The gap between the base case and the median of the "
              "simulation is the price of schedule risk."),
 "s8": "Sheet 8. Investor calculation",
 "i_inv": "Investment", "i_share": "Equity stake", "i_hor": "Holding horizon",
 "i_hor_v": "%d years, exit in %d", "i_ev": "Enterprise value at exit",
 "i_cash": "Accumulated cash", "i_eq": "Equity value at exit", "i_proceeds": "Investor proceeds",
 "i_mult": "**Return multiple**", "i_irr": "**Investor internal rate of return**",
 "i_note": ("The calculation assumes that the plan is delivered in full, that no dividends were paid and "
            "that accumulated funds remain in the company. This is an upper bound, not an expectation: "
            "the price of the risk of non-delivery is embedded in the stage discount applied when "
            "determining the entry value (Sheet 9)."),
 "s9": "Sheet 9. Entry value (pre-money)",
 "s9_lead": ("A reconciliation of four approaches. The stage discount of %s is applied **once**, and only "
             "to approaches that produce the value of a mature business. The Berkus and replacement-cost "
             "approaches value the project as it stands and are not discounted again."),
 "s9_cols": ("Approach", "Before discount, USD mn", "Stage discount", "After discount, USD mn",
             "Weight", "Contribution, USD mn"),
 "s9_methods": {
   "Доходный (DCF)": "Income (DCF)",
   "Сравнительный (мультипликаторы)": "Market (multiples)",
   "Скорректированный Беркус": "Risk-adjusted Berkus",
   "Затратный (восстановительная стоимость)": "Cost (replacement value)"},
 "s9_yes": "applied", "s9_no": "not applied",
 "s9_total": "**Entry value (pre-money)**",
 "s9_sum": "**Pre-money ≈ USD %s mn ≈ RUB %s bn** at a rate of %s RUB/USD.",
 "s9_spread": ("> **The spread between approaches is twelvefold** — from USD 20 mn on the cost approach to "
               "USD 352 mn on the income approach. Such a spread means the weighted figure is itself of "
               "limited use: 65% of the weight rests on approaches that value an already operating "
               "business, whereas the approaches designed for an early stage give an order of magnitude "
               "less. The practical conclusion: the negotiating range should be built from the early-stage "
               "approaches, and the income approach used as an argument about potential rather than as a "
               "price. The decision on the entry price rests with the owner of the project."),
 "s9_deal_h": "Round structure at this valuation",
 "d_pre": "Pre-money", "d_round": "Round", "d_post": "Post-money", "d_stake": "Investor stake",
 "d_cover": ("> **The round covers the calculated requirement.** The peak requirement is RUB %s mn (end of "
             "%d), the round is RUB %s mn, a cushion of RUB %s mn. The cushion is thin: a one-year delay "
             "in launch raises the requirement to RUB %s mn and the round would not suffice. The launch "
             "date is the first thing to keep under control."),
 "d_gap": ("> **The round is insufficient.** The peak funding requirement is RUB %s mn, the stated round "
           "is RUB %s mn. The gap of RUB %s mn must be closed by increasing the round or by an interim "
           "tranche."),
 "s9_double": ("> In the previous edition the stage discount was applied twice — first inside the income "
               "approach, then again on top of the reconciliation. Because of this the entry value was "
               "understated roughly twofold. The correction strengthens the project's negotiating "
               "position rather than weakening it."),
 "lim_h": "Limitations of the model",
 "lims": [
  "**The market-share trajectory is not corroborated by anything.** No pilot, no contracts, no comparable "
  "project. It is the author's assumption, and the whole valuation rests on it.",
  "**The regulatory framework has not been adopted.** The model assumes regulation will permit operation "
  "at the stated scale. If that does not happen, only the conservative scenario applies.",
  "**Capital requirements for an information-system operator are not modelled** — own funds, reserves, "
  "security deposits.",
  "**Customer acquisition cost is not shown as a separate line** — it sits inside the variable part of "
  "costs as a single amount.",
  "**The model carries no debt.** Equity only; no interest tax shield is taken into account.",
  "**All flows are in roubles**, there is no currency position.",
  "**Macroeconomic parameters are fixed as at May 2026** (except the key rate) and require updating at "
  "the date of negotiations.",
  "**The model is not an offer** and does not guarantee a result.",
 ],
 "footer": "**Edition %s · %s · computed programmatically; convergence self-check passed.**",
 "note_tr": ("> **Note.** This is a translation of the Russian original. The financial part is generated "
             "from the same calculation engine, so the figures coincide with the Russian version. In case "
             "of any discrepancy in wording, the Russian version prevails."),
},
}

# --- французский --------------------------------------------------------------
T["fr"] = {
 "title": "Modèle financier de la plateforme CP RSFSR",
 "author": ("**Auteur et titulaire des droits :** Kagirov A.-Kh.A. Certificat de dépôt n° 4011265 du "
            "19.12.2024 — fixation de la date de priorité et de l’empreinte de l’œuvre ; régime de "
            "protection : savoir-faire (art. 1465 du Code civil) et programme d’ordinateur (art. 1262 du "
            "Code civil ; enregistrement auprès de Rospatent en cours)."),
 "edition": ("**Édition :** %s du %s. **Horizon :** %d ans (%d–%d) plus valeur terminale. "
             "**Date d’évaluation :** %s. **Monnaie :** roubles ; sauf indication contraire, M ₽."),
 "note_engine": ("> **Tous les chiffres de ce document sont calculés par programme** à partir d’un jeu "
                 "unique d’hypothèses `Модель/assumptions.json`. Le document est assemblé par "
                 "`Модель/собрать_документ_i18n.py` ; les chiffres ne doivent pas être modifiés dans le "
                 "texte — ils seraient écrasés à la prochaine génération. Export machine : "
                 "`Модель/Выгрузка/*.csv`."),
 "note_selfcheck": ("> **Contrôle de cohérence réussi :** le total du chiffre d’affaires est égal à la "
                    "somme de ses lignes, les charges d’exploitation à la somme de la masse salariale et "
                    "des autres charges, l’EBITDA au chiffre d’affaires diminué des charges "
                    "d’exploitation, le flux de trésorerie disponible à l’EBITDA diminué de l’impôt, de "
                    "la variation du besoin en fonds de roulement et des investissements, et la valeur "
                    "d’entreprise à la somme des flux actualisés et de la valeur terminale actualisée."),
 "changes_h": "Ce qui a changé dans l’édition v5",
 "changes_lead": ("L’édition v5 n’est pas une retouche cosmétique mais un recalcul. Voici ce qui a été "
                  "corrigé sur le fond."),
 "changes_cols": ("Ce qui était", "Ce qui est devenu et pourquoi"),
 "changes": [
  ("Le total du chiffre d’affaires ne correspondait pas à la somme de ses lignes (en 2034 les lignes "
   "donnaient 175 492 M ₽ pour un total annoncé de 137 905 M ₽)",
   "Le total est calculé comme la somme des lignes. Tout écart est impossible par construction"),
  ("Les services d’évaluation et d’assurance (0,8 % du volume) étaient comptabilisés en totalité comme "
   "produit de la plateforme, alors que les notes au modèle les qualifiaient de transitoires avec 85 % de "
   "charges en contrepartie",
   "Comptabilisés en net : seule la marge propre de la plateforme (0,12 % du volume) entre dans le "
   "chiffre d’affaires. Les encaissements bruts figurent sur une ligne pour mémoire"),
  ("Taux d’impôt sur les bénéfices de 20 %",
   "25 % — depuis le 1er janvier 2025 (loi fédérale 176-FZ du 12.07.2024). L’ancien taux n’était plus en "
   "vigueur"),
  ("Les pertes des premières années n’étaient pas reportées",
   "Le report des pertes est pris en compte, plafonné à 50 % de la base imposable"),
  ("La masse salariale n’était pas déduite de l’effectif et du salaire (la ligne 2029 supposait un "
   "effectif deux fois supérieur à celui annoncé, celle de 2026 deux fois inférieur)",
   "Masse salariale = effectif × salaire × 12 × 1,30. Autres charges = une base indexée plus une part "
   "variable du chiffre d’affaires"),
  ("L’horizon commençait en 2025 ; la première émission d’AFN était prévue pour 2026",
   "Horizon %d–%d. À la date du recalcul il n’existe ni licence d’opérateur de système d’information, ni "
   "cadre réglementaire, ni émission — la première émission est donc placée en %d"),
  ("La valeur terminale était calculée tantôt par Gordon avec g=2 %, tantôt par une méthode à trois "
   "phases ; le plan d’affaires indiquait g=4 %",
   "Une seule méthode : Gordon sur un flux normalisé (investissements égalés à l’amortissement), g = %s"),
  ("La série de flux de trésorerie du rapport d’évaluation ne découlait pas du compte de résultat (elle "
   "ignorait le besoin en fonds de roulement et comportait des résidus inexpliqués)",
   "La série découle des comptes et est vérifiée par programme"),
  ("La décote de stade de 60 % était appliquée deux fois : à l’intérieur de l’approche par les revenus, "
   "puis de nouveau sur la synthèse des méthodes",
   "Appliquée une seule fois, et uniquement aux approches donnant la valeur d’une entreprise mature"),
  ("Un délai de récupération de 2,8 ans alors que le flux cumulé franchissait zéro la quatrième année",
   "Calculé par programme : %s ans en simple, %s ans en actualisé"),
 ],
 "s1": "Feuille 1. Hypothèses",
 "s11": "1.1. Paramètres macroéconomiques",
 "macro_cols": ("Paramètre", "Valeur", "Source et date"),
 "m_key": "Taux directeur de la Banque de Russie",
 "m_key_src": "décision du Conseil d’administration du ",
 "m_ofz": "Rendement des OFZ à 10 ans",
 "m_ofz_src": "données de marché au ",
 "m_erp": "Prime de risque des actions",
 "m_beta": "Bêta (services financiers)",
 "m_stage": "Prime de stade",
 "m_liq": "Prime d’illiquidité",
 "m_wacc": "**Taux d’actualisation (CMPC)**",
 "m_wacc_src": "somme des composantes",
 "m_infl": "Cible d’inflation",
 "m_infl_src": "référence de la Banque de Russie",
 "m_fx": "Cours USD/RUB",
 "m_fx_src": "cours officiel au ",
 "macro_note": ("> Le taux directeur a été mis à jour au %s. Le rendement des OFZ à 10 ans et le cours de "
                "change sont figés à mai 2026 et doivent être actualisés à la date des négociations avant "
                "toute présentation à un investisseur extérieur. Le taux directeur n’influe pas sur le "
                "taux d’actualisation : celui-ci est construit sur le rendement des OFZ, le taux "
                "directeur ne servant que de contrôle."),
 "s12": "1.2. Marché",
 "market_lead": ("Capacité de nantissement du marché en 2025 — **%s Md ₽** : 10 %% des actifs mobilisés, "
                 "valorisés à des fins de nantissement à 50 %% de la valeur de marché, sur l’ensemble du "
                 "parc de logements, de l’immobilier commercial et des terrains (507 000 Md ₽). "
                 "Indexation — %s par an."),
 "stack_lead": ("L’encours en circulation est la somme des émissions des %d dernières années (durée de "
                "vie moyenne d’une émission)."),
 "r_cap": "Capacité de nantissement, Md ₽",
 "r_share": "Part de la plateforme, %",
 "r_issue": "Émission d’AFN, M ₽",
 "r_stack": "Encours en circulation, M ₽",
 "market_note": ("> La trajectoire de part de marché est l’hypothèse clé de l’auteur et la principale "
                 "source d’incertitude du modèle. Elle n’est corroborée par rien d’extérieur : ni pilote, "
                 "ni contrats, ni projet comparable. Tout le reste du modèle est de l’arithmétique dérivée "
                 "de cette ligne."),
 "s13": "1.3. Tarifs",
 "tar_cols": ("Ligne", "Taux", "Assiette"),
 "t_issue": "Commission d’émission", "t_issue_b": "volume d’émission annuel",
 "t_serv": "Commission de service", "t_serv_b": "encours en circulation",
 "t_platf": "Redevance de plateforme", "t_platf_b": "volume d’émission",
 "t_lic": "Licences B2B2G", "t_lic_b": "volume d’émission", "t_lic_v": "de 0 à ",
 "t_int": "Intégrations technologiques", "t_int_b": "paiements fixes de raccordement",
 "t_int_v": "de %s à %s M ₽",
 "t_app_g": "Évaluation et assurance — tarif brut", "t_app_b": "volume d’émission",
 "t_app_c": "Évaluation et assurance — charges en contrepartie", "t_app_c_b": "du tarif brut",
 "t_app_n": "**Évaluation et assurance — marge propre**",
 "t_app_n_b": "volume d’émission ; seule cette part entre dans le chiffre d’affaires",
 "s14": "1.4. Charges",
 "cost_lead1": ("La masse salariale est calculée comme effectif × salaire moyen × 12 × 1,30 (cotisations "
                "sociales %s). Salaire de la première année — %s k₽ par mois, indexé à %s par an."),
 "cost_lead2": ("Autres charges d’exploitation = une base de %s M ₽ indexée à %s par an, plus une part "
                "variable de %s du chiffre d’affaires. La part variable couvre l’acquisition de paiement, "
                "l’infrastructure en charge, la conformité, la cybersécurité, l’accompagnement juridique "
                "et l’acquisition de clients ; son niveau est calibré pour que la marge de l’année de "
                "maturité se situe au niveau d’opérateurs d’infrastructure comparables."),
 "c_fte": "Effectif", "c_sal": "Salaire moyen, k₽/mois",
 "c_payroll": "Masse salariale avec cotisations, M ₽", "c_other": "Autres charges d’exploitation, M ₽",
 "c_capex": "Investissements, M ₽", "c_amort": "Amortissement, M ₽",
 "capex_total": "Investissements sur l’horizon — **%s M ₽**. Durée d’amortissement %d ans.",
 "s15": "1.5. Impôts et besoin en fonds de roulement",
 "tax_cols": ("Paramètre", "Valeur", "Fondement"),
 "x_tax": "Impôt sur les bénéfices", "x_tax_src": "loi fédérale 176-FZ du 12.07.2024, en vigueur depuis le 01.01.2025", "x_nol": "Plafond de report des pertes antérieures",
 "x_nol_src": "art. 283 du Code des impôts", "x_soc": "Cotisations sociales",
 "x_soc_src": "ch. 34 du Code des impôts", "x_wc": "Besoin en fonds de roulement",
 "x_wc_src": "du chiffre d’affaires",
 "tax_note1": ("> L’allègement d’impôt sur les bénéfices ouvert aux organisations informatiques accréditées "
               "n’est pas intégré au scénario de base — c’est un potentiel distinct, non une hypothèse."),
 "tax_note2": ("> **TVA.** Les opérations sur actifs financiers numériques ne sont pas soumises à la TVA : "
               "ces actifs relèvent des valeurs mobilières et la cession de valeurs mobilières est exonérée "
               "(sous-clause 12, clause 2, art. 149 du Code des impôts). La position a été confirmée par le "
               "propriétaire du projet le 07.09.2026 et est intégrée au modèle."),
 "s2": "Feuille 2. Chiffre d’affaires",
 "rev_lead": "Tous les montants en M ₽. Le total est égal à la somme des lignes.",
 "rev_line_col": "Ligne",
 "rev_total": "**TOTAL chiffre d’affaires**",
 "memo_col": "Pour mémoire",
 "gross_line": "Pour mémoire : encaissements bruts",
 "gross_note": ("Les encaissements bruts représentent l’ensemble des sommes transitant par la plateforme, y "
                "compris les paiements en contrepartie aux évaluateurs et aux assureurs. L’écart entre "
                "encaissements bruts et chiffre d’affaires correspond à de l’argent de tiers ; le présenter "
                "comme un produit de la plateforme serait incorrect."),
 "s3": "Feuille 3. Compte de résultat",
 "p_rev": "Chiffre d’affaires", "p_payroll": "Masse salariale avec cotisations",
 "p_other": "Autres charges d’exploitation",
 "p_opex": "**Total des charges d’exploitation**", "p_ebitda": "**EBITDA**", "p_margin": "Marge d’EBITDA, %",
 "p_amort": "Amortissement", "p_ebit": "**EBIT**", "p_tax": "Impôt sur les bénéfices",
 "p_net": "**Résultat net**",
 "margin_note": ("Marge de l’année de maturité — %s. Références de sociétés comparables : opérateurs "
                 "d’infrastructure boursière et dépositaire 65–75 %%, systèmes de paiement internationaux "
                 "60–70 %%."),
 "s4": "Feuille 4. Flux de trésorerie",
 "f_ebitda": "EBITDA", "f_tax": "Impôt sur les bénéfices", "f_wc": "Variation du besoin en fonds de roulement",
 "f_capex": "Investissements", "f_fcf": "**Flux de trésorerie disponible**", "f_cum": "Flux cumulé",
 "f_df": "Facteur d’actualisation", "f_pv": "Flux actualisé",
 "peak_lead": ("**Besoin de financement au pic — %s M ₽** (flux cumulé négatif maximal). Le tour de départ "
               "de %s M ₽ le couvre à %s."),
 "s5": "Feuille 5. Valeur d’entreprise",
 "v_pv": "Somme des flux actualisés sur %d ans", "v_norm": "Flux normalisé pour la période terminale",
 "v_tv": "Valeur terminale en fin d’horizon", "v_pvtv": "Valeur terminale actualisée",
 "v_share": "Part de la valeur terminale dans la valeur d’entreprise", "v_ev": "**Valeur d’entreprise**",
 "v_usd": "Idem en dollars au cours de %s", "v_irr": "Taux de rendement interne du projet",
 "v_pb": "Délai de récupération simple", "v_pbd": "Délai de récupération actualisé", "v_years": " ans",
 "irr_note": ("> **Réserve sur le taux de rendement interne.** La valeur de %s est obtenue sur des flux de "
              "projet où les apports initiaux sont faibles (un pic de %s M ₽) tandis que les flux de "
              "maturité se comptent en dizaines de milliards. Un tel rendement n’est pas un avantage du "
              "projet : il montre que le modèle ne reflète pas le coût complet d’entrée sur ce marché — "
              "fonds propres de l’opérateur de système d’information, réserves, coût d’acquisition des "
              "constituants du gage. Le chiffre est donné pour l’exhaustivité ; les négociations doivent "
              "s’appuyer sur la valeur d’entreprise et sur le calcul investisseur (feuille 8)."),
 "s6": "Feuille 6. Scénarios",
 "sc_cols": ("Scénario", "Part de marché année 10", "Poids", "Chiffre d’affaires année 10, M ₽",
             "Valeur d’entreprise, Md ₽", "Récupération, ans"),
 "sc_names": {"Консервативный": "Conservateur", "Базовый": "Base", "Оптимистичный": "Optimiste"},
 "sc_expected": "**Valeur attendue**",
 "sc_note": ("Les scénarios ne diffèrent que par la part de marché visée en année dix ; la trajectoire est "
             "mise à l’échelle proportionnellement. Les poids sont fixés par l’auteur du projet."),
 "s7": "Feuille 7. Sensibilité",
 "s71": "7.1. Taux d’actualisation et part de marché",
 "s71_lead": "Valeur d’entreprise, M ₽.",
 "s71_col": "CMPC \\\\ part de marché année 10",
 "s72": "7.2. Charges d’exploitation",
 "s72_col": "Écart des charges",
 "s72_row": "Valeur d’entreprise, M ₽",
 "s72_note": ("La sensibilité aux charges est faible : même une hausse de 30 %% ne modifie la valorisation "
              "que de %s. Cela signifie que toute la valeur est déterminée par les hypothèses de chiffre "
              "d’affaires, c’est-à-dire par la trajectoire de part de marché."),
 "s73": "7.3. Retard de lancement — le risque principal",
 "s73_cols": ("Retard de la première émission", "Première année avec émission", "CA année 10, M ₽",
              "Valeur d’entreprise, Md ₽", "Besoin au pic, M ₽"),
 "s73_none": "aucun", "s73_year": "+%d an(s)",
 "s73_note": ("Chaque année de retard retire environ un quart de la valeur et augmente le besoin de "
              "trésorerie. Le tour annoncé suppose un lancement sans retard ; un décalage d’un an porte le "
              "besoin à %s M ₽, un décalage de deux ans à %s M ₽."),
 "s74": "7.4. Simulation",
 "s74_lead": ("%d itérations, générateur à graine fixe %d — le calcul est reproductible. Sont variés : la "
              "part de marché de l’année 10 (loi triangulaire 7–25 %%, mode 18 %%), le taux d’actualisation "
              "(uniforme 27–33 %%), l’écart des charges (uniforme de moins 10 %% à plus 30 %%), le retard de "
              "lancement (0/1/2/3 ans avec des probabilités de 40/30/20/10 %%)."),
 "s74_cols": ("Percentile", "P5", "P10", "P25", "Médiane", "P75", "P90", "P95"),
 "s74_row": "Valeur d’entreprise, Md ₽",
 "s74_prob": "Probabilité d’une valeur supérieure à 50 Md ₽ — %s. Probabilité d’une valeur négative — %s.",
 "s74_note": ("> La médiane de la simulation (%s Md ₽) est nettement inférieure au scénario de base "
              "(%s Md ₽). Ce n’est pas une erreur : le scénario de base suppose un lancement sans retard, "
              "tandis que la simulation tient compte de la probabilité d’un retard. L’écart entre le "
              "scénario de base et la médiane de la simulation est le prix du risque de calendrier."),
 "s8": "Feuille 8. Calcul pour l’investisseur",
 "i_inv": "Investissement", "i_share": "Participation au capital", "i_hor": "Horizon de détention",
 "i_hor_v": "%d ans, sortie en %d", "i_ev": "Valeur d’entreprise à la sortie",
 "i_cash": "Trésorerie accumulée", "i_eq": "Valeur des capitaux propres à la sortie",
 "i_proceeds": "Produit pour l’investisseur",
 "i_mult": "**Multiple de retour**", "i_irr": "**Taux de rendement interne de l’investisseur**",
 "i_note": ("Le calcul suppose que le plan est intégralement réalisé, qu’aucun dividende n’a été versé et "
            "que les fonds accumulés restent dans la société. C’est une borne haute, non une espérance : le "
            "prix du risque de non-réalisation est intégré dans la décote de stade appliquée à la "
            "détermination de la valeur d’entrée (feuille 9)."),
 "s9": "Feuille 9. Valeur d’entrée (pre-money)",
 "s9_lead": ("Synthèse de quatre approches. La décote de stade de %s est appliquée **une seule fois**, et "
             "uniquement aux approches qui donnent la valeur d’une entreprise mature. Les approches de "
             "Berkus et de coût de remplacement évaluent le projet en l’état et ne sont pas décotées de "
             "nouveau."),
 "s9_cols": ("Approche", "Avant décote, M$", "Décote de stade", "Après décote, M$", "Poids",
             "Contribution, M$"),
 "s9_methods": {
   "Доходный (DCF)": "Revenus (DCF)",
   "Сравнительный (мультипликаторы)": "Marché (multiples)",
   "Скорректированный Беркус": "Berkus ajusté du risque",
   "Затратный (восстановительная стоимость)": "Coût (valeur de remplacement)"},
 "s9_yes": "appliquée", "s9_no": "non appliquée",
 "s9_total": "**Valeur d’entrée (pre-money)**",
 "s9_sum": "**Pre-money ≈ %s M$ ≈ %s Md ₽** au cours de %s ₽/$.",
 "s9_spread": ("> **L’écart entre les approches est de un à douze** — de 20 M$ pour l’approche par les coûts "
               "à 352 M$ pour l’approche par les revenus. Un tel écart signifie que la moyenne pondérée est "
               "elle-même peu informative : 65 % du poids repose sur des approches qui valorisent une "
               "entreprise déjà en activité, tandis que les approches conçues pour un stade précoce donnent "
               "un ordre de grandeur inférieur. Conclusion pratique : la fourchette de négociation doit être "
               "construite à partir des approches de stade précoce, l’approche par les revenus servant "
               "d’argument sur le potentiel et non de prix. La décision sur le prix d’entrée appartient au "
               "propriétaire du projet."),
 "s9_deal_h": "Structure du tour à cette valorisation",
 "d_pre": "Pre-money", "d_round": "Tour", "d_post": "Post-money", "d_stake": "Part de l’investisseur",
 "d_cover": ("> **Le tour couvre le besoin calculé.** Le besoin au pic est de %s M ₽ (fin %d), le tour de "
             "%s M ₽, soit un coussin de %s M ₽. Le coussin est mince : un retard d’un an au lancement porte "
             "le besoin à %s M ₽ et le tour ne suffirait plus. La date de lancement est le premier élément à "
             "surveiller."),
 "d_gap": ("> **Le tour est insuffisant.** Le besoin de financement au pic est de %s M ₽, le tour annoncé de "
           "%s M ₽. L’écart de %s M ₽ doit être comblé par une augmentation du tour ou par une tranche "
           "intermédiaire."),
 "s9_double": ("> Dans l’édition précédente, la décote de stade était appliquée deux fois — d’abord à "
               "l’intérieur de l’approche par les revenus, puis de nouveau sur la synthèse. La valeur "
               "d’entrée s’en trouvait sous-estimée d’environ moitié. La correction renforce la position de "
               "négociation du projet, elle ne l’affaiblit pas."),
 "lim_h": "Limites du modèle",
 "lims": [
  "**La trajectoire de part de marché n’est corroborée par rien.** Ni pilote, ni contrats, ni projet "
  "comparable. C’est l’hypothèse de l’auteur, et toute la valorisation repose dessus.",
  "**Le cadre réglementaire n’a pas été adopté.** Le modèle suppose que la réglementation permettra "
  "d’opérer à l’échelle annoncée. Dans le cas contraire, seul le scénario conservateur s’applique.",
  "**Les exigences de fonds propres de l’opérateur de système d’information ne sont pas modélisées** — "
  "fonds propres, réserves, dépôts de garantie.",
  "**Le coût d’acquisition client n’apparaît pas sur une ligne distincte** — il est inclus dans la part "
  "variable des charges.",
  "**Le modèle est sans dette.** Capitaux propres uniquement ; aucun bouclier fiscal sur intérêts n’est "
  "pris en compte.",
  "**Tous les flux sont en roubles**, il n’y a pas de position de change.",
  "**Les paramètres macroéconomiques sont figés à mai 2026** (hors taux directeur) et doivent être "
  "actualisés à la date des négociations.",
  "**Le modèle ne constitue pas une offre** et ne garantit aucun résultat.",
 ],
 "footer": "**Édition %s · %s · calculé par programme ; contrôle de cohérence réussi.**",
 "note_tr": ("> **Note.** Ceci est une traduction de l’original russe. La partie financière est générée par "
             "le même moteur de calcul, les chiffres coïncident donc avec la version russe. En cas de "
             "divergence de formulation, la version russe fait foi."),
}

# --- арабский -----------------------------------------------------------------
T["ar"] = {
 "title": "النموذج المالي لمنصة CP RSFSR",
 "author": ("**المؤلف وصاحب الحقوق:** كاغيروف أ.-خ.أ. شهادة إيداع رقم 4011265 بتاريخ 19.12.2024 — تثبيت "
            "تاريخ الأولوية وبصمة العمل؛ نظام الحماية: معرفة فنية (المادة 1465 من القانون المدني) وبرنامج "
            "حاسوب (المادة 1262 من القانون المدني؛ التسجيل لدى Rospatent قيد الإنجاز)."),
 "edition": ("**الإصدار:** %s بتاريخ %s. **الأفق:** %d سنوات (%d–%d) مع القيمة النهائية. "
             "**تاريخ التقييم:** %s. **العملة:** الروبل؛ ما لم يُذكر خلاف ذلك، بملايين الروبلات."),
 "note_engine": ("> **جميع الأرقام في هذه الوثيقة محسوبة برمجياً** من مجموعة افتراضات واحدة في "
                 "`Модель/assumptions.json`. تُجمَّع الوثيقة بواسطة `Модель/собрать_документ_i18n.py`؛ "
                 "لا يجوز تعديل الأرقام في النص — فسيُعاد استبدالها عند البناء التالي. التصدير الآلي: "
                 "`Модель/Выгрузка/*.csv`."),
 "note_selfcheck": ("> **اجتاز فحص الاتساق الذاتي:** إجمالي الإيرادات يساوي مجموع بنوده، والمصروفات "
                    "التشغيلية تساوي الأجور مضافاً إليها المصروفات الأخرى، وEBITDA تساوي الإيرادات ناقص "
                    "المصروفات التشغيلية، والتدفق النقدي الحر يساوي EBITDA ناقص الضريبة وناقص الزيادة في "
                    "رأس المال العامل وناقص النفقات الرأسمالية، وقيمة المشروع تساوي مجموع التدفقات "
                    "المخصومة والقيمة النهائية المخصومة."),
 "changes_h": "ما الذي تغيّر في الإصدار v5",
 "changes_lead": "الإصدار v5 ليس تعديلاً شكلياً بل إعادة حساب. فيما يلي ما جرى تصحيحه جوهرياً.",
 "changes_cols": ("ما كان", "ما أصبح ولماذا"),
 "changes": [
  ("لم يكن إجمالي الإيرادات مساوياً لمجموع بنوده (في 2034 أعطت البنود 175,492 مليون روبل مقابل إجمالي "
   "معلن قدره 137,905 مليون روبل)",
   "يُحسب الإجمالي كمجموع للبنود، ويستحيل حدوث فارق بحكم البناء"),
  ("كانت خدمات التقييم والتأمين (0.8% من الحجم) تُقيَّد بالكامل كإيراد للمنصة، رغم أن ملاحظات النموذج "
   "تصفها بأنها عابرة مع 85% تكاليف مقابلة",
   "تُقيَّد بالصافي: يدخل في الإيراد هامش المنصة الخاص فقط (0.12% من الحجم). وتُفصح المتحصلات الإجمالية "
   "في سطر مستقل للعلم"),
  ("معدل ضريبة الأرباح 20%",
   "25% — اعتباراً من 1 يناير 2025 (القانون الاتحادي 176-FZ بتاريخ 12.07.2024). المعدل السابق لم يعد "
   "سارياً"),
  ("لم تُرحَّل خسائر السنوات الأولى",
   "رُوعي ترحيل الخسائر بحد أقصى 50% من الوعاء الضريبي"),
  ("لم تُشتق الأجور من عدد الموظفين والراتب (افترض سطر 2029 ضعف العدد المعلن، وسطر 2026 نصفه)",
   "الأجور = العدد × الراتب × 12 × 1.30. والمصروفات الأخرى = أساس مفهرس مضافاً إليه حصة متغيرة من الإيراد"),
  ("كان الأفق يبدأ من 2025؛ وكان أول إصدار للأصول المالية الرقمية مقرراً لعام 2026",
   "الأفق %d–%d. في تاريخ إعادة الحساب لا توجد رخصة مشغّل نظام معلومات ولا إطار تنظيمي ولا إصدارات — لذا "
   "وُضع أول إصدار في %d"),
  ("كانت القيمة النهائية تُحسب تارة بطريقة غوردون بمعدل نمو 2%، وتارة بطريقة ثلاثية المراحل؛ وأشار خطة "
   "العمل إلى 4%",
   "طريقة واحدة: غوردون على تدفق مُطبَّع (النفقات الرأسمالية مساوية للإهلاك)، معدل النمو = %s"),
  ("لم تكن سلسلة التدفقات النقدية في تقرير التقييم مشتقة من قائمة الأرباح والخسائر (تجاهلت رأس المال "
   "العامل واحتوت على بواقٍ غير مفسَّرة)",
   "تُشتق السلسلة من القوائم وتُتحقق برمجياً"),
  ("طُبِّق خصم المرحلة البالغ 60% مرتين: داخل مدخل الدخل ثم مرة أخرى فوق توليف الطرق",
   "يُطبَّق مرة واحدة، وعلى الطرق التي تعطي قيمة منشأة ناضجة فقط"),
  ("فترة استرداد 2.8 سنة بينما يعبر التدفق التراكمي الصفر في السنة الرابعة",
   "يُحسب برمجياً: %s سنة بسيطة، و%s سنة مخصومة"),
 ],
 "s1": "الورقة 1. الافتراضات",
 "s11": "1.1. المعطيات الاقتصادية الكلية",
 "macro_cols": ("المعطى", "القيمة", "المصدر والتاريخ"),
 "m_key": "سعر الفائدة الرئيسي لبنك روسيا",
 "m_key_src": "قرار مجلس الإدارة بتاريخ ",
 "m_ofz": "عائد سندات OFZ لعشر سنوات",
 "m_ofz_src": "بيانات السوق بتاريخ ",
 "m_erp": "علاوة مخاطر الأسهم",
 "m_beta": "بيتا (الخدمات المالية)",
 "m_stage": "علاوة المرحلة",
 "m_liq": "علاوة عدم السيولة",
 "m_wacc": "**معدل الخصم (WACC)**",
 "m_wacc_src": "مجموع المكوّنات",
 "m_infl": "مستهدف التضخم",
 "m_infl_src": "مرجع بنك روسيا",
 "m_fx": "سعر صرف USD/RUB",
 "m_fx_src": "السعر الرسمي بتاريخ ",
 "macro_note": ("> جرى تحديث سعر الفائدة الرئيسي بتاريخ %s. أما عائد سندات OFZ لعشر سنوات وسعر الصرف "
                "فمثبتان على مايو 2026 ويجب تحديثهما بتاريخ المفاوضات قبل التوجه إلى مستثمر خارجي. ولا "
                "يؤثر سعر الفائدة الرئيسي على معدل الخصم: إذ يُبنى الأخير على عائد السندات، ويُستخدم "
                "السعر الرئيسي للمراجعة فقط."),
 "s12": "1.2. السوق",
 "market_lead": ("الطاقة الرهنية للسوق في 2025 — **%s مليار روبل**: 10%% من الأصول المُدرجة في التداول، "
                 "مُقيَّمة لأغراض الرهن بنسبة 50%% من القيمة السوقية، من إجمالي المساكن والعقارات التجارية "
                 "وقطع الأراضي (507 تريليون روبل). الفهرسة — %s سنوياً."),
 "stack_lead": "الرصيد المتداول هو مجموع الإصدارات خلال آخر %d سنوات (متوسط عمر الإصدار).",
 "r_cap": "الطاقة الرهنية، مليار روبل",
 "r_share": "حصة المنصة، %",
 "r_issue": "حجم إصدار الأصول الرقمية، مليون روبل",
 "r_stack": "الرصيد المتداول، مليون روبل",
 "market_note": ("> مسار الحصة السوقية هو الافتراض الرئيسي للمؤلف والمصدر الأساسي لعدم اليقين في النموذج. "
                 "ولا يسنده شيء من الخارج: لا تجربة رائدة ولا عقود ولا مشروع مماثل. وكل ما تبقّى في "
                 "النموذج حساب مشتق من هذا السطر."),
 "s13": "1.3. التعرفة",
 "tar_cols": ("البند", "المعدل", "الوعاء"),
 "t_issue": "عمولة الإصدار", "t_issue_b": "حجم الإصدار السنوي",
 "t_serv": "عمولة الخدمة", "t_serv_b": "الرصيد المتداول",
 "t_platf": "رسم المنصة", "t_platf_b": "حجم الإصدار",
 "t_lic": "تراخيص B2B2G", "t_lic_b": "حجم الإصدار", "t_lic_v": "من 0 إلى ",
 "t_int": "التكاملات التقنية", "t_int_b": "مدفوعات ربط ثابتة", "t_int_v": "من %s إلى %s مليون روبل",
 "t_app_g": "التقييم والتأمين — التعرفة الإجمالية", "t_app_b": "حجم الإصدار",
 "t_app_c": "التقييم والتأمين — التكاليف المقابلة", "t_app_c_b": "من التعرفة الإجمالية",
 "t_app_n": "**التقييم والتأمين — الهامش الخاص**",
 "t_app_n_b": "حجم الإصدار؛ هذا الجزء وحده يدخل في الإيراد",
 "s14": "1.4. التكاليف",
 "cost_lead1": ("تُحسب الأجور بضرب العدد × متوسط الراتب × 12 × 1.30 (اشتراكات التأمين %s). راتب السنة "
                "الأولى — %s ألف روبل شهرياً، بفهرسة %s سنوياً."),
 "cost_lead2": ("المصروفات التشغيلية الأخرى = أساس قدره %s مليون روبل بفهرسة %s سنوياً، مضافاً إليه جزء "
                "متغير قدره %s من الإيراد. ويغطي الجزء المتغير المدفوعات والبنية التحتية تحت الحمل "
                "والامتثال والأمن السيبراني والدعم القانوني واستقطاب العملاء؛ وقد عُوير حجمه بحيث يكون "
                "هامش سنة النضج عند مستوى مشغّلي البنية التحتية المماثلين."),
 "c_fte": "عدد الموظفين", "c_sal": "متوسط الراتب، ألف روبل/شهر",
 "c_payroll": "الأجور مع الاشتراكات، مليون روبل", "c_other": "مصروفات تشغيلية أخرى، مليون روبل",
 "c_capex": "النفقات الرأسمالية، مليون روبل", "c_amort": "الإهلاك، مليون روبل",
 "capex_total": "النفقات الرأسمالية على مدى الأفق — **%s مليون روبل**. مدة الإهلاك %d سنوات.",
 "s15": "1.5. الضرائب ورأس المال العامل",
 "tax_cols": ("المعطى", "القيمة", "الأساس"),
 "x_tax": "ضريبة الأرباح", "x_tax_src": "القانون الاتحادي 176-FZ بتاريخ 12.07.2024، ساري المفعول من 01.01.2025", "x_nol": "حد ترحيل خسائر السنوات السابقة",
 "x_nol_src": "المادة 283 من قانون الضرائب", "x_soc": "اشتراكات التأمين",
 "x_soc_src": "الفصل 34 من قانون الضرائب", "x_wc": "رأس المال العامل", "x_wc_src": "من الإيراد",
 "tax_note1": ("> لم يُدرَج في السيناريو الأساسي الإعفاء الضريبي المتاح لمنظمات تقنية المعلومات المعتمدة — "
               "فهو إمكانية منفصلة لا افتراض."),
 "tax_note2": ("> **ضريبة القيمة المضافة.** لا تخضع العمليات على الأصول المالية الرقمية لضريبة القيمة "
               "المضافة: إذ تُصنَّف هذه الأصول ضمن الأوراق المالية، وبيع الأوراق المالية معفى من الضريبة "
               "(البند الفرعي 12 من الفقرة 2 من المادة 149 من قانون الضرائب). وقد أكّد مالك المشروع هذا "
               "الموقف بتاريخ 07.09.2026 وأُدرج في النموذج."),
 "s2": "الورقة 2. الإيرادات",
 "rev_lead": "جميع المبالغ بملايين الروبلات. الإجمالي يساوي مجموع البنود.",
 "rev_line_col": "البند",
 "rev_total": "**إجمالي الإيرادات**",
 "memo_col": "للعلم",
 "gross_line": "للعلم: المتحصلات الإجمالية",
 "gross_note": ("المتحصلات الإجمالية هي كامل المبلغ المار عبر المنصة، بما في ذلك المدفوعات المقابلة "
                "للمقيّمين وشركات التأمين. والفرق بين المتحصلات الإجمالية والإيراد هو أموال أطراف ثالثة؛ "
                "وعرضه كإيراد للمنصة غير صحيح."),
 "s3": "الورقة 3. الأرباح والخسائر",
 "p_rev": "الإيرادات", "p_payroll": "الأجور مع الاشتراكات", "p_other": "مصروفات تشغيلية أخرى",
 "p_opex": "**إجمالي المصروفات التشغيلية**", "p_ebitda": "**EBITDA**", "p_margin": "هامش EBITDA، %",
 "p_amort": "الإهلاك", "p_ebit": "**EBIT**", "p_tax": "ضريبة الأرباح", "p_net": "**صافي الربح**",
 "margin_note": ("هامش سنة النضج — %s. مراجع الشركات المماثلة: مشغّلو البنية التحتية للبورصات والإيداع "
                 "65–75%%، وأنظمة الدفع الدولية 60–70%%."),
 "s4": "الورقة 4. التدفق النقدي",
 "f_ebitda": "EBITDA", "f_tax": "ضريبة الأرباح", "f_wc": "الزيادة في رأس المال العامل",
 "f_capex": "النفقات الرأسمالية", "f_fcf": "**التدفق النقدي الحر**", "f_cum": "التدفق التراكمي",
 "f_df": "معامل الخصم", "f_pv": "التدفق المخصوم",
 "peak_lead": ("**ذروة الحاجة التمويلية — %s مليون روبل** (أكبر تدفق تراكمي سالب). وجولة البداية البالغة "
               "%s مليون روبل تغطيها بنسبة %s."),
 "s5": "الورقة 5. قيمة المشروع",
 "v_pv": "مجموع التدفقات المخصومة على %d سنوات", "v_norm": "التدفق المُطبَّع للفترة النهائية",
 "v_tv": "القيمة النهائية في نهاية الأفق", "v_pvtv": "القيمة النهائية المخصومة",
 "v_share": "حصة القيمة النهائية من قيمة المشروع", "v_ev": "**قيمة المشروع**",
 "v_usd": "المبلغ ذاته بالدولار عند سعر %s", "v_irr": "معدل العائد الداخلي للمشروع",
 "v_pb": "فترة الاسترداد البسيطة", "v_pbd": "فترة الاسترداد المخصومة", "v_years": " سنة",
 "irr_note": ("> **تحفّظ على معدل العائد الداخلي.** القيمة %s ناتجة عن تدفقات مشروع تكون فيها المدخلات "
              "صغيرة (ذروة قدرها %s مليون روبل) بينما تبلغ تدفقات النضج عشرات المليارات. وهذا العائد ليس "
              "ميزة للمشروع: بل يبيّن أن النموذج لا يعكس التكلفة الكاملة لدخول هذا السوق — رأسمال مشغّل "
              "نظام المعلومات والاحتياطيات وتكلفة استقطاب الراهنين. ويُذكر الرقم للاكتمال؛ وينبغي أن "
              "تستند المفاوضات إلى قيمة المشروع وإلى حساب المستثمر (الورقة 8)."),
 "s6": "الورقة 6. السيناريوهات",
 "sc_cols": ("السيناريو", "الحصة السوقية سنة 10", "الوزن", "الإيراد سنة 10، مليون روبل",
             "قيمة المشروع، مليار روبل", "الاسترداد، سنوات"),
 "sc_names": {"Консервативный": "المحافظ", "Базовый": "الأساسي", "Оптимистичный": "المتفائل"},
 "sc_expected": "**القيمة المتوقعة**",
 "sc_note": ("لا تختلف السيناريوهات إلا في الحصة السوقية المستهدفة في السنة العاشرة؛ ويُقاس المسار "
             "تناسبياً. والأوزان يحددها مؤلف المشروع."),
 "s7": "الورقة 7. الحساسية",
 "s71": "7.1. معدل الخصم والحصة السوقية",
 "s71_lead": "قيمة المشروع، مليون روبل.",
 "s71_col": "WACC \\\\ الحصة السوقية سنة 10",
 "s72": "7.2. المصروفات التشغيلية",
 "s72_col": "انحراف المصروفات",
 "s72_row": "قيمة المشروع، مليون روبل",
 "s72_note": ("الحساسية للمصروفات منخفضة: حتى ارتفاعها بنسبة 30%% لا يغيّر التقييم إلا بنسبة %s. وهذا يعني "
              "أن القيمة كلها تتحدد بافتراضات الإيراد، أي بمسار الحصة السوقية."),
 "s73": "7.3. تأخر الإطلاق — الخطر الرئيسي",
 "s73_cols": ("تأخر أول إصدار", "أول سنة بإصدار", "الإيراد سنة 10، مليون روبل",
              "قيمة المشروع، مليار روبل", "ذروة الحاجة، مليون روبل"),
 "s73_none": "لا يوجد", "s73_year": "+%d سنة",
 "s73_note": ("كل سنة تأخير تزيل نحو ربع القيمة وتزيد الحاجة إلى المال. والجولة المعلنة محسوبة على إطلاق "
              "بلا تأخير؛ فالتأخر سنة واحدة يرفع الحاجة إلى %s مليون روبل، والتأخر سنتين إلى %s مليون "
              "روبل."),
 "s74": "7.4. المحاكاة",
 "s74_lead": ("%d تكرار، مولّد ببذرة ثابتة %d — الحساب قابل لإعادة الإنتاج. وتتغيّر: الحصة السوقية للسنة "
              "العاشرة (توزيع مثلثي 7–25%%، المنوال 18%%)، ومعدل الخصم (منتظم 27–33%%)، وانحراف المصروفات "
              "(منتظم من ناقص 10%% إلى زائد 30%%)، وتأخر الإطلاق (0/1/2/3 سنوات باحتمالات 40/30/20/10%%)."),
 "s74_cols": ("المئين", "P5", "P10", "P25", "الوسيط", "P75", "P90", "P95"),
 "s74_row": "قيمة المشروع، مليار روبل",
 "s74_prob": "احتمال تجاوز القيمة 50 مليار روبل — %s. واحتمال قيمة سالبة — %s.",
 "s74_note": ("> وسيط المحاكاة (%s مليار روبل) أدنى بوضوح من السيناريو الأساسي (%s مليار روبل). وليس هذا "
              "خطأً: فالسيناريو الأساسي يفترض إطلاقاً بلا تأخير، بينما تأخذ المحاكاة في الحسبان أن التأخير "
              "مرجّح. والفجوة بين السيناريو الأساسي ووسيط المحاكاة هي ثمن مخاطر الجدول الزمني."),
 "s8": "الورقة 8. حساب المستثمر",
 "i_inv": "الاستثمار", "i_share": "الحصة في رأس المال", "i_hor": "أفق الاحتفاظ",
 "i_hor_v": "%d سنوات، الخروج في %d", "i_ev": "قيمة المشروع عند الخروج",
 "i_cash": "النقد المتراكم", "i_eq": "قيمة حقوق الملكية عند الخروج", "i_proceeds": "متحصلات المستثمر",
 "i_mult": "**مضاعف العائد**", "i_irr": "**معدل العائد الداخلي للمستثمر**",
 "i_note": ("يفترض الحساب تنفيذ الخطة بالكامل، وعدم توزيع أرباح، وبقاء الأموال المتراكمة داخل الشركة. وهذا "
            "حد أعلى لا توقّع: فثمن مخاطر عدم التنفيذ مُدرج في خصم المرحلة المطبَّق عند تحديد قيمة الدخول "
            "(الورقة 9)."),
 "s9": "الورقة 9. قيمة الدخول (pre-money)",
 "s9_lead": ("توليف أربع طرق. يُطبَّق خصم المرحلة البالغ %s **مرة واحدة**، وعلى الطرق التي تعطي قيمة منشأة "
             "ناضجة فقط. أما طريقتا بيركوس وتكلفة الإحلال فتقيّمان المشروع على حاله ولا تخضعان لخصم ثانٍ."),
 "s9_cols": ("الطريقة", "قبل الخصم، مليون دولار", "خصم المرحلة", "بعد الخصم، مليون دولار", "الوزن",
             "المساهمة، مليون دولار"),
 "s9_methods": {
   "Доходный (DCF)": "مدخل الدخل (DCF)",
   "Сравнительный (мультипликаторы)": "مدخل السوق (المضاعفات)",
   "Скорректированный Беркус": "بيركوس المعدّل بالمخاطر",
   "Затратный (восстановительная стоимость)": "مدخل التكلفة (قيمة الإحلال)"},
 "s9_yes": "مطبَّق", "s9_no": "غير مطبَّق",
 "s9_total": "**قيمة الدخول (pre-money)**",
 "s9_sum": "**pre-money ≈ %s مليون دولار ≈ %s مليار روبل** عند سعر %s روبل/دولار.",
 "s9_spread": ("> **الفارق بين الطرق اثنا عشر ضعفاً** — من 20 مليون دولار في مدخل التكلفة إلى 352 مليون "
               "دولار في مدخل الدخل. ويعني هذا الفارق أن المتوسط المرجّح نفسه محدود الفائدة: إذ يقع 65% من "
               "الوزن على طرق تقيّم منشأة عاملة بالفعل، بينما تعطي الطرق المخصصة للمرحلة المبكرة رتبة أقل. "
               "والخلاصة العملية: ينبغي بناء نطاق التفاوض من طرق المرحلة المبكرة، واستخدام مدخل الدخل حجةً "
               "على الإمكانات لا سعراً. وقرار سعر الدخول يعود إلى مالك المشروع."),
 "s9_deal_h": "هيكل الجولة عند هذا التقييم",
 "d_pre": "Pre-money", "d_round": "الجولة", "d_post": "Post-money", "d_stake": "حصة المستثمر",
 "d_cover": ("> **الجولة تغطي الحاجة المحسوبة.** ذروة الحاجة %s مليون روبل (نهاية %d)، والجولة %s مليون "
             "روبل، بهامش %s مليون روبل. والهامش ضئيل: فتأخر الإطلاق سنة واحدة يرفع الحاجة إلى %s مليون "
             "روبل ولن تكفي الجولة. وموعد الإطلاق هو أول ما ينبغي ضبطه."),
 "d_gap": ("> **الجولة غير كافية.** ذروة الحاجة التمويلية %s مليون روبل، والجولة المعلنة %s مليون روبل. "
           "ويجب سد الفجوة البالغة %s مليون روبل بزيادة الجولة أو بشريحة وسيطة."),
 "s9_double": ("> في الإصدار السابق طُبِّق خصم المرحلة مرتين — أولاً داخل مدخل الدخل ثم مرة أخرى فوق "
               "التوليف. ولهذا كانت قيمة الدخول مبخوسة نحو النصف. والتصحيح يقوّي موقف المشروع التفاوضي "
               "ولا يضعفه."),
 "lim_h": "حدود النموذج",
 "lims": [
  "**مسار الحصة السوقية لا يسنده شيء.** لا تجربة رائدة ولا عقود ولا مشروع مماثل. إنه افتراض المؤلف، وعليه "
  "يقوم التقييم كله.",
  "**لم يُعتمد الإطار التنظيمي.** يفترض النموذج أن التنظيم سيسمح بالعمل بالحجم المعلن. وإن لم يحدث ذلك، "
  "فلا ينطبق سوى السيناريو المحافظ.",
  "**لم تُنمذَج متطلبات رأسمال مشغّل نظام المعلومات** — الأموال الخاصة والاحتياطيات والودائع التأمينية.",
  "**تكلفة استقطاب العميل غير مفردة في سطر مستقل** — فهي ضمن الجزء المتغير من المصروفات.",
  "**النموذج بلا ديون.** حقوق ملكية فقط؛ ولا يؤخذ الدرع الضريبي على الفوائد في الحسبان.",
  "**جميع التدفقات بالروبل**، ولا يوجد مركز عملات.",
  "**المعطيات الاقتصادية الكلية مثبتة على مايو 2026** (عدا سعر الفائدة الرئيسي) وتحتاج إلى تحديث بتاريخ "
  "المفاوضات.",
  "**النموذج ليس عرضاً** ولا يضمن نتيجة.",
 ],
 "footer": "**الإصدار %s · %s · محسوب برمجياً؛ اجتاز فحص الاتساق الذاتي.**",
 "note_tr": ("> **ملاحظة.** هذه ترجمة عن الأصل الروسي. الجزء المالي مولَّد من المحرك الحسابي نفسه، لذا "
             "تتطابق الأرقام مع النسخة الروسية. وعند أي اختلاف في الصياغة يُعتد بالنسخة الروسية."),
}


# --------------------------------------------------------------------------
# сборка
# --------------------------------------------------------------------------

def build(lang):
    t = T[lang]
    n, pct, num = make_fmt(lang)

    a = M.load()
    base = M.build(a)
    if M.selfcheck(base):
        raise SystemExit("модель не сходится")
    scen = {k: {"доля": v["доля_год10"], "вес": v["вес"],
                "модель": M.build(a, share_year10=v["доля_год10"])}
            for k, v in a["сценарии"].items()}
    exp_ev = sum(v["вес"] * v["модель"]["EV"] for v in scen.values())
    wl = [0.265, 0.280, M.wacc(a), 0.310, 0.330]
    sl = [0.09, 0.135, 0.18, 0.225, 0.27]
    grid = [[M.build(a, share_year10=s, wacc_override=w)["EV"] for s in sl] for w in wl]
    ul = [-0.10, 0.0, 0.10, 0.20, 0.30]
    opx = [M.build(a, opex_uplift=u)["EV"] for u in ul]
    delays = [0, 1, 2, 3]
    dmods = [M.build(a, delay=d) for d in delays]
    mc = M.monte_carlo(a)
    tri = M.triangulate(a, base["EV"])
    deal = M.deal_terms(a, tri["pre_money_млн_usd"])
    iv = M.investor_metrics(a, base, deal["доля_инвестора"], int(a["раунд"].get("год_выхода", 7)))
    yy = base["годы"]
    mk = a["макро"]
    fx = mk["FX_USD_RUB"]
    tf = a["тарифы"]
    cz = a["затраты"]

    L = []
    w = L.append

    w("# " + t["title"])
    w("")
    w(t["note_tr"])
    w("")
    w(t["author"])
    w("")
    w(t["edition"] % (a["версия"], dt(a["дата_модели"]), a["горизонт_лет"], yy[0], yy[-1],
                      dt(a["дата_оценки"])))
    w("")
    w(t["note_engine"])
    w("")
    w(t["note_selfcheck"])
    w("")
    w("---")
    w("")

    w("## " + t["changes_h"])
    w("")
    w(t["changes_lead"])
    w("")
    w(head(list(t["changes_cols"]), ["---", "---"]))
    ch = t["changes"]
    w(row([ch[0][0], ch[0][1]]))
    w(row([ch[1][0], ch[1][1]]))
    w(row([ch[2][0], ch[2][1]]))
    w(row([ch[3][0], ch[3][1]]))
    w(row([ch[4][0], ch[4][1]]))
    w(row([ch[5][0], ch[5][1] % (yy[0], yy[-1], yy[1])]))
    w(row([ch[6][0], ch[6][1] % pct(a["терминальная_стоимость"]["темп_роста_g"], 0)]))
    w(row([ch[7][0], ch[7][1]]))
    w(row([ch[8][0], ch[8][1]]))
    w(row([ch[9][0], ch[9][1] % (num(base["окупаемость_простая_лет"]),
                                 num(base["окупаемость_дисконтированная_лет"]))]))
    w("")
    w("---")
    w("")

    # --- лист 1 ---
    w("## " + t["s1"])
    w("")
    w("### " + t["s11"])
    w("")
    w(head(list(t["macro_cols"]), ["---", "---:", "---"]))
    w(row([t["m_key"], pct(mk["ключевая_ставка_ЦБ"], 2), t["m_key_src"] + dt(mk["дата_ключевой_ставки"])]))
    w(row([t["m_ofz"], pct(mk["ОФЗ_10Y"], 2), t["m_ofz_src"] + dt(mk["дата_ОФЗ"])]))
    w(row([t["m_erp"], pct(mk["ERP_РФ"], 2), "Damodaran"]))
    w(row([t["m_beta"], num(mk["beta_financial_services"]), "Damodaran"]))
    w(row([t["m_stage"], pct(mk["премия_за_стадию"], 2), "IPEV Guidelines"]))
    w(row([t["m_liq"], pct(mk["премия_за_неликвидность"], 2), "IPEV Guidelines"]))
    w(row([t["m_wacc"], "**" + pct(base["WACC"], 2) + "**", t["m_wacc_src"]]))
    w(row([t["m_infl"], pct(mk["инфляция_таргет"], 0), t["m_infl_src"]]))
    w(row([t["m_fx"], n(fx, 2), t["m_fx_src"] + dt(mk["дата_FX"])]))
    w("")
    w(t["macro_note"] % dt(mk["дата_ключевой_ставки"]))
    w("")

    w("### " + t["s12"])
    w("")
    w(t["market_lead"] % (n(a["рынок"]["залоговая_ёмкость_2025_млрд"]),
                          pct(a["рынок"]["индексация_ёмкости"], 0)))
    w("")
    w(t["stack_lead"] % a["рынок"]["срок_жизни_выпуска_лет"])
    w("")
    hdr = head([t["macro_cols"][0]] + [str(y) for y in yy], ["---"] + ["---:"] * len(yy))
    w(hdr)
    w(row([t["r_cap"]] + [n(x) for x in base["ёмкость_рынка_млрд"]]))
    w(row([t["r_share"]] + [num(x * 100) for x in base["доля_рынка"]]))
    w(row([t["r_issue"]] + [n(x) for x in base["объём_выпуска_млн"]]))
    w(row([t["r_stack"]] + [n(x) for x in base["стек_млн"]]))
    w("")
    w(t["market_note"])
    w("")

    w("### " + t["s13"])
    w("")
    w(head(list(t["tar_cols"]), ["---", "---:", "---"]))
    w(row([t["t_issue"], pct(tf["комиссия_за_выпуск"], 2), t["t_issue_b"]]))
    w(row([t["t_serv"], pct(tf["сервисная_комиссия_от_стека"], 2), t["t_serv_b"]]))
    w(row([t["t_platf"], pct(tf["платформенный_сбор"], 2), t["t_platf_b"]]))
    w(row([t["t_lic"], t["t_lic_v"] + pct(tf["лицензии_B2B2G_по_годам"][-1], 2), t["t_lic_b"]]))
    w(row([t["t_int"], t["t_int_v"] % (n(tf["тех_интеграции_млн_по_годам"][1]),
                                       n(tf["тех_интеграции_млн_по_годам"][-1])), t["t_int_b"]]))
    w(row([t["t_app_g"], pct(tf["оценка_страхование_валовый_тариф"], 2), t["t_app_b"]]))
    w(row([t["t_app_c"], pct(tf["оценка_страхование_доля_встречных_издержек"], 0), t["t_app_c_b"]]))
    w(row([t["t_app_n"], "**" + pct(tf["оценка_страхование_валовый_тариф"]
                                    * (1 - tf["оценка_страхование_доля_встречных_издержек"]), 2) + "**",
           t["t_app_n_b"]]))
    w("")

    w("### " + t["s14"])
    w("")
    w(t["cost_lead1"] % (pct(cz["страховые_взносы"], 0), n(cz["зарплата_gross_тыс_мес_год1"]),
                         pct(cz["индексация_зарплат"], 0)))
    w("")
    w(t["cost_lead2"] % (n(cz["прочий_opex_база_млн_год1"]), pct(cz["индексация_прочего_opex"], 0),
                         pct(cz["прочий_opex_доля_выручки"], 0)))
    w("")
    w(hdr)
    w(row([t["c_fte"]] + [n(x) for x in cz["штат_чел_по_годам"]]))
    w(row([t["c_sal"]] + [num(cz["зарплата_gross_тыс_мес_год1"] * (1 + cz["индексация_зарплат"]) ** i, 1)
                          for i in range(len(yy))]))
    w(row([t["c_payroll"]] + [n(x) for x in base["ФОТ"]]))
    w(row([t["c_other"]] + [n(x) for x in base["прочий_opex"]]))
    w(row([t["c_capex"]] + [n(x) for x in base["CapEx"]]))
    w(row([t["c_amort"]] + [n(x) for x in base["амортизация"]]))
    w("")
    w(t["capex_total"] % (n(base["CapEx_всего_млн"]), cz["срок_амортизации_лет"]))
    w("")

    w("### " + t["s15"])
    w("")
    w(head(list(t["tax_cols"]), ["---", "---:", "---"]))
    w(row([t["x_tax"], pct(a["налоги"]["налог_на_прибыль"], 0), t["x_tax_src"]]))
    w(row([t["x_nol"], pct(a["налоги"]["предел_переноса_убытков"], 0), t["x_nol_src"]]))
    w(row([t["x_soc"], pct(cz["страховые_взносы"], 0), t["x_soc_src"]]))
    w(row([t["x_wc"], pct(a["оборотный_капитал"]["доля_выручки"], 0), t["x_wc_src"]]))
    w("")
    w(t["tax_note1"])
    w("")
    w(t["tax_note2"])
    w("")
    w("---")
    w("")

    # --- лист 2 ---
    w("## " + t["s2"])
    w("")
    w(t["rev_lead"])
    w("")
    names = {"Комиссия за выпуск": t["t_issue"], "Сервисная комиссия": t["t_serv"],
             "Платформенный сбор": t["t_platf"], "Лицензии B2B2G": t["t_lic"],
             "Технологические интеграции": t["t_int"],
             "Оценка и страхование (нетто)": t["t_app_n"].strip("*")}
    w(head([t["rev_line_col"]] + [str(y) for y in yy], ["---"] + ["---:"] * len(yy)))
    for k, v in base["выручка_строки"].items():
        w(row([names.get(k, k)] + [n(x) for x in v]))
    w(row([t["rev_total"]] + [n(x) for x in base["выручка"]]))
    w("")
    w(head([t["memo_col"]] + [str(y) for y in yy], ["---"] + ["---:"] * len(yy)))
    w(row([t["gross_line"]] + [n(x) for x in base["валовые_сборы"]]))
    w("")
    w(t["gross_note"])
    w("")
    w("---")
    w("")

    # --- лист 3 ---
    w("## " + t["s3"])
    w("")
    w(hdr)
    w(row([t["p_rev"]] + [n(x) for x in base["выручка"]]))
    w(row([t["p_payroll"]] + [n(-x) for x in base["ФОТ"]]))
    w(row([t["p_other"]] + [n(-x) for x in base["прочий_opex"]]))
    w(row([t["p_opex"]] + [n(-x) for x in base["opex_всего"]]))
    w(row([t["p_ebitda"]] + [n(x) for x in base["EBITDA"]]))
    w(row([t["p_margin"]] + [num(x * 100, 1) if x is not None else "—" for x in base["EBITDA_маржа"]]))
    w(row([t["p_amort"]] + [n(-x) for x in base["амортизация"]]))
    w(row([t["p_ebit"]] + [n(x) for x in base["EBIT"]]))
    w(row([t["p_tax"]] + [n(-x) for x in base["налог"]]))
    w(row([t["p_net"]] + [n(x) for x in base["чистая_прибыль"]]))
    w("")
    w(t["margin_note"] % pct(base["EBITDA_маржа"][-1], 1))
    w("")
    w("---")
    w("")

    # --- лист 4 ---
    w("## " + t["s4"])
    w("")
    w(hdr)
    w(row([t["f_ebitda"]] + [n(x) for x in base["EBITDA"]]))
    w(row([t["f_tax"]] + [n(-x) for x in base["налог"]]))
    w(row([t["f_wc"]] + [n(-x) for x in base["прирост_оборотного_капитала"]]))
    w(row([t["f_capex"]] + [n(-x) for x in base["CapEx"]]))
    w(row([t["f_fcf"]] + [n(x) for x in base["FCF"]]))
    w(row([t["f_cum"]] + [n(x) for x in base["FCF_кумулятивный"]]))
    w(row([t["f_df"]] + [num(x, 4) for x in base["дисконт_факторы"]]))
    w(row([t["f_pv"]] + [n(x) for x in base["PV_FCF"]]))
    w("")
    w(t["peak_lead"] % (n(base["пиковая_потребность_млн"]), n(a["раунд"]["стартовый_раунд_млн_руб"]),
                        pct(a["раунд"]["стартовый_раунд_млн_руб"] / base["пиковая_потребность_млн"], 0)))
    w("")
    w("---")
    w("")

    # --- лист 5 ---
    w("## " + t["s5"])
    w("")
    w(head([t["macro_cols"][0], t["macro_cols"][1]], ["---", "---:"]))
    w(row([t["v_pv"] % len(yy), n(base["PV_FCF_сумма"])]))
    w(row([t["v_norm"], n(base["FCF_нормализованный"])]))
    w(row([t["v_tv"], n(base["TV"])]))
    w(row([t["v_pvtv"], n(base["PV_TV"])]))
    w(row([t["v_share"], pct(base["доля_TV_в_EV"], 0)]))
    w(row([t["v_ev"], "**" + n(base["EV"]) + "**"]))
    w(row([t["v_usd"] % n(fx, 2), "≈ " + n(base["EV"] / fx)]))
    w(row([t["v_irr"], pct(base["IRR_проекта"], 1)]))
    w(row([t["v_pb"], num(base["окупаемость_простая_лет"]) + t["v_years"]]))
    w(row([t["v_pbd"], num(base["окупаемость_дисконтированная_лет"]) + t["v_years"]]))
    w("")
    w(t["irr_note"] % (pct(base["IRR_проекта"], 0), n(base["пиковая_потребность_млн"])))
    w("")
    w("---")
    w("")

    # --- лист 6 ---
    w("## " + t["s6"])
    w("")
    w(head(list(t["sc_cols"]), ["---", "---:", "---:", "---:", "---:", "---:"]))
    for name in ["Консервативный", "Базовый", "Оптимистичный"]:
        d = scen[name]
        m = d["модель"]
        w(row([t["sc_names"][name], pct(d["доля"], 0), pct(d["вес"], 0), n(m["выручка"][-1]),
               num(m["EV"] / 1000, 1), num(m["окупаемость_простая_лет"])]))
    w(row([t["sc_expected"], "—", "100%", "—", "**" + num(exp_ev / 1000, 1) + "**", "—"]))
    w("")
    w(t["sc_note"])
    w("")
    w("---")
    w("")

    # --- лист 7 ---
    w("## " + t["s7"])
    w("")
    w("### " + t["s71"])
    w("")
    w(t["s71_lead"])
    w("")
    w(head([t["s71_col"]] + [pct(s, 1) for s in sl], ["---"] + ["---:"] * len(sl)))
    for i, ww in enumerate(wl):
        mark = "**" if abs(ww - base["WACC"]) < 1e-9 else ""
        w(row([mark + pct(ww, 2) + mark] + [n(x) for x in grid[i]]))
    w("")
    w("### " + t["s72"])
    w("")
    w(head([t["s72_col"]] + [pct(u, 0) for u in ul], ["---"] + ["---:"] * len(ul)))
    w(row([t["s72_row"]] + [n(x) for x in opx]))
    w("")
    w(t["s72_note"] % pct(abs(opx[-1] - opx[1]) / opx[1], 0))
    w("")
    w("### " + t["s73"])
    w("")
    w(head(list(t["s73_cols"]), ["---", "---:", "---:", "---:", "---:"]))
    for i, d in enumerate(delays):
        m = dmods[i]
        fy = ""
        for j, v in enumerate(m["объём_выпуска_млн"]):
            if v > 0:
                fy = m["годы"][j]
                break
        w(row([t["s73_none"] if d == 0 else t["s73_year"] % d, fy, n(m["выручка"][-1]),
               num(m["EV"] / 1000, 1), n(m["пиковая_потребность_млн"])]))
    w("")
    w(t["s73_note"] % (n(dmods[1]["пиковая_потребность_млн"]), n(dmods[2]["пиковая_потребность_млн"])))
    w("")
    w("### " + t["s74"])
    w("")
    w(t["s74_lead"] % (mc["итераций"], mc["зерно"]))
    w("")
    w(head(list(t["s74_cols"]), ["---"] + ["---:"] * 7))
    w(row([t["s74_row"]] + [num(mc[k] / 1000, 1) for k in
                            ["P5", "P10", "P25", "медиана", "P75", "P90", "P95"]]))
    w("")
    w(t["s74_prob"] % (pct(mc["доля_выше_50млрд"], 1), pct(mc["доля_ниже_нуля"], 1)))
    w("")
    w(t["s74_note"] % (num(mc["медиана"] / 1000, 1), num(base["EV"] / 1000, 1)))
    w("")
    w("---")
    w("")

    # --- лист 8 ---
    w("## " + t["s8"])
    w("")
    w(head([t["macro_cols"][0], t["macro_cols"][1]], ["---", "---:"]))
    w(row([t["i_inv"], n(iv["инвестиция_млн"])]))
    w(row([t["i_share"], pct(iv["доля"], 2)]))
    w(row([t["i_hor"], t["i_hor_v"] % (iv["срок_лет"], iv["год_выхода"])]))
    w(row([t["i_ev"], n(iv["стоимость_бизнеса_на_выходе_млн"])]))
    w(row([t["i_cash"], n(iv["денежные_средства_на_выходе_млн"])]))
    w(row([t["i_eq"], n(iv["стоимость_капитала_на_выходе_млн"])]))
    w(row([t["i_proceeds"], n(iv["поступления_инвестора_млн"])]))
    w(row([t["i_mult"], "**" + num(iv["кратность"], 1) + "×**"]))
    w(row([t["i_irr"], "**" + pct(iv["IRR_инвестора"], 1) + "**"]))
    w("")
    w(t["i_note"])
    w("")
    w("---")
    w("")

    # --- лист 9 ---
    w("## " + t["s9"])
    w("")
    w(t["s9_lead"] % pct(tri["stage_discount"], 0))
    w("")
    w(head(list(t["s9_cols"]), ["---", "---:", ":---:", "---:", "---:", "---:"]))
    for r in tri["строки"]:
        w(row([t["s9_methods"].get(r["метод"], r["метод"]), n(r["до_дисконта_млн_usd"]),
               t["s9_yes"] if r["дисконт"] else t["s9_no"], n(r["после_дисконта_млн_usd"]),
               pct(r["вес"], 0), num(r["вклад_млн_usd"], 1)]))
    w(row([t["s9_total"], "", "", "", "", "**" + n(tri["pre_money_млн_usd"]) + "**"]))
    w("")
    w(t["s9_sum"] % (n(tri["pre_money_млн_usd"]), num(tri["pre_money_млрд_руб"]), n(fx, 2)))
    w("")
    w(t["s9_spread"])
    w("")
    w("### " + t["s9_deal_h"])
    w("")
    w(head([t["macro_cols"][0], t["macro_cols"][1]], ["---", "---:"]))
    w(row([t["d_pre"], "$" + n(deal["pre_money_млн_usd"]) + " · " + num(deal["pre_money_млрд_руб"])]))
    w(row([t["d_round"], "$" + n(deal["раунд_млн_usd"]) + " · " + n(deal["раунд_млн_руб"])]))
    w(row([t["d_post"], "$" + n(deal["post_money_млн_usd"]) + " · " + num(deal["post_money_млрд_руб"])]))
    w(row([t["d_stake"], pct(deal["доля_инвестора"], 2)]))
    w("")
    gap = base["пиковая_потребность_млн"] - deal["раунд_млн_руб"]
    if gap > 0:
        w(t["d_gap"] % (n(base["пиковая_потребность_млн"]), n(deal["раунд_млн_руб"]), n(gap)))
    else:
        peak_year = yy[base["FCF_кумулятивный"].index(min(base["FCF_кумулятивный"]))]
        w(t["d_cover"] % (n(base["пиковая_потребность_млн"]), peak_year, n(deal["раунд_млн_руб"]),
                          n(-gap), n(dmods[1]["пиковая_потребность_млн"])))
    w("")
    w(t["s9_double"])
    w("")
    w("---")
    w("")

    w("## " + t["lim_h"])
    w("")
    for i, x in enumerate(t["lims"], 1):
        w("%d. %s" % (i, x))
    w("")
    w("---")
    w("")
    w(t["footer"] % (a["версия"], dt(a["дата_модели"])))
    w("")

    dst = os.path.join(BASE, lang, REL)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    io.open(dst, "w", encoding="utf-8").write("\n".join(L))
    return dst


def main():
    langs = sys.argv[1:] or ["en", "fr", "ar"]
    out = io.open(1, "w", encoding="utf-8", closefd=False)
    for lang in langs:
        d = build(lang)
        out.write("собрано %s: %s\n" % (lang, os.path.relpath(d, os.path.dirname(BASE))))
    out.flush()


if __name__ == "__main__":
    main()
