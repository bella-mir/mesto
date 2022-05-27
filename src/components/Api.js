export default class Api {
  constructor(config) {
    this._baseUrl = config.url;
    this._headers = config.headers;
  }

  //приватная функция проверки ответа
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  //получить карточки с сервера (GET)
  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //добавить карточку (POST)
  postCard(data) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: data.name, link: data.link }),
    }).then(this._checkResponse);
  }

  //удалить карточку (DELETE)
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //получить данные пользователя (GET)
  getUserData() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //заменить данные пользователя (PATCH)
  setUserData(data) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name2,
        about: data.occupation,
      }),
    }).then(this._checkResponse);
  }

  //заменить аватар (PATCH)
  setNewAvatar(data) {
    return fetch(this._baseUrl + `/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarlink,
      }),
    }).then(this._checkResponse);
  }

  //“залайкать” карточку (PUT)
  setLikeCard(id) {
    return fetch(this._baseUrl + `/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //удалить лайк карточки (DELETE)
  deleteLikeCard(id) {
    return fetch(this._baseUrl + `/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
