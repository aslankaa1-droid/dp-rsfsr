# API والتكاملات

## CPFSR — تطبيق الهاتف المحمول

**الرمز:** РСФСР.МП.07.API

---

## 1. مبادئ التفاعل

- بنية REST، صيغ JSON.
- المصادقة: OAuth 2.1 (PKCE) + JWT بتوقيع GOST.
- TLS 1.3 بشهادات GOST (KriptoPro TLS).
- mTLS للعمليات الحرجة.
- تحديد المعدل من جانب الخادم: 100 طلب في الدقيقة لكل مستخدم.

## 2. عناوين URL الأساسية

| البيئة | URL |
|---|---|
| Production | `https://api.dp-rsfsr.ru/v1` |
| Staging | `https://api-staging.dp-rsfsr.ru/v1` |
| Pre-production | `https://api-pre.dp-rsfsr.ru/v1` |

## 3. المصادقة

### POST /auth/esia/init
بدء الترخيص عبر ESIA.

**الطلب:**
```json
{
  "redirect_uri": "ru.rsfsr.app://auth/callback",
  "code_challenge": "...",
  "code_challenge_method": "S256"
}
```

**الاستجابة:**
```json
{
  "authorize_url": "https://esia.gosuslugi.ru/aas/oauth2/v3/ac?..."
}
```

### POST /auth/esia/callback
إكمال الترخيص عبر ESIA.

**الطلب:**
```json
{ "code": "...", "code_verifier": "..." }
```

**الاستجابة:**
```json
{
  "access_token": "...",
  "refresh_token": "...",
  "expires_in": 900,
  "user": { "id": "...", "fio": "..." }
}
```

### POST /auth/refresh
تحديث رمز الوصول.

### POST /auth/biometric
الترخيص عبر EBS.

### POST /auth/logout
إنهاء الجلسة.

## 4. الملف الشخصي للمستخدم

### GET /me
الحصول على بيانات المستخدم الحالي.

### PATCH /me
تحديث بيانات الاتصال والإعدادات.

### POST /me/kyc
اجتياز فحص KYC.

### GET /me/documents
قائمة مستندات المستخدم.

## 5. الأصول

### GET /assets
قائمة أصول المستخدم مع التصفية والترقيم.

**معاملات الطلب:**
- `type` — نوع الأصل (real، land، vehicle، ip، securities).
- `status` — الحالة (draft، valuation، active، returned).
- `page`، `limit`.

### POST /assets
تقديم أصل جديد كضمان.

**الطلب:**
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
الحصول على معلومات تفصيلية عن الأصل.

### POST /assets/{id}/valuation
طلب تقييم الأصل.

### GET /assets/{id}/valuation
الحصول على نتيجة التقييم.

### DELETE /assets/{id}
سحب الطلب (لحالة draft فقط).

## 6. العقود الذكية

### POST /contracts
إنشاء عقد ذكي بناءً على أصل مُقيَّم.

**الطلب:**
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
الحصول على نص العقد الذكي بصيغة PDF ومعالمه.

### POST /contracts/{id}/sign
توقيع العقد الذكي.

**الطلب:**
```json
{
  "signature_method": "uke",
  "uke_token": "...",
  "otp_code": "742369"
}
```

### POST /contracts/{id}/cancel
سحب عقد موقَّع (فقط قبل إصدار DFA).

## 7. الأصول المالية الرقمية

### GET /cfas
قائمة DFA للمستخدم.

### GET /cfas/{id}
بطاقة DFA بالشروط والمدفوعات وحالة بنك روسيا.

### POST /cfas/{id}/exchange-request
طلب تبادل DFA (مبكر).

### GET /cfas/{id}/contract.pdf
تنزيل نص العقد الذكي.

### GET /cfas/{id}/events
سجل أحداث DFA (الإصدار، التبادل، المدفوعات، حالات التأمين).

## 8. الدخل والسجل

### GET /income
ملخص الدخل خلال الفترة.

**معاملات الطلب:**
- `from`، `to` — نطاق التواريخ.
- `cfa_id` — تصفية حسب DFA محدد.

### GET /income/chart
بيانات للرسم البياني للمقبوضات الشهرية.

### GET /transactions
السجل الكامل للعمليات.

### GET /transactions/{id}
معلومات تفصيلية عن المعاملة.

### GET /tax-receipt
تنزيل الشهادة الضريبية 2-NDFL عن الفترة المحدَّدة.

## 9. الإشعارات

### GET /notifications
قائمة إشعارات المستخدم.

### PATCH /notifications/{id}
تغيير حالة الإشعار (mark as read).

### POST /notifications/mark-all-read
وضع علامة قراءة على الكل.

### POST /notifications/subscriptions
الاشتراك في إشعارات push عبر FCM/APNS.

**الطلب:**
```json
{
  "platform": "fcm",
  "token": "...",
  "device_id": "..."
}
```

## 10. المستندات

### GET /documents
كتالوج المستندات العامة للمنصة.

### GET /documents/{id}
تنزيل المستند بالصيغة المختارة (PDF، HTML، DOCX).

## 11. الدعم

### POST /support/ticket
إنشاء طلب دعم.

### GET /support/tickets
سجل طلبات المستخدم.

### POST /support/chat
رسالة في محادثة الدعم.

## 12. التكاملات مع نظم الدولة

### 12.1. ESIA (Gosuslugi)
- **المعيار:** OAuth 2.1 + OpenID Connect 1.0.
- **مستوى الحساب:** مؤكَّد (UZ-3).
- **النطاقات (scopes) المستلمة:** `openid`، `fullname`، `birthdate`، `gender`، `snils`، `inn`، `id_doc`، `email`، `mobile`.

### 12.2. النظام البيومتري الموحَّد
- **المعيار:** نظام بنك روسيا رقم 482-P.
- **أنواع البيومترية:** الوجه، الصوت.
- **الغرض:** التعريف وتأكيد العمليات.

### 12.3. EGRN (Rosreestr)
- **المعيار:** لائحة التفاعل الإلكتروني مع Rosreestr (عبر الجزء الخادم للمنصة).
- **السيناريوهات:** الحصول على معلومات الكائن حسب الرقم المساحي؛ تسجيل التقييدات ورفعها.

### 12.4. Gosuslugi (الحساب الشخصي)
- **الغرض:** تلقي الإشعارات الرسمية؛ نقل الموافقات على معالجة البيانات الشخصية.
- **السيناريوهات:** إشعارات التقييد والتبادل والمدفوعات.

### 12.5. NSPK (Mir)
- **الغرض:** قيد المدفوعات على بطاقة «Mir».

## 13. صيغ الأخطاء

تُرجَع جميع الأخطاء بصيغة موحَّدة:

```json
{
  "error": {
    "code": "ASSET-01",
    "message": "لم يُعثَر على الكائن في EGRN",
    "details": {
      "kadastr": "..."
    },
    "trace_id": "..."
  }
}
```

## 14. إصدارات API

- النسخة في URL: `/v1/`، `/v2/`، ...
- الحفاظ على التوافق العكسي لمدة 12 شهراً بعد إصدار نسخة جديدة.
- إشعارات الـ deprecation عبر response headers.

## 15. توثيق API

- مواصفات OpenAPI 3.1: `https://api.dp-rsfsr.ru/openapi.json`.
- Swagger UI: `https://api.dp-rsfsr.ru/docs`.
- مجموعة Postman: متاحة عند الطلب للشركاء والمكاملين.
