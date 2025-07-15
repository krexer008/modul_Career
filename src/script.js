"use strict";

// Импортируем шаблоны
import {
  VACANCY_CARD_TEMPLATE,
  MODAL_HEADER_TEMPLATE,
  FORM_TEMPLATE
} from "./templates.js";

//import { vacancies } from './data.js';

let currentVacancyId = null;

window.addEventListener("beforeunload", () => {
  clearAllForms();
});

const vacancies = [{
    "id": "e471ae3f-a6ee-46fd-89c1-f3c90d2a876b",
    "title": "Разработчик без опыта",
    "priority": 3,
    "salary": {
      "from": 10,
      "to": 15,
      "currency": "EUR",
      "gross": false
    },
    "location": "YO",
    "experience": "NO_WORK_EXPERIENCE",
    "published": "2025-06-27T10:57:57.217Z",
    "url": "",
    "department": "developer"
  },
  {
    "id": "8b79ca46-c7f7-435a-9eed-c0eec72da8c1",
    "title": "Разработчик с опытом от 3 до 6 лет",
    "priority": 3,
    "salary": {
      "from": 100000,
      "to": 150000,
      "currency": "RUB",
      "gross": true
    },
    "location": "YO",
    "experience": "WORK_EXPERIENCE_FROM_3_YEAR_TO_6_YEAR",
    "published": "2025-06-27T10:53:22.700Z",
    "url": "",
    "department": "backoffice"
  },
  {
    "id": "60a80689-5712-48de-8164-ab335c4716a6",
    "title": "Системный аналитик",
    "priority": 3,
    "salary": {
      "from": 50,
      "to": 100,
      "currency": "RUB",
      "gross": true
    },
    "location": "YO",
    "experience": "WORK_EXPERIENCE_MORE_THAN_6_YEAR",
    "published": "2025-06-27T10:30:02.828Z",
    "url": "",
    "department": "backoffice"
  },
  {
    "id": "28901838-93b0-4b42-aaec-99a64218b7d0",
    "title": "Системный администратор",
    "priority": 3,
    "salary": {
      "from": 117000,
      "to": 180000,
      "currency": "RUB",
      "gross": false
    },
    "location": "YO",
    "experience": "WORK_EXPERIENCE_FROM_3_YEAR_TO_6_YEAR",
    "published": "2025-06-27T08:51:36.922Z",
    "url": "",
    "department": "developer"
  },
  {
    "id": "6c098404-6d49-4a5f-951f-5899b75dde74",
    "title": "Web-developer",
    "priority": 3,
    "salary": {
      "from": 1000,
      "to": 12000,
      "currency": "USD",
      "gross": true
    },
    "location": "YO",
    "experience": "WORK_EXPERIENCE_MORE_THAN_6_YEAR",
    "published": "2025-06-27T08:51:23.965Z",
    "url": "",
    "department": "developer"
  }
];

// Рендеринг Vacancy description

