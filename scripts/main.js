// карточки

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupEdit = document.querySelector("#popupEdit"); // объект попапа редактирования
const editButton = document.querySelector("#editButton"); // кнопка редактирования
const popupEdClose = document.querySelector("#popupEdClose"); // кнопка заркытия попапа редактирования
const popupAdd = document.querySelector("#popupAdd"); // объект попапа добавления карточки
const addButton = document.querySelector("#addButton"); // кнопка открывающая попак добавления карточки
const popupAdClose = document.querySelector("#popupAdClose"); // кнопка заркытия попапа добавления карточки
const formEdit = document.querySelector("#formEdit"); // форма редактирования
const nameInput = formEdit.querySelector("#name"); // элемент ввода имени
const jobInput = formEdit.querySelector("#occupation"); // элемент ввода профессии
const namePage = document.querySelector(".profile__name"); // элемент имени пользователя
const jobPage = document.querySelector(".profile__description"); // элемент описания профессии
const formAdd = document.querySelector("#formAdd"); // форма добавления карточки
const placeInput = formAdd.querySelector("#picName"); // элемент ввода названия места
const linkInput = formAdd.querySelector("#picLink"); // элемент ввода ссылки на картинку

const placeContainer = document.querySelector(".places"); //темплейт карточки
const placesTemplate = document.querySelector(".places-template").content; // темплейт карточки

const popupPic = document.querySelector("#popupPic"); // объект попапа с картинкой
const popupPicClose = document.querySelector("#popupPicClose"); // кнопка заркытия попапа c картинкой

const popupImage = popupPic.querySelector(".popup__image"); // картинка попапа
const popupCaption = popupPic.querySelector(".popup__caption"); // подпись попапа

const popupList = Array.from(document.querySelectorAll(".popup")); //список всех попапов документа


//метод, который поможет закрыть попап при нажатии на esc
const handleEscUp = (evt) => {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(activePopup);
  }
};

//метод, который поможет закрыть попап при нажатии на overlay
const handleOverlayClick = (popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target === popup && popup.classList.contains("popup_opened")) {
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

//метод, который сгенерирует карточки из темплейта

function createCard(item) {
  const placeElement = placesTemplate.querySelector(".place").cloneNode(true);
  const placeImage = placeElement.querySelector(".place__image");
  const placeName = placeElement.querySelector(".place__name");

  placeImage.src = item.link;
  popupImage.alt = item.name;
  placeName.textContent = item.name;

  placeElement
    .querySelector(".place__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("place__like_active");
    });

  placeElement
    .querySelector(".place__remove")
    .addEventListener("click", function () {
      placeElement.remove();
    });

  placeImage.addEventListener("click", function () {
    openPopup(popupPic);
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupCaption.textContent = item.name;
  });

  return placeElement;
}

function addCard(item) {
  const placeElement = createCard(item);
  placeContainer.prepend(placeElement);
}

//метод, который добавит новую карточку из попапа

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = placeInput.value;
  newCard.link = linkInput.value;
  addCard(newCard);
  closePopup(popupAdd);
  formAdd.reset();
}

//добавление всех карточек при загрузке
initialCards.forEach((element) => addCard(element));

editButton.addEventListener("click", function () {
  openPopup(popupEdit);
  nameInput.value = namePage.textContent;
  jobInput.value = jobPage.textContent;
});

popupEdClose.addEventListener("click", function () {
  closePopup(popupEdit);
});

addButton.addEventListener("click", function () {
  openPopup(popupAdd);
});

popupAdClose.addEventListener("click", function () {
  closePopup(popupAdd);
});

popupPicClose.addEventListener("click", function () {
  closePopup(popupPic);
});

formEdit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleAddPlaceFormSubmit);

setEventCloseListeners(popupList);