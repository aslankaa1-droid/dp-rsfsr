# Matrice de conformité internationale

**Projet :** CPFSR · **Référence engagement :** RSFSR-COMP-2026 · **Date :** 24.05.2026
**Auteur :** A.-Kh. A. Kaguirov (certificat de dépôt n° 4011265 du 19.12.2024)

Matrice de mise en conformité du projet CPFSR avec les cadres réglementaires et sectoriels internationaux. Utilisée dans la data room pour le vendor DD tier-1 et dans le memorandum investisseur.

---

## 1. Reporting financier

| Norme | Statut | Écart | Feuille de route | Responsable |
|---|---|---|---|---|
| **RAS** (normes comptables russes — obligatoires en FR) | Sera mis en œuvre dès l'immatriculation de la personne morale | n/a | T+0 (avec l'immatriculation) | DF |
| **IFRS 9** (Instruments financiers) | Non mis en œuvre | Méthodologie de classification des DFA au stade DRAFT | T+6 mois | DF + auditeur |
| **IFRS 13** (Évaluation à la juste valeur) | Non mis en œuvre | Requise pour la valorisation des DFA en Level 3 | T+6 mois (avec le VDD) | DF + Big-4 VDD |
| **IFRS 15** (Reconnaissance du revenu) | Non mis en œuvre | Le modèle de revenu à 5 streams exige un sequencing IFRS 15 | T+6 mois | DF |
| **IFRS 16** (Contrats de location) | Non mis en œuvre | Data centers + bureaux — operating vs finance lease | T+6 mois | DF |
| **IFRS 7** (Informations financières) | Non mis en œuvre | Cadre de gestion des risques + sensibilité | T+12 mois | DF + Comité des risques |

## 2. Vie privée et protection des données

| Norme | Applicabilité | Statut | Écart | Feuille de route |
|---|---|---|---|---|
| **152-FZ « Sur les données à caractère personnel »** (FR) | Obligatoire | Selon la politique dans `09_Мобильное_приложение/Публикация_RuStore/02_Политика_конфиденциальности.md` | Prêt | n/a |
| **RGPD (Règlement UE 2016/679)** | Si non-résidents UE | Prêt via Privacy by Design | Nomination du DPO ; AIPD formelle | T+6 mois |
| **UK Data Protection Act 2018** | Si LP britannique | Similaire au RGPD (UK-GDPR) | Idem | T+6 mois |
| **California CCPA / CPRA** | Si LP américain | Non critique | Disclosures sur demande | T+12 mois |
| **LGPD brésilien** | Non applicable | n/a | n/a | n/a |
| **PDPA (Singapour)** | Si LP singapourien | Non critique | Mapping du cadre privacy | T+12 mois |

## 3. Sécurité de l'information

| Norme | Applicabilité | Statut | Feuille de route |
|---|---|---|---|
| **FSTEC KII-1** (FR) | **Obligatoire** pour l'infrastructure financière | En cours | T+8 mois (voir `15_RFP_международная_верификация/03_IT_Сертификация/Roadmap_SOC2_ISO27001_ФСТЭК.md`) |
| **ISO/CEI 27001:2022** | Souhaitable pour LP | Non démarré | T+14 mois |
| **ISO/CEI 27017:2015** (cloud) | Optionnel | Non démarré | T+16 mois |
| **ISO/CEI 27018:2019** (PII dans le cloud) | Optionnel | Non démarré | T+16 mois |
| **SOC 2 Type II** (AICPA) | Souhaitable pour LP internationaux | Non démarré | T+18 mois |
| **CSA STAR Level 2** | Optionnel | Non démarré | T+18 mois |
| **PCI-DSS Level 1** | Si paiements carte | Non applicable en Étape 1 | T+24 mois (le cas échéant) |
| **Cadre NIST de cybersécurité** | Référence | Sera appliqué comme guideline | Cross-mapping vers FSTEC + ISO 27001 |

## 4. LBC / FT / Lutte contre le terrorisme

