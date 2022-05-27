import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._formElement = this._popup.querySelector(".form");
    this._submitButton = this._formElement.querySelector(".form__submit");
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFromSubmit();
      this.close();
    });
  }
}
