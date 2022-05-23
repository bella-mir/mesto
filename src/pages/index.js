"use strict";

import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  config,
  nameInput,
  jobInput,
  editingButton,
  addButton,
  formEdit,
  formAdd,
} from "../utils/constants.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "b5024e97-68ca-4480-bf36-543078de24a2",
    "Content-Type": "application/json",
  },
});

const cards = api.getInitialCards();

cards
  .then((result) => {
      //создание карточек
      const newCard = new Section(
        {
          items: result.map((item)=>item),
          renderer: renderCard,
        },
        ".places"
      );
// Увеличение картинок при клике (для мягкого связывания функции с классом Card)
function handleCardClick(name, link) {
  popupImage.open(name, link);
}
      //функция отрисовки карточек на странице
      function renderCard(item) {
        const card = new Card(item, ".places-template", handleCardClick);
        const cardElement = card.generateCard();
        return cardElement;
      }

      //добавление карточек на страницу
      newCard.renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


// Попап с картинкой
const popupImage = new PopupWithImage("#popupPic");





const userData = new UserInfo({
  selectorName: ".profile__name",
  selectorInfo: ".profile__description",
});

//добавление карточки из попапа
const popupCard = new PopupWithForm("#popupAdd", (data) => {
  newCard.addItem(renderCard(data));
});

//редактирование карточки профиля
const popupProfile = new PopupWithForm("#popupEdit", (data) => {
  userData.setUserInfo(data);
});

//Слушатели на кнопках для открытия попапов редактирования профиля и добавления картинки
editingButton.addEventListener("click", function () {
  popupProfile.open();
  const userData2 = userData.getUserInfo();
  nameInput.value = userData2.name;
  jobInput.value = userData2.activity;
  profileFormValid.resetValidation();
});

addButton.addEventListener("click", () => {
  cardFormValid.resetValidation();
  popupCard.open();
});

//Слушатели на попапах
popupCard.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();

//Валидация форм
const profileFormValid = new FormValidator(formEdit, config);
const cardFormValid = new FormValidator(formAdd, config);

profileFormValid.enableValidation();
cardFormValid.enableValidation();

// const formValidators = {};

// // Включение валидации
// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     const validator = new FormValidator(formElement, config);
//     const formName = formElement.getAttribute("name");
//     formValidators[formName] = validator;
//     validator.enableValidation();
//   });
// };

// enableValidation(config);
