export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._btnclose = this._popup.querySelector(".popup__close");
  }
  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove("popup_opened");
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverClose = (evt) => {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  };

  setEventListeners() {
    this._btnclose.addEventListener("click", this.close.bind(this));
    this._popup.addEventListener("mousedown", this._handleOverClose);
  }
}
