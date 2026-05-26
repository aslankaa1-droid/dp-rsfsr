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

  // Активные PIN-коды (любой подходящий пропускает на сайт).
  // label — для удобства администратора (не показывается публично).
  PINS: [
    { label: 'Аслан — основной',  hash: '481f6cc0511143ccdd7e2d1b1b94faf0a700a8b49cd13922a70b5ae28acaa8c5' }, // PIN: 654321
    { label: 'Гостевой / партнёры', hash: '023f5351b94db0bdcde8dd21da240ac75adc1fc82371c516543b25485cb900de' }  // PIN: 142536
    // ↑ Можно добавлять ещё. Пример:
    // { label: 'Минэк — Решетников', hash: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX...' },
    // { label: 'Минфин — Колычев',   hash: 'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY...' }
  ],

  // (legacy alias на случай старого кода — оставлен первый PIN из PINS)
  PIN_HASH: '481f6cc0511143ccdd7e2d1b1b94faf0a700a8b49cd13922a70b5ae28acaa8c5',

  // Сколько дней сессия живёт после успешного ввода PIN
  SESSION_DAYS: 30,

  // Email для уведомлений о смене / запросе PIN (через formsubmit.co — без регистрации)
  RESET_EMAIL: 'aslankaa@yandex.ru',
  RESET_ENDPOINT: 'https://formsubmit.co/ajax/aslankaa@yandex.ru'
};
