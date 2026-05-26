# Registre DLT des AFN dans CPFSR

Le document décrit l'architecture du registre distribué d'émission et de circulation des actifs financiers numériques sur la base d'une plateforme DLT nationale, conformément aux exigences de FZ-259, des règlements de la Banque de Russie N° 779-P et N° 780-P.

---

## 1. Base technologique

- Plateforme DLT de base — un système russe certifié de la classe « Masterchain » ou équivalent (le fournisseur spécifique est convenu avec la Banque de Russie au stade pilote).
- Architecture du registre — **DLT permissioned** (registre fermé et de confiance avec une composition de nœuds connue).
- Algorithme de consensus — Practical Byzantine Fault Tolerance (PBFT) ou son analogue national (RAFT avec garantie de finalité).
- Cryptographie : GOST R 34.10-2012 (signature), GOST R 34.11-2012 (hachage).
- Finalité des transactions — déterministe (et non probabiliste), ce qui la distingue des blockchains publiques.

## 2. Composition des nœuds du registre

| Type de nœud | Nombre (minimum) | Propriétaire |
|---|---|---|
| Nœud opérateur (avec droit d'écriture) | 3 (géo-distribution sur 3 centres de données) | Opérateur CPFSR |
| Nœud régulateur (read-only + supervision) | 1 | Banque de Russie |
| Nœud du Trésor (lecture + confirmation des opérations ciblées) | 1 | Trésor fédéral |
| Nœud partenaire (évaluateurs, assureurs) | 2+ (selon le nombre de partenaires accrédités) | Partenaires |

Tous les nœuds sont reliés par des canaux sécurisés (ViPNet). La composition des nœuds est approuvée par la Banque de Russie.

## 3. Structure du jeton AFN

Chaque jeton AFN est un enregistrement comportant les attributs suivants :

| Attribut | Type | Description |
|---|---|---|
| `cfa_id` | chaîne | Identifiant unique `cfa-{hash6}-rsfsr-{year}-{seq}`. |
| `owner_id` | chaîne | Identifiant du débiteur sur gage (lié à ESIA). |
| `operator_id` | chaîne | Identifiant de l'opérateur-émetteur. |
| `cb_holder` | chaîne | Confirmation de réception par la Banque de Russie. |
| `treasury_recipient` | chaîne | Identifiant du destinataire des fonds au Trésor fédéral. |
| `asset_type` | enum | Type de bien (REAL_ESTATE, VEHICLE, IP, SECURITIES). |
| `asset_ref` | objet | Référence externe au bien (numéro cadastral, VIN, ID Rospatent, ISIN). |
| `valuation` | money | Valeur d'évaluation, RUB. |
| `nominal` | money | Valeur nominale de l'AFN, RUB (par défaut ≤ 50 % de l'évaluation). |
| `currency` | chaîne | RUB (y compris le rouble numérique). |
| `term_months` | int | Durée de validité en mois. |
| `issue_date` | date | Date d'émission. |
| `maturity_date` | date | Date d'échéance. |
| `reward_rate` | décimal | Taux de rémunération du propriétaire, % par an. |
| `target_program` | chaîne | Identifiant du projet national / programme fédéral. |
| `insurance` | objet | Informations d'assurance (CI, police, montant). |
| `obremenenie_egrn` | chaîne | Identifiant de l'enregistrement de la charge dans EGRN. |
| `smart_contract_hash` | chaîne | Empreinte GOST R 34.11-2012 du texte du contrat intelligent. |
| `status` | enum | État de l'AFN (voir le tableau des états ci-dessous). |
| `events` | array | Journal des événements (avec signatures UKEP). |
| `mena_history` | array | Historique des échanges avec les objets précédents et nouveaux. |
| `audit_signature` | chaîne | UKEP de l'opérateur (GOST 34.10). |

## 4. États de l'AFN

```
DRAFT
  ↓ (après évaluation et assurance)
VALUED
  ↓ (après signature du contrat intelligent par le propriétaire)
CONTRACT_SIGNED
  ↓ (après enregistrement de la charge dans EGRN)
ISSUED
  ↓ (après transfert à la Banque de Russie)
TRANSFERRED_TO_CB
  ↓ (après confirmation de l'émission)
ACTIVE
  ↓ ↓ ↓ ↓
  REINVESTED   — le propriétaire a prolongé et ré-émis l'AFN.
  RETURNED     — la durée a expiré, la charge a été levée, le bien a été restitué.
  INSURED_CASE — un sinistre d'assurance s'est produit, un AFN d'assurance a été émis.
  MENA_DONE    — un échange a eu lieu contre un AFN d'un objet construit.
```

Chaque transition est un événement dans le registre, immuable, avec les signatures des opérateurs et des régulateurs.

