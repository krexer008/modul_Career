"use strict";

// Импортируем шаблоны
import {
  VACANCY_CARD_TEMPLATE,
  MODAL_HEADER_TEMPLATE,
  FORM_TEMPLATE,
  VACANCY_DESCRIPTIONS
} from "./templates.js";

//import { vacancies } from './data.js';

// Состояние приложения
const state = {
  currentVacancyId: null,

  getSection() {
    return localStorage.getItem("currentSection") || "company";
  },

  getVacancyId() {
    return localStorage.getItem("currentVacancyId");
  },

  getFilter() {
    return localStorage.getItem("currentFilter");
  },

  saveSection(section) {
    localStorage.setItem("currentSection", section);
  },

  saveVacancyId(id) {
    this.currentVacancyId = id;
    localStorage.setItem("currentVacancyId", id);
  },

  saveFilter(filter) {
    localStorage.setItem("currentFilter", filter);
  },

  clearVacancy() {
    this.currentVacancyId = null;
    localStorage.removeItem("currentVacancyId");
  },
};

// Данные вакансий
const vacancies = [{
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
    department: "developer",
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
    department: "backoffice",
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
    department: "backoffice",
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
    department: "developer",
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
    department: "developer",
  },
];


// DOM элементы
const vacanciesСards = document.querySelector(".vacancies-cards");
const btnAll = document.getElementById("btnAll");
const btnDev = document.getElementById("btnDev");
const btnOffice = document.getElementById("btnOffice");
const sectionCompany = document.getElementById("section-company");
const sectionVacancies = document.getElementById("section-vacancies");
const sectionVacancyDescr = document.querySelector("#section-vacancy-descr");
const customFormContainer = document.querySelector(".custom-form");
const dialogFormContainer = document.querySelector(".dialog-form");
const formDialogWrapper = document.getElementById("formDialogWrapper");
const greetingsDialog = document.getElementById("greetingsDialog");
const seeultrDialog = document.getElementById("seeultrDialog");
const btnCmpny = document.getElementById("btnCmpny");
const btnVcncy = document.getElementById("btnVcncy");

// Инициализация приложения
function initApp() {
  setupEventListeners();  

  if (state.getVacancyId()) {
    state.currentVacancyId = state.getVacancyId();
    switchSection('vacancies');
    sectionVacancyDescr.classList.add("active-section");
    renderVacancy();
  } else {
    switchSection(state.getSection());
  }
}

// Показ секций
function switchSection(sectionName) {
  hideAllSection();

  if (sectionName === "company") {
    showSection(sectionCompany);
    btnVcncy.classList.remove("active");
    btnCmpny.classList.add("active");
    state.clearVacancy();
    clearFormContainer(dialogFormContainer);
  } else {
    showSection(sectionVacancies);
    btnCmpny.classList.remove("active");
    btnVcncy.classList.add("active");
    showVacancies();

    renderForm();
  }

  clearAllForms();

  state.saveSection(sectionName);
}

// Показ VacancyСards с Фильтром
function showVacancies(filterType) {
  vacanciesСards.innerHTML = "";
  // Здесь загрузить данные вакансии по currentVacancyId
  // loadVacancyData(currentVacancyId);

  const vacanciesToShow = filterType ?
    vacancies.filter(v => v.department === filterType) :
    vacancies;

  vacanciesToShow.forEach(vacancy => {
    vacanciesСards.innerHTML += VACANCY_CARD_TEMPLATE(vacancy)
  });

  updateFilterButtons(filterType);
}

function updateFilterButtons(filterType) {
  [btnAll, btnDev, btnOffice].forEach(btn => {
    btn.classList.remove("vacancy-type-button_active");
  });

  if (filterType === "developer") {
    btnDev.classList.add("vacancy-type-button_active");
  } else if (filterType === "backoffice") {
    btnOffice.classList.add("vacancy-type-button_active");
  } else {
    btnAll.classList.add("vacancy-type-button_active");
  }
}

// Рендеринг описания вакансии
function renderVacancy() {
  const vacancy = vacancies.find(v => v.id === state.currentVacancyId);
  
  sectionVacancyDescr.innerHTML = VACANCY_DESCRIPTIONS(vacancy);
}

