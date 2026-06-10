/* ============================================================
   Интерактивная финансовая модель ЦП РСФСР · v2 (24.05.2026)

   Полный синтез после рефактора по итогам сводного аудита + реконсиляция
   под реальную макру (SoT v4, 10.06.2026): КС ЦБ 14,5% (24.04.2026), FX 71,55.
   - WACC 29,5% (build-up под КС 14,5%; RF=ОФЗ 14,73% + β·ERP + stage + liquidity)
   - дисконтирование full-year (консервативная конвенция)
   - СТОЙКА A (консервативная, выбрана 10.06.2026): realizationFactor 0,78 приводит
     базовый NPV движка к канону ~63,7 млрд ₽ (выручка Y10 ~138). См.
     03_Финансовая_модель/Методология_DCF_диагноз_2026-06-10.md
   - OpEx-кривая с реалистичным ростом (комплаенс +30%, кибербез +25%,
     юр. +40%, оценщики/страховщики 0,8% от объёма)
   - EBITDA-маржа в TV сходится к 74,8% (вместо 96,9%)
   - Multi-stage TV (фазы I+II+perpetuity) вместо одностадийного Gordon
   - Доля рынка год 10 в Base = 18% (вместо 20%)
   - ФОТ, CapEx-волны 2029/2030/2033, рабочий капитал, амортизация,
     налоговый щит — учтены явно
   - Единый SoT: _Мастер/Единые_показатели_v2.md

   Возвращает: NPV, IRR, выручка год 10, EBITDA год 10, EBITDA-маржа,
   Payback, Equity Multiple, cash-runway-пик.
   ============================================================ */

