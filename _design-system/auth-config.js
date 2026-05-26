/* =====================================================================
   ЦПФСР.РФ — Auth Config
   Множественные PIN-коды доступа к сайту (каждый — 6 цифр, SHA-256 хеш).
   Любой активный PIN из списка PINS открывает сайт.
   ---------------------------------------------------------------------
   Чтобы добавить / сменить / отозвать PIN:
   1. Сгенерировать хеш:
        node -e "const c=require('crypto'); console.log(c.createHash('sha256').update('НОВЫЙPIN').digest('hex'))"
   2. Добавить запись в массив PINS (или удалить, если отзываем).
   3. Закоммитить и push в main — Pages обновится через 1-2 мин.
   ===================================================================== */
window.CPFSR_AUTH = {

  // Активные PIN-коды Аслана (любой пропускает на сайт).
  PINS: [
    { label: 'Аслан PIN 1', hash: '831f7756d9ceeeaf55c495a005261772fbc546b15704cfa7fd300f9947ceb775' }, // PIN: 929647
    { label: 'Аслан PIN 2', hash: '0a44cd2cbce532cd9caae282721286ca5ee7d65f3fc119d9e1cd37341144615e' }, // PIN: 929657
    { label: 'Аслан PIN 3', hash: '3e4360471ed97c89d6c0ecb0ae0a888aa28a9576c4429c58f54c40176c1e2714' }, // PIN: 925203
    { label: 'Аслан PIN 4', hash: '0409eab7d375cb35eccaff5c0d58f1cbba07e1987ca60bcb9fb79ae09fd794d2' }, // PIN: 969795
    { label: 'Аслан PIN 5', hash: '8b76a77156d3a40827e29704a590372f844872f961094a7cf774ef67a1be62e9' }  // PIN: 070970
  ],

  // (legacy alias — первый PIN из PINS, для совместимости с возможным старым кодом)
  PIN_HASH: '831f7756d9ceeeaf55c495a005261772fbc546b15704cfa7fd300f9947ceb775',

  // Сколько дней сессия живёт после успешного ввода PIN
  SESSION_DAYS: 30,

  // Email для уведомлений о смене / запросе PIN (через formsubmit.co — без регистрации)
  RESET_EMAIL: 'aslankaa@yandex.ru',
  RESET_ENDPOINT: 'https://formsubmit.co/ajax/aslankaa@yandex.ru'
};
