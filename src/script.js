"use strict";

const vacancies = [
  {
    id: "e471ae3f-a6ee-46fd-89c1-f3c90d2a876b",
    title: "Разработчик без опыта",
    priority: 3,
    salary: { from: 10, to: 15, currency: "EUR", gross: false },
    location: "YO",
    experience: "NO_WORK_EXPERIENCE",
    published: "2025-06-27T10:57:57.217Z",
    url: "",
  },
  {
    id: "8b79ca46-c7f7-435a-9eed-c0eec72da8c1",
    title: "Разработчик с опытом от 3 до 6 лет",
    priority: 3,
    salary: { from: 100000, to: 150000, currency: "RUB", gross: true },
    location: "YO",
    experience: "WORK_EXPERIENCE_FROM_3_YEAR_TO_6_YEAR",
    published: "2025-06-27T10:53:22.700Z",
    url: "",
  },
  {
    id: "60a80689-5712-48de-8164-ab335c4716a6",
    title: "Системный аналитик",
    priority: 3,
    salary: { from: 50, to: 100, currency: "RUB", gross: true },
    location: "YO",
    experience: "WORK_EXPERIENCE_MORE_THAN_6_YEAR",
    published: "2025-06-27T10:30:02.828Z",
    url: "",
  },
  {
    id: "28901838-93b0-4b42-aaec-99a64218b7d0",
    title: "Системный администратор",
    priority: 3,
    salary: { from: 117000, to: 180000, currency: "RUB", gross: false },
    location: "YO",
    experience: "WORK_EXPERIENCE_FROM_3_YEAR_TO_6_YEAR",
    published: "2025-06-27T08:51:36.922Z",
    url: "",
  },
  {
    id: "6c098404-6d49-4a5f-951f-5899b75dde74",
    title: "Web-developer",
    priority: 3,
    salary: { from: 1000, to: 12000, currency: "USD", gross: true },
    location: "YO",
    experience: "WORK_EXPERIENCE_MORE_THAN_6_YEAR",
    published: "2025-06-27T08:51:23.965Z",
    url: "",
  },
];

const vacancies_cards = document.querySelector(".vacancies-cards");

vacancies_cards.innerHTML = "";
vacancies.forEach((vacancy) => {
  vacancies_cards.innerHTML += `
  <div class="vacancy-card">
          <div class="icon-vacancies-container">
            <img class="icon-vacancies" src="modul_Career/src/assets/images/icons/Code.svg" alt="" />
          </div>
          <div class="vacancy-position-container">
            <h4 class="vacancy-position">${vacancy.title}</h4>
          </div>
          <div class="vacancy-detail">
            <span class="vacancy-salary">${vacancy.salary.from} - ${vacancy.salary.to} ${vacancy.salary.currency} </span>
            <button class="vacancy-button id = ${vacancy.id}">Подробнее</button>
          </div>
        </div>
  `;
});

// Dialogs elements
const formDialog = document.getElementById("formDialog");
const formOpenBtn = document.getElementById("openForm");
const formCloseBtn = document.getElementById("closeForm");

const greetingsDialog = document.getElementById("greetingsDialog");
const greetingsCloseBtn = document.getElementById("closeGreetings");

const seeultrDialog = document.getElementById("seeultrDialog");
const seeultrCloseBtn = document.getElementById("closeSeeultr");

const form = document.querySelector(".career-form"); // Форма внутри диалога
const submitButton = document.querySelector(".form-button"); // Кнопка отправки

if (formDialog && formOpenBtn && formCloseBtn) {
  // Opening form dialog
  formOpenBtn.addEventListener("click", () => {
    formDialog.showModal();
  });

  // Closing dialog
  formCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formDialog.close();
    formDialog.removeAttribute("aria-modal");
  });
} else {
  console.error("Не удалось найти элементы");
}

if (formDialog && form && submitButton) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Проверяем валидность формы
    if (form.checkValidity()) {
      formDialog.close();
      greetingsDialog.showModal();
    } else {
      seeultrDialog.showModal(); // Исправить для ошибки валидации
      alert("Заполните все обязательные поля!");
    }
  });
}
// Close greetingsDialog
if (greetingsDialog && greetingsCloseBtn) {
  greetingsCloseBtn.addEventListener("click", () => {
    greetingsDialog.close();
    greetingsDialog.removeAttribute("aria-modal");
  });
}

// Close greetingsDialog
if (seeultrDialog && greetingsCloseBtn) {
  seeultrCloseBtn.addEventListener("click", () => {
    seeultrDialog.close();
    seeultrDialog.removeAttribute("aria-modal");
  });
}

// Переключение между контентом
const btnCmpny = document.getElementById("btnCmpny");
const btnVcncy = document.getElementById("btnVcncy");

const sectionCompany = document.getElementById("section-company");
const sectionVacancies = document.getElementById("section-vacancies");
//const sectionVacancyDescription = document.getElementById("section-vacancy-descr");

// Обработчики
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
  // Hidden all sections
  sectionCompany.classList.remove("active-section");
  sectionCompany.classList.add("hidden-section");
  sectionVacancies.classList.remove("active-section");
  sectionVacancies.classList.add("hidden-section");
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
