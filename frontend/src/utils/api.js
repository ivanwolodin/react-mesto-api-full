export class Api {
  constructor(options) {
    this._url = options.url;
    this._token = "";
    this.headers = {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  setToken(token){
    this._token = `Bearer ${token}`;
    this.headers = {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  changeUserInfo(name, profession) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: profession,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  changeAvatar(avatarLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }
}

// export const api = new Api({
//   url: "https://backend15.nomoredomains.xyz",
//   // token: "3a99f107-1f3f-4594-b232-09564fbe9a82",
// });
