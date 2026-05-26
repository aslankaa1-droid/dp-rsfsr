# DLT register of DFAs in CPFSR

The document describes the architecture of the distributed register of issue and circulation of digital financial assets based on a domestic DLT platform in compliance with the requirements of FZ-259, Bank of Russia Regulations No. 779-P and No. 780-P.

---

## 1. Technological basis

- The underlying DLT platform — a Russian certified system of the "Masterchain" class or equivalent (the specific vendor is agreed with the Bank of Russia at the pilot stage).
- Register architecture — **permissioned DLT** (a closed, trusted register with a known node composition).
- Consensus algorithm — Practical Byzantine Fault Tolerance (PBFT) or its domestic analogue (RAFT with finality guarantee).
- Cryptography: GOST R 34.10-2012 (signature), GOST R 34.11-2012 (hash).
- Transaction finality — deterministic (not probabilistic), which distinguishes it from public blockchains.

## 2. Composition of register nodes

| Node type | Number (minimum) | Owner |
|---|---|---|
| Operator node (with write right) | 3 (geo-distribution across 3 data centres) | CPFSR operator |
| Regulator node (read-only + oversight) | 1 | Bank of Russia |
| Treasury node (read + confirmation of targeted operations) | 1 | Federal Treasury |
| Partner node (valuers, insurers) | 2+ (per number of accredited partners) | Partners |

All nodes are connected by secured channels (ViPNet). The composition of nodes is approved by the Bank of Russia.

## 3. DFA token structure

Each DFA token is a record with the attributes:

| Attribute | Type | Description |
|---|---|---|
| `cfa_id` | string | Unique identifier `cfa-{hash6}-rsfsr-{year}-{seq}`. |
| `owner_id` | string | Mortgagor identifier (linked to ESIA). |
| `operator_id` | string | Identifier of the issuing operator. |
| `cb_holder` | string | Confirmation of receipt by the Bank of Russia. |
| `treasury_recipient` | string | Identifier of the recipient of funds in the Federal Treasury. |
| `asset_type` | enum | Property type (REAL_ESTATE, VEHICLE, IP, SECURITIES). |
| `asset_ref` | object | External reference to the asset (cadastral number, VIN, Rospatent ID, ISIN). |
| `valuation` | money | Appraisal value, RUB. |
| `nominal` | money | DFA par value, RUB (by default ≤ 50% of the appraisal). |
| `currency` | string | RUB (including the digital rouble). |
| `term_months` | int | Validity term in months. |
| `issue_date` | date | Issue date. |
| `maturity_date` | date | Maturity date. |
| `reward_rate` | decimal | Reward rate for the owner, % per annum. |
| `target_program` | string | Identifier of the national project / federal programme. |
| `insurance` | object | Insurance details (IC, policy, sum). |
| `obremenenie_egrn` | string | Identifier of the encumbrance record in EGRN. |
| `smart_contract_hash` | string | GOST R 34.11-2012 hash of the smart contract text. |
| `status` | enum | DFA state (see the states table below). |
| `events` | array | Event log (with UKEP signatures). |
| `mena_history` | array | History of exchanges with previous and new objects. |
| `audit_signature` | string | Operator's UKEP (GOST 34.10). |

## 4. DFA states

```
DRAFT
  ↓ (after valuation and insurance)
VALUED
  ↓ (after signing of the smart contract by the owner)
CONTRACT_SIGNED
  ↓ (after registration of the encumbrance in EGRN)
ISSUED
  ↓ (after transfer to the Bank of Russia)
TRANSFERRED_TO_CB
  ↓ (after confirmation of the emission)
ACTIVE
  ↓ ↓ ↓ ↓
  REINVESTED  — the owner has extended and re-issued the DFA.
  RETURNED    — the term has expired, the encumbrance has been removed, the property has been returned.
  INSURED_CASE — an insurance event has occurred, an insurance DFA has been issued.
  MENA_DONE   — an exchange has been performed for a DFA of a constructed object.
```

