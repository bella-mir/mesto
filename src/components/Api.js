export default class Api {
  constructor(config) {
    this._baseUrl = config.url;
    this._headers = config.headers;
  }

  //не забыть устранить дублирование, сощдав приватную функцию

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //добавить карточку (POST)

  // postCard(data) {
  //   return fetch(this._baseUrl + "/cards", {
  //     method: "POST",
  //     headers: this._headers,
  //     body: JSON.stringify(data),
  //   }).then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   });
  // }
  // //удалить карточку (DELETE)
  // deleteCard(id) {
  //   return fetch(`${this._baseUrl}/cards/${id}`, {
  //     method: "DELETE",
  //     headers: this._headers
  //   }).then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   });
  // }
  //получить данные пользователя (GET)
  getUserData() {}
  //заменить данные пользователя (PATCH)

  setUserData() {}
  //заменить аватар (PATCH)
  setNewAvatar() {}
  //“залайкать” карточку (PUT)
  setLikeCard() {}
  //удалить лайк карточки (DELETE)
  deleteLikeCard() {}
}