function renderVacancy() {
  const vacancy = vacancies.find((v) => v.id === currentVacancyId);

  const VACANCY_DESCRIPTIONS = () => `
<header class="vacancy-header">
  <div class="load-vacancy-card">
    <div class="vacancy-title">
      <button id="backArrow" class="back-arrow">
        <img src="modul_Career/src/assets/images/icons/Arrow.svg" alt="">
      </button>
      <div>Системный администратор</div>
    </div>
    <div class="vacancy-descr">
      <p>
        <span class="bold-600">Заработная плата: </span>от 117 000 до 180 000 ₽ за месяц, на руки<br>
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
  const vacancyDescription = document.getElementById("section-vacancy-descr");

  vacancyDescription.innerHTML = VACANCY_DESCRIPTIONS();
}

// Рендеринг Vacancy cards

const vacancies_cards = document.querySelector(".vacancies-cards");
vacancies_cards.innerHTML = vacancies.map(VACANCY_CARD_TEMPLATE).join("");
vacancies_cards.innerHTML = "";
vacancies.forEach((vacancy) => {
  vacancies_cards.innerHTML += VACANCY_CARD_TEMPLATE(vacancy);
});

//const 

// Form element template
const customFormContainer = document.querySelector(".custom-form");
const dialogFormContainer = document.querySelector(".dialog-form");

function renderForm() {
  clearFormContainer(dialogFormContainer);
  clearFormContainer(customFormContainer);

  const vacancyTitle = vacancies.find((v) => v.id === currentVacancyId) ?.title || "Название вакансии";

  if (currentVacancyId) {
    dialogFormContainer.innerHTML = MODAL_HEADER_TEMPLATE(vacancyTitle) + FORM_TEMPLATE;
  } else {
    customFormContainer.innerHTML = FORM_TEMPLATE;
  }
}

// Функция очистки форм
function clearFormContainer(container) {
  if (container) container.innerHTML = "";
}

// Dialogs elements

//const formOpenBtn = document.getElementById("openDialogForm");

const greetingsDialog = document.getElementById("greetingsDialog");
const greetingsCloseBtn = document.getElementById("closeGreetings");

const seeultrDialog = document.getElementById("seeultrDialog");
const seeultrCloseBtn = document.getElementById("closeSeeultr");

// Opening form dialog

document.addEventListener("click", (e) => {
  const formDialogWrapper = document.getElementById("formDialogWrapper");
  const resumeForm = document.getElementById("resumeForm");

  // Opening form dialog
  if (e.target.id === "openDialogForm" || e.target.closest("#openDialogForm")) {
    e.preventDefault();
    formDialogWrapper.showModal();
    renderForm();
  }


  // Closing form dialog
  if (e.target.id === "closeForm" || e.target.closest("#closeForm")) {
    e.preventDefault();
    formDialogWrapper.close();
    formDialogWrapper.removeAttribute("aria-modal");

    // Очищаем форму только если она существует
    clearForm(resumeForm);
    clearFormContainer(dialogFormContainer);
  }

  //Загрузка файла
  if (e.target.id === "uploadResume" || e.target.closest("#uploadResume")) {
    e.preventDefault();
    // uploadResume();
    console.log("Загрузка резюме...");
  }

  // Отправка формы
  if (e.target.id === "formSubmit" || e.target.closest("#formSubmit")) {
    e.preventDefault();

    // Проверяем валидность формы
    if (resumeForm.checkValidity()) {
      // Добавить проверку пользователя
      //if (checkUser()) {
      //resumeSending();
      if (currentVacancyId) {
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

// Валидация input-полей (в реальном временидля)
document.addEventListener("input", (e) => {
  if (e.target.matches("#resumeForm input")) {
    resetFieldStyle(e.target);
    if (!e.target.checkValidity()) {
      e.target.style.borderColor = "red";
    }
  }
});

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
  if (!form) return; // Если форма не передана, выходим

  const fields = form.querySelectorAll("input, textarea, select");
  fields.forEach((field) => {
    field.value = "";
    resetFieldStyle(field);
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
    clearFormContainer(dialogFormContainer);
  } else {
    sectionVacancies.classList.remove("hidden-section");
    sectionVacancies.classList.add("active-section");
    btnCmpny.classList.remove("active");
    btnVcncy.classList.add("active");
    renderVacancy();
    renderForm();
  }
}

// Initial first section
switchSection("company");

// Логика страницы с описанием вакансии
const vacancyButtons = document.querySelectorAll(".vacancy-button");
//const backArrowBtn = document.querySelector(".back-arrow");
const sectionVacancyDescr = document.querySelector("#section-vacancy-descr");

// Vacancies buttons handler
vacancyButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    clearFormContainer(dialogFormContainer);
    clearFormContainer(customFormContainer);

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
document.addEventListener("click", (e) => {
  if (e.target.id === "backArrow" || e.target.closest("#backArrow")) {
    e.preventDefault();
    sectionVacancyDescr.classList.remove("active-section");
    sectionVacancyDescr.classList.add("hidden-section");

    sectionVacancies.classList.remove("hidden-section");
    sectionVacancies.classList.add("active-section");
    switchSection();
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