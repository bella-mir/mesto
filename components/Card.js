export default class Card {
  constructor(data, selector, handleCardClick) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }

  _toggleLike() {
    this._likeButton.classList.toggle("place__like_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });

    this._element
      .querySelector(".place__remove")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".place__image");
    this._likeButton = this._element.querySelector(".place__like");
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".place__name").textContent = this._name;

    return this._element;
  }
}
