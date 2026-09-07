# -*- coding: utf-8 -*-
"""
Расчётный движок финансовой модели ЦП РСФСР.

Единственный источник числовых значений проекта. Все документы (финмодель,
бизнес-план, отчёт об оценке, презентации, виджет сайта) должны брать цифры
из выгрузки этого движка, а не хранить их у себя.

Запуск:  python model.py
Выход:   Выгрузка/*.csv, Выгрузка/показатели.json, Выгрузка/сводка.txt
"""

import io
import json
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "Выгрузка")


# --------------------------------------------------------------------------
# служебное
# --------------------------------------------------------------------------

def load(path=None):
    p = path or os.path.join(ROOT, "assumptions.json")
    with io.open(p, encoding="utf-8") as f:
        return json.load(f)


def irr(flows, lo=-0.99, hi=10.0, eps=1e-9):
    """IRR методом деления отрезка. flows[0] относится к периоду 1."""
    def npv(r):
        return sum(cf / (1.0 + r) ** (i + 1) for i, cf in enumerate(flows))
    if npv(lo) * npv(hi) > 0:
        return None
    for _ in range(400):
        mid = (lo + hi) / 2.0
        v = npv(mid)
        if abs(v) < eps:
            return mid
        if npv(lo) * v < 0:
            hi = mid
        else:
            lo = mid
    return (lo + hi) / 2.0


def payback(cum):
    """Срок окупаемости в годах от начала первого года по ряду кумулятивных потоков."""
    prev = 0.0
    for i, c in enumerate(cum):
        if c >= 0:
            need = -prev
            step = c - prev
            frac = (need / step) if step else 0.0
            return i + frac
        prev = c
    return None


# --------------------------------------------------------------------------
# расчёт
# --------------------------------------------------------------------------

def wacc(a):
    m = a["макро"]
    return (m["ОФЗ_10Y"] + m["beta_financial_services"] * m["ERP_РФ"]
            + m["премия_за_стадию"] + m["премия_за_неликвидность"])


