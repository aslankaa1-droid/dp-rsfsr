# International Compliance Matrix

**Project:** ЦП РСФСР  ·  **Engagement reference:** RSFSR-COMP-2026  ·  **Дата:** 24.05.2026
**Автор:** Кагиров А.-Х.А. (свид. №4011265 от 19.12.2024)

Матрица соответствия проекта ЦП РСФСР к международным регуляторным и индустриальным фреймворкам. Используется в data-room для tier-1 vendor DD и в investor memorandum.

---

## 1. Финансовая отчётность

| Стандарт | Статус | Gap | Roadmap | Ответственный |
|---|---|---|---|---|
| **РСБУ** (обязательно для РФ) | Будет внедрён с момента регистрации юр.лица | n/a | T+0 (вместе с регистрацией) | CFO |
| **IFRS 9** (Financial Instruments) | Не внедрён | DRAFT-стадия методологии классификации ЦФА | T+6 мес. | CFO + аудитор |
| **IFRS 13** (Fair Value Measurement) | Не внедрён | Требуется для оценки ЦФА Level 3 | T+6 мес. (вместе с VDD) | CFO + Big-4 VDD |
| **IFRS 15** (Revenue Recognition) | Не внедрён | 5-stream revenue model нуждается в IFRS 15 sequencing | T+6 мес. | CFO |
| **IFRS 16** (Leases) | Не внедрён | ЦОДы + офисы — operating vs finance lease | T+6 мес. | CFO |
| **IFRS 7** (FI Disclosures) | Не внедрён | Risk management framework + sensitivity | T+12 мес. | CFO + Risk Committee |

## 2. Privacy & Data Protection

| Стандарт | Применимость | Статус | Gap | Roadmap |
|---|---|---|---|---|
| **152-ФЗ «О персональных данных»** (РФ) | Обязательно | Согласно policy `09_Мобильное_приложение/Публикация_RuStore/02_Политика_конфиденциальности.md` | Готово | n/a |
| **GDPR (EU Regulation 2016/679)** | Если нерезиденты ЕС | Готовность через Privacy by Design | Назначение DPO; формальный DPIA | T+6 мес. |
| **UK Data Protection Act 2018** | Если UK LP | Аналогично GDPR (UK-GDPR) | То же | T+6 мес. |
| **California CCPA / CPRA** | Если US LP | Не критично | Disclosures по запросу | T+12 мес. |
| **Brazilian LGPD** | Не применимо | n/a | n/a | n/a |
| **PDPA (Singapore)** | Если SG LP | Не критично | Mapping privacy framework | T+12 мес. |

## 3. Information Security

| Стандарт | Применимость | Статус | Roadmap |
|---|---|---|---|
| **ФСТЭК КИИ-1** (РФ) | **Обязательно** для финансовой инфраструктуры | В процессе | T+8 мес. (см. `15_RFP_международная_верификация/03_IT_Сертификация/Roadmap_SOC2_ISO27001_ФСТЭК.md`) |
| **ISO/IEC 27001:2022** | Желательно для LP | Не начато | T+14 мес. |
| **ISO/IEC 27017:2015** (cloud) | Опционально | Не начато | T+16 мес. |
| **ISO/IEC 27018:2019** (PII in cloud) | Опционально | Не начато | T+16 мес. |
| **SOC 2 Type II** (AICPA) | Желательно для international LP | Не начато | T+18 мес. |
| **CSA STAR Level 2** | Опционально | Не начато | T+18 мес. |
| **PCI-DSS Level 1** | Если card payments | Не применимо в Stage 1 | T+24 мес. (если потребуется) |
| **NIST Cybersecurity Framework** | Reference | Будет применён как guideline | Cross-mapped к ФСТЭК + ISO 27001 |

## 4. AML / CFT / Counter-Terrorism

