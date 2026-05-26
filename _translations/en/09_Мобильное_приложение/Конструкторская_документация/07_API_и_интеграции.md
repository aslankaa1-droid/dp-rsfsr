# API and integrations

## CPFSR — mobile application

**Identifier:** РСФСР.МП.07.API

---

## 1. Interaction principles

- REST architecture, JSON formats.
- Authentication: OAuth 2.1 (PKCE) + JWT with GOST signature.
- TLS 1.3 with GOST certificates (KriptoPro TLS).
- mTLS for critical operations.
- Server-side rate limiting: 100 requests per minute per user.

## 2. Base URLs

| Environment | URL |
|---|---|
| Production | `https://api.dp-rsfsr.ru/v1` |
| Staging | `https://api-staging.dp-rsfsr.ru/v1` |
| Pre-production | `https://api-pre.dp-rsfsr.ru/v1` |

## 3. Authentication

### POST /auth/esia/init
Initiates authorisation via ESIA.

**Request:**
```json
{
  "redirect_uri": "ru.rsfsr.app://auth/callback",
  "code_challenge": "...",
  "code_challenge_method": "S256"
}
```

**Response:**
```json
{
  "authorize_url": "https://esia.gosuslugi.ru/aas/oauth2/v3/ac?..."
}
```

### POST /auth/esia/callback
Completes authorisation via ESIA.

**Request:**
```json
{ "code": "...", "code_verifier": "..." }
```

**Response:**
```json
{
  "access_token": "...",
  "refresh_token": "...",
  "expires_in": 900,
  "user": { "id": "...", "fio": "..." }
}
```

### POST /auth/refresh
Refresh of the access token.

### POST /auth/biometric
Authorisation via EBS.

### POST /auth/logout
Session termination.

## 4. User profile

### GET /me
Retrieval of the current user's data.

### PATCH /me
Update of contact details and settings.

### POST /me/kyc
Passage of the KYC check.

### GET /me/documents
List of the user's documents.

## 5. Assets

### GET /assets
List of the user's assets with filtering and pagination.

**Query parameters:**
- `type` — asset type (real, land, vehicle, ip, securities).
- `status` — status (draft, valuation, active, returned).
- `page`, `limit`.

### POST /assets
Submission of a new asset as collateral.

**Request:**
```json
{
  "type": "real",
  "kadastr": "77:01:0001000:1234",
  "address": "...",
  "area": 97,
  "year": 2015,
  "ownership_doc_type": "...",
  "ownership_doc_attachments": ["doc-uuid-1"]
}
```

### GET /assets/{id}
Retrieval of detailed information about the asset.

### POST /assets/{id}/valuation
Request for the valuation of an asset.

### GET /assets/{id}/valuation
Retrieval of the valuation result.

### DELETE /assets/{id}
Withdrawal of the application (only for the draft status).

## 6. Smart contracts

### POST /contracts
Creation of a smart contract based on a valued asset.

**Request:**
```json
{
  "asset_id": "...",
  "term_months": 36,
  "target_programme": "...",
  "rate_pct": 4.2,
  "nominal": 8200000
}
```

### GET /contracts/{id}
Retrieval of the smart contract text in PDF format and its parameters.

### POST /contracts/{id}/sign
Signing of the smart contract.

**Request:**
```json
{
  "signature_method": "uke",
  "uke_token": "...",
  "otp_code": "742369"
}
```

### POST /contracts/{id}/cancel
Withdrawal of a signed contract (only before the DFA issue).

## 7. Digital financial assets

### GET /cfas
List of the user's DFAs.

### GET /cfas/{id}
DFA card with conditions, payments, status at the Bank of Russia.

### POST /cfas/{id}/exchange-request
Request for a DFA exchange (early).

### GET /cfas/{id}/contract.pdf
Download of the smart contract text.

### GET /cfas/{id}/events
History of events on the DFA (issue, exchange, payments, insurance events).

## 8. Income and history

### GET /income
Summary of income over the period.

**Query parameters:**
- `from`, `to` — date range.
- `cfa_id` — filter by a specific DFA.

### GET /income/chart
Data for the chart of monthly receipts.

### GET /transactions
Full operations history.

### GET /transactions/{id}
Detailed information about a transaction.

### GET /tax-receipt
Download of the 2-NDFL tax statement for the specified period.

## 9. Notifications

### GET /notifications
List of the user's notifications.

### PATCH /notifications/{id}
Change of the notification status (mark as read).

### POST /notifications/mark-all-read
Mark all as read.

### POST /notifications/subscriptions
Subscription to push notifications via FCM/APNS.

**Request:**
```json
{
  "platform": "fcm",
  "token": "...",
  "device_id": "..."
}
```

## 10. Documents

### GET /documents
Catalogue of the platform's publicly available documents.

### GET /documents/{id}
Download of a document in the selected format (PDF, HTML, DOCX).

## 11. Support

### POST /support/ticket
Creation of a support request.

### GET /support/tickets
History of the user's requests.

### POST /support/chat
A message in the support chat.

## 12. Integrations with state systems

### 12.1. ESIA (Gosuslugi)
- **Standard:** OAuth 2.1 + OpenID Connect 1.0.
- **Account level:** Confirmed (UZ-3).
- **Scopes received:** `openid`, `fullname`, `birthdate`, `gender`, `snils`, `inn`, `id_doc`, `email`, `mobile`.

### 12.2. Unified Biometric System
- **Standard:** Bank of Russia Regulation No. 482-P.
- **Biometric types:** face, voice.
- **Purpose:** identification and confirmation of operations.

### 12.3. EGRN (Rosreestr)
- **Standard:** Regulation of electronic interaction with Rosreestr (via the platform's server-side).
- **Scenarios:** retrieval of information about an object by cadastral number; registration and removal of encumbrances.

### 12.4. Gosuslugi (personal cabinet)
- **Purpose:** receipt of official notifications; transmission of consents to the processing of personal data.
- **Scenarios:** notifications of encumbrance, exchange, payments.

### 12.5. NSPK (Mir)
- **Purpose:** crediting of payments to the "Mir" card.

## 13. Error formats

All errors are returned in a unified format:

```json
{
  "error": {
    "code": "ASSET-01",
    "message": "Object not found in EGRN",
    "details": {
      "kadastr": "..."
    },
    "trace_id": "..."
  }
}
```

## 14. API versioning

- Version in the URL: `/v1/`, `/v2/`, ...
- Backward compatibility maintained for 12 months after a new version release.
- Deprecation notifications via response headers.

## 15. API documentation

- OpenAPI 3.1 specification: `https://api.dp-rsfsr.ru/openapi.json`.
- Swagger UI: `https://api.dp-rsfsr.ru/docs`.
- Postman collection: available on request to partners and integrators.
