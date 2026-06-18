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
    { label: 'PIN 1', hash: '2c09206cf98b164e6cfe4370725b7ca2f7ae65f5c3489f6149368f43e43a5a6f' },
    { label: 'PIN 2', hash: 'f41edfbd111efe913fc5cffd060cf5dc9951ca78d4ae20edcc79175bd01e1199' },
    { label: 'PIN 3', hash: '234c29f976c3a60068d9d6ed3a99fa116c0e345709a0208694f1ba3950b944c7' },
    { label: 'PIN 4', hash: '2bd79994b1f17c9f96fa6c504c140ff3e6c7cda3624381ce7734f8956f8932b7' },
    { label: 'PIN 5', hash: 'bb4c52edcf9e5ee20a5f7263049a8742207c03c5d0e94918f9f82756d6cbb08a' }
  ],

  // (legacy alias — первый PIN из PINS, для совместимости с возможным старым кодом)
  PIN_HASH: '2c09206cf98b164e6cfe4370725b7ca2f7ae65f5c3489f6149368f43e43a5a6f',

  // Сколько дней сессия живёт после успешного ввода PIN
  SESSION_DAYS: 30,

  // Email для уведомлений о смене / запросе PIN (через formsubmit.co — без регистрации)
  RESET_EMAIL: 'aslankaa@yandex.ru',
  RESET_ENDPOINT: 'https://formsubmit.co/ajax/aslankaa@yandex.ru'
};