## 5. Contrat intelligent de l'AFN

### 5.1. Conditions essentielles (au titre de l'art. 4 de FZ-259)

1. Parties.
2. Identifiant de l'actif et son évaluation.
3. Valeur nominale et durée de l'AFN.
4. Conditions d'utilisation : finalité ciblée (projet national).
5. Montant et modalités de paiement des commissions à l'opérateur.
6. Montant et modalités de rémunération du propriétaire.
7. Conditions d'assurance des risques.
8. Conditions d'échange contre l'AFN de l'objet construit.
9. Modalités de signature de l'Acte de règlements mutuels.
10. Modalités de levée de la charge.

### 5.2. Événements du contrat intelligent
- `ON_ISSUE` — émission.
- `ON_CB_RECEIPT` — réception par la Banque de Russie.
- `ON_EMISSION_CONFIRMED` — confirmation de l'émission contre l'AFN.
- `ON_QUARTERLY_REWARD` — paiement trimestriel de la rémunération.
- `ON_INSURANCE_CASE` — sinistre d'assurance.
- `ON_MENA_REQUEST` — demande d'échange.
- `ON_MENA_DONE` — échange réalisé.
- `ON_RETURN` — restitution du bien au propriétaire.
- `ON_REINVESTMENT` — réinvestissement.

### 5.3. Nature juridique
- Le contrat intelligent est un **contrat juridiquement contraignant** au sens des art. 309–310 du Code civil et de l'art. 4 de FZ-259.
- Signature — UKEP au titre de GOST R 34.10-2012 du propriétaire du bien (via ESIA), de l'opérateur, de la Banque de Russie et de la compagnie d'assurance.
- Exécution technologique — automatique (event-driven).

## 6. Interdiction de la libre circulation de l'AFN (exigence clé du concept)

Des interdictions logicielles sont implémentées dans le contrat intelligent :

1. **Transfert de l'AFN** — uniquement de l'opérateur à la Banque de Russie et de la Banque de Russie à l'opérateur (en vue d'un échange / retour).
2. **Réalisation de l'AFN** — la Banque de Russie n'a pas le droit de réaliser l'AFN auprès des acteurs du marché des valeurs mobilières ou des actifs numériques.
3. **Utilisation de l'AFN hors de son objet** — programmatiquement impossible ; les événements `ON_DISPOSAL_OUT_OF_SCOPE` sont rejetés par consensus.

Ces interdictions sont techniquement intégrées au contrat intelligent et contrôlées par le nœud régulateur de la Banque de Russie.

## 7. Lien avec le circuit d'émission de la Banque de Russie

- Après l'événement `ON_CB_RECEIPT`, la plateforme envoie une requête à la plateforme du rouble numérique de la Banque de Russie pour l'émission de fonds en regard de la valeur nominale de l'AFN.
- La confirmation de l'émission (événement `ON_EMISSION_CONFIRMED`) est consignée dans le registre.
- Les fonds sont crédités sur un compte escrow spécial / portefeuille numérique de la Banque de Russie avec une destination ciblée.
- Le transfert vers le Trésor fédéral est un événement distinct `ON_TREASURY_FUNDING`.

## 8. Audit et immutabilité

- Tous les événements sont signés par UKEP.
- Chaque bloc du registre contient l'empreinte du précédent (chain of trust).
- L'historique complet de chaque AFN est accessible à la Banque de Russie en temps réel.
- L'audit externe du registre est réalisé annuellement par un organisme d'audit accrédité.

## 9. Performance

| Paramètre | Valeur |
|---|---|
| Débit | ≥ 200 transactions/sec |
| Finalité | ≤ 3 sec (déterministe) |
| Latence pour les opérations de lecture | ≤ 100 ms |
| Taille du registre | Jusqu'à 100 Go la première année, puis +200–400 Go/an |

## 10. Redondance et DR

- Le registre est répliqué de manière synchrone sur 3 centres de données de l'opérateur.
- Sauvegarde complète — quotidienne, conservée 10 ans.
- Tests de restauration — trimestriels.

## 11. Reporting réglementaire sur le registre

- Des instantanés réguliers du registre sont transmis à la Banque de Russie.
- Sur demande du régulateur — export complet de l'historique d'un AFN spécifique au format établi.
- Rapports à Rosfinmonitoring sur les opérations suspectes — automatiquement.

## 12. Gestion des nœuds

- Remplacement complet de la paire de clés d'un nœud — tous les 3 ans.
- Ajout de nouveaux nœuds partenaires — par décision du conseil des opérateurs avec confirmation par la Banque de Russie.
- Suppression d'un nœud (en cas de retrait de licence d'un partenaire) — selon règlement, avec archivage de ses enregistrements historiques.