| Стандарт | Применимость | Статус | Gap | Roadmap |
|---|---|---|---|---|
| **115-ФЗ «О противодействии легализации»** | Обязательно | Часть legal foundation | Внедрение KYC через ЕБС / ЕСИА (Положение ЦБ 375-П) | T+6 мес. |
| **FATF Recommendations (40)** | Reference | Готовность через 115-ФЗ + ст. 859 ГК | Полный mapping к FATF Rec. | T+12 мес. |
| **EU AMLD5 + AMLD6** | Если EU LP | Не критично для Stage 1 | Mapping в DD-материалы | T+18 мес. |
| **FATF Travel Rule (Rec. 16) для ЦФА** | Применимо для cross-jurisdictional transfers | Не применимо в Stage 1 | Внедрение в Stage 2 horizon | T+30 мес. |
| **OFAC SDN List screening** | Если international counterparties | Готовность через KYC + sanctions screening tool | Bridger Insight / WorldCheck integration | T+12 мес. |

## 5. Tax & Tax Transparency

| Стандарт | Применимость | Статус |
|---|---|---|
| **НК РФ ст. 149 пп. 12.2** (НДС-освобождение ЦФА) | Применяется | Включено в финмодель |
| **НК РФ ст. 34.2** (особенности налогообложения ЦП) | Применяется | Включено |
| **НК РФ ИТ-льгота 5% до 31.12.2030** | При ИТ-аккредитации + ≥70% ИТ-выручки | Roadmap-стадия |
| **FATCA (US tax)** | Если US LP | Compliance через KYC; reporting к IRS если применимо |
| **CRS (OECD Common Reporting Standard)** | Если international LP из participating jurisdictions | Compliance через ЦБ |
| **OECD BEPS** (Base Erosion and Profit Shifting) | Reference | Прозрачная структура без BEPS-злоупотреблений |
| **Pillar 2 (Global Minimum Tax 15%)** | Не применимо в Stage 1 (revenue < €750M) | Мониторинг для Stage 2 horizon |

## 6. Investment / Securities Regulation

| Стандарт | Применимость | Статус |
|---|---|---|
| **259-ФЗ «О ЦФА»** (РФ) | Базовый | Foundation проекта |
| **39-ФЗ «О рынке ЦБ»** (отграничение от ЦФА) | Применимо | Legal opinion требуется |
| **MiFID II** (EU) | Если EU LP | Не применимо в Stage 1; mapping для Stage 2 |
| **SEC Rule 506(c)** (US, accredited investors) | Если US LP | Не применимо в Stage 1 |
| **SEC Reg D** (US private placements) | Если US LP | Не применимо в Stage 1 |
| **Singapore Securities and Futures Act** | Если SG LP | Не применимо в Stage 1 |
| **MAS Payment Services Act (Singapore)** | Если SG operations | Не применимо |
| **MiCA (EU Markets in Crypto-Assets Regulation)** | Reference (international benchmark) | Mapping для Stage 2 horizon |

## 7. Banking / Custody

| Стандарт | Применимость | Статус |
|---|---|---|
| **Basel III** (BCBS) | Если ЦП РСФСР станет банком (Stage 2 horizon) | Не применимо в Stage 1 |
| **Положение ЦБ 779-П** | Базовое (оператор ИС ЦФА) | Foundation; через АО Атомайз в Stage 1 |
| **Указание ЦБ 4336-У** | Базовое (учёт ЦФА) | Foundation |
| **ГК РФ ст. 860.7-860.10** (эскроу) | Применимо | Foundation |
| **161-ФЗ «О НПС»** | Если payment rail | Roadmap-стадия |

## 8. Anti-Corruption

| Стандарт | Применимость | Статус |
|---|---|---|
| **273-ФЗ «О противодействии коррупции»** (РФ) | Обязательно | Включено в Governance Pack |
| **UK Bribery Act 2010** | Если UK LP | Включено в Governance Pack |
| **FCPA (US Foreign Corrupt Practices Act)** | Если US LP | Включено в Governance Pack |
| **OECD Anti-Bribery Convention** | Reference | Соблюдение |
| **UN Convention against Corruption** | Reference | Соблюдение |

