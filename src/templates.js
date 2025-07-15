// Функция экранирования HTML (опционально)
const escapeHtml = (unsafe) => {
  return unsafe.replace(/[&<"'>]/g, (match) => {
    switch (match) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#039;";
      default:
        return match;
    }
  });
};

// Шаблон карточки вакансии
const VACANCY_CARD_TEMPLATE = (vacancy) => `
  <div class="vacancy-card">
    <div class="icon-vacancies-container">
      <img class="icon-vacancies" src="modul_Career/src/assets/images/icons/Code.svg" alt="">
    </div>
    <div class="vacancy-position-container">
      <h4 class="vacancy-position">${escapeHtml(vacancy.title)}</h4>
    </div>
    <div class="vacancy-detail">
      <span class="vacancy-salary">${vacancy.salary.from} - ${vacancy.salary.to} ${vacancy.salary.currency}</span>
      <button class="vacancy-button" id="${vacancy.id}">Подробнее</button>
    </div>
  </div>
`;

// Шаблон заголовка модального окна
const MODAL_HEADER_TEMPLATE = (title) => `
  <div class="modal-form-title">
    <h2 id="dialog-title" class="modal-title">Отклик на вакансию<br>${escapeHtml(title)}</h2>
    <button type="button" class="modal-close" id="closeForm">
      <img src="modul_Career/src/assets/images/icons/Menu.svg" alt="">
    </button>
  </div>
`;

// Шаблон формы
const FORM_TEMPLATE = `
<form id="resumeForm" class="career-form" method="post">
  <div class="form-row">
    <div class="form-group">
      <label for="firstname" class="form-label">*Имя</label>
      <input class="form-input" type="text" name="firstname" id="firstname" autocomplete="off" placeholder="Иван"
      required>
    </div>
    <div class="form-group">
      <label for="lastname" class="form-label">*Фамилия</label>
      <input class="form-input" type="text" name="lastname" id="lastname" autocomplete="off" placeholder="Иванов"
      required>
    </div>
  </div>
  <div class="form-group">
    <label for="tel" class="form-label">*Номер телефона</label>
    <input class="form-input" type="tel" name="phone" id="tel" autocomplete="off" placeholder="+7(999)999 99 99"
    pattern="[\\+]\\d{1,3}\\s?[\\(\\d{1,3}\\)]?\\s?\\d{3}[\\s-]?\\d{2}[\\s-]?\\d{2}" required>
  </div>
  <div class="form-group">
    <label for="email" class="form-label">*Почта</label>
    <input class="form-input" type="email" name="email" id="email" autocomplete="off"
    placeholder="ivnovovan@mail.ru" required>
  </div>
  <div class="form-group form-group_upload">
    <div class="form-group">
      <label for="url" class="form-label">*Ссылка на резюме или файл(pdf/doc)</label>
      <input class="form-input" type="url" id="url" name="url" autocomplete="off" placeholder="ссылка на резюме"
      size="50" required>
    </div>
    <button id="uploadResume" class="upload-button">
    <img class="icon-upload" src="modul_Career/src/assets/images/icons/UploadSimple.svg" alt="">
    <span>загрузить файл</span>
    </button>
  </div>
  <button class="form-button" type="submit" id="formSubmit">Отправить</button>
</form>
`;

export { VACANCY_CARD_TEMPLATE, MODAL_HEADER_TEMPLATE, FORM_TEMPLATE };