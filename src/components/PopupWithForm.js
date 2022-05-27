import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit, api) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._api = api;
    this._formElement = this._popup.querySelector(".form");
    this._inputList = this._popup.querySelectorAll(".form__input");
    this._submitButton = this._popup.querySelector(".form__submit");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setLoading(isLoading){
    if(isLoading){
        this._submitButton.value = "Сохранение...";
    }
    else{
      this._submitButton.value = "Сохранить";
    }
}

  close() {
    super.close();
    this._formElement.reset();
  }
}