def build(a, share_year10=None, opex_uplift=0.0, wacc_override=None, delay=0):
    n = a["горизонт_лет"]
    y0 = a["первый_год"]
    years = [y0 + i for i in range(n)]

    rn = a["рынок"]
    tf = a["тарифы"]
    cz = a["затраты"]
    nl = a["налоги"]

    # --- рынок ---------------------------------------------------------
    base_cap = rn["залоговая_ёмкость_2025_млрд"]
    g_cap = rn["индексация_ёмкости"]
    capacity = [base_cap * (1 + g_cap) ** (y - 2025) for y in years]

    shares = list(rn["доля_рынка_по_годам"])
    if share_year10 is not None and shares[-1]:
        k = share_year10 / shares[-1]
        shares = [s * k for s in shares]
    if delay:
        shares = [0.0] * delay + shares[:n - delay]

    # объём выпуска, млрд ₽ -> переводим в млн ₽
    issue = [capacity[i] * shares[i] * 1000.0 for i in range(n)]

    life = rn["срок_жизни_выпуска_лет"]
    stack = []
    for i in range(n):
        lo = max(0, i - life + 1)
        stack.append(sum(issue[lo:i + 1]))

    # --- выручка (млн ₽) -----------------------------------------------
    r_issue = [v * tf["комиссия_за_выпуск"] for v in issue]
    r_serv = [v * tf["сервисная_комиссия_от_стека"] for v in stack]
    r_platf = [v * tf["платформенный_сбор"] for v in issue]
    r_lic = [issue[i] * tf["лицензии_B2B2G_по_годам"][i] for i in range(n)]
    r_integ = [float(x) for x in tf["тех_интеграции_млн_по_годам"]]
    net_rate = tf["оценка_страхование_валовый_тариф"] * (
        1.0 - tf["оценка_страхование_доля_встречных_издержек"])
    r_apprais = [v * net_rate for v in issue]

    lines = [r_issue, r_serv, r_platf, r_lic, r_integ, r_apprais]
    revenue = [sum(line[i] for line in lines) for i in range(n)]

    # валовые сборы (для раскрытия): выручка + встречные издержки оценки/страхования
    gross_billings = [revenue[i] + issue[i] * tf["оценка_страхование_валовый_тариф"]
                      * tf["оценка_страхование_доля_встречных_издержек"] for i in range(n)]

    # --- затраты (млн ₽) -----------------------------------------------
    fte = cz["штат_чел_по_годам"]
    sal = [cz["зарплата_gross_тыс_мес_год1"] * (1 + cz["индексация_зарплат"]) ** i
           for i in range(n)]
    fot = [fte[i] * sal[i] * 12.0 / 1000.0 * (1 + cz["страховые_взносы"]) for i in range(n)]

    opex_other = [cz["прочий_opex_база_млн_год1"] * (1 + cz["индексация_прочего_opex"]) ** i
                  + cz["прочий_opex_доля_выручки"] * revenue[i] for i in range(n)]
    opex_total = [(fot[i] + opex_other[i]) * (1 + opex_uplift) for i in range(n)]

    ebitda = [revenue[i] - opex_total[i] for i in range(n)]

    # --- амортизация ----------------------------------------------------
    capex = [float(x) for x in cz["capex_млн_по_годам"]]
    life_a = cz["срок_амортизации_лет"]
    amort = []
    for i in range(n):
        amort.append(sum(capex[j] / life_a for j in range(max(0, i - life_a + 1), i + 1)))

    ebit = [ebitda[i] - amort[i] for i in range(n)]

    # --- налог с переносом убытков --------------------------------------
    rate = nl["налог_на_прибыль"]
    cap = nl["предел_переноса_убытков"]
    nol = 0.0
    tax = []
    for i in range(n):
        base = ebit[i]
        if base <= 0:
            nol += -base
            tax.append(0.0)
        else:
            used = min(nol, base * cap)
            nol -= used
            tax.append((base - used) * rate)

    net_profit = [ebit[i] - tax[i] for i in range(n)]

    # --- оборотный капитал и FCF ----------------------------------------
    wc_share = a["оборотный_капитал"]["доля_выручки"]
    wc = [revenue[i] * wc_share for i in range(n)]
    d_wc = [wc[0]] + [wc[i] - wc[i - 1] for i in range(1, n)]

    fcf = [ebitda[i] - tax[i] - d_wc[i] - capex[i] for i in range(n)]
    cum = []
    s = 0.0
    for v in fcf:
        s += v
        cum.append(s)

    # --- дисконтирование -------------------------------------------------
    w = wacc_override if wacc_override is not None else wacc(a)
    df = [1.0 / (1.0 + w) ** (i + 1) for i in range(n)]
    pv_fcf = [fcf[i] * df[i] for i in range(n)]
    sum_pv = sum(pv_fcf)

    # --- терминальная стоимость ------------------------------------------
    g = a["терминальная_стоимость"]["темп_роста_g"]
    # нормализация: в стационарном состоянии CapEx = амортизация,
    # прирост оборотного капитала = g x оборотный капитал
    ebitda_n = ebitda[-1]
    amort_n = amort[-1]
    ebit_n = ebitda_n - amort_n
    tax_n = max(0.0, ebit_n) * rate
    d_wc_n = wc[-1] * g
    fcf_norm = ebitda_n - tax_n - d_wc_n - amort_n
    tv = fcf_norm * (1 + g) / (w - g)
    pv_tv = tv * df[-1]

    ev = sum_pv + pv_tv

    # --- показатели -------------------------------------------------------
    flows_irr = list(fcf)
    flows_irr[-1] = flows_irr[-1] + tv
    project_irr = irr(flows_irr)

    pb_simple = payback(cum)
    cum_disc = []
    s = 0.0
    for v in pv_fcf:
        s += v
        cum_disc.append(s)
    pb_disc = payback(cum_disc)

    peak_need = -min(cum) if min(cum) < 0 else 0.0

    return {
        "годы": years,
        "ёмкость_рынка_млрд": capacity,
        "доля_рынка": shares,
        "объём_выпуска_млн": issue,
        "стек_млн": stack,
        "выручка_строки": {
            "Комиссия за выпуск": r_issue,
            "Сервисная комиссия": r_serv,
            "Платформенный сбор": r_platf,
            "Лицензии B2B2G": r_lic,
            "Технологические интеграции": r_integ,
            "Оценка и страхование (нетто)": r_apprais,
        },
        "выручка": revenue,
        "валовые_сборы": gross_billings,
        "ФОТ": fot,
        "прочий_opex": opex_other,
        "opex_всего": opex_total,
        "EBITDA": ebitda,
        "EBITDA_маржа": [ebitda[i] / revenue[i] if revenue[i] else None for i in range(n)],
        "амортизация": amort,
        "EBIT": ebit,
        "налог": tax,
        "чистая_прибыль": net_profit,
        "оборотный_капитал": wc,
        "прирост_оборотного_капитала": d_wc,
        "CapEx": capex,
        "FCF": fcf,
        "FCF_кумулятивный": cum,
        "WACC": w,
        "дисконт_факторы": df,
        "PV_FCF": pv_fcf,
        "PV_FCF_сумма": sum_pv,
        "FCF_нормализованный": fcf_norm,
        "TV": tv,
        "PV_TV": pv_tv,
        "доля_TV_в_EV": pv_tv / ev if ev else None,
        "EV": ev,
        "IRR_проекта": project_irr,
        "окупаемость_простая_лет": pb_simple,
        "окупаемость_дисконтированная_лет": pb_disc,
        "пиковая_потребность_млн": peak_need,
        "CapEx_всего_млн": sum(capex),
    }


