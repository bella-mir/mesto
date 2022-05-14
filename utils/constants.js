// карточки
export const initialCards = [
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
  export const popupEdit = document.querySelector("#popupEdit"); // объект попапа редактирования
  export const editingButton = document.querySelector("#editButton"); // кнопка редактирования
  export const popupAdd = document.querySelector("#popupAdd"); // объект попапа добавления карточки
  export const addButton = document.querySelector("#addButton"); // кнопка открывающая попак добавления карточки
  export const formEdit = document.querySelector("#formEdit"); // форма редактирования
  export const nameInput = formEdit.querySelector("#name"); // элемент ввода имени
  export const jobInput = formEdit.querySelector("#occupation"); // элемент ввода профессии
  export const namePage = document.querySelector(".profile__name"); // элемент имени пользователя
  export const jobPage = document.querySelector(".profile__description"); // элемент описания профессии
  export const formAdd = document.querySelector("#formAdd"); // форма добавления карточки
  export const placeInput = formAdd.querySelector("#picName"); // элемент ввода названия места
  export const linkInput = formAdd.querySelector("#picLink"); // элемент ввода ссылки на картинку
  export const popupList = Array.from(document.querySelectorAll(".popup")); //список всех попапов документа
  export const popupPic = document.querySelector("#popupPic"); // объект попапа с картинкой
  export const popupImage = popupPic.querySelector(".popup__image"); // картинка попапа
  export const popupCaption = popupPic.querySelector(".popup__caption"); // подпись попапа
  export const places = document.querySelector(".places");

  // Для валидации - селекторы форм
export const config = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    errorMessage: "form__error_active",
    errorInput: "form__input_error",
    inactiveButton: "form__submit_inactive",
  };
  