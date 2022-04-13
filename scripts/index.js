import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// карточки
const initialCards = [
  {
    name: "Сулакский каньон",
    link: "https://i.ibb.co/KWMxh5v/photo-2022-04-07-16-52-16.jpg",
  },
  {
    name: "Даргвас",
    link: "https://i.ibb.co/jLyNps7/photo-2022-04-07-16-52-55.jpg",
  },
  {
    name: "Братск",
    link: "https://i.ibb.co/nrwdmwG/photo-2022-04-07-16-53-03.jpg",
  },
  {
    name: "Ольхон",
    link: "https://i.ibb.co/GnKzXXV/photo-2022-04-07-16-53-04.jpg",
  },
  {
    name: "Мидаграбинские водопады",
    link: "https://i.ibb.co/R2fSKW8/photo-2022-04-07-16-52-57.jpg",
  },
  {
    name: "Зарамагское водохранилище",
    link: "https://i.ibb.co/6y9pwc9/photo-2022-04-07-16-52-58.jpg",
  },
];

// DOM-элементы
const popupEdit = document.querySelector("#popupEdit"); // объект попапа редактирования
const editingButton = document.querySelector("#editButton"); // кнопка редактирования
const popupAdd = document.querySelector("#popupAdd"); // объект попапа добавления карточки
const addButton = document.querySelector("#addButton"); // кнопка открывающая попак добавления карточки
const formEdit = document.querySelector("#formEdit"); // форма редактирования
const nameInput = formEdit.querySelector("#name"); // элемент ввода имени
const jobInput = formEdit.querySelector("#occupation"); // элемент ввода профессии
const namePage = document.querySelector(".profile__name"); // элемент имени пользователя
const jobPage = document.querySelector(".profile__description"); // элемент описания профессии
const formAdd = document.querySelector("#formAdd"); // форма добавления карточки
const placeInput = formAdd.querySelector("#picName"); // элемент ввода названия места
const linkInput = formAdd.querySelector("#picLink"); // элемент ввода ссылки на картинку
const popupList = Array.from(document.querySelectorAll(".popup")); //список всех попапов документа
const popupPic = document.querySelector("#popupPic"); // объект попапа с картинкой

// Для валидации

//Список форм
const formList = Array.from(document.querySelectorAll(".form"));

//Селекторы форм
const popupSelectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  errorMessage: "form__error_active",
  errorInput: "form__input_error",
  inactiveButton: "form__submit_inactive",
};

//метод, который поможет закрыть попап при нажатии на esc
const handleEscUp = (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
};

//метод, который поможет закрыть попап при нажатии на overlay
const handleOverlayClick = (popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target === popup || e.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
};

//метод, который добавляет слушатель кликанья к каждому попапу из документа
const setEventCloseListeners = (popupList) => {
  popupList.forEach((popup) => {
    handleOverlayClick(popup);
  });
};

export const openPopup = function (popup) {
  document.addEventListener("keydown", handleEscUp);
  popup.classList.add("popup_opened");
};

const closePopup = function (popup) {
  document.removeEventListener("keydown", handleEscUp);
  popup.classList.remove("popup_opened");
};

//Функция, которая проверит, есть ли у попапа форма и сделает ее полный ресет (избавится от появления старых ошибок при при следующем открытии и пр.)
const resetForm = function (popupForm) {
  popupForm.reset();
  const button = popupForm.querySelector(".form__submit");
  button.classList.add("form__submit_inactive");
  clearErrors(popupForm);
  button.setAttribute("disabled", true);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  namePage.textContent = nameInput.value;
  jobPage.textContent = jobInput.value;
  closePopup(popupEdit);
}

//Функция, которая очистит от старых ошибок попап при закрытии

const clearErrors = function (form) {
  const errorsList = Array.from(form.querySelectorAll(".form__error"));
  errorsList.forEach((error) => {
    error.textContent = "";
  });

  const inputsList = Array.from(form.querySelectorAll(".form__input"));
  inputsList.forEach((input) => {
    input.classList.remove("form__input_error");
  });
};

//создание карточек
initialCards.forEach((item) => {
  const card = new Card(item, ".places-template");
  const cardElement = card.generateCard();
  // Добавляем в DOM
  document.querySelector(".places").prepend(cardElement);
});

//метод, который добавит новую карточку из попапа

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = placeInput.value;
  newCard.link = linkInput.value;
  const card = new Card(newCard, ".places-template");
  const cardElement = card.generateCard();
  document.querySelector(".places").prepend(cardElement);
  closePopup(popupAdd);
}

formList.forEach((formElement) => {
  const formValid = new FormValidator(popupSelectors, formElement);
  formValid.enableValidation();
});

editingButton.addEventListener("click", function () {
  resetForm(formEdit);
  nameInput.value = namePage.textContent;
  jobInput.value = jobPage.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener("click", function () {
  resetForm(formAdd);
  openPopup(popupAdd);
});

formEdit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleAddPlaceFormSubmit);

setEventCloseListeners(popupList);
