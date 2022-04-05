//Валидация

//показываем ошибку
const showInputError = (
  formElement,
  inputElement,
  message,
  errorInput,
  errorMessage
) => {
  const inputName = inputElement.getAttribute("name");
  const errorElement = formElement.querySelector(`#${inputName}-error`);
  inputElement.classList.add(errorInput);
  errorElement.textContent = message;
  errorElement.classList.add(errorMessage);
};

//скрываем ошибку
const hideInputError = (
  formElement,
  inputElement,
  errorInput,
  errorMessage
) => {
  const inputName = inputElement.getAttribute("name");
  const errorElement = formElement.querySelector(`#${inputName}-error`);
  inputElement.classList.remove(errorInput);
  errorElement.classList.remove(errorMessage);
  errorElement.textContent = "";
};

// проверка валидации
const checkInputValidity = (
  formElement,
  inputElement,
  errorInput,
  errorMessage
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      errorInput,
      errorMessage
    );
  } else {
    hideInputError(formElement, inputElement, errorInput, errorMessage);
  }
};

// проверка валидности инпута - возвращает true или false в зависимости от валидности полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// функция, которая активирует или деактивирует кнопку сабмит
const toggleButtonState = (inputList, buttonElement, inactiveButton) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButton);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(inactiveButton);
    buttonElement.removeAttribute("disabled", true);
  }
};

// наложения обработчика на поля форм
const setListeners = (
  formElement,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButton,
    errorInput,
    errorMessage,
    ...rest
  }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, errorInput, errorMessage);
      toggleButtonState(inputList, buttonElement, inactiveButton);
    });
  });
};

//**действие запуска процесса наложения валидации
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => e.preventDefault());
    setListeners(formElement, rest);
  });
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  errorMessage: "form__error_active",
  errorInput: "form__input_error",
  inactiveButton: "form__submit_inactive",
});