# --------------------------------------------------------------------------
# самопроверка
# --------------------------------------------------------------------------

def selfcheck(m):
    errs = []
    n = len(m["годы"])
    for i in range(n):
        s = sum(line[i] for line in m["выручка_строки"].values())
        if abs(s - m["выручка"][i]) > 1e-6:
            errs.append("выручка %d: итог != сумме строк" % m["годы"][i])
        if abs((m["ФОТ"][i] + m["прочий_opex"][i]) - m["opex_всего"][i]) > 1e-6:
            errs.append("OpEx %d: итог != ФОТ + прочий" % m["годы"][i])
        if abs((m["выручка"][i] - m["opex_всего"][i]) - m["EBITDA"][i]) > 1e-6:
            errs.append("EBITDA %d" % m["годы"][i])
        if abs((m["EBITDA"][i] - m["амортизация"][i]) - m["EBIT"][i]) > 1e-6:
            errs.append("EBIT %d" % m["годы"][i])
        f = m["EBITDA"][i] - m["налог"][i] - m["прирост_оборотного_капитала"][i] - m["CapEx"][i]
        if abs(f - m["FCF"][i]) > 1e-6:
            errs.append("FCF %d" % m["годы"][i])
    if abs(sum(m["PV_FCF"]) - m["PV_FCF_сумма"]) > 1e-6:
        errs.append("сумма PV FCF")
    if abs((m["PV_FCF_сумма"] + m["PV_TV"]) - m["EV"]) > 1e-6:
        errs.append("EV != PV FCF + PV TV")
    return errs


# --------------------------------------------------------------------------
# выгрузка
# --------------------------------------------------------------------------

def w(f, row):
    f.write(";".join(str(x) for x in row) + "\n")


def fmt(x, d=1):
    if x is None:
        return ""
    return ("%.*f" % (d, x)).replace(".", ",")


