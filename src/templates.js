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
    <img class="icon-vacancies" 
    src="modul_Career/src/assets/images/icons/${vacancy.department === "developer" ? "Code.svg" : "Toolbox.svg"}" alt="">
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
    required>
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

const VACANCY_DESCRIPTIONS = (vacancy) => `
<header class="vacancy-header">
  <div class="load-vacancy-card">
    <div class="vacancy-title">
      <button id="backArrow" class="back-arrow">
        <img src="modul_Career/src/assets/images/icons/Arrow.svg" alt="">
      </button>
      <div>${vacancy.title}</div>
    </div>
    <div class="vacancy-descr">
      <p>
        <span class="bold-600">Заработная плата: </span>от ${vacancy.salary.from} до ${vacancy.salary.to} ${vacancy.salary.currency} за месяц, 
        ${vacancy.salary.gross ? 'до вычета налогов': 'на руки'}<br>
        <span class="bold-600">Опыт работы: </span>3 - 6 лет<br>
        <span class="bold-600">Полная занятость<br></span>
        <span class="bold-600">График: </span>5/2<br>
        <span class="bold-600">Рабочие часы: </span>8
      </p> 
    </div>
  </div>
  <button id="openDialogForm" class="vacancy-response">Откликнуться</button>
</header>
<article>
  <h2 class="descr-title">Ожидания от кандидата:</h2>
  <ul class="description">
    <li>Знание и понимание принципов работы сетевых протоколов (модель OSI)</li>
    <li>
      Опыт настройки сетевого оборудования L2/L3 (Cisco, Huawei, MikroTik, Juniper, Eltex) работа с
      командной строкой, понимание конфигураций сетевого оборудования
    </li>
    <li>
      Опыт администрирования ОС Linux: основные сервисы, веб-серверы, виртуализация KVM, развертывание
      приложений в т.ч. в контейнерах, написание несложных скриптов автоматизации bash / python. Плюсом
      будет опыт работы с отечественными дистрибутивами Linux
    </li>
    <li>
      Опыт администрирования ОС Windows 10/Srv2012+: AD, управление пользователями, настройка политик,
      централизованное управление антивирусными средствами
    </li>
    <li>Опыт администрирования СУБД (предпочтительно PostgreSQL)</li>
    <li>
      Большим плюсом будет опыт работы (сопровождение, администрирование, настройка, развертывание) со
    </li>
    <li>средствами криптографической защиты информации, банковскими приложениями</li>
  </ul>
</article>
<article>
  <h2 class="descr-title">Мы предлагаем:</h2>
  <ul class="description">
    <li>Работу в аккредитованной IТ-компании</li>
    <li>Трудовые отношения по ТК РФ с первого дня, со всем положенным соц.пакетом</li>
    <li>
      «Белую» зарплату и локальное повышение оклада без жесткого грейдирования: смотрим на опыт, знания и
      вклад каждого в команду
    </li>
    <li>Формат работы: в офисе, удаленный вариант возможен только в качестве резервного</li>
    <li>Корпоративный английский</li>
    <li>ДМС со стоматологией</li>
  </ul>
  <span>У нас современный офис с парковкой и всем необходимым для комфортной работы и отдыха в самом сердце
  Йошкар-Олы. Рядом набережная с прекрасными видами, кучей кафешек, театрами, музеями и быстрой
  доступностью из любой точки города.</span>
  </article>
  `;

export {
  VACANCY_CARD_TEMPLATE,
  MODAL_HEADER_TEMPLATE,
  FORM_TEMPLATE,
  VACANCY_DESCRIPTIONS
};