Each transition is an event in the register, immutable, with the signatures of operators and regulators.

## 5. DFA smart contract

### 5.1. Essential conditions (based on Art. 4 of FZ-259)

1. Parties.
2. Asset identifier and its valuation.
3. Par value and term of the DFA.
4. Conditions of use: targeted purpose (national project).
5. Amount and procedure for the payment of fees to the operator.
6. Amount and procedure of the reward for the owner.
7. Risk insurance conditions.
8. Conditions of the exchange for the DFA of the constructed object.
9. Procedure for signing the Mutual Settlement Act.
10. Procedure for the removal of the encumbrance.

### 5.2. Smart contract events
- `ON_ISSUE` — issue.
- `ON_CB_RECEIPT` — receipt by the Bank of Russia.
- `ON_EMISSION_CONFIRMED` — confirmation of emission against the DFA.
- `ON_QUARTERLY_REWARD` — quarterly reward payment.
- `ON_INSURANCE_CASE` — insurance event.
- `ON_MENA_REQUEST` — exchange request.
- `ON_MENA_DONE` — exchange completed.
- `ON_RETURN` — return of property to the owner.
- `ON_REINVESTMENT` — reinvestment.

### 5.3. Legal nature
- The smart contract is a **legally binding contract** within the meaning of Arts. 309–310 of the Civil Code and Art. 4 of FZ-259.
- Signature — UKEP under GOST R 34.10-2012 of the owner of the asset (via ESIA), the operator, the Bank of Russia and the insurance company.
- Technological execution — automatic (event-driven).

## 6. Prohibition of free DFA circulation (a key requirement of the concept)

Software prohibitions are implemented in the smart contract:

1. **Transfer of the DFA** — only from the operator to the Bank of Russia and from the Bank of Russia to the operator (for an exchange / return).
2. **Realisation of the DFA** — the Bank of Russia is not entitled to realise the DFA to participants of the securities or digital asset markets.
3. **Use of the DFA outside its purpose** — programmatically impossible; `ON_DISPOSAL_OUT_OF_SCOPE` events are rejected by consensus.

These prohibitions are technically embedded in the smart contract and controlled by the Bank of Russia regulator node.

## 7. Link to the Bank of Russia emission circuit

- After the `ON_CB_RECEIPT` event the platform sends a request to the Bank of Russia digital rouble platform for the emission of funds against the DFA par value.
- Confirmation of the emission (event `ON_EMISSION_CONFIRMED`) is recorded in the register.
- The funds are credited to a special escrow account / digital wallet of the Bank of Russia with a targeted designation.
- The transfer to the Federal Treasury is a separate event `ON_TREASURY_FUNDING`.

## 8. Audit and immutability

- All events are signed with UKEP.
- Each block of the register contains the hash of the previous one (chain of trust).
- The full history of each DFA is available to the Bank of Russia in real time.
- External audit of the register is conducted annually by an accredited audit organisation.

## 9. Performance

| Parameter | Value |
|---|---|
| Throughput | ≥ 200 transactions/sec |
| Finality | ≤ 3 sec (deterministic) |
| Latency for read operations | ≤ 100 ms |
| Register size | Up to 100 GB in the first year, then +200–400 GB/year |

## 10. Redundancy and DR

- The register is synchronously replicated across 3 operator data centres.
- Full backup — daily, stored for 10 years.
- Restore testing — quarterly.

## 11. Regulatory reporting on the register

- Regular snapshots of the register are transmitted to the Bank of Russia.
- On a regulator's request — full export of the history of a specific DFA in the established format.
- Reports to Rosfinmonitoring on suspicious operations — automatically.

## 12. Node management

- Full replacement of a node's key pair — once every 3 years.
- Addition of new partner nodes — by decision of the operators' board with confirmation by the Bank of Russia.
- Removal of a node (in case of revocation of a partner's licence) — under regulation, with archiving of its historical records.