def export(a, base, scen, sens_wacc, sens_opex, sens_delay=None, tri=None):
    os.makedirs(OUT, exist_ok=True)
    yy = base["годы"]

    with io.open(os.path.join(OUT, "01_допущения.csv"), "w", encoding="utf-8") as f:
        w(f, ["Параметр", "Значение", "Единица"])
        m = a["макро"]
        w(f, ["Ключевая ставка Банка России", fmt(m["ключевая_ставка_ЦБ"] * 100, 2), "%"])
        w(f, ["ОФЗ 10Y", fmt(m["ОФЗ_10Y"] * 100, 2), "%"])
        w(f, ["ERP РФ", fmt(m["ERP_РФ"] * 100, 2), "%"])
        w(f, ["Бета (финансовые услуги)", fmt(m["beta_financial_services"], 2), ""])
        w(f, ["Премия за стадию", fmt(m["премия_за_стадию"] * 100, 2), "%"])
        w(f, ["Премия за неликвидность", fmt(m["премия_за_неликвидность"] * 100, 2), "%"])
        w(f, ["WACC", fmt(base["WACC"] * 100, 2), "%"])
        w(f, ["Налог на прибыль", fmt(a["налоги"]["налог_на_прибыль"] * 100, 0), "%"])
        w(f, ["Темп роста в терминальном периоде", fmt(a["терминальная_стоимость"]["темп_роста_g"] * 100, 1), "%"])
        w(f, ["Курс USD/RUB", fmt(m["FX_USD_RUB"], 2), "₽"])

    with io.open(os.path.join(OUT, "02_рынок_и_объёмы.csv"), "w", encoding="utf-8") as f:
        w(f, ["Показатель"] + yy)
        w(f, ["Залоговая ёмкость, млрд ₽"] + [fmt(x, 0) for x in base["ёмкость_рынка_млрд"]])
        w(f, ["Доля платформы, %"] + [fmt(x * 100, 2) for x in base["доля_рынка"]])
        w(f, ["Объём выпуска ЦФА, млн ₽"] + [fmt(x, 0) for x in base["объём_выпуска_млн"]])
        w(f, ["Обращаемый стек, млн ₽"] + [fmt(x, 0) for x in base["стек_млн"]])

    with io.open(os.path.join(OUT, "03_выручка.csv"), "w", encoding="utf-8") as f:
        w(f, ["Строка выручки, млн ₽"] + yy)
        for k, v in base["выручка_строки"].items():
            w(f, [k] + [fmt(x, 0) for x in v])
        w(f, ["ИТОГО выручка"] + [fmt(x, 0) for x in base["выручка"]])
        w(f, ["Справочно: валовые сборы"] + [fmt(x, 0) for x in base["валовые_сборы"]])

    with io.open(os.path.join(OUT, "04_pnl.csv"), "w", encoding="utf-8") as f:
        w(f, ["Показатель, млн ₽"] + yy)
        w(f, ["Выручка"] + [fmt(x, 0) for x in base["выручка"]])
        w(f, ["ФОТ со взносами"] + [fmt(-x, 0) for x in base["ФОТ"]])
        w(f, ["Прочий OpEx"] + [fmt(-x, 0) for x in base["прочий_opex"]])
        w(f, ["OpEx всего"] + [fmt(-x, 0) for x in base["opex_всего"]])
        w(f, ["EBITDA"] + [fmt(x, 0) for x in base["EBITDA"]])
        w(f, ["EBITDA-маржа, %"] + [fmt(x * 100, 1) if x is not None else "" for x in base["EBITDA_маржа"]])
        w(f, ["Амортизация"] + [fmt(-x, 0) for x in base["амортизация"]])
        w(f, ["EBIT"] + [fmt(x, 0) for x in base["EBIT"]])
        w(f, ["Налог на прибыль"] + [fmt(-x, 0) for x in base["налог"]])
        w(f, ["Чистая прибыль"] + [fmt(x, 0) for x in base["чистая_прибыль"]])

    with io.open(os.path.join(OUT, "05_денежный_поток.csv"), "w", encoding="utf-8") as f:
        w(f, ["Показатель, млн ₽"] + yy)
        w(f, ["EBITDA"] + [fmt(x, 0) for x in base["EBITDA"]])
        w(f, ["Налог"] + [fmt(-x, 0) for x in base["налог"]])
        w(f, ["Прирост оборотного капитала"] + [fmt(-x, 0) for x in base["прирост_оборотного_капитала"]])
        w(f, ["CapEx"] + [fmt(-x, 0) for x in base["CapEx"]])
        w(f, ["FCF"] + [fmt(x, 0) for x in base["FCF"]])
        w(f, ["FCF кумулятивный"] + [fmt(x, 0) for x in base["FCF_кумулятивный"]])
        w(f, ["Дисконт-фактор"] + [fmt(x, 4) for x in base["дисконт_факторы"]])
        w(f, ["PV FCF"] + [fmt(x, 0) for x in base["PV_FCF"]])

    with io.open(os.path.join(OUT, "06_сценарии.csv"), "w", encoding="utf-8") as f:
        w(f, ["Сценарий", "Доля рынка год 10, %", "Вес, %", "Выручка год 10, млн ₽",
              "EV, млн ₽", "IRR проекта, %", "Окупаемость, лет"])
        for name, d in scen.items():
            mm = d["модель"]
            w(f, [name, fmt(d["доля"] * 100, 0), fmt(d["вес"] * 100, 0),
                  fmt(mm["выручка"][-1], 0), fmt(mm["EV"], 0),
                  fmt(mm["IRR_проекта"] * 100, 1) if mm["IRR_проекта"] else "",
                  fmt(mm["окупаемость_простая_лет"], 2)])

    with io.open(os.path.join(OUT, "07_чувствительность_WACC_доля.csv"), "w", encoding="utf-8") as f:
        w(f, ["EV, млн ₽ · WACC \\ доля рынка год 10"] + [fmt(s * 100, 1) + "%" for s in sens_wacc["доли"]])
        for i, ww in enumerate(sens_wacc["wacc"]):
            w(f, [fmt(ww * 100, 1) + "%"] + [fmt(x, 0) for x in sens_wacc["сетка"][i]])

    with io.open(os.path.join(OUT, "08_чувствительность_OpEx.csv"), "w", encoding="utf-8") as f:
        w(f, ["EV, млн ₽ · уплифт OpEx"] + [fmt(x * 100, 0) + "%" for x in sens_opex["уплифт"]])
        w(f, ["EV"] + [fmt(x, 0) for x in sens_opex["EV"]])

    if sens_delay:
        with io.open(os.path.join(OUT, "09_задержка_запуска.csv"), "w", encoding="utf-8") as f:
            w(f, ["Задержка первого выпуска, лет", "Первый год с выпуском",
                  "Выручка год 10, млн ₽", "EV, млн ₽", "Пиковая потребность, млн ₽"])
            for i, d in enumerate(sens_delay["лет"]):
                mm = sens_delay["модели"][i]
                fy = ""
                for j, v in enumerate(mm["объём_выпуска_млн"]):
                    if v > 0:
                        fy = mm["годы"][j]
                        break
                w(f, [d, fy, fmt(mm["выручка"][-1], 0), fmt(mm["EV"], 0),
                      fmt(mm["пиковая_потребность_млн"], 0)])

    if tri:
        with io.open(os.path.join(OUT, "10_оценка_pre_money.csv"), "w", encoding="utf-8") as f:
            w(f, ["Метод", "До дисконта, $ млн", "Дисконт за стадию применён",
                  "После дисконта, $ млн", "Вес", "Вклад, $ млн"])
            for r in tri["строки"]:
                w(f, [r["метод"], fmt(r["до_дисконта_млн_usd"], 0),
                      "да" if r["дисконт"] else "нет",
                      fmt(r["после_дисконта_млн_usd"], 0),
                      fmt(r["вес"] * 100, 0) + "%", fmt(r["вклад_млн_usd"], 1)])
            w(f, ["ИТОГО pre-money", "", "", "", "", fmt(tri["pre_money_млн_usd"], 0)])
            w(f, ["ИТОГО pre-money, млрд ₽", "", "", "", "", fmt(tri["pre_money_млрд_руб"], 2)])

    if base.get("инвестор"):
        iv = base["инвестор"]
        with io.open(os.path.join(OUT, "11_инвестор.csv"), "w", encoding="utf-8") as f:
            w(f, ["Показатель", "Значение"])
            w(f, ["Инвестиция, млн ₽", fmt(iv["инвестиция_млн"], 0)])
            w(f, ["Доля инвестора", fmt(iv["доля"] * 100, 2) + "%"])
            w(f, ["Год выхода", iv["год_выхода"]])
            w(f, ["Срок владения, лет", iv["срок_лет"]])
            w(f, ["Стоимость бизнеса на выходе, млн ₽", fmt(iv["стоимость_бизнеса_на_выходе_млн"], 0)])
            w(f, ["Денежные средства на выходе, млн ₽", fmt(iv["денежные_средства_на_выходе_млн"], 0)])
            w(f, ["Стоимость капитала на выходе, млн ₽", fmt(iv["стоимость_капитала_на_выходе_млн"], 0)])
            w(f, ["Поступления инвестора, млн ₽", fmt(iv["поступления_инвестора_млн"], 0)])
            w(f, ["Кратность возврата", fmt(iv["кратность"], 1) + "x"])
            w(f, ["IRR инвестора", fmt(iv["IRR_инвестора"] * 100, 1) + "%"])

    ind = {
        "версия": a["версия"],
        "дата_модели": a["дата_модели"],
        "дата_оценки": a["дата_оценки"],
        "горизонт": "%d–%d" % (yy[0], yy[-1]),
        "WACC": base["WACC"],
        "налог_на_прибыль": a["налоги"]["налог_на_прибыль"],
        "выручка_год5_млн": base["выручка"][4],
        "выручка_год10_млн": base["выручка"][-1],
        "EBITDA_год10_млн": base["EBITDA"][-1],
        "EBITDA_маржа_год10": base["EBITDA_маржа"][-1],
        "PV_FCF_млн": base["PV_FCF_сумма"],
        "PV_TV_млн": base["PV_TV"],
        "доля_TV_в_EV": base["доля_TV_в_EV"],
        "EV_млн": base["EV"],
        "EV_млрд": base["EV"] / 1000.0,
        "IRR_проекта": base["IRR_проекта"],
        "окупаемость_простая_лет": base["окупаемость_простая_лет"],
        "окупаемость_дисконтированная_лет": base["окупаемость_дисконтированная_лет"],
        "пиковая_потребность_млн": base["пиковая_потребность_млн"],
        "CapEx_всего_млн": base["CapEx_всего_млн"],
        "сценарии": {k: {"доля": v["доля"], "вес": v["вес"],
                         "EV_млрд": v["модель"]["EV"] / 1000.0} for k, v in scen.items()},
        "ожидаемая_EV_млрд": sum(v["вес"] * v["модель"]["EV"] for v in scen.values()) / 1000.0,
        "инвестор": base.get("инвестор"),
        "pre_money_млн_usd": tri["pre_money_млн_usd"] if tri else None,
        "pre_money_млрд_руб": tri["pre_money_млрд_руб"] if tri else None,
        "сделка": base.get("сделка"),
        "монте_карло": base.get("монте_карло"),
    }
    with io.open(os.path.join(OUT, "показатели.json"), "w", encoding="utf-8") as f:
        f.write(json.dumps(ind, ensure_ascii=False, indent=2))
    return ind


