const popup = document.querySelector("#popup"); // объект попапа
const editButton = document.querySelector("#edit_button"); // кнопка редактирования
const popupClose = document.querySelector(".popup__close"); // кнопка заркытия
const formElement = document.querySelector(".form"); // форма
const nameInput = formElement.querySelector("#name"); // элемент ввода имени
const jobInput = formElement.querySelector("#occupation"); // элемент ввода профессии
const namePage = document.querySelector(".profile__name"); // элемент имени пользователя
const jobPage = document.querySelector(".profile__description"); // элемент описания профессии
const likes = document.querySelectorAll(".place__like"); // элемент сердечка (лайк)

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

nameInput.value = namePage.textContent
jobInput.value = jobPage.textContent

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  namePage.textContent = nameInput.value;
  jobPage.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener("click", openPopup);

popupClose.addEventListener("click", closePopup);

formElement.addEventListener("submit", handleProfileFormSubmit);
