# API et intégrations

## CPFSR — application mobile

**Identifiant :** РСФСР.МП.07.API

---

## 1. Principes d'interaction

- Architecture REST, formats JSON.
- Authentification : OAuth 2.1 (PKCE) + JWT avec signature GOST.
- TLS 1.3 avec certificats GOST (KriptoPro TLS).
- mTLS pour les opérations critiques.
- Rate limiting côté serveur : 100 requêtes par minute par utilisateur.

## 2. URL de base

| Environnement | URL |
|---|---|
| Production | `https://api.dp-rsfsr.ru/v1` |
| Staging | `https://api-staging.dp-rsfsr.ru/v1` |
| Pre-production | `https://api-pre.dp-rsfsr.ru/v1` |

## 3. Authentification

### POST /auth/esia/init
Initialisation de l'autorisation via ESIA.

**Requête :**
```json
{
  "redirect_uri": "ru.rsfsr.app://auth/callback",
  "code_challenge": "...",
  "code_challenge_method": "S256"
}
```

**Réponse :**
```json
{
  "authorize_url": "https://esia.gosuslugi.ru/aas/oauth2/v3/ac?..."
}
```

### POST /auth/esia/callback
Finalisation de l'autorisation via ESIA.

**Requête :**
```json
{ "code": "...", "code_verifier": "..." }
```

**Réponse :**
```json
{
  "access_token": "...",
  "refresh_token": "...",
  "expires_in": 900,
  "user": { "id": "...", "fio": "..." }
}
```

### POST /auth/refresh
Rafraîchissement du access-token.

### POST /auth/biometric
Autorisation via EBS.

### POST /auth/logout
Terminaison de la session.

## 4. Profil utilisateur

### GET /me
Obtention des données de l'utilisateur courant.

### PATCH /me
Mise à jour des coordonnées et paramètres.

### POST /me/kyc
Passage de la vérification KYC.

### GET /me/documents
Liste des documents de l'utilisateur.

## 5. Actifs

### GET /assets
Liste des actifs de l'utilisateur avec filtrage et pagination.

**Paramètres de requête :**
- `type` — type d'actif (real, land, vehicle, ip, securities).
- `status` — statut (draft, valuation, active, returned).
- `page`, `limit`.

### POST /assets
Soumission d'un nouvel actif en garantie.

**Requête :**
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
Obtention d'informations détaillées sur l'actif.

### POST /assets/{id}/valuation
Demande d'évaluation d'un actif.

### GET /assets/{id}/valuation
Obtention du résultat de l'évaluation.

### DELETE /assets/{id}
Retrait de la demande (statut draft uniquement).

## 6. Contrats intelligents

### POST /contracts
Création d'un contrat intelligent sur la base d'un actif évalué.

**Requête :**
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
Obtention du texte du contrat intelligent en PDF et de ses paramètres.

### POST /contracts/{id}/sign
Signature du contrat intelligent.

**Requête :**
```json
{
  "signature_method": "uke",
  "uke_token": "...",
  "otp_code": "742369"
}
```

### POST /contracts/{id}/cancel
Retrait d'un contrat signé (uniquement avant l'émission de l'AFN).

## 7. Actifs financiers numériques

### GET /cfas
Liste des AFN de l'utilisateur.

### GET /cfas/{id}
Fiche AFN avec conditions, versements, statut à la Banque de Russie.

### POST /cfas/{id}/exchange-request
Demande d'échange d'AFN (anticipée).

### GET /cfas/{id}/contract.pdf
Téléchargement du texte du contrat intelligent.

### GET /cfas/{id}/events
Historique des événements sur l'AFN (émission, échange, versements, sinistres).

## 8. Revenus et historique

### GET /income
Synthèse des revenus sur la période.

**Paramètres de requête :**
- `from`, `to` — plage de dates.
- `cfa_id` — filtre par AFN spécifique.

### GET /income/chart
Données pour le graphique des recettes mensuelles.

### GET /transactions
Historique complet des opérations.

### GET /transactions/{id}
Informations détaillées sur une transaction.

### GET /tax-receipt
Téléchargement de l'attestation fiscale 2-NDFL pour la période indiquée.

## 9. Notifications

### GET /notifications
Liste des notifications de l'utilisateur.

### PATCH /notifications/{id}
Changement du statut d'une notification (mark as read).

### POST /notifications/mark-all-read
Marquer tout comme lu.

### POST /notifications/subscriptions
Abonnement aux push-notifications via FCM/APNS.

**Requête :**
```json
{
  "platform": "fcm",
  "token": "...",
  "device_id": "..."
}
```

## 10. Documents

### GET /documents
Catalogue des documents publics de la plateforme.

### GET /documents/{id}
Téléchargement d'un document dans le format choisi (PDF, HTML, DOCX).

## 11. Support

### POST /support/ticket
Création d'une demande de support.

### GET /support/tickets
Historique des demandes de l'utilisateur.

### POST /support/chat
Message dans le chat de support.

## 12. Intégrations avec les systèmes d'État

### 12.1. ESIA (Gosuslugi)
- **Norme :** OAuth 2.1 + OpenID Connect 1.0.
- **Niveau du compte :** Confirmé (UZ-3).
- **Scopes reçus :** `openid`, `fullname`, `birthdate`, `gender`, `snils`, `inn`, `id_doc`, `email`, `mobile`.

### 12.2. Système biométrique unifié
- **Norme :** Règlement de la Banque de Russie N° 482-P.
- **Types de biométrie :** visage, voix.
- **Objet :** identification et confirmation des opérations.

### 12.3. EGRN (Rosreestr)
- **Norme :** Règlement d'interaction électronique avec Rosreestr (via le côté serveur de la plateforme).
- **Scénarios :** obtention d'informations sur un objet par numéro cadastral ; enregistrement et levée des charges.

### 12.4. Gosuslugi (espace personnel)
- **Objet :** réception des notifications officielles ; transmission des consentements au traitement des données personnelles.
- **Scénarios :** notifications de charge, d'échange, de versements.

### 12.5. NSPK (Mir)
- **Objet :** imputation des versements sur la carte « Mir ».

## 13. Formats d'erreurs

Toutes les erreurs sont renvoyées dans un format unifié :

```json
{
  "error": {
    "code": "ASSET-01",
    "message": "Objet non trouvé dans EGRN",
    "details": {
      "kadastr": "..."
    },
    "trace_id": "..."
  }
}
```

## 14. Versionnage de l'API

- Version dans l'URL : `/v1/`, `/v2/`, ...
- Maintien de la compatibilité descendante pendant 12 mois après la sortie d'une nouvelle version.
- Notifications de deprecation via les headers de réponse.

## 15. Documentation de l'API

- Spécification OpenAPI 3.1 : `https://api.dp-rsfsr.ru/openapi.json`.
- Swagger UI : `https://api.dp-rsfsr.ru/docs`.
- Collection Postman : disponible sur demande pour les partenaires et intégrateurs.