def monte_carlo(a, iterations=2000, seed=20260907):
    """Имитационное моделирование. Воспроизводимо: генератор с фиксированным зерном.

    Варьируются: доля рынка года 10 (треугольное 7-25%, мода 18%), ставка
    дисконтирования (равномерно 27-33%), отклонение расходов (равномерно -10..+30%),
    задержка запуска (0/1/2/3 года с весами 40/30/20/10).
    """
    import random
    rnd = random.Random(seed)
    vals = []
    delays = [0, 1, 2, 3]
    weights = [0.40, 0.30, 0.20, 0.10]
    for _ in range(iterations):
        share = rnd.triangular(0.07, 0.25, 0.18)
        w = rnd.uniform(0.27, 0.33)
        u = rnd.uniform(-0.10, 0.30)
        r = rnd.random()
        acc = 0.0
        d = 0
        for i, wt in enumerate(weights):
            acc += wt
            if r <= acc:
                d = delays[i]
                break
        vals.append(build(a, share_year10=share, opex_uplift=u,
                          wacc_override=w, delay=d)["EV"])
    vals.sort()

    def q(p):
        i = int(round(p * (len(vals) - 1)))
        return vals[i]

    return {
        "итераций": iterations,
        "зерно": seed,
        "P5": q(0.05), "P10": q(0.10), "P25": q(0.25), "медиана": q(0.50),
        "P75": q(0.75), "P90": q(0.90), "P95": q(0.95),
        "среднее": sum(vals) / len(vals),
        "доля_выше_50млрд": sum(1 for v in vals if v > 50000.0) / len(vals),
        "доля_ниже_нуля": sum(1 for v in vals if v < 0) / len(vals),
    }


