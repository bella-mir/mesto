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

api.getUserData().then((res)=>{userData.setUserInfo(res);});


const userData = new UserInfo({
  selectorName: ".profile__name",
  selectorInfo: ".profile__description",
  selectroAvatar: ".profile__photo"

});

const popupProfile = new PopupWithForm("#popupEdit", (data) => {
  api.setUserData(data)
    .then((res) => {
      console.log(data);
      userData.setUserInfo(res);
      popupProfile.close();
    })
    .catch((err) => console.log(err));
});
popupProfile.setEventListeners();






const cards = api.getInitialCards();


//вот это переписать, чтобы автоматически получать ай ди пользователя
const userId = "b1bca313bfd031609bfa0e50";

// const getUserId = api.getUserData().then((result) => {
//   return(result._id);
// }).catch((err) => {
//     console.log(err); // выведем ошибку в консоль
//   });

// console.log(getUserId);


const popupImage = new PopupWithImage("#popupPic");
popupImage.setEventListeners();

// Увеличение картинок при клике (для мягкого связывания функции с классом Card)
function handleCardClick(name, link) {
  popupImage.open(name, link);
}


//Функция создания карточки
const createCard = (item) => {
  const card = new Card(item, ".places-template", handleCardClick,  api, userId);
  return card;
};


function renderCard(item) {
  const card = createCard(item);
  const cardElement = card.generateCard();
  return cardElement;
}

//понять, что делать с items
const allCards= new Section({
  renderer: renderCard
},
".places");


cards
  .then((result) => {
    allCards.renderItems(result);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


  const popupCard = new PopupWithForm("#popupAdd", (data) => {
    api.postCard(data)
      .then((res) => {
        const card = createCard(res);
        const cardElement = card.generateCard();
        allCards.addItem(cardElement);
        popupCard.close();
      })
      .catch((err) => console.log(err));
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

profileFormValid.enableValidation();
cardFormValid.enableValidation();














  



// //добавление карточки из попапа
// const popupCard = new PopupWithForm("#popupAdd", (data) => {
//   newCard.addItem(renderCard(data));
// }, api);

//Слушатели на попапах
// popupCard.setEventListeners();
// popupProfile.setEventListeners();

// //функция отрисовки карточек на странице
// cards
//   .then((result) => {

    
//       //создание карточек
//       const newCard = new Section(
//         {
//           items: result.map((item)=>item),
//           renderer: renderCard,
//         },
//         ".places"
//       );

//       function renderCard(item) {
//         const card = new Card(item, ".places-template", handleCardClick, handleDeleteClick, api);
//         const cardElement = card.generateCard();
//         return cardElement;
//       }
//       //добавление карточек на страницу
//       newCard.renderItems();
//   })
//   .catch((err) => {
//     console.log(err); // выведем ошибку в консоль
//   });

