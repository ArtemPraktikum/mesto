export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }
  updateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка: ${response.status}`)
    })
  }

  UnlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка: ${response.status}`)
    })
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка: ${response.status}`)
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка: ${response.status}`)
    })
  }

  postCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка: ${response.status}`)
    })
  }

  updateUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка: ${response.status}`)
    })
  }
  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-26/users/me', {
      headers: this._headers,
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка: ${response.status}`)
    })
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка: ${response.status}`)
    })
  }
}
