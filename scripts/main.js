// карточки

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
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
const likes = document.querySelectorAll(".place__like"); // элемент сердечка (лайк)

const placeContainer = document.querySelector('.places'); //темплейт карточки
const placesTemplate = document.querySelector('.places-template').content;// темплейт карточки 


const popupPic = document.querySelector("#popupPic"); // объект попапа с картинкой
const popupPicClose = document.querySelector("#popupPicClose"); // кнопка заркытия попапа c картинкой


const popupImage = popupPic.querySelector(".popup__image") // картинка попапа
const popupCaption = popupPic.querySelector(".popup__caption") // подпись попапа

function openPicPopup() {
  popupPic.classList.add("popup_opened");
}

function closePicPopup() {
  popupPic.classList.remove("popup_opened");
}


//метод, который сгенерирует карточки из темплейта
function addCard(cards) {
  const placeElement = placesTemplate.querySelector('.place').cloneNode(true);

  placeElement.querySelector('.place__image').src = cards.link;
  placeElement.querySelector('.place__name').textContent = cards.name;

  placeElement.querySelector('.place__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like_active');
  }); 

  placeElement.querySelector('.place__remove').addEventListener('click', function (evt) {
    var target = evt.target;
    var parent = target.parentElement;
    parent.remove();
  }); 

  placeElement.querySelector('.place__image').addEventListener('click', function (evt) {
    openPicPopup(evt.target);
    popupImage.src = evt.target.src;
    popupCaption.textContent = evt.target.parentElement.querySelector('.place__name').textContent;
  }); 

  placeContainer.prepend(placeElement);
}

//метод, добавит все карточки при загрузке
for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i]);
  console.log(initialCards[i].name)
}


//метод, который добавит новую карточку из попапа

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCard = [];
  newCard.name = placeInput.value;
  newCard.link = linkInput.value;
  addCard(newCard);
  closeAdPopup();
  placeInput.value = '';
  linkInput.value = '';
}





function openEdPopup() {
  popupEdit.classList.add("popup_opened");
  nameInput.value = namePage.textContent;
  jobInput.value = jobPage.textContent;
}

function closeEdPopup() {
  popupEdit.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  namePage.textContent = nameInput.value;
  jobPage.textContent = jobInput.value;
  closeEdPopup();
}

function openAdPopup() {
  popupAdd.classList.add("popup_opened");
}

function closeAdPopup() {
  popupAdd.classList.remove("popup_opened");
}



editButton.addEventListener("click", openEdPopup);
popupEdClose.addEventListener("click", closeEdPopup);
formEdit.addEventListener("submit", handleProfileFormSubmit);
addButton.addEventListener("click", openAdPopup);
popupAdClose.addEventListener("click", closeAdPopup);
formAdd.addEventListener("submit", handleAddPlaceFormSubmit);
popupPicClose.addEventListener("click", closePicPopup);