def investor_metrics(a, m, share_inv, exit_year_no=7):
    """Показатели для инвестора: доля выводится из стоимости входа и размера раунда."""
    inv = a.get("раунд", {})
    invest = float(inv.get("стартовый_раунд_млн_руб", 0) or 0)
    n = len(m["годы"])
    k = exit_year_no - 1
    if not (invest > 0 and share_inv > 0 and 0 <= k < n):
        return None
    w = m["WACC"]
    ev_at_exit = sum(m["FCF"][j] / (1.0 + w) ** (j - k) for j in range(k + 1, n))
    ev_at_exit += m["TV"] / (1.0 + w) ** (n - 1 - k)
    cash_at_exit = m["FCF_кумулятивный"][k] + invest
    equity_at_exit = ev_at_exit + cash_at_exit
    proceeds = share_inv * equity_at_exit
    multiple = proceeds / invest
    return {
        "инвестиция_млн": invest,
        "доля": share_inv,
        "год_выхода": m["годы"][k],
        "срок_лет": k + 1,
        "стоимость_бизнеса_на_выходе_млн": ev_at_exit,
        "денежные_средства_на_выходе_млн": cash_at_exit,
        "стоимость_капитала_на_выходе_млн": equity_at_exit,
        "поступления_инвестора_млн": proceeds,
        "кратность": multiple,
        "IRR_инвестора": multiple ** (1.0 / (k + 1)) - 1.0,
    }


def deal_terms(a, pre_money_usd):
    """Структура раунда, выведенная из стоимости входа."""
    inv = a.get("раунд", {})
    round_usd = float(inv.get("стартовый_раунд_млн_usd", 0) or 0)
    fx = a["макро"]["FX_USD_RUB"]
    post = pre_money_usd + round_usd
    return {
        "pre_money_млн_usd": pre_money_usd,
        "pre_money_млрд_руб": pre_money_usd * fx / 1000.0,
        "раунд_млн_usd": round_usd,
        "раунд_млн_руб": float(inv.get("стартовый_раунд_млн_руб", 0) or 0),
        "post_money_млн_usd": post,
        "post_money_млрд_руб": post * fx / 1000.0,
        "доля_инвестора": round_usd / post if post else 0.0,
    }


