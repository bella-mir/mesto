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
  avatarButton,
  addButton,
  formEdit,
  formAdd,
  formAvatar,
} from "../utils/constants.js";

// API
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "bebc4145-001f-487f-8afd-8c22bbd3883b",
    "Content-Type": "application/json",
  },
});

//Класс с данными пользователя
const userData = new UserInfo({
  selectorName: ".profile__name",
  selectorInfo: ".profile__description",
  selectorAvatar: ".profile__photo",
});

//Получение данных пользователей с сервера
let userId;

api.getUserData().then((res) => {
  userData.setUserInfo(res);
  userData.setUserPhoto(res);
  userId = res._id;
});

//Попап с изменением данных пользователя
const popupProfile = new PopupWithForm("#popupEdit", (data) => {
  popupProfile.setLoading(true);
  api
    .setUserData(data)
    .then((res) => {
      console.log(data);
      userData.setUserInfo(res);
      popupProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupProfile.setLoading(false);
    });
});
popupProfile.setEventListeners();

//Попап с изменением аватара
const popupAvatar = new PopupWithForm("#popupAvatar", (data) => {
  popupAvatar.setLoading(true);
  api
    .setNewAvatar(data)
    .then((data) => {
      userData.setUserPhoto(data);
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAvatar.setLoading(false);
    });
});
popupAvatar.setEventListeners();

//Слушатель на кнопке редактирования аватара
avatarButton.addEventListener("click", () => {
  avatarFormValid.resetValidation();
  popupAvatar.open();
});

//Получение карточек с сервера
const cards = api.getInitialCards();

//Попап с картинкой
const popupImage = new PopupWithImage("#popupPic");
popupImage.setEventListeners();

// Функция увеличения картинок при клике (для мягкого связывания функции с классом Card)
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const popupConfirm = new PopupWithSubmit("#popupCon", handleDeleteClick);


//Функция удаления карточки
function handleDeleteClick(id, element) {
  api
    .deleteCard(id)
    .then(() => {
      element.remove();
      popupConfirm.close();
    })
    .catch((err) => console.log(err));
}

//Функция подтверждения удаления
function handleConfirmClick() {
  popupConfirm.open();
  popupConfirm.setEventListeners();
}



//Функция лайка карточки
function handleLikeClick(card, isLike) {
  const cardLike = isLike
    ? api.deleteLikeCard(card._id)
    : api.setLikeCard(card._id);
  cardLike
    .then((res) => {
      card.setLikeCard(isLike, res);
    })
    .catch((err) => console.log(err));
}

//Функция создания карточки
function createCard(item) {
  const card = new Card(
    item,
    ".places-template",
    handleCardClick,
    handleConfirmClick,
    handleLikeClick,
    api,
    userId
  );
  return card;
}

//Функция отрисовки карточки
function renderCard(item) {
  const card = createCard(item);
  const cardElement = card.generateCard();
  return cardElement;
}

// Создание секции с карточками
const allCards = new Section(
  {
    renderer: renderCard,
  },
  ".places"
);

// Отрисовка карточек
cards
  .then((result) => {
    allCards.renderItems(result);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

// Попап добавления карточки
const popupCard = new PopupWithForm("#popupAdd", (data) => {
  popupCard.setLoading(true);
  api
    .postCard(data)
    .then((res) => {
      const card = createCard(res);
      const cardElement = card.generateCard();
      allCards.addItem(cardElement);
      popupCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupCard.setLoading(false);
    });
});
popupCard.setEventListeners();

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

//Валидация форм
const profileFormValid = new FormValidator(formEdit, config);
const cardFormValid = new FormValidator(formAdd, config);
const avatarFormValid = new FormValidator(formAvatar, config);

profileFormValid.enableValidation();
cardFormValid.enableValidation();
avatarFormValid.enableValidation();
