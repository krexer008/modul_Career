"use strict";

let currentVacancyId = null;

window.addEventListener("beforeunload", () => {
  clearAllForms();
});

const vacancies = [
  {
    id: "e471ae3f-a6ee-46fd-89c1-f3c90d2a876b",
    title: "Разработчик без опыта",
    priority: 3,
    salary: {
      from: 10,
      to: 15,
      currency: "EUR",
      gross: false,
    },
    location: "YO",
    experience: "NO_WORK_EXPERIENCE",
    published: "2025-06-27T10:57:57.217Z",
    url: "",
  },
  {
    id: "8b79ca46-c7f7-435a-9eed-c0eec72da8c1",
    title: "Разработчик с опытом от 3 до 6 лет",
    priority: 3,
    salary: {
      from: 100000,
      to: 150000,
      currency: "RUB",
      gross: true,
    },
    location: "YO",
    experience: "WORK_EXPERIENCE_FROM_3_YEAR_TO_6_YEAR",
    published: "2025-06-27T10:53:22.700Z",
    url: "",
  },
  {
    id: "60a80689-5712-48de-8164-ab335c4716a6",
    title: "Системный аналитик",
    priority: 3,
    salary: {
      from: 50,
      to: 100,
      currency: "RUB",
      gross: true,
    },
    location: "YO",
    experience: "WORK_EXPERIENCE_MORE_THAN_6_YEAR",
    published: "2025-06-27T10:30:02.828Z",
    url: "",
  },
  {
    id: "28901838-93b0-4b42-aaec-99a64218b7d0",
    title: "Системный администратор",
    priority: 3,
    salary: {
      from: 117000,
      to: 180000,
      currency: "RUB",
      gross: false,
    },
    location: "YO",
    experience: "WORK_EXPERIENCE_FROM_3_YEAR_TO_6_YEAR",
    published: "2025-06-27T08:51:36.922Z",
    url: "",
  },
  {
    id: "6c098404-6d49-4a5f-951f-5899b75dde74",
    title: "Web-developer",
    priority: 3,
    salary: {
      from: 1000,
      to: 12000,
      currency: "USD",
      gross: true,
    },
    location: "YO",
    experience: "WORK_EXPERIENCE_MORE_THAN_6_YEAR",
    published: "2025-06-27T08:51:23.965Z",
    url: "",
  },
];

// Vacancy cards

const vacancies_cards = document.querySelector(".vacancies-cards");
vacancies_cards.innerHTML = "";
vacancies.forEach((vacancy) => {
  vacancies_cards.innerHTML += `
  <div class="vacancy-card">
          <div class="icon-vacancies-container">
            <img class="icon-vacancies" src="modul_Career/src/assets/images/icons/Code.svg" alt="">
          </div>
          <div class="vacancy-position-container">
            <h4 class="vacancy-position">${vacancy.title}</h4>
          </div>
          <div class="vacancy-detail">
            <span class="vacancy-salary">${vacancy.salary.from} - ${vacancy.salary.to} ${vacancy.salary.currency} </span>
            <button class="vacancy-button" id = "${vacancy.id}">Подробнее</button>
          </div>
        </div>
  `;
});

// Form element template

const formContainer = document.querySelector(".form-container");
formContainer.innerHTML = "";

const telPatern = "[\\+]\\d{1,3}\\s?[\\(\\d{1,3}\\)]?\\s?\\d{3}[\\s-]?\\d{2}[\\s-]?\\d{2}";

const formTemplate = `
<form id="dialogForm" class="career-form" method="post">
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
            pattern=${telPatern} required>
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
        <button id="uploadDialogResume" class="upload-button">
            <img class="icon-upload" src="src/assets/images/icons/UploadSimple.svg" alt="">
            <span>загрузить файл</span>
        </button>
    </div>
    <button class="form-button" type="submit" id="dialogFormSubmit">Отправить</button>
</form>
`;

