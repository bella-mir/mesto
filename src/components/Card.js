export default class Card {
  constructor(
    data,
    selector,
    handleCardClick,

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

    this._api = api;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }

  handleLikeCard() {
    this._element = this._getTemplate();
    this._likeCount = this._element.querySelector(".place__like-count");
    this._likeButton = this._element.querySelector(".place__like");

    if (!this._likeButton.classList.contains("place__like_active")) {
      this._api
        .setLikeCard(this._id)
        .then((data) => {
          this._likeButton.classList.add("place__like_active");
          this._likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .deleteLikeCard(this._id)
        .then((data) => {
          this._likeButton.classList.remove("place__like_active");
          this._likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  _handleDeleteClick() {
    this._api
      .deleteCard(this._id)
      .then(() => this._element.remove())
      .catch((err) => console.log(err));
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this.handleLikeCard();
    });

    this._element
      .querySelector(".place__remove")
      .addEventListener("click", () => {
        this._handleDeleteClick();
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

    this._element.querySelector(".place__like-count").textContent =
      this._likes.length;

    if (!(this._ownerId === this._userId)) {
      this._element.querySelector(".place__remove").remove();
    }

    return this._element;
  }
}

// //переписать, что отправляется запрос, как на добавление лайка, так и на удаление
//   _toggleLike() {
//     this._likeButton.classList.toggle("place__like_active");
//   }

// //по идее все ок
//   _handleDeleteClick() {
//     this._api
//       .deleteCard(this._id)
//       .then(() => this._element.remove())
//       .catch((err) => console.log(err));
//   }

// //тут надо переписать toggleLike
//   _handleLikeClick(){
//     this._api
//       .setLikeCard(this._id)
//       .then(() => this._toggleLike())
//       .catch((err) => console.log(err));

//   }
