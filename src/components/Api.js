export default class Api {
  constructor({ cohort, url, headers }) {
    this._cohort = cohort
    this._url = url
    this._headers = headers
  }
  UnlikeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-26/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(
        `Ошибка в likeCard бип-буп, статус: ${response.status}`
      )
    })
  }

  likeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-26/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(
        `Ошибка в likeCard бип-буп, статус: ${response.status}`
      )
    })
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-26/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(
        `Ошибка в deleteCard бип-буп, статус: ${response.status}`
      )
    })
  }

  postCard(name, link) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-26/cards', {
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
      return Promise.reject(
        `Ошибка в postCard бип-буп, статус: ${response.status}`
      )
    })
  }

  updateUserInfo(name, about) {
    return fetch('https://nomoreparties.co/v1/cohort-26/users/me', {
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
      return Promise.reject(
        `Ошибка в updateUserInfo бип-буп, статус: ${response.status}`
      )
    })
  }
  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-26/users/me', {
      headers: this._headers,
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(
        `Ошибка в getUserInfo бип-буп, статус: ${response.status}`
      )
    })
  }
  getInitialCards() {
    return fetch(`${this._url}/${this._cohort}/cards`, {
      headers: this._headers,
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(
        new Error(
          `Ошибка в getInitialCards бип-буп, статус: ${response.status}`
        )
      )
    })
  }
}
