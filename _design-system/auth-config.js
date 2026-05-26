/* =====================================================================
   ЦПФСР.РФ — Auth Config
   PIN-код доступа к сайту (6 цифр). Хеш SHA-256 от PIN.
   ---------------------------------------------------------------------
   Дефолтный PIN: 654321
   Чтобы сменить — Аслан пишет в форме «Забыли PIN?» новый PIN.
   На aslankaa@yandex.ru приходит письмо с новым PIN.
   Затем разработчик меняет PIN_HASH ниже и пушит — сайт обновляется.

   Сгенерировать новый хеш:
     node -e "const c=require('crypto'); console.log(c.createHash('sha256').update('NEWPIN').digest('hex'))"
   ===================================================================== */
window.CPFSR_AUTH = {
  // SHA-256 от текущего PIN. Сейчас = SHA-256('654321')
  PIN_HASH: '481f6cc0511143ccdd7e2d1b1b94faf0a700a8b49cd13922a70b5ae28acaa8c5',

  // Сколько дней сессия живёт после успешного ввода PIN
  SESSION_DAYS: 30,

  // Email для уведомлений о смене PIN (через formsubmit.co — без регистрации)
  RESET_EMAIL: 'aslankaa@yandex.ru',
  RESET_ENDPOINT: 'https://formsubmit.co/ajax/aslankaa@yandex.ru'
};