if (currentVacancyId) {
  formContainer.innerHTML += `<div class="modal-form-title">
                <h2 id="dialog-title" class="modal-title">Отклик на вакансию<br>${vacancy.title}</h2>
                <button type="button" class="modal-close" id="closeForm">
                  <img src="src/assets/images/icons/Menu.svg" alt="">
                </button>
              </div>`;
  formContainer.innerHTML += formTemplate;
}

// Dialogs elements
const formDialogWrapper = document.getElementById("formDialogWrapper");
const formOpenBtn = document.getElementById("openForm");
const formCloseBtn = document.getElementById("closeForm");
const uploadDialogResume = document.getElementById("uploadDialogResume");
const uploadCustomResume = document.getElementById("uploadCustomResume");

const greetingsDialog = document.getElementById("greetingsDialog");
const greetingsCloseBtn = document.getElementById("closeGreetings");

const seeultrDialog = document.getElementById("seeultrDialog");
const seeultrCloseBtn = document.getElementById("closeSeeultr");

const dialogForm = document.getElementById("dialogForm"); // Форма внутри диалога
const dialogFormSubmit = document.getElementById("dialogFormSubmit"); // Кнопка отправки

const customForm = document.getElementById("customForm");
const customFormSubmit = document.getElementById("customFormSubmit"); // Кнопка отправки

// Opening form dialog
if (formDialogWrapper && formOpenBtn && currentVacancyId) {
  formOpenBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formDialogWrapper.showModal();
  });
} else {
  console.error("Не удалось найти элементы");
}

// Closing dialog
if (formDialogWrapper && formOpenBtn && formCloseBtn) {
  formCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formDialogWrapper.close();
    formDialogWrapper.removeAttribute("aria-modal");
    clearForm(dialogForm);
  });
} else {
  console.error("Не удалось найти элементы");
}

// Dialog form handler
if (dialogForm && dialogFormSubmit && uploadDialogResume) {
  addInputListenersToForm(dialogForm);

  dialogFormSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    // Сброс предыдущих подсветок
    resetInvalidFields(dialogForm);

    //Upload resume
    uploadDialogResume.addEventListener("click", (e) => {
      e.preventDefault();
      // uploadResume();
    });

    // Проверяем валидность формы
    if (dialogForm.checkValidity()) {
      // Добавить проверку пользователя
      //if (checkUser()) {
      //resumeSending();
      if (currentVacancyId) {
        formDialogWrapper.close();
      }
      greetingsDialog.showModal();
      clearForm(dialogForm);
      //} else {
      //seeultrDialog.showModal();
      //}
    } else {
      highlightInvalidFields(dialogForm);
    }
  });
}

// Custom form handler
if (customForm && customFormSubmit && uploadCustomResume) {
  addInputListenersToForm(customForm);

  customFormSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    // Сброс предыдущих подсветок
    resetInvalidFields(customForm);

    //Upload resume
    uploadCustomResume.addEventListener("click", (e) => {
      e.preventDefault();
      // uploadResume();
    });

    // Проверяем валидность формы
    if (customForm.checkValidity()) {
      // Добавить проверку пользователя
      //if (checkUser()) {
      //resumeSending();
      greetingsDialog.showModal();
      clearForm(customForm);
      //} else {
      //seeultrDialog.showModal();
      //}
    } else {
      highlightInvalidFields(customForm);
    }
  });
}

function addInputListenersToForm(form) {
  const fields = form.querySelectorAll(".form-input");
  fields.forEach((field) => {
    field.addEventListener("input", () => {
      resetFieldStyle(field);
      // Проверяем валидность в реальном времени
      if (field.checkValidity()) {
        field.style.borderColor = "#e2e6ed";
      } else {
        field.style.borderColor = "red";
      }
    });
  });
}

// Функция подсветки невалидных полей
function highlightInvalidFields(form) {
  const invalidFields = form.querySelectorAll(".form-input:invalid");
  invalidFields.forEach((field) => {
    field.style.borderColor = "red";
    field.style.boxShadow = "0 0 0 2px rgba(255, 0, 0, 0.1)";
  });
}