## 9. Labor & Human Rights

| Стандарт | Применимость | Статус |
|---|---|---|
| **ТК РФ** | Обязательно | Foundation |
| **UK Modern Slavery Act 2015** | Если UK LP | Annual statement в Governance Pack |
| **California Transparency in Supply Chains Act** | Если US LP | Готовность |
| **UN Guiding Principles on Business and Human Rights** | Reference | Соблюдение |
| **ILO Core Labour Standards** | Reference | Соблюдение |

## 10. ESG & Climate

| Стандарт | Применимость | Статус | Roadmap |
|---|---|---|---|
| **SASB Standards (Software & IT Services + FS)** | Применимо | Adopted в Governance Pack | T+12 мес. — first reporting |
| **TCFD Framework** | Адаптировано | Adopted | T+12 мес. — first disclosure |
| **GRI Standards (Global Reporting Initiative)** | Опционально | Mapping подготовлен | T+18 мес. — first GRI report |
| **ESRS (European Sustainability Reporting Standards / CSRD)** | Если EU LP с size threshold | Roadmap-стадия | T+24 мес. |
| **PRI (Principles for Responsible Investment)** | Reference (для LP отбора) | Adopted policy | T+12 мес. |
| **SBTi (Science Based Targets initiative)** | Reference | Опциональное participation | T+24 мес. |

## 11. Operational Resilience

| Стандарт | Применимость | Статус |
|---|---|---|
| **ISO 22301 (BCM)** | Рекомендуется | Roadmap-стадия |
| **NIST CSF for Critical Infrastructure** | Reference | Cross-mapping к ФСТЭК |
| **Banking Operations Resilience (PRA / FCA)** | Если UK LP / cross-border | Не применимо в Stage 1 |
| **ECB SREP** | Не применимо в Stage 1 | n/a |

## 12. Compliance Officer & Reporting

- **Compliance Officer:** обязательное назначение (отдельная роль от General Counsel).
- **Подчинение:** напрямую СД через Risk Committee.
- **Ежеквартальная отчётность** в СД о статусе compliance по всем 12 категориям выше.
- **Annual Compliance Audit** независимым аудитором (предпочтительно Big-4 или специализированный compliance auditor).
- **Compliance training** обязательно для всех сотрудников ежегодно.

## 13. Compliance Calendar

| Месяц | Активность |
|---|---|
| Q1 | Annual Compliance Review · Audit Committee meeting · ESG annual report (SASB + TCFD) |
| Q2 | KYC/AML refresh · Sanctions screening update · Privacy review |
| Q3 | ISO 27001 surveillance audit (после первой сертификации) · SOC 2 Type II audit (continuous) |
| Q4 | Tax year-end · Regulatory filing review · Modern Slavery Statement update |

---

## Bottom line

| Зрелость по категориям | Сейчас (Stage 1 start) | Цель (T+18 мес.) | Цель (Stage 2, T+36 мес.) |
|---|:---:|:---:|:---:|
| Финансовая отчётность | 2/10 | 7/10 | 9/10 |
| Privacy | 5/10 | 8/10 | 9/10 |
| Information Security | 3/10 | 8/10 | 9/10 |
| AML/CFT | 5/10 | 8/10 | 9/10 |
| Tax | 7/10 | 8/10 | 9/10 |
| Securities | 6/10 | 8/10 | 9/10 |
| Anti-Corruption | 5/10 | 9/10 | 9/10 |
| ESG | 2/10 | 7/10 | 9/10 |
| Operational Resilience | 3/10 | 7/10 | 9/10 |
| **Общая зрелость** | **4.2/10** | **7.8/10** | **9.0/10** |

Текущее состояние (4.2/10) соответствует pre-Seed startup в международной шкале; целевое (7.8/10 через 18 мес.) — Series A institutional ready; финальное (9.0/10 через 36 мес.) — Series B+ international ready.

---

**Дата:** 24.05.2026
**Engagement reference:** RSFSR-COMP-2026
**Center Group Company**
