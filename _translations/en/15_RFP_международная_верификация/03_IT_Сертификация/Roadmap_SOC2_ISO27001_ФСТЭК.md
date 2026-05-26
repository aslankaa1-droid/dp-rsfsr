# Roadmap to international IT certification

**Project:** CPFSR · **Engagement reference:** RSFSR-CERT-2026 · **Date:** 24.05.2026

## 1. Target certificates and rationale

| Certificate | Rationale | Mandatory | Time-to-grant | Cost |
|---|---|---|---|---|
| **SOC 2 Type II** (AICPA TSP-100) | LP compliance for international institutions | Not mandatory, but critical for an international raise | 12 months + 6 months observation period = 18 months | USD 80–150k |
| **ISO/IEC 27001:2022** | Global information-security standard; required for tier-1 enterprise customers | Mandatory for government counterparties | 6–8 months | USD 40–70k |
| **ISO/IEC 27017:2015** | Cloud-specific extension to 27001 | Optional | +2 months after 27001 | USD 15–25k |
| **ISO/IEC 27018:2019** | PII protection in the cloud | Optional | +2 months after 27001 | USD 15–25k |
| **FSTEC CII-1** | Critical Information Infrastructure (RF) — mandatory for financial infrastructure under 187-FZ | **Mandatory** | 8–14 months | RUB 6–12M |
| **Bank of Russia attestation (CII + 779-P)** | Register of IS DFA operators | **Mandatory for Stage 1** | In parallel with register inclusion | RUB 4–8M |
| **PCI-DSS** (Level 1) | If a card-payment rail is in use | Optional (depends on bank-partner integration) | 6–9 months | USD 30–60k |
| **CSA STAR Level 2** | Cloud Security Alliance | Optional, a bonus for cloud-focused LPs | 3 months after ISO 27001 | USD 10–20k |

## 2. Sequencing (recommended order)

### Phase 0 (T+0 → T+3 months): Foundation

- Gap analysis of the current architecture vs the target (ISO 27001 + FSTEC CII-1).
- Appointment of a CISO (Chief Information Security Officer) — external consultant + internal specialist.
- ISMS documentation (Information Security Management System):
  - Information Security Policy
  - Risk Assessment Methodology (ISO 27005)
  - Statement of Applicability (SoA)
  - Risk Treatment Plan
- Internal audit kick-off.

### Phase 1 (T+3 → T+8 months): FSTEC CII-1 + 779-P

**Priority 1 — without CII-1 there is no entry into the DFA-operator register.**

- Categorisation of the CII object (high category, banking infrastructure).
- Coordination with NKTSKI (National Coordination Centre for Computer Incidents).
- Design of the protection system based on FSTEC protection profiles:
  - Anti-virus protection
  - Cryptographic Information Protection (CIP) — class KS-3 or KV-2 for financial infrastructure
  - DLP
  - SIEM (Russian-certified: PT Knock, KSC, MaxPatrol)
  - SOAR
- IS audit by an FSTEC-licensed organisation.
- Attestation of the CII object.
- Connection to NKTSKI (GosSOPKA).

### Phase 2 (T+8 → T+14 months): ISO 27001:2022

- Full internal audit against the 93 Annex A controls.
- Implementation of missing controls (expected: 15–30 controls beyond the FSTEC set).
- Pre-audit by an accredited registrar (DNV / BSI / SGS / TUV SUD).
- Stage 1 audit (documentation).
- Stage 2 audit (operational).
- Certification.

### Phase 3 (T+14 → T+18 months): SOC 2 Type II

- Design of SOC 2 controls across the 5 Trust Service Categories:
  - Security (mandatory)
  - Availability
  - Processing Integrity
  - Confidentiality
  - Privacy
- 6-month observation period (minimum).
- Selection of a CPA firm with SOC 2 accreditation (BDO, KPMG, EY, Deloitte, PwC, Schellman, A-LIGN).
- Annual recertification thereafter.

### Phase 4 (T+18 → T+22 months): Extension certificates

- ISO 27017 (cloud).
- ISO 27018 (PII in the cloud).
- CSA STAR Level 2 (if cloud deployment).
- PCI-DSS (if card-payment).

## 3. Compliance with GISTM / ICMM / ICMC

Since CPFSR is financial — not mining — infrastructure, these international standards are not applicable. The alternative financial frameworks are already included in the main list (SOC 2, ISO 27001, FSTEC CII).

## 4. List of auditor firms

### For SOC 2 Type II

- A-LIGN (international SOC 2 specialist)
- Schellman & Company (largest US SOC 2 firm)
- BDO USA
- KPMG / Deloitte / EY / PwC member firms

### For ISO 27001 / 27017 / 27018

- BSI (UK-based, UKAS accredited)
- DNV (Norway, UKAS + RvA accredited)
- SGS (Switzerland, accredited)
- TUV SUD (Germany)
- Bureau Veritas (France)
- BISL / NSC Russia (locally accredited by Rosaccreditation)

### For FSTEC CII-1

FSTEC-licensed organisations (current register at fstec.ru):
- Informzashchita
- Ural Centre for Security Systems
- ICL Service
- "Informzashchita" Research and Production Enterprise
- Positive Technologies (for testing)

## 5. Dependencies and risks

- FSTEC CII-1 is a prerequisite for inclusion of the operator in the 779-P register (without it Stage 1 does not launch).
- ISO 27001 — preferably obtained before the end of the Seed runway, so that the Series A roadshow proceeds with a signed certificate already in hand.
- SOC 2 Type II — requires an international observation period of 6 months, hence it should be initiated immediately after ISO 27001 in order to deliver the certificate by the Series B moment.
- **Critical path:** Phase 0 + Phase 1 (FSTEC) — 11 months → Stage 1 launch — 12–18 months after Seed.

## 6. Related documents

- `01_Техническая_документация/05_Безопасность_и_КИИ.md` — details of the technical design
- `_Compliance/Compliance_Matrix.md` (issued under task #73) — overall compliance matrix
- `15_RFP_международная_верификация/01_Vendor_DD_Big4/` — linked to tax/financial DD on the IT accreditation preferential rate

## 7. Bottom line

- **Minimum set for Stage 1:** FSTEC CII-1 + Bank of Russia attestation (RUB 10–20M, 14 months)
- **Full set for an international raise:** + ISO 27001 + SOC 2 Type II (RUB 18–30M USD-equivalent, 22 months)
- **Extended:** + ISO 27017/27018 + PCI-DSS + CSA STAR (RUB 25–45M USD-equivalent, 24 months)

Funding from the Seed round: provide for a "Security & Compliance Certification" line in the Use of Funds — USD 0.5–1.0M during the first 2 years.

---

**Date:** 24.05.2026
**Author:** A.-Kh. A. Kagirov (deposit certificate No. 4011265 of 19.12.2024)
**Engagement reference:** RSFSR-CERT-2026
