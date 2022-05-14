import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._cardPicture = document.querySelector(".popup__image");
    this._cardCaption = document.querySelector(".popup__caption");
  }

  open(name, src) {
    super.open();
    this._cardPicture.src = src;
    this._cardPicture.alt = name;
    this._cardCaption.textContent = name;
  }
}


