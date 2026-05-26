# Feuille de route — Certifications IT internationales

**Projet :** CPFSR · **Référence engagement :** RSFSR-CERT-2026 · **Date :** 24.05.2026

## 1. Certificats cibles et finalité

| Certificat | Finalité | Caractère | Délai d'obtention | Coût |
|---|---|---|---|---|
| **SOC 2 Type II** (AICPA TSP-100) | Conformité LP des institutions internationales | Non obligatoire, mais critique pour une levée internationale | 12 mois + 6 mois d'observation = 18 mois | 80–150 k USD |
| **ISO/CEI 27001:2022** | Standard mondial de sécurité de l'information ; requis pour clients tier-1 enterprise | Obligatoire pour les contreparties publiques | 6–8 mois | 40–70 k USD |
| **ISO/CEI 27017:2015** | Extension cloud à 27001 | Optionnel | +2 mois après 27001 | 15–25 k USD |
| **ISO/CEI 27018:2019** | Protection des PII dans le cloud | Optionnel | +2 mois après 27001 | 15–25 k USD |
| **FSTEC KII-1** | Infrastructure d'information critique (FR) — obligatoire pour l'infrastructure financière au titre de 187-FZ | **Obligatoire** | 8–14 mois | 6–12 M ₽ |
| **Attestation de la Banque de Russie (KII + 779-P)** | Registre des opérateurs SI DFA | **Obligatoire pour l'Étape 1** | En parallèle de l'inscription au registre | 4–8 M ₽ |
| **PCI-DSS** (Level 1) | En cas de payment rail carte | Optionnel (selon l'intégration des banques partenaires) | 6–9 mois | 30–60 k USD |
| **CSA STAR Level 2** | Cloud Security Alliance | Optionnel, bonus pour LP orientés cloud | 3 mois après ISO 27001 | 10–20 k USD |

## 2. Séquencement (ordre recommandé)

### Phase 0 (T+0 → T+3 mois) : Fondations

- Gap analysis de l'architecture actuelle vs la cible (ISO 27001 + FSTEC KII-1).
- Nomination du CISO (Chief Information Security Officer) — consultant externe + spécialiste interne.
- Documentation ISMS (Information Security Management System) :
  - Information Security Policy
  - Risk Assessment Methodology (ISO 27005)
  - Statement of Applicability (SoA)
  - Risk Treatment Plan
- Kick-off de l'audit interne.

### Phase 1 (T+3 → T+8 mois) : FSTEC KII-1 + 779-P

**Priorité 1 — sans KII-1, pas d'inscription au registre des opérateurs DFA.**

- Catégorisation de l'objet KII (catégorie haute, infrastructure bancaire).
- Coordination avec le NKTSKI (Centre national de coordination des incidents informatiques).
- Conception du dispositif de protection à partir des profils FSTEC :
  - Protection antivirus
  - Moyens cryptographiques (classe KS-3 ou KV-2 pour l'infrastructure financière)
  - DLP
  - SIEM (certifié russe : PT Knock, KSC, MaxPatrol)
  - SOAR
- Audit IS par une organisation accréditée par la FSTEC.
- Attestation de l'objet KII.
- Connexion à NKTSKI (GosSOPKA).

### Phase 2 (T+8 → T+14 mois) : ISO 27001:2022

- Audit interne complet sur les 93 contrôles de l'Annex A.
- Mise en œuvre des contrôles manquants (attendus : 15–30 contrôles au-delà du set FSTEC).
- Pré-audit par registrar accrédité (DNV / BSI / SGS / TUV SUD).
- Stage 1 audit (documentation).
- Stage 2 audit (opérationnel).
- Certification.

### Phase 3 (T+14 → T+18 mois) : SOC 2 Type II

- Conception des contrôles SOC 2 selon les 5 Trust Service Categories :
  - Security (obligatoire)
  - Availability
  - Processing Integrity
  - Confidentiality
  - Privacy
- Période d'observation de 6 mois (minimum).
- Sélection d'une CPA firm accréditée SOC 2 (BDO, KPMG, EY, Deloitte, PwC, Schellman, A-LIGN).
- Recertification annuelle ensuite.

### Phase 4 (T+18 → T+22 mois) : Certificats d'extension

- ISO 27017 (cloud).
- ISO 27018 (PII dans le cloud).
- CSA STAR Level 2 (si déploiement cloud).
- PCI-DSS (si carte).

## 3. Conformité GISTM / ICMM / ICMC

CPFSR étant une infrastructure financière (et non minière), ces standards internationaux ne sont pas applicables. Les cadres financiers alternatifs figurent déjà dans la liste principale (SOC 2, ISO 27001, FSTEC KII).

## 4. Liste des cabinets auditeurs

### Pour SOC 2 Type II

- A-LIGN (spécialiste SOC 2 international)
- Schellman & Company (plus grand cabinet SOC 2 aux US)
- BDO USA
- Membres KPMG / Deloitte / EY / PwC

### Pour ISO 27001 / 27017 / 27018

- BSI (UK, accrédité UKAS)
- DNV (Norvège, accrédité UKAS + RvA)
- SGS (Suisse, accrédité)
- TUV SUD (Allemagne)
- Bureau Veritas (France)
- BISL / NSC Russia (accrédité localement par Rosaccreditation)

### Pour FSTEC KII-1

Organisations accréditées par la FSTEC (registre actuel sur fstec.ru) :
- Informzashchita
- Ural Centre for Security Systems
- ICL Service
- « Informzashchita » Research and Production Enterprise
- Positive Technologies (pour les tests)

## 5. Dépendances et risques

- FSTEC KII-1 est un prérequis à l'inscription au registre 779-P (sans cela, l'Étape 1 ne démarre pas).
- ISO 27001 — souhaitable avant la fin du Seed runway pour aborder le roadshow Série A avec un certificat déjà signé.
- SOC 2 Type II — requiert une période d'observation de 6 mois ; à lancer immédiatement après ISO 27001 afin d'obtenir le certificat au moment Série B.
- **Chemin critique :** Phase 0 + Phase 1 (FSTEC) — 11 mois → lancement Étape 1 — 12–18 mois après Seed.

## 6. Documents liés

- `01_Техническая_документация/05_Безопасность_и_КИИ.md` — détails du design technique
- `_Compliance/Compliance_Matrix.md` (préparé dans la tâche #73) — matrice de conformité globale
- `15_RFP_международная_верификация/01_Vendor_DD_Big4/` — lien avec la tax/financial DD sur la préférence IT

## 7. Bilan

- **Set minimal pour l'Étape 1 :** FSTEC KII-1 + attestation Banque de Russie (10–20 M ₽, 14 mois)
- **Set complet pour la levée internationale :** + ISO 27001 + SOC 2 Type II (18–30 M ₽ USD-eq, 22 mois)
- **Set étendu :** + ISO 27017/27018 + PCI-DSS + CSA STAR (25–45 M ₽ USD-eq, 24 mois)

Financement depuis le tour Seed : prévoir une ligne « Security & Compliance Certification » dans le Use of Funds — 0,5–1,0 M USD sur les deux premières années.

---

**Date :** 24.05.2026
**Auteur :** A.-Kh. A. Kaguirov (certificat de dépôt n° 4011265 du 19.12.2024)
**Référence engagement :** RSFSR-CERT-2026