// Обработчики событий
function setupEventListeners() {
  // Навигация
  btnCmpny.addEventListener("click", (e) => {
    e.preventDefault();
    switchSection("company");
  });

  btnVcncy.addEventListener("click", (e) => {
    e.preventDefault();
    switchSection("vacancies");
  });

  // Фильтры вакансий
  btnAll.addEventListener("click", (e) => {
    e.preventDefault();
    showVacancies();
    state.saveFilter('all');
  });

  btnDev.addEventListener("click", (e) => {
    e.preventDefault();
    showVacancies("developer");
    state.saveFilter('developer');
  });

  btnOffice.addEventListener("click", (e) => {
    e.preventDefault();
    showVacancies("backoffice");
    state.saveFilter('backoffice');
  });

  // Выбор вакансии
  document.addEventListener("click", (e) => {
    const vacancyBtn = e.target.closest(".vacancy-button");
    if (vacancyBtn) {
      e.preventDefault();
      state.saveVacancyId(vacancyBtn.id);
      showVacancyDetails();

      clearFormContainer(dialogFormContainer);
      clearFormContainer(customFormContainer);
    }
  });

  // Кнопка назад
  document.addEventListener("click", (e) => {
    if (e.target.id === "backArrow" || e.target.closest("#backArrow")) {
      e.preventDefault();
      state.clearVacancy();
      switchSection();
    }
  });

  // Формы и модальные окна
  setupFormHandlers();
}

function setupFormHandlers() {
  const greetingsCloseBtn = document.getElementById("closeGreetings");
  const seeultrCloseBtn = document.getElementById("closeSeeultr");

  // Открытие формы
  document.addEventListener("click", (e) => {
    if (e.target.closest("#openDialogForm")) {
      e.preventDefault();
      formDialogWrapper.showModal();
      renderForm();
    }
  });

  // Закрытие формы
  document.addEventListener("click", (e) => {
    if (e.target.closest("#closeForm")) {
      e.preventDefault();
      formDialogWrapper.close();
      formDialogWrapper.removeAttribute("aria-modal");
      clearForm(resumeForm);
      clearFormContainer(dialogFormContainer);
    }
  });

  // Отправка формы
  document.addEventListener("click", (e) => {
    if (e.target.closest("#formSubmit")) {
      e.preventDefault();
      const resumeForm = document.getElementById("resumeForm");
      if (resumeForm && resumeForm.checkValidity()) {
        // Добавить проверку пользователя
        //if (checkUser()){
        //resumeSending();
        if (state.getVacancyId) {
          formDialogWrapper.close();
        }
        greetingsDialog.showModal();
        clearForm(resumeForm);
        clearFormContainer(dialogFormContainer);
        //} else {
        //seeultrDialog.showModal();
        //}
      } else {
        highlightInvalidFields(resumeForm);
      }
    }
  });

  //Загрузка файла
  document.addEventListener("click", (e) => {
    if (e.target.id === "uploadResume" || e.target.closest("#uploadResume")) {
      e.preventDefault();
      // uploadResume();
      console.log("Загрузка резюме...");
    }
  });

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
      clearAllForms();
    });
  }
}

// Вспомогательные функции
function hideAllSection() {
  document.querySelectorAll("section").forEach(section => {
    section.classList.remove("active-section");
    section.classList.add("hidden-section");
  });
}

function showSection(section) {
  section.classList.remove("hidden-section");
  section.classList.add("active-section");
}

function showVacancyDetails() {
  hideAllSection();
  showSection(sectionVacancyDescr);
  renderVacancy();
}

// Рендеринг формы
function renderForm() {
  clearFormContainer(dialogFormContainer);
  clearFormContainer(customFormContainer);

  const vacancyTitle = state.currentVacancyId ?
    (vacancies.find(v => v.id === state.currentVacancyId) || {}).title :
    "Название вакансии";

  if (state.currentVacancyId) {
    dialogFormContainer.innerHTML = MODAL_HEADER_TEMPLATE(vacancyTitle) + FORM_TEMPLATE;
  } else {
    customFormContainer.innerHTML = FORM_TEMPLATE;
  }
}

// Функция очистки форм
function clearFormContainer(container) {
  if (container) container.innerHTML = "";
}

// Функция для очистки всех полей формы
function clearForm(form) {
  if (!form) return;

  const fields = form.querySelectorAll("input, textarea, select");
  fields.forEach((field) => {
    field.value = "";
    resetFieldStyle(field);
  });
}

// Функция сброса стилей поля
function resetFieldStyle(field) {
  field.style.borderColor = "#e2e6ed";
  field.style.boxShadow = "none";
}


// Функция для очистки всех форм на странице
function clearAllForms() {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => clearForm(form));
}

// Функция подсветки невалидных полей
function highlightInvalidFields(form) {
  if (!form) return;

  const invalidFields = form.querySelectorAll(":invalid");
  invalidFields.forEach((field) => {
    field.style.borderColor = "red";
    field.style.boxShadow = "0 0 0 2px rgba(255, 0, 0, 0.1)";
  });
}

// Валидация input-полей (в реальном временидля)
document.addEventListener("input", (e) => {
  if (e.target.matches("#resumeForm input")) {
    resetFieldStyle(e.target);
    if (!e.target.checkValidity()) {
      e.target.style.borderColor = "red";
    }
  }
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

// Запуск приложения
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// Очистка при закрытии страницы
window.addEventListener("beforeunload", () => {
  localStorage.removeItem("currentVacancyId");
  clearAllForms();
});