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
const popupImage = popupPic.querySelector(".popup__image"); // картинка попапа
const popupCaption = popupPic.querySelector(".popup__caption"); // подпись попапа
const places = document.querySelector(".places")


// Для мягкого связывания функции с классом 
function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupPic);
}

// Для валидации - селекторы форм
const config = {
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

const openPopup = function (popup) {
  document.addEventListener("keydown", handleEscUp);
  popup.classList.add("popup_opened");
};

const closePopup = function (popup) {
  document.removeEventListener("keydown", handleEscUp);
  popup.classList.remove("popup_opened");
};


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  namePage.textContent = nameInput.value;
  jobPage.textContent = jobInput.value;
  closePopup(popupEdit);
}


//создание карточек 
function createCard(item){
  const card = new Card(item, ".places-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

initialCards.forEach((item) => {
  const cardElement = createCard(item)
  places.append(cardElement);
});

//метод, который добавит новую карточку из попапа

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = placeInput.value;
  newCard.link = linkInput.value;
  const cardElement = createCard(newCard);
  places.prepend(cardElement);
  closePopup(popupAdd);
}


const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(config);



editingButton.addEventListener("click", function () {
  formValidators[ formEdit.getAttribute('name') ].resetValidation();
  nameInput.value = namePage.textContent;
  jobInput.value = jobPage.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener("click", function () {
  formAdd.reset();
  formValidators[ formAdd.getAttribute('name') ].resetValidation();
  openPopup(popupAdd);
});

formEdit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleAddPlaceFormSubmit);

setEventCloseListeners(popupList);
