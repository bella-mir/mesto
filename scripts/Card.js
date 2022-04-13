import {openPopup} from "./index.js";

class Card {
  constructor(data, selector) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element = this._getTemplate();

    this._element
      .querySelector(".place__like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("place__like_active");
      });

    this._element
      .querySelector(".place__remove")
      .addEventListener("click", () => {
        this._element.remove();
      });

    this._element
      .querySelector(".place__image")
      .addEventListener("click", () => {
        const popupPic = document.querySelector("#popupPic"); // объект попапа с картинкой
        const popupImage = popupPic.querySelector(".popup__image"); // картинка попапа
        const popupCaption = popupPic.querySelector(".popup__caption"); // подпись попапа
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = this._name;
        openPopup(popupPic);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".place__image").src = this._link;
    this._element.querySelector(".place__image").alt = this._name;
    this._element.querySelector(".place__name").textContent = this._name;

    return this._element;
  }
}

export { Card };
