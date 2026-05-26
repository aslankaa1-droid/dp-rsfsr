# Roadmap к международной IT-сертификации

**Project:** ЦП РСФСР  ·  **Engagement reference:** RSFSR-CERT-2026  ·  **Дата:** 24.05.2026

## 1. Целевые сертификаты и зачем

| Сертификат | Зачем | Обязательность | Срок получения | Стоимость |
|---|---|---|---|---|
| **SOC 2 Type II** (AICPA TSP-100) | LP-комплаенс международных институтов | Необязательно, но критично для international raise | 12 мес. + 6 мес. observation period = 18 мес. | $80–150k |
| **ISO/IEC 27001:2022** | Глобальный стандарт ИБ; нужен для tier-1 enterprise клиентов | Обязательно для государственных контрагентов | 6–8 мес. | $40–70k |
| **ISO/IEC 27017:2015** | Cloud-specific extension к 27001 | Опционально | +2 мес. после 27001 | $15–25k |
| **ISO/IEC 27018:2019** | PII protection в cloud | Опционально | +2 мес. после 27001 | $15–25k |
| **ФСТЭК КИИ-1** | Критическая инфраструктура (РФ) — обязательно для финансовой инфраструктуры по 187-ФЗ | **Обязательно** | 8–14 мес. | ₽ 6–12 млн |
| **Аттестация Банка России (КИИ + 779-П)** | Реестр операторов ИС ЦФА | **Обязательно для Stage 1** | Параллельно с включением в реестр | ₽ 4–8 млн |
| **PCI-DSS** (Level 1) | Если будет card-payment рейл | Опционально (зависит от интеграции с банками-партнёрами) | 6–9 мес. | $30–60k |
| **CSA STAR Level 2** | Cloud Security Alliance | Опционально, бонус для облачных LP | 3 мес. после ISO 27001 | $10–20k |

## 2. Sequencing (рекомендованный порядок)

### Phase 0 (T+0 → T+3 мес.): Foundation

- Gap-analysis текущей архитектуры vs целевая (ISO 27001 + ФСТЭК КИИ-1).
- Назначение CISO (Chief Information Security Officer) — внешний консультант + внутренний specialist.
- ISMS-документация (Information Security Management System):
  - Information Security Policy
  - Risk Assessment Methodology (ISO 27005)
  - Statement of Applicability (SoA)
  - Risk Treatment Plan
- Internal audit kickoff.

### Phase 1 (T+3 → T+8 мес.): ФСТЭК КИИ-1 + 779-П

**Приоритет 1 — без КИИ-1 нет реестра ЦФА-операторов.**

- Категорирование объекта КИИ (выс. категория, банковская инфраструктура).
- Согласование с НКЦКИ (Национальный координационный центр по компьютерным инцидентам).
- Проектирование системы защиты на основе профилей защиты (ФСТЭК):
  - Антивирусная защита
  - СКЗИ (СКЗИ КС-3 или КВ-2 для финансовой инфраструктуры)
  - DLP
  - SIEM (Russian-certified: PT Knock, KSC, MaxPatrol)
  - SOAR
- Аудит ИБ от лицензированной ФСТЭК организации.
- Аттестация объекта КИИ.
- Подключение к НКЦКИ (ГосСОПКА).

### Phase 2 (T+8 → T+14 мес.): ISO 27001:2022

- Полный внутренний аудит против Annex A 93 controls.
- Внедрение недостающих контролей (ожидаемо: 15–30 controls сверх ФСТЭК-набора).
- Pre-audit от accredited registrar (DNV / BSI / SGS / TUV SUD).
- Stage 1 audit (документация).
- Stage 2 audit (operational).
- Сертификация.

### Phase 3 (T+14 → T+18 мес.): SOC 2 Type II

- Дизайн контролей SOC 2 по 5 Trust Service Categories:
  - Security (обязательно)
  - Availability
  - Processing Integrity
  - Confidentiality
  - Privacy
- 6-месячный observation period (минимум).
- Selection of CPA firm с SOC 2 accreditation (BDO, KPMG, EY, Deloitte, PwC, Schellman, A-LIGN).
- Annual recertification thereafter.

### Phase 4 (T+18 → T+22 мес.): Extension certificates

- ISO 27017 (cloud).
- ISO 27018 (PII in cloud).
- CSA STAR Level 2 (если облачное deployment).
- PCI-DSS (если card-payment).

## 3. Compliance с GISTM / ICMM / ICMC

Поскольку ЦП РСФСР — финансовая, не майнинговая инфраструктура, эти международные стандарты неприменимы. Альтернативные финансовые фреймворки уже включены в основной список (SOC 2, ISO 27001, ФСТЭК КИИ).

## 4. Список auditor firms

### Для SOC 2 Type II

- A-LIGN (international SOC 2 specialist)
- Schellman & Company (largest US SOC 2 firm)
- BDO USA
- KPMG / Deloitte / EY / PwC member firms

### Для ISO 27001 / 27017 / 27018

- BSI (UK-based, accredited UKAS)
- DNV (Norwegian, accredited UKAS + RvA)
- SGS (Swiss, accredited)
- TUV SUD (German)
- Bureau Veritas (French)
- BISL / NSC Russia (local accredited Rosaccreditation)

### Для ФСТЭК КИИ-1

Лицензированные ФСТЭК организации (актуальный реестр на fstec.ru):
- Информзащита
- Уральский центр систем безопасности
- ICL Сервис
- НИП «Информзащита»
- Positive Technologies (для тестирования)

## 5. Зависимости и риски

- ФСТЭК КИИ-1 — обязательное условие для включения оператора в реестр 779-П (без этого Stage 1 не запускается).
- ISO 27001 — желательно до окончания Seed-runway, чтобы Series A roadshow проходил с уже подписанным сертификатом.
- SOC 2 Type II — требуется international observation period 6 мес., поэтому начать сразу после ISO 27001 чтобы получить сертификат к moment Series B.
- **Критический путь:** Phase 0 + Phase 1 (ФСТЭК) — 11 мес. → запуск Stage 1 — 12-18 мес. от Seed.

## 6. Связанные документы

- `01_Техническая_документация/05_Безопасность_и_КИИ.md` — детали технического дизайна
- `_Compliance/Compliance_Matrix.md` (готовится в задаче #73) — общая матрица соответствия
- `15_RFP_международная_верификация/01_Vendor_DD_Big4/` — связано с tax/financial DD по льготе ИТ-аккредитации

## 7. Bottom line

- **Минимальный набор для Stage 1:** ФСТЭК КИИ-1 + Аттестация Банка России (₽ 10–20 млн, 14 мес.)
- **Полный набор для international raise:** + ISO 27001 + SOC 2 Type II (₽ 18–30 млн USD-eq, 22 мес.)
- **Расширенный:** + ISO 27017/27018 + PCI-DSS + CSA STAR (₽ 25–45 млн USD-eq, 24 мес.)

Финансирование из Seed-раунда: предусмотреть в Use of Funds статью «Security & Compliance Certification» — $0.5–1.0M в первые 2 года.

---

**Дата:** 24.05.2026
**Автор:** Кагиров А.-Х.А. (свид. №4011265 от 19.12.2024)
**Engagement reference:** RSFSR-CERT-2026
