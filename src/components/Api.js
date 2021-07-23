export default class Api {
  constructor({cohort, url, headers}) {
    this._cohort = cohort
    this._url = url
    this._headers = headers
  }
  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-26/users/me', {
      headers: this._headers
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка в getUserInfo бип-буп, статус: ${response.status}`)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  getInitialCards() {
    return fetch(`${this._url}/${this._cohort}/cards`, {
      headers: this._headers
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка в getInitialCards бип-буп, статус: ${response.status}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
