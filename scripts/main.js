let popup = document.querySelector("#popup"); // объект попапа
let edit_button = document.querySelector("#edit_button"); // кнопка редактирования
let popup__close = document.querySelector(".popup__close"); // кнопка заркытия
let formElement = document.querySelector(".form"); // форма
let nameInput = formElement.querySelector("#name"); // элемент ввода имени
let jobInput = formElement.querySelector("#occupation"); // элемент ввода профессии
let namePage = document.querySelector(".profile__name"); // элемент имени пользователя
let jobPage = document.querySelector(".profile__description"); // элемент описания профессии
let likes = document.querySelectorAll(".place__like"); // элемент сердечка (лайк)

function openedPopup() {
  popup.classList.add("popup__show");
}

function closedPopup() {
  popup.classList.remove("popup__show");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  namePage.textContent = nameInput.value;
  jobPage.textContent = jobInput.value;
  closedPopup();
}

function activeLike(parent) {
  parent.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
}

edit_button.addEventListener("click", openedPopup);

popup__close.addEventListener("click", closedPopup);

formElement.addEventListener("submit", formSubmitHandler);

activeLike(likes);
