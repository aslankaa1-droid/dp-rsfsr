/* ============================================================
   Интерактивная финансовая модель ЦП РСФСР · v5 (07.09.2026)

   Точный перенос расчётного движка 03_Финансовая_модель/Модель/model.py.
   Виджет и документы считают по одним и тем же формулам и допущениям;
   подгоночных коэффициентов нет.

   - горизонт 2027–2036 (год 1 = 2027), дисконтирование на конец года
   - ставка дисконтирования 29,58% (ОФЗ 14,73 + бета×ERP 9,35 + стадия 2,5 + неликвидность 3,0)
   - налог на прибыль 25% (176-ФЗ от 12.07.2024) с переносом убытков (предел 50% базы)
   - услуги оценщиков и страховщиков учтены НЕТТО: 0,12% объёма (валовый тариф 0,80%,
     встречные издержки 85%)
   - расходы = ФОТ (численность × оклад × 12 × 1,30) + база 0,502 млрд ₽ с индексацией 4%
     + 22% выручки
   - терминальная стоимость: модель Гордона на нормализованном потоке, g = 4%
   - итог выручки равен сумме строк по построению

   Возвращает: npv (стоимость бизнеса), tvDisc, irr (проекта), выручку и EBITDA года 10,
   маржу, окупаемость, кратность для инвестора, пик отрицательного накопленного потока.
   ============================================================ */