// Функция сброса стилей поля
function resetFieldStyle(field) {
  field.style.borderColor = "#e2e6ed";
  field.style.boxShadow = "none";
}

// Функция сброса всех невалидных полей
function resetInvalidFields(form) {
  const allFields = form.querySelectorAll(".form-input");
  allFields.forEach((field) => resetFieldStyle(field));
}

// Close greetingsDialog
if (greetingsDialog && greetingsCloseBtn) {
  greetingsCloseBtn.addEventListener("click", () => {
    greetingsDialog.close();
    greetingsDialog.removeAttribute("aria-modal");
    clearAllForms();
  });
}

// Close seeultrDialog
if (seeultrDialog && seeultrCloseBtn) {
  seeultrCloseBtn.addEventListener("click", () => {
    seeultrDialog.close();
    seeultrDialog.removeAttribute("aria-modal");
  });
}

// Функция для очистки всех полей формы
function clearForm(form) {
  const fields = form.querySelectorAll("input, textarea, select");
  fields.forEach((field) => {
    field.value = "";
    resetFieldStyle(field); // Сбрасываем стили, если они были невалидными
  });
}

// Функция для очистки всех форм на странице
function clearAllForms() {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => clearForm(form));
}

// Переключение между контентом
const mainSections = document.querySelectorAll("section");
const btnCmpny = document.getElementById("btnCmpny");
const btnVcncy = document.getElementById("btnVcncy");

const sectionCompany = document.getElementById("section-company");
const sectionVacancies = document.getElementById("section-vacancies");

// Hide all another sections
function hideAllSection() {
  mainSections.forEach((section) => {
    section.classList.remove("active-section");
    section.classList.add("hidden-section");
  });
}

// Handlers
btnCmpny.addEventListener("click", (e) => {
  e.preventDefault();
  switchSection("company");
});

btnVcncy.addEventListener("click", (e) => {
  e.preventDefault();
  switchSection("vacancies");
});

// Switcher
function switchSection(sectionName) {
  currentVacancyId = null;
  // Hidden all sections
  hideAllSection();
  clearAllForms();

  btnCmpny.classList.remove("active");
  btnVcncy.classList.remove("active");

  // Activating section
  if (sectionName === "company") {
    sectionCompany.classList.remove("hidden-section");
    sectionCompany.classList.add("active-section");
    btnVcncy.classList.remove("active");
    btnCmpny.classList.add("active");
  } else {
    sectionVacancies.classList.remove("hidden-section");
    sectionVacancies.classList.add("active-section");
    btnCmpny.classList.remove("active");
    btnVcncy.classList.add("active");
  }
}

// Initial first section
switchSection("company");

// Логика страницы с описанием вакансии
const vacancyButtons = document.querySelectorAll(".vacancy-button");
const backArrowBtn = document.querySelector(".back-arrow");
const sectionVacancyDescr = document.querySelector("#section-vacancy-descr");

// Vacancies buttons handler
vacancyButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    currentVacancyId = button.id;

    // Hide all another sections
    hideAllSection();

    // Show vacancy description section
    sectionVacancyDescr.classList.remove("hidden-section");
    sectionVacancyDescr.classList.add("active-section");

    // Здесь загрузить данные вакансии по currentVacancyId
    // loadVacancyData(currentVacancyId);
  });
});

// back button handler
backArrowBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sectionVacancyDescr.classList.remove("active-section");
  sectionVacancyDescr.classList.add("hidden-section");

  sectionVacancies.classList.remove("hidden-section");
  sectionVacancies.classList.add("active-section");

  currentVacancyId = null;
});

//loadVacancyData
/*
function loadVacancyData(vacancyId) {
  fetch(`/api/vacancies/${vacancyId}`)
    .then(response => response.json())
    .then(data => {
      // Заполняем секцию данными
      document.querySelector('#section-vacancy-descr .vacancy-title').textContent = data.title;
      document.querySelector('#section-vacancy-descr .vacancy-description').innerHTML = data.description;
    })
    .catch(error => console.error('Ошибка загрузки:', error));
}
*/
