# International Compliance Matrix

**Project:** CPFSR · **Engagement reference:** RSFSR-COMP-2026 · **Date:** 24.05.2026
**Author:** A.-Kh. A. Kagirov (deposit certificate No. 4011265 of 19.12.2024)

A matrix of the CPFSR project's compliance with international regulatory and industry frameworks. Used in the data room for tier-1 vendor DD and in the investor memorandum.

---

## 1. Financial reporting

| Standard | Status | Gap | Roadmap | Owner |
|---|---|---|---|---|
| **RAS** (Russian Accounting Standards — mandatory in the Russian Federation) | To be adopted upon incorporation of the legal entity | n/a | T+0 (with incorporation) | CFO |
| **IFRS 9** (Financial Instruments) | Not implemented | Draft-stage methodology for DFA classification | T+6 months | CFO + auditor |
| **IFRS 13** (Fair Value Measurement) | Not implemented | Required for Level 3 valuation of DFA | T+6 months (together with VDD) | CFO + Big-4 VDD |
| **IFRS 15** (Revenue Recognition) | Not implemented | The 5-stream revenue model requires IFRS 15 sequencing | T+6 months | CFO |
| **IFRS 16** (Leases) | Not implemented | Data centres and offices — operating vs finance lease | T+6 months | CFO |
| **IFRS 7** (FI Disclosures) | Not implemented | Risk-management framework + sensitivity | T+12 months | CFO + Risk Committee |

## 2. Privacy and data protection

| Standard | Applicability | Status | Gap | Roadmap |
|---|---|---|---|---|
| **152-FZ "On Personal Data"** (RF) | Mandatory | Per the policy in `09_Мобильное_приложение/Публикация_RuStore/02_Политика_конфиденциальности.md` | Ready | n/a |
| **GDPR (EU Regulation 2016/679)** | If EU non-residents | Ready via Privacy by Design | Appointment of DPO; formal DPIA | T+6 months |
| **UK Data Protection Act 2018** | If UK LP | Same as GDPR (UK-GDPR) | Same | T+6 months |
| **California CCPA / CPRA** | If US LP | Not critical | Disclosures on request | T+12 months |
| **Brazilian LGPD** | Not applicable | n/a | n/a | n/a |
| **PDPA (Singapore)** | If SG LP | Not critical | Mapping of the privacy framework | T+12 months |

## 3. Information security

| Standard | Applicability | Status | Roadmap |
|---|---|---|---|
| **FSTEC CII-1** (RF) | **Mandatory** for financial infrastructure | In progress | T+8 months (see `15_RFP_международная_верификация/03_IT_Сертификация/Roadmap_SOC2_ISO27001_ФСТЭК.md`) |
| **ISO/IEC 27001:2022** | Desirable for LPs | Not started | T+14 months |
| **ISO/IEC 27017:2015** (cloud) | Optional | Not started | T+16 months |
| **ISO/IEC 27018:2019** (PII in the cloud) | Optional | Not started | T+16 months |
| **SOC 2 Type II** (AICPA) | Desirable for international LPs | Not started | T+18 months |
| **CSA STAR Level 2** | Optional | Not started | T+18 months |
| **PCI-DSS Level 1** | If card payments | Not applicable in Stage 1 | T+24 months (if required) |
| **NIST Cybersecurity Framework** | Reference | To be applied as a guideline | Cross-mapped to FSTEC + ISO 27001 |

## 4. AML / CFT / Counter-Terrorism

| Standard | Applicability | Status | Gap | Roadmap |
|---|---|---|---|---|
| **115-FZ "On Counteracting Legalisation"** | Mandatory | Part of the legal foundation | KYC implementation via the Unified Biometric System / ESIA (CBR Regulation 375-P) | T+6 months |
| **FATF Recommendations (40)** | Reference | Ready via 115-FZ + Article 859 of the Civil Code | Full mapping to FATF Recommendations | T+12 months |
| **EU AMLD5 + AMLD6** | If EU LP | Not critical for Stage 1 | Mapping into DD materials | T+18 months |
| **FATF Travel Rule (Recommendation 16) for DFA** | Applies to cross-jurisdictional transfers | Not applicable in Stage 1 | Implementation in the Stage 2 horizon | T+30 months |
| **OFAC SDN List screening** | If international counterparties | Ready via KYC + sanctions-screening tool | Bridger Insight / WorldCheck integration | T+12 months |

## 5. Tax and tax transparency

| Standard | Applicability | Status |
|---|---|---|
| **Tax Code Art. 149 sub-para 12.2** (VAT exemption for DFA) | Applies | Reflected in the financial model |
| **Tax Code Art. 34.2** (specifics of securities taxation) | Applies | Reflected |
| **Tax Code IT preferential rate of 5% until 31.12.2030** | With IT accreditation + ≥ 70% IT revenue | Roadmap stage |
| **FATCA (US tax)** | If US LP | Compliance via KYC; reporting to the IRS where applicable |
| **CRS (OECD Common Reporting Standard)** | If international LP from participating jurisdictions | Compliance via the Bank of Russia |
| **OECD BEPS** (Base Erosion and Profit Shifting) | Reference | Transparent structure without BEPS abuses |
| **Pillar 2 (Global Minimum Tax 15%)** | Not applicable in Stage 1 (revenue < €750M) | Monitoring for the Stage 2 horizon |

## 6. Investment / securities regulation