def triangulate(a, ev_rub_mln):
    """Свёртка методов оценки. Stage discount применяется один раз."""
    cfg = a.get("оценка_pre_money")
    if not cfg:
        return None
    fx = a["макро"]["FX_USD_RUB"]
    sd = cfg["stage_discount"]
    rows = []
    total = 0.0
    for name, d in cfg["методы"].items():
        raw = d["значение_млн_usd"]
        if raw is None:
            raw = ev_rub_mln / fx
        val = raw * (1.0 - sd) if d["применять_stage_discount"] else raw
        rows.append({"метод": name, "до_дисконта_млн_usd": raw,
                     "дисконт": d["применять_stage_discount"],
                     "после_дисконта_млн_usd": val, "вес": d["вес"],
                     "вклад_млн_usd": val * d["вес"]})
        total += val * d["вес"]
    return {"строки": rows, "pre_money_млн_usd": total,
            "pre_money_млрд_руб": total * fx / 1000.0,
            "stage_discount": sd}


def main():
    a = load()
    base = build(a)
    errs = selfcheck(base)

    scen = {}
    for name, d in a["сценарии"].items():
        scen[name] = {"доля": d["доля_год10"], "вес": d["вес"],
                      "модель": build(a, share_year10=d["доля_год10"])}

    wl = [0.265, 0.280, wacc(a), 0.310, 0.330]
    sl = [0.09, 0.135, 0.18, 0.225, 0.27]
    grid = [[build(a, share_year10=s, wacc_override=ww)["EV"] for s in sl] for ww in wl]
    sens_wacc = {"wacc": wl, "доли": sl, "сетка": grid}

    ul = [-0.10, 0.0, 0.10, 0.20, 0.30]
    sens_opex = {"уплифт": ul, "EV": [build(a, opex_uplift=u)["EV"] for u in ul]}

    delays = [0, 1, 2, 3]
    sens_delay = {"лет": delays, "модели": [build(a, delay=d) for d in delays]}

    mc = monte_carlo(a)
    tri = triangulate(a, base["EV"])
    deal = deal_terms(a, tri["pre_money_млн_usd"])
    base["инвестор"] = investor_metrics(a, base, deal["доля_инвестора"],
                                        int(a["раунд"].get("год_выхода", 7)))
    base["сделка"] = deal

    base["монте_карло"] = mc
    ind = export(a, base, scen, sens_wacc, sens_opex, sens_delay, tri)

    out = io.open(os.path.join(OUT, "сводка.txt"), "w", encoding="utf-8")
    def p(s=""):
        out.write(s + "\n")
        sys.stdout.write(s + "\n")

    p("ФИНАНСОВАЯ МОДЕЛЬ ЦП РСФСР — версия %s от %s" % (a["версия"], a["дата_модели"]))
    p("Горизонт %s · дата оценки %s" % (ind["горизонт"], a["дата_оценки"]))
    p("")
    p("Самопроверка сходимости: %s" % ("расхождений нет" if not errs else "; ".join(errs)))
    p("")
    p("WACC ................................. %s%%" % fmt(base["WACC"] * 100, 2))
    p("Налог на прибыль ..................... %s%%" % fmt(a["налоги"]["налог_на_прибыль"] * 100, 0))
    p("Выручка год 5 (%d) ................. %s млрд ₽" % (base["годы"][4], fmt(base["выручка"][4] / 1000, 1)))
    p("Выручка год 10 (%d) ................ %s млрд ₽" % (base["годы"][-1], fmt(base["выручка"][-1] / 1000, 1)))
    p("EBITDA год 10 ........................ %s млрд ₽ (маржа %s%%)"
      % (fmt(base["EBITDA"][-1] / 1000, 1), fmt(base["EBITDA_маржа"][-1] * 100, 1)))
    p("PV FCF ............................... %s млрд ₽" % fmt(base["PV_FCF_сумма"] / 1000, 1))
    p("PV терминальной стоимости ............ %s млрд ₽ (доля в EV %s%%)"
      % (fmt(base["PV_TV"] / 1000, 1), fmt(base["доля_TV_в_EV"] * 100, 0)))
    p("Enterprise Value ..................... %s млрд ₽" % fmt(base["EV"] / 1000, 1))
    p("IRR проекта .......................... %s%%" % fmt(base["IRR_проекта"] * 100, 1))
    p("Окупаемость простая .................. %s года" % fmt(base["окупаемость_простая_лет"], 2))
    p("Окупаемость дисконтированная ......... %s года" % fmt(base["окупаемость_дисконтированная_лет"], 2))
    p("Пиковая потребность в финансировании . %s млн ₽" % fmt(base["пиковая_потребность_млн"], 0))
    p("CapEx за горизонт .................... %s млн ₽" % fmt(base["CapEx_всего_млн"], 0))
    p("")
    p("Сценарии:")
    for name, d in scen.items():
        p("  %-16s доля %s%% · вес %s%% · EV %s млрд ₽ · IRR %s%%"
          % (name, fmt(d["доля"] * 100, 0), fmt(d["вес"] * 100, 0),
             fmt(d["модель"]["EV"] / 1000, 1),
             fmt(d["модель"]["IRR_проекта"] * 100, 1) if d["модель"]["IRR_проекта"] else "—"))
    p("  Ожидаемое значение EV .............. %s млрд ₽" % fmt(ind["ожидаемая_EV_млрд"], 1))
    p("")
    if base.get("инвестор"):
        iv = base["инвестор"]
        p("Инвестор (доля %s%%, выход в %d году):" % (fmt(iv["доля"] * 100, 2), iv["год_выхода"]))
        p("  Поступления ........................ %s млн ₽" % fmt(iv["поступления_инвестора_млн"], 0))
        p("  Кратность .......................... %sx" % fmt(iv["кратность"], 1))
        p("  IRR ................................ %s%%" % fmt(iv["IRR_инвестора"] * 100, 1))
        p("")
    if tri:
        p("Pre-money (свёртка методов, дисконт за стадию применён один раз):")
        for r in tri["строки"]:
            p("  %-42s $%s млн x %s%% = $%s млн"
              % (r["метод"], fmt(r["после_дисконта_млн_usd"], 0),
                 fmt(r["вес"] * 100, 0), fmt(r["вклад_млн_usd"], 1)))
        p("  ИТОГО pre-money .................... $%s млн  (%s млрд ₽)"
          % (fmt(tri["pre_money_млн_usd"], 0), fmt(tri["pre_money_млрд_руб"], 2)))
        p("")
    if base.get("сделка"):
        d = base["сделка"]
        p("Структура раунда:")
        p("  Pre-money .......................... $%s млн (%s млрд ₽)"
          % (fmt(d["pre_money_млн_usd"], 0), fmt(d["pre_money_млрд_руб"], 2)))
        p("  Раунд .............................. $%s млн (%s млн ₽)"
          % (fmt(d["раунд_млн_usd"], 0), fmt(d["раунд_млн_руб"], 0)))
        p("  Post-money ......................... $%s млн (%s млрд ₽)"
          % (fmt(d["post_money_млн_usd"], 0), fmt(d["post_money_млрд_руб"], 2)))
        p("  Доля инвестора ..................... %s%%" % fmt(d["доля_инвестора"] * 100, 2))
        p("")
    if base.get("монте_карло"):
        mc = base["монте_карло"]
        p("Имитационное моделирование (%d итераций, зерно %d), EV млрд ₽:"
          % (mc["итераций"], mc["зерно"]))
        p("  P5 %s · P10 %s · P25 %s · медиана %s · P75 %s · P90 %s · P95 %s"
          % tuple(fmt(mc[k] / 1000, 1) for k in
                  ["P5", "P10", "P25", "медиана", "P75", "P90", "P95"]))
        p("  Вероятность EV > 50 млрд ₽: %s%% · вероятность EV < 0: %s%%"
          % (fmt(mc["доля_выше_50млрд"] * 100, 1), fmt(mc["доля_ниже_нуля"] * 100, 1)))
        p("")
    if sens_delay:
        p("Чувствительность к задержке запуска:")
        for i, d in enumerate(sens_delay["лет"]):
            mm = sens_delay["модели"][i]
            p("  +%d год(а): EV %s млрд ₽ · выручка год 10 %s млрд ₽"
              % (d, fmt(mm["EV"] / 1000, 1), fmt(mm["выручка"][-1] / 1000, 1)))
        p("")
    p("Помесячно/погодно — в файлах Выгрузка/*.csv")
    out.close()

    if errs:
        sys.exit(1)


if __name__ == "__main__":
    main()