| Norme | Applicabilité | Statut | Écart | Feuille de route |
|---|---|---|---|---|
| **115-FZ « Sur la lutte contre la légalisation »** | Obligatoire | Partie intégrante du cadre juridique | Mise en œuvre du KYC via le Système biométrique unifié / ESIA (règlement BCR 375-P) | T+6 mois |
| **Recommandations du GAFI (40)** | Référence | Prêt via 115-FZ + art. 859 CC | Mapping complet vers les recommandations du GAFI | T+12 mois |
| **AMLD5 + AMLD6 (UE)** | Si LP UE | Non critique en Étape 1 | Mapping dans les matériaux DD | T+18 mois |
| **Travel Rule du GAFI (rec. 16) pour les DFA** | Applicable aux transferts inter-juridictionnels | Non applicable en Étape 1 | Mise en œuvre à l'horizon Étape 2 | T+30 mois |
| **OFAC SDN List screening** | Si contreparties internationales | Prêt via KYC + outil de screening | Intégration Bridger Insight / WorldCheck | T+12 mois |

## 5. Fiscalité et transparence fiscale

| Norme | Applicabilité | Statut |
|---|---|---|
| **CI art. 149 al. 12.2** (exonération de TVA pour les DFA) | S'applique | Intégré au modèle financier |
| **CI art. 34.2** (régime fiscal des valeurs mobilières) | S'applique | Intégré |
| **Taux préférentiel IT du CI à 5 % jusqu'au 31.12.2030** | Avec accréditation IT + ≥ 70 % de revenus IT | Stade feuille de route |
| **FATCA (fiscalité US)** | Si LP US | Conformité via KYC ; reporting à l'IRS le cas échéant |
| **CRS (OCDE Common Reporting Standard)** | Si LP internationaux d'États participants | Conformité via la BCR |
| **OCDE BEPS** (érosion de la base d'imposition) | Référence | Structure transparente sans abus BEPS |
| **Pillar 2 (impôt minimum mondial 15 %)** | Non applicable en Étape 1 (revenu < 750 M €) | Suivi pour l'horizon Étape 2 |

## 6. Investissement / réglementation des valeurs mobilières

| Norme | Applicabilité | Statut |
|---|---|---|
| **259-FZ « Sur les DFA »** (FR) | Fondamental | Fondement du projet |
| **39-FZ « Sur le marché des valeurs mobilières »** (distinction avec les DFA) | S'applique | Avis juridique requis |
| **MiFID II** (UE) | Si LP UE | Non applicable en Étape 1 ; mapping pour l'Étape 2 |
| **SEC Rule 506(c)** (US, accredited investors) | Si LP US | Non applicable en Étape 1 |
| **SEC Reg D** (US private placements) | Si LP US | Non applicable en Étape 1 |
| **Singapore Securities and Futures Act** | Si LP SG | Non applicable en Étape 1 |
| **MAS Payment Services Act (Singapour)** | Si activité SG | Non applicable |
| **MiCA (règlement UE sur les crypto-actifs)** | Référence (benchmark international) | Mapping pour l'horizon Étape 2 |

## 7. Banque / conservation

| Norme | Applicabilité | Statut |
|---|---|---|
| **Bâle III** (BCBS) | Si CPFSR devient une banque (horizon Étape 2) | Non applicable en Étape 1 |
| **Règlement BCR 779-P** | Fondamental (opérateur SI DFA) | Fondement ; via JSC Atomyze en Étape 1 |
| **Directive BCR 4336-U** | Fondamentale (comptabilité des DFA) | Fondement |
| **Code civil RF art. 860.7–860.10** (entiercement) | S'applique | Fondement |
| **161-FZ « Sur le système national de paiement »** | Si payment rail | Stade feuille de route |

## 8. Anti-corruption

| Norme | Applicabilité | Statut |
|---|---|---|
| **273-FZ « Sur la lutte contre la corruption »** (FR) | Obligatoire | Intégré au Governance Pack |
| **UK Bribery Act 2010** | Si LP UK | Intégré au Governance Pack |
| **FCPA (US Foreign Corrupt Practices Act)** | Si LP US | Intégré au Governance Pack |
| **Convention anti-corruption de l'OCDE** | Référence | Conformité |
| **Convention de l'ONU contre la corruption** | Référence | Conformité |

## 9. Travail et droits humains

| Norme | Applicabilité | Statut |
|---|---|---|
| **Code du travail de la FR** | Obligatoire | Fondement |
| **UK Modern Slavery Act 2015** | Si LP UK | Déclaration annuelle dans le Governance Pack |
| **California Transparency in Supply Chains Act** | Si LP US | Prêt |
| **Principes directeurs de l'ONU relatifs aux entreprises et aux droits humains** | Référence | Conformité |
| **Normes fondamentales de l'OIT** | Référence | Conformité |

## 10. ESG et climat

| Norme | Applicabilité | Statut | Feuille de route |
|---|---|---|---|
| **Normes SASB (Software & IT Services + FS)** | S'applique | Adopté dans le Governance Pack | T+12 mois — premier reporting |
| **Cadre TCFD** | Adapté | Adopté | T+12 mois — premier disclosure |
| **Normes GRI (Global Reporting Initiative)** | Optionnel | Mapping préparé | T+18 mois — premier rapport GRI |
| **ESRS (CSRD)** | Si LP UE au-dessus du seuil de taille | Stade feuille de route | T+24 mois |
| **PRI (Principles for Responsible Investment)** | Référence (sélection LP) | Politique adoptée | T+12 mois |
| **SBTi (Science Based Targets initiative)** | Référence | Participation optionnelle | T+24 mois |

## 11. Résilience opérationnelle

| Norme | Applicabilité | Statut |
|---|---|---|
| **ISO 22301 (BCM)** | Recommandé | Stade feuille de route |
| **NIST CSF for Critical Infrastructure** | Référence | Cross-mapping vers FSTEC |
| **Banking Operations Resilience (PRA / FCA)** | Si LP UK / cross-border | Non applicable en Étape 1 |
| **BCE SREP** | Non applicable en Étape 1 | n/a |

## 12. Compliance Officer et reporting

- **Compliance Officer :** nomination obligatoire (fonction distincte du General Counsel).
- **Rattachement :** directement au CA via le Comité des risques.
- **Reporting trimestriel** au CA sur le statut de conformité dans les douze catégories ci-dessus.
- **Annual Compliance Audit** par un auditeur indépendant (Big-4 ou auditeur compliance spécialisé de préférence).
- **Formation compliance** obligatoire pour tous les salariés annuellement.

## 13. Calendrier de conformité

| Trimestre | Activité |
|---|---|
| Q1 | Annual Compliance Review · Comité d'audit · rapport ESG annuel (SASB + TCFD) |
| Q2 | Mise à jour KYC/AML · sanctions screening · revue privacy |
| Q3 | Surveillance ISO 27001 (après la première certification) · audit SOC 2 Type II (continu) |
| Q4 | Clôture fiscale · revue des dépôts réglementaires · mise à jour Modern Slavery Statement |

---

## Bilan

| Maturité par catégorie | Aujourd'hui (début Étape 1) | Cible (T+18 mois) | Cible (Étape 2, T+36 mois) |
|---|:---:|:---:|:---:|
| Reporting financier | 2/10 | 7/10 | 9/10 |
| Vie privée | 5/10 | 8/10 | 9/10 |
| Sécurité de l'information | 3/10 | 8/10 | 9/10 |
| LBC/FT | 5/10 | 8/10 | 9/10 |
| Fiscalité | 7/10 | 8/10 | 9/10 |
| Valeurs mobilières | 6/10 | 8/10 | 9/10 |
| Anti-corruption | 5/10 | 9/10 | 9/10 |
| ESG | 2/10 | 7/10 | 9/10 |
| Résilience opérationnelle | 3/10 | 7/10 | 9/10 |
| **Maturité composite** | **4,2/10** | **7,8/10** | **9,0/10** |

L'état actuel (4,2/10) correspond à une startup pre-Seed à l'échelle internationale ; la cible (7,8/10 sous 18 mois) — Série A institutionnelle ; l'état final (9,0/10 sous 36 mois) — Série B+ international.

---

**Date :** 24.05.2026
**Référence engagement :** RSFSR-COMP-2026
**Center Group Company**
