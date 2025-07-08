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

console.log(vacancies_cards);

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

