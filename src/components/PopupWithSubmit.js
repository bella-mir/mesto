import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(selector, handleSubmitAction) {
    super(selector);
    this._handleSubmitAction = handleSubmitAction;
    this._formElement = this._popup.querySelector(".form");
    this._submitButton = this._formElement.querySelector(".form__submit");
  }

  open(id, element) {
    super.open();
    this._cardId = id;
    this._cardElement = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitAction(this._cardId, this._cardElement);
    });
  }
}
