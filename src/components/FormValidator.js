export default class FormValidator {
  constructor(formElement, data) {
    this._form = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(data.inputSelector)
    );
    this._submitButton = formElement.querySelector(data.submitButtonSelector);
    this._errorMessage = data.errorMessage;
    this._errorInput = data.errorInput;
    this._inactiveButton = data.inactiveButton;
  }
  //показываем ошибку
  _showInputError(input) {
    const inputName = input.getAttribute("name");
    const errorElement = this._form.querySelector(`#${inputName}-error`);
    input.classList.add(this._errorInput);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorMessage);
  }

  _hideInputError(input) {
    const inputName = input.getAttribute("name");
    const errorElement = this._form.querySelector(`#${inputName}-error`);
    input.classList.remove(this._errorInput);
    errorElement.classList.remove(this._errorMessage);
    errorElement.textContent = "";
  }

  // проверка валидации
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButton);
      this._submitButton.setAttribute("disabled", true);
    } else {
      this._submitButton.classList.remove(this._inactiveButton);
      this._submitButton.removeAttribute("disabled", true);
    }
  }

  _setListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setListeners();
  }
}
