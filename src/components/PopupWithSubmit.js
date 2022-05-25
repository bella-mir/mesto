import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(selector) {
    super(selector);
    this._formElement = this._popup.querySelector(".form");
    this._submitButton = this._popup.querySelector(".form__submit");
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
  }

  setSubmitAction(action){
    this._handleFormSubmit = action;
  }

  setLoadingSign(isLoading){
      if(isLoading){
          this._submitButton.value = "Сохранение...";
      }
      else{
        this._submitButton.value = "Сохранить";
      }
  }


}