(function(global) {

  // Базовые допущения (соответствуют 03_Финансовая_модель/Финансовая_модель_ЦП_РСФСР.md)
  const BASE = {
    capacityTrn: 25.0,         // трлн ₽ — залоговая ёмкость на 2025
    capacityGrowth: 0.04,      // индексация по таргету ЦБ
    shareYr10: 0.18,           // 18% доля к году 10 (Base; conservative 7%, optim 25%)
    realizationFactor: 0.78,   // стойка A (консервативная): реализация валовой тарифной выручки
                               // (рамп-ап, отток, скидки, неплатящие) — приводит выручку Y10 ~175→~138
                               // и базовый NPV к консервативному канону ~63 млрд ₽
    feeIssue: 0.0050,          // комиссия за выпуск
    feeService: 0.0030,        // сервисная комиссия от стека
    feePlatform: 0.0015,       // платформенный сбор
    feeB2BMax: 0.0015,         // максимум по году 10
    feeAppraisal: 0.0080,      // услуги оценщиков и страховщиков (новое после аудита)
    wacc: 0.295,               // 29,5% — WACC под КС 14,5% (SoT v4, build-up валюации §9.1)
    opexBase: 0.502,           // млрд ₽ базовый OpEx (без ФОТ) — рост за счёт +30% комплаенс
    opexGrowth: 0.10,          // +10%/год до 2029, далее затухание
    fteStart: 40,
    fteYr10: 370,
    salaryGrossStart: 350,     // тыс. ₽/мес
    salaryGrowth: 0.06,        // 6% индексация
    socialTax: 0.30,
    taxProfit: 0.20,
    capexSchedule: [0.30, 0.42, 0.40, 0.55, 1.80, 2.40, 1.60, 1.80, 2.30, 2.00], // млрд ₽
    workingCapital: 0.05,
    cfaLifetime: 5,            // лет
    amortYears: 7,             // линейная амортизация
    g_phase1_start: 0.06,      // 2035 → 2039: 6% → 4%
    g_phase1_end: 0.04,
    g_phase2_start: 0.035,     // 2040 → 2044: 3.5% → 2.5%
    g_phase2_end: 0.025,
    g_perpetuity: 0.02,        // 2045+
    margin_phase1_start: 0.75,
    margin_phase1_end: 0.70,
    margin_phase2_start: 0.70,
    margin_phase2_end: 0.65,
    margin_perpetuity: 0.60,
    years: 10
  };

  // S-curve проникновения
  function shareCurve(yr, target) {
    const t = (yr - 1) / 9;
    const s = 1 / (1 + Math.exp(-6 * (t - 0.5)));
    const s0 = 1 / (1 + Math.exp(-6 * (-0.5)));
    const s1 = 1 / (1 + Math.exp(-6 * (0.5)));
    return target * (s - s0) / (s1 - s0);
  }

  // Стек ЦФА: сумма выпусков за последние cfaLifetime лет
  function stockCalc(issues, year, lifetime) {
    let total = 0;
    for (let i = Math.max(0, year - lifetime); i <= year - 1; i++) {
      total += issues[i] || 0;
    }
    return total;
  }

  function model(params) {
    const p = Object.assign({}, BASE, params || {});
    const issues = [];
    const stocks = [];
    const years = [];

    // Расчёт выпусков, стека, выручки
    for (let y = 1; y <= p.years; y++) {
      const cap = p.capacityTrn * Math.pow(1 + p.capacityGrowth, y - 1) * 1000; // млрд ₽
      const share = shareCurve(y, p.shareYr10);
      const issue = cap * share;
      issues.push(issue);
      const stock = stockCalc(issues, y, p.cfaLifetime);
      stocks.push(stock);

      // Выручка по линиям (млрд ₽)
      const r1 = issue * p.feeIssue;
      const r2 = stock * p.feeService;
      const r3 = issue * p.feePlatform;
      const r4 = issue * p.feeB2BMax * Math.min(1, y / 10);
      const r5 = 0.05 + (y - 1) * 0.12; // тех.интеграции
      const r6 = issue * p.feeAppraisal;
      const rev = (r1 + r2 + r3 + r4 + r5 + r6) * p.realizationFactor;

      // FTE и ФОТ
      const fte = p.fteStart + (p.fteYr10 - p.fteStart) * (y - 1) / 9;
      const salary = p.salaryGrossStart * Math.pow(1 + p.salaryGrowth, y - 1);
      const payroll = fte * salary * 12 / 1e6 * (1 + p.socialTax); // млрд ₽

      // OpEx (без ФОТ) — рост с замедлением после 2029
      const growthFactor = y <= 5 ? Math.pow(1 + p.opexGrowth, y - 1) : Math.pow(1.10, 4) * Math.pow(1.07, y - 5);
      // дополнительная составляющая от оценщиков-страховщиков уже в выручке как pass-through;
      // но требует встречного OpEx
      const opexFixed = p.opexBase * growthFactor;
      const opexAppraisal = issue * p.feeAppraisal * 0.85 * p.realizationFactor; // pass-through, масштабируется реализацией
      const opex = opexFixed + opexAppraisal + payroll;

      const ebitda = rev - opex;
      const ebitdaMargin = rev > 0 ? ebitda / rev : 0;

      const capex = p.capexSchedule[y - 1] || 0;

      // Амортизация (упрощённо, линейно от накопленного CapEx за amortYears)
      let amort = 0;
      for (let i = Math.max(0, y - p.amortYears); i <= y - 1; i++) {
        amort += (p.capexSchedule[i] || 0) / p.amortYears;
      }

      const ebit = ebitda - amort;
      const tax = ebit > 0 ? ebit * p.taxProfit : 0;
      const dWc = y > 1 ? (rev - (years[y - 2]?.rev || 0)) * p.workingCapital : rev * p.workingCapital;
      const fcf = ebitda - tax - capex - dWc;

      years.push({
        y, share, stock, issue, rev,
        opex, opexFixed, opexAppraisal, payroll,
        ebitda, ebitdaMargin,
        amort, ebit, tax, capex, dWc, fcf
      });
    }

    // NPV — дисконтируем FCF
    let npv = 0;
    let cumFCF = 0;
    let payback = null;
    let peakNegCum = 0;
    years.forEach(yr => {
      cumFCF += yr.fcf;
      npv += yr.fcf / Math.pow(1 + p.wacc, yr.y);
      if (cumFCF < peakNegCum) peakNegCum = cumFCF;
      if (payback == null && cumFCF >= 0) {
        const prev = cumFCF - yr.fcf;
        payback = (yr.y - 1) + (Math.abs(prev) / Math.max(yr.fcf, 0.0001));
      }
    });

    // Multi-stage TV: фаза I (5 лет, m1, g1) → фаза II (5 лет, m2, g2) → perpetuity (m3, g3)
    let tvDisc = 0;
    let lastFCF = years[years.length - 1].fcf;
    let lastRev = years[years.length - 1].rev;
    let yearOffset = p.years;

    // Phase I: 5 лет линейного затухания g и маржи
    for (let i = 1; i <= 5; i++) {
      const t = i / 5;
      const gP = p.g_phase1_start + (p.g_phase1_end - p.g_phase1_start) * t;
      const mP = p.margin_phase1_start + (p.margin_phase1_end - p.margin_phase1_start) * t;
      lastRev = lastRev * (1 + gP);
      const fcfP = lastRev * mP * (1 - p.taxProfit);
      tvDisc += fcfP / Math.pow(1 + p.wacc, yearOffset + i);
    }
    yearOffset += 5;
    // Phase II
    for (let i = 1; i <= 5; i++) {
      const t = i / 5;
      const gP = p.g_phase2_start + (p.g_phase2_end - p.g_phase2_start) * t;
      const mP = p.margin_phase2_start + (p.margin_phase2_end - p.margin_phase2_start) * t;
      lastRev = lastRev * (1 + gP);
      const fcfP = lastRev * mP * (1 - p.taxProfit);
      tvDisc += fcfP / Math.pow(1 + p.wacc, yearOffset + i);
    }
    yearOffset += 5;
    // Perpetuity (Gordon)
    const fcfPerp = lastRev * (1 + p.g_perpetuity) * p.margin_perpetuity * (1 - p.taxProfit);
    const tv = fcfPerp / (p.wacc - p.g_perpetuity);
    tvDisc += tv / Math.pow(1 + p.wacc, yearOffset);

    npv += tvDisc;

    // IRR investor-level — рассчитан под точку зрения seed-инвестора:
    //   - инвестиция: -1,073 млрд ₽ (раунд $15 млн × FX 71,55) в год 0;
    //   - cash distribution: investorShare (13,04%) × positive FCF проекта по годам 2–10;
    //   - exit: investorShare × (EBITDA Y10 × 8 fintech-exit-multiple) в год 10.
    // SoT v4 § 6: Investor-level IRR Base при доле 13,04% (NPV полная ≈ 63,45 / round 1,073).
    const investorShare_IRR = 0.1304;
    const round_IRR = 1.073;
    function npvAt(rate) {
      let n = -round_IRR; // год 0
      years.forEach(yr => {
        const dist = yr.fcf > 0 ? yr.fcf * investorShare_IRR : 0;
        n += dist / Math.pow(1 + rate, yr.y);
      });
      // Exit на год 10: investorShare × EBITDA × 8× fintech multiple
      const exitEBITDA = years[years.length - 1].ebitda;
      const exitValue = exitEBITDA * 8 * investorShare_IRR;
      n += exitValue / Math.pow(1 + rate, p.years);
      return n;
    }
    let irr = 0.40;
    for (let it = 0; it < 80; it++) {
      const v = npvAt(irr);
      const d = (npvAt(irr + 0.001) - v) / 0.001;
      if (Math.abs(d) < 1e-9) break;
      irr -= v / d;
      if (irr < -0.99) irr = -0.5;
      if (irr > 5) irr = 2;
      if (Math.abs(v) < 0.001) break;
    }

    // Equity Multiple для seed-инвестора:
    // exit-on-multiple = (доля × полная DCF EV) / стартовая инвестиция.
    // SoT v4: доля 13,04%, post-money $115M, раунд $15M = 1,073 млрд ₽ при FX 71,55.
    // Полная EV (npv) уже включает sum_disc_fcf 10y + tvDisc (multi-stage TV) — см. строку 182.
    // Защищаемый ориентир — 7–12×: нижняя граница exit-on-multiple под NPV ≈63,45; верхняя — Series B path.
    const startRound = 1.073; // млрд ₽ — раунд $15 млн при FX 71,55
    const investorShare = 0.1304; // 13,04% после Seed
    const fullEV = npv; // npv уже = sum_disc_fcf_10y + tvDisc; без double-count tvDisc
    const equityMultiple = (investorShare * fullEV) / startRound;
    // total project return — справочная метрика, не TVPI инвестора
    const projectTotalReturn = years.reduce((s, y) => s + Math.max(0, y.fcf), 0) + tvDisc;
    const projectMOIC = projectTotalReturn / startRound;

    return {
      years,
      npv,
      tvDisc,
      irr,
      rev10: years[years.length - 1].rev,
      ebitda10: years[years.length - 1].ebitda,
      ebitdaMargin10: years[years.length - 1].ebitdaMargin,
      payback: payback ?? p.years,
      peakNegCum,
      equityMultiple,
      projectMOIC,
      params: p
    };
  }

  function fmt(num, dec) {
    dec = dec == null ? 1 : dec;
    if (num == null || isNaN(num)) return '—';
    if (Math.abs(num) >= 1000) return (num/1000).toFixed(dec) + ' трлн';
    return num.toFixed(dec);
  }

  // ============================================================
  // ИНСТРУМЕНТЫ IFRS-grade ANALYSIS (Horizon III.C)
  // ============================================================

  // Box-Muller для нормального распределения
  function gauss(mean, sd) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return mean + sd * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  // Усечённое нормальное распределение для параметров с естественными границами
  function gaussTrunc(mean, sd, min, max) {
    for (let i = 0; i < 100; i++) {
      const x = gauss(mean, sd);
      if (x >= min && x <= max) return x;
    }
    return Math.max(min, Math.min(max, mean));
  }

  // Monte Carlo: симуляция распределения NPV по N переменным
  // Параметры (10k итераций по умолчанию):
  //   wacc: 29,5% ± 3 п.п. (truncated normal)
  //   shareYr10: 18% ± 7 п.п. (truncated [5%, 35%])
  //   feeIssue: 0,50% ± 0,10 п.п.
  //   opexBase: 0,502 ± 15%
  //   capacityGrowth: 4% ± 1,5 п.п.
  //   margin_perpetuity: 60% ± 5 п.п.
  function monteCarlo(iter, overrides) {
    iter = iter || 10000;
    const results = [];
    const config = Object.assign({
      waccMean: 0.295, waccSd: 0.03,
      shareMean: 0.18, shareSd: 0.07, shareMin: 0.05, shareMax: 0.35,
      feeMean: 0.0050, feeSd: 0.0010,
      opexMean: 0.502, opexSdRatio: 0.15,
      capGrowthMean: 0.04, capGrowthSd: 0.015,
      marginPerpMean: 0.60, marginPerpSd: 0.05
    }, overrides || {});

    for (let i = 0; i < iter; i++) {
      const params = {
        wacc: gaussTrunc(config.waccMean, config.waccSd, 0.20, 0.45),
        shareYr10: gaussTrunc(config.shareMean, config.shareSd, config.shareMin, config.shareMax),
        feeIssue: gaussTrunc(config.feeMean, config.feeSd, 0.001, 0.012),
        opexBase: gaussTrunc(config.opexMean, config.opexMean * config.opexSdRatio, 0.30, 0.90),
        capacityGrowth: gaussTrunc(config.capGrowthMean, config.capGrowthSd, 0.01, 0.08),
        margin_perpetuity: gaussTrunc(config.marginPerpMean, config.marginPerpSd, 0.45, 0.75)
      };
      const r = model(params);
      results.push(r.npv);
    }

    results.sort((a, b) => a - b);
    const pct = (q) => results[Math.floor(iter * q)];
    const mean = results.reduce((s, v) => s + v, 0) / iter;
    const variance = results.reduce((s, v) => s + (v - mean) * (v - mean), 0) / iter;

    return {
      iter,
      p5: pct(0.05), p10: pct(0.10), p25: pct(0.25),
      p50: pct(0.50), p75: pct(0.75), p90: pct(0.90), p95: pct(0.95),
      mean,
      sd: Math.sqrt(variance),
      probPositive: results.filter(v => v > 0).length / iter,
      probAbove50: results.filter(v => v > 50).length / iter,
      probAbove100: results.filter(v => v > 100).length / iter,
      probBelow0: results.filter(v => v < 0).length / iter,
      raw: results
    };
  }

  // Matrix sensitivity: NPV(wacc × share)
  function sensitivityMatrix(waccArr, shareArr) {
    waccArr = waccArr || [0.255, 0.275, 0.295, 0.315, 0.335];
    shareArr = shareArr || [0.10, 0.135, 0.18, 0.225, 0.27]; // ×0,5 .. ×1,5 от 18%
    const rows = [];
    for (const w of waccArr) {
      const row = { wacc: w, vals: [] };
      for (const s of shareArr) {
        const r = model({ wacc: w, shareYr10: s });
        row.vals.push({ share: s, npv: r.npv });
      }
      rows.push(row);
    }
    return { waccs: waccArr, shares: shareArr, rows };
  }

  // 3 сценария Base / Conservative / Optimistic
  function scenariosCalc() {
    const conservative = model({ shareYr10: 0.07, feeIssue: 0.0040, opexBase: 0.577, wacc: 0.315 });
    const base = model({});
    const optimistic = model({ shareYr10: 0.25, feeIssue: 0.0060, opexBase: 0.452, wacc: 0.275 });
    const ev = 0.55 * base.npv + 0.30 * optimistic.npv + 0.15 * conservative.npv;
    return {
      conservative: { npv: conservative.npv, irr: conservative.irr, payback: conservative.payback, weight: 0.15 },
      base: { npv: base.npv, irr: base.irr, payback: base.payback, weight: 0.55 },
      optimistic: { npv: optimistic.npv, irr: optimistic.irr, payback: optimistic.payback, weight: 0.30 },
      expectedValue: ev
    };
  }

  // Tornado-диаграмма: ±X% для каждой переменной
  function tornado() {
    const baseRes = model({});
    const baseNpv = baseRes.npv;
    const tests = [
      { name: 'WACC ±3 п.п.', low: { wacc: 0.265 }, high: { wacc: 0.325 } },
      { name: 'Доля рынка год 10 ±7 п.п.', low: { shareYr10: 0.11 }, high: { shareYr10: 0.25 } },
      { name: 'Комиссия выпуска ±0,1 п.п.', low: { feeIssue: 0.0040 }, high: { feeIssue: 0.0060 } },
      { name: 'OpEx-уплифт ±20%', low: { opexBase: 0.402 }, high: { opexBase: 0.602 } },
      { name: 'Рост ёмкости ±1,5 п.п.', low: { capacityGrowth: 0.025 }, high: { capacityGrowth: 0.055 } },
      { name: 'Маржа perpetuity ±5 п.п.', low: { margin_perpetuity: 0.55 }, high: { margin_perpetuity: 0.65 } },
      { name: 'CFA lifetime ±1 год', low: { cfaLifetime: 4 }, high: { cfaLifetime: 6 } }
    ];
    return tests.map(t => {
      const lowNpv = model(t.low).npv;
      const highNpv = model(t.high).npv;
      return {
        name: t.name,
        low: lowNpv, high: highNpv, range: Math.abs(highNpv - lowNpv),
        deltaLow: lowNpv - baseNpv, deltaHigh: highNpv - baseNpv
      };
    }).sort((a, b) => b.range - a.range);
  }

  global.FinModel = { model, BASE, fmt, monteCarlo, sensitivityMatrix, scenariosCalc, tornado };

})(window);