(function(global) {

  // Базовые допущения (соответствуют 03_Финансовая_модель/Финансовая_модель_ЦП_РСФСР.md)
  const BASE = {
    capacityTrn: 25.0,         // трлн ₽ — залоговая ёмкость на 2025
    capacityGrowth: 0.04,      // индексация по целевой инфляции
    firstYear: 2027,           // год 1 модели
    shareYr10: 0.18,           // доля к году 10 (база; консервативный 7%, оптимистичный 25%)
    shareCurveBase: [0, 0.004, 0.018, 0.044, 0.088, 0.108, 0.126, 0.144, 0.162, 0.18],
    feeIssue: 0.0050,          // комиссия за выпуск
    feeService: 0.0030,        // сервисная комиссия от стека
    feePlatform: 0.0015,       // платформенный сбор
    feeB2BMax: 0.0015,         // лицензии B2B2G, максимум к году 10
    feeB2BCurve: [0, 0.0005, 0.0007, 0.0009, 0.0010, 0.0011, 0.0012, 0.0013, 0.0014, 0.0015],
    integrations: [0, 0.05, 0.18, 0.35, 0.52, 0.65, 0.78, 0.90, 1.02, 1.15], // млрд ₽
    feeAppraisalGross: 0.0080, // валовый тариф оценки и страхования
    appraisalPassThrough: 0.85,// доля встречных издержек (в выручку не попадает)
    wacc: 0.29578,             // ставка дисконтирования
    opexBase: 0.502,           // млрд ₽ — базовая часть прочих расходов, год 1
    opexIndex: 0.04,           // индексация базовой части
    opexVarShare: 0.22,        // переменная часть, доля выручки
    fteCurve: [40, 120, 160, 200, 240, 270, 300, 330, 350, 370],
    salaryGrossStart: 350,     // тыс. ₽/мес
    salaryGrowth: 0.06,
    socialTax: 0.30,
    taxProfit: 0.25,
    lossCarryCap: 0.50,        // предел переноса убытков, доля налоговой базы
    capexSchedule: [0.30, 0.42, 0.40, 0.55, 1.80, 2.40, 1.60, 1.80, 2.30, 2.00], // млрд ₽
    workingCapital: 0.05,
    cfaLifetime: 5,
    amortYears: 7,
    gTerminal: 0.04,           // темп роста в терминальном периоде
    investorShare: 0.0570,   // доля инвестора при раунде $15 млн и стоимости входа $248 млн
    exitYearNo: 7,           // год выхода инвестора     // доля инвестора при раунде $15 млн и стоимости входа $248 млн
    startRound: 1.073,         // млрд ₽
    years: 10
  };

  // Траектория доли рынка: табличная кривая, масштабированная к целевой доле года 10
  function shareCurve(yr, target, curve) {
    const c = curve || BASE.shareCurveBase;
    const k = c[c.length - 1] ? target / c[c.length - 1] : 0;
    return (c[yr - 1] || 0) * k;
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
    let lossCarry = 0;

    // Расчёт выпусков, стека, выручки
    for (let y = 1; y <= p.years; y++) {
      const cap = p.capacityTrn * Math.pow(1 + p.capacityGrowth, (p.firstYear - 2025) + y - 1) * 1000; // млрд ₽ (база 25 трлн на 2025)
      const share = shareCurve(y, p.shareYr10, p.shareCurveBase);
      const issue = cap * share;
      issues.push(issue);
      const stock = stockCalc(issues, y, p.cfaLifetime);
      stocks.push(stock);

      // Выручка по линиям (млрд ₽)
      const r1 = issue * p.feeIssue;
      const r2 = stock * p.feeService;
      const r3 = issue * p.feePlatform;
      const r4 = issue * (p.feeB2BCurve[y - 1] || 0);
      const r5 = p.integrations[y - 1] || 0;
      const r6 = issue * p.feeAppraisalGross * (1 - p.appraisalPassThrough);
      const rev = r1 + r2 + r3 + r4 + r5 + r6;
      const grossBillings = rev + issue * p.feeAppraisalGross * p.appraisalPassThrough;

      const fte = p.fteCurve[y - 1] || 0;
      const salary = p.salaryGrossStart * Math.pow(1 + p.salaryGrowth, y - 1);
      const payroll = fte * salary * 12 / 1e6 * (1 + p.socialTax); // млрд ₽

      const opexFixed = p.opexBase * Math.pow(1 + p.opexIndex, y - 1);
      const opexVar = p.opexVarShare * rev;
      const opex = (opexFixed + opexVar + payroll) * (1 + (p.opexUplift || 0));

      const ebitda = rev - opex;
      const ebitdaMargin = rev > 0 ? ebitda / rev : 0;

      const capex = p.capexSchedule[y - 1] || 0;
      let amort = 0;
      for (let i = Math.max(0, y - p.amortYears); i <= y - 1; i++) {
        amort += (p.capexSchedule[i] || 0) / p.amortYears;
      }

      const ebit = ebitda - amort;
      let tax = 0;
      if (ebit <= 0) {
        lossCarry += -ebit;
      } else {
        const used = Math.min(lossCarry, ebit * p.lossCarryCap);
        lossCarry -= used;
        tax = (ebit - used) * p.taxProfit;
      }
      const dWc = y > 1 ? (rev - (years[y - 2] ? years[y - 2].rev : 0)) * p.workingCapital
                        : rev * p.workingCapital;
      const fcf = ebitda - tax - dWc - capex;

      years.push({
        y, share, stock, issue, rev, grossBillings,
        opex, opexFixed, opexVar, payroll,
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

    // Терминальная стоимость: модель Гордона на нормализованном потоке.
    // В стационарном состоянии капитальные вложения равны амортизации,
    // прирост оборотного капитала равен g x оборотный капитал.
    const last = years[years.length - 1];
    const ebitN = last.ebitda - last.amort;
    const taxN = Math.max(0, ebitN) * p.taxProfit;
    const wcN = last.rev * p.workingCapital;
    const fcfNorm = last.ebitda - taxN - wcN * p.gTerminal - last.amort;
    const tv = fcfNorm * (1 + p.gTerminal) / (p.wacc - p.gTerminal);
    const tvDisc = tv / Math.pow(1 + p.wacc, p.years);

    npv += tvDisc;

    // Внутренняя норма доходности проекта: на потоках проекта, терминальная
    // стоимость добавлена к потоку последнего года.
    function npvAt(rate) {
      let n = 0;
      years.forEach(yr => { n += yr.fcf / Math.pow(1 + rate, yr.y); });
      n += tv / Math.pow(1 + rate, p.years);
      return n;
    }
    let lo = -0.99, hi = 10.0, irr = 0;
    if (npvAt(lo) * npvAt(hi) <= 0) {
      for (let it = 0; it < 200; it++) {
        const mid = (lo + hi) / 2;
        if (npvAt(lo) * npvAt(mid) < 0) hi = mid; else lo = mid;
      }
      irr = (lo + hi) / 2;
    }

    // Кратность возврата для инвестора: выход на 7-м году модели.
    // Стоимость капитала на выходе = дисконтированные потоки оставшихся лет
    // + терминальная стоимость + накопленные деньги.
    const startRound = p.startRound;
    const investorShare = p.investorShare;
    const kExit = (p.exitYearNo || 7) - 1;
    let evAtExit = 0;
    for (let j = kExit + 1; j < years.length; j++) {
      evAtExit += years[j].fcf / Math.pow(1 + p.wacc, j - kExit);
    }
    evAtExit += tv / Math.pow(1 + p.wacc, p.years - 1 - kExit);
    let cumToExit = 0;
    for (let j = 0; j <= kExit; j++) cumToExit += years[j].fcf;
    const equityAtExit = evAtExit + cumToExit + startRound;
    const equityMultiple = (investorShare * equityAtExit) / startRound;
    const investorIrr = Math.pow(equityMultiple, 1 / (kExit + 1)) - 1;
    const projectMOIC = (years.reduce((s2, y2) => s2 + Math.max(0, y2.fcf), 0) + tvDisc) / startRound;

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
      investorIrr,
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
    // Сценарии различаются только целевой долей рынка года 10 — как в расчётном движке.
    const conservative = model({ shareYr10: 0.07 });
    const base = model({});
    const optimistic = model({ shareYr10: 0.25 });
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
      { name: 'Доля рынка год 10 ±7 п.п.', low: { shareYr10: 0.11 }, high: { shareYr10: 0.25 } },
      { name: 'Ставка дисконтирования ±3 п.п.', low: { wacc: 0.32578 }, high: { wacc: 0.26578 } },
      { name: 'Тарифы платформы ±20%',
        low:  { feeIssue: 0.0040, feeService: 0.0024, feePlatform: 0.0012, feeB2BCurve: BASE.feeB2BCurve.map(x => x * 0.8) },
        high: { feeIssue: 0.0060, feeService: 0.0036, feePlatform: 0.0018, feeB2BCurve: BASE.feeB2BCurve.map(x => x * 1.2) } },
      { name: 'Операционные расходы ±20%', low: { opexUplift: -0.20 }, high: { opexUplift: 0.20 } },
      { name: 'Темп роста в терминальном периоде ±2 п.п.', low: { gTerminal: 0.02 }, high: { gTerminal: 0.06 } },
      { name: 'Срок жизни выпуска ±1 год', low: { cfaLifetime: 4 }, high: { cfaLifetime: 6 } }
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
