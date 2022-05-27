export default class Card {
  constructor(
    data,
    selector,
    handleCardClick,
    handleConfirmClick,
    handleLikeClick,
    api,
    userId
  ) {
    this._selector = selector;
    this._name = data.name;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleConfirmClick = handleConfirmClick;
    this._handleLikeClick = handleLikeClick;

    this._api = api;
  }

  //получение темплейта
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }


  //метод, отвечающий за нажатие на картинку
  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  //установка слушателей
  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) => {
      this._handleLikeClick(
        this,
        evt.target.classList.contains("place__like_active")
      );
    });

    this._element
      .querySelector(".place__remove")
      .addEventListener("click", () => {
        this._handleConfirmClick(this._id, this._element);
      });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  //генерация карточек
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".place__image");
    this._likeButton = this._element.querySelector(".place__like");
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".place__name").textContent = this._name;

    this._element.querySelector(".place__like-count").textContent =
      this._likes.length;

    if (!(this._ownerId === this._userId)) {
      this._element.querySelector(".place__remove").remove();
    }

    return this._element;
  }

//метод, отвечающий за изменения верски при нажатии на кнопку лайка
setLikeCard(isLike, data) {
  this._likeButton = this._element.querySelector(".place__like");
  this.likeCount = this._element.querySelector(".place__like-count");

  if (!isLike) {
    this._likeButton.classList.add("place__like_active");
    this.likeCount.textContent = data.likes.length;
  } else {
    this._likeButton.classList.remove("place__like_active");
    this.likeCount.textContent = data.likes.length;
  }
}

}
