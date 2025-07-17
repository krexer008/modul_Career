"use strict";

// Импортируем шаблоны
import { VACANCY_CARD_TEMPLATE, MODAL_HEADER_TEMPLATE, FORM_TEMPLATE, VACANCY_DESCRIPTIONS } from "./templates.js";

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
const vacancies = [];

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
  // Данные вакансий
  getVacancies();

  setupEventListeners();

  if (state.getVacancyId()) {
    state.currentVacancyId = state.getVacancyId();
    switchSection("vacancies");
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
  const vacanciesToShow = filterType ? vacancies.filter((v) => v.department === filterType) : vacancies;

  vacanciesToShow.forEach((vacancy) => {
    vacanciesСards.innerHTML += VACANCY_CARD_TEMPLATE(vacancy);
  });

  updateFilterButtons(filterType);
}

function updateFilterButtons(filterType) {
  [btnAll, btnDev, btnOffice].forEach((btn) => {
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
  const vacancy = vacancies.find((v) => v.id === state.currentVacancyId);

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
    state.saveFilter("all");
  });

  btnDev.addEventListener("click", (e) => {
    e.preventDefault();
    showVacancies("developer");
    state.saveFilter("developer");
  });

  btnOffice.addEventListener("click", (e) => {
    e.preventDefault();
    showVacancies("backoffice");
    state.saveFilter("backoffice");
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
  document.querySelectorAll("section").forEach((section) => {
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

  const vacancyTitle = state.currentVacancyId
    ? (vacancies.find((v) => v.id === state.currentVacancyId) || {}).title
    : "Название вакансии";

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

function getVacancies() {
  const url = "https://learn-9fc9-git-main-imsokolovivs-projects.vercel.app/api/vacancies/list";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((vc) => {
        vacancies.push(vc);
      });
    });
}

// Запуск приложения
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// Очистка при закрытии страницы
window.addEventListener("beforeunload", () => {
  localStorage.removeItem("currentVacancyId");
  clearAllForms();
});
