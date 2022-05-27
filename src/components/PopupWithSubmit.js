import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(selector, handleSubmitAction) {
    super(selector);
    this._formElement = this._popup.querySelector(".form");
    this._submitButton = this._formElement.querySelector(".form__submit");
    this._handleSubmitAction = handleSubmitAction;
  }

  open(id, element) {
    this._cardId = id;
    this._cardElement = element;
    super.open();
  }

  _handleFormSubmit(evt){
    evt.preventDefault();
    this._handleSubmitAction(this._cardId, this._cardElement);
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("submit", (evt) => {
      this._handleFromSubmit(evt);
    });
  }
}