| Standard | Applicability | Status |
|---|---|---|
| **259-FZ "On DFA"** (RF) | Foundational | Foundation of the project |
| **39-FZ "On the Securities Market"** (boundary with DFA) | Applies | Legal opinion required |
| **MiFID II** (EU) | If EU LP | Not applicable in Stage 1; mapping for Stage 2 |
| **SEC Rule 506(c)** (US, accredited investors) | If US LP | Not applicable in Stage 1 |
| **SEC Reg D** (US private placements) | If US LP | Not applicable in Stage 1 |
| **Singapore Securities and Futures Act** | If SG LP | Not applicable in Stage 1 |
| **MAS Payment Services Act (Singapore)** | If SG operations | Not applicable |
| **MiCA (EU Markets in Crypto-Assets Regulation)** | Reference (international benchmark) | Mapping for the Stage 2 horizon |

## 7. Banking / custody

| Standard | Applicability | Status |
|---|---|---|
| **Basel III** (BCBS) | If CPFSR becomes a bank (Stage 2 horizon) | Not applicable in Stage 1 |
| **CBR Regulation 779-P** | Foundational (IS DFA operator) | Foundation; via Atomyze JSC in Stage 1 |
| **CBR Directive 4336-U** | Foundational (DFA accounting) | Foundation |
| **Civil Code Articles 860.7–860.10** (escrow) | Applies | Foundation |
| **161-FZ "On the National Payment System"** | If payment rail | Roadmap stage |

## 8. Anti-corruption

| Standard | Applicability | Status |
|---|---|---|
| **273-FZ "On Counteracting Corruption"** (RF) | Mandatory | Reflected in the Governance Pack |
| **UK Bribery Act 2010** | If UK LP | Reflected in the Governance Pack |
| **FCPA (US Foreign Corrupt Practices Act)** | If US LP | Reflected in the Governance Pack |
| **OECD Anti-Bribery Convention** | Reference | Compliance |
| **UN Convention against Corruption** | Reference | Compliance |

## 9. Labour and human rights

| Standard | Applicability | Status |
|---|---|---|
| **Labour Code of the Russian Federation** | Mandatory | Foundation |
| **UK Modern Slavery Act 2015** | If UK LP | Annual statement in the Governance Pack |
| **California Transparency in Supply Chains Act** | If US LP | Ready |
| **UN Guiding Principles on Business and Human Rights** | Reference | Compliance |
| **ILO Core Labour Standards** | Reference | Compliance |

## 10. ESG and climate

| Standard | Applicability | Status | Roadmap |
|---|---|---|---|
| **SASB Standards (Software & IT Services + FS)** | Applies | Adopted in the Governance Pack | T+12 months — first reporting |
| **TCFD Framework** | Adapted | Adopted | T+12 months — first disclosure |
| **GRI Standards (Global Reporting Initiative)** | Optional | Mapping prepared | T+18 months — first GRI report |
| **ESRS (European Sustainability Reporting Standards / CSRD)** | If EU LP above the size threshold | Roadmap stage | T+24 months |
| **PRI (Principles for Responsible Investment)** | Reference (for LP selection) | Policy adopted | T+12 months |
| **SBTi (Science Based Targets initiative)** | Reference | Optional participation | T+24 months |

## 11. Operational resilience

| Standard | Applicability | Status |
|---|---|---|
| **ISO 22301 (BCM)** | Recommended | Roadmap stage |
| **NIST CSF for Critical Infrastructure** | Reference | Cross-mapped to FSTEC |
| **Banking Operations Resilience (PRA / FCA)** | If UK LP / cross-border | Not applicable in Stage 1 |
| **ECB SREP** | Not applicable in Stage 1 | n/a |

## 12. Compliance Officer & reporting

- **Compliance Officer:** mandatory appointment (separate role from General Counsel).
- **Reporting line:** directly to the BoD via the Risk Committee.
- **Quarterly reporting** to the BoD on the status of compliance across all twelve categories above.
- **Annual Compliance Audit** by an independent auditor (preferably a Big-4 firm or a specialised compliance auditor).
- **Compliance training** mandatory for all employees annually.

## 13. Compliance calendar

| Quarter | Activity |
|---|---|
| Q1 | Annual Compliance Review · Audit Committee meeting · ESG annual report (SASB + TCFD) |
| Q2 | KYC/AML refresh · Sanctions screening update · Privacy review |
| Q3 | ISO 27001 surveillance audit (after the first certification) · SOC 2 Type II audit (continuous) |
| Q4 | Tax year-end · Regulatory filing review · Modern Slavery Statement update |

---

## Bottom line

| Maturity by category | Today (Stage 1 start) | Target (T+18 months) | Target (Stage 2, T+36 months) |
|---|:---:|:---:|:---:|
| Financial reporting | 2/10 | 7/10 | 9/10 |
| Privacy | 5/10 | 8/10 | 9/10 |
| Information Security | 3/10 | 8/10 | 9/10 |
| AML/CFT | 5/10 | 8/10 | 9/10 |
| Tax | 7/10 | 8/10 | 9/10 |
| Securities | 6/10 | 8/10 | 9/10 |
| Anti-Corruption | 5/10 | 9/10 | 9/10 |
| ESG | 2/10 | 7/10 | 9/10 |
| Operational Resilience | 3/10 | 7/10 | 9/10 |
| **Composite maturity** | **4.2/10** | **7.8/10** | **9.0/10** |

The current state (4.2/10) corresponds to a pre-Seed startup on the international scale; the target (7.8/10 within 18 months) — Series A institutional ready; the final state (9.0/10 within 36 months) — Series B+ international ready.

---

**Date:** 24.05.2026
**Engagement reference:** RSFSR-COMP-2026
**Center Group Company**
