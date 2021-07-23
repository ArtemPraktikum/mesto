export default class Api {
  constructor({cohort, url, headers}) {
    this.cohort = cohort
    this.url = url
    this.headers = headers
  }
  getInitialCards() {
    return fetch(`${this.url}/${this.cohort}/cards`, {
      headers: this.headers
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка бип-буп, статус: ${response.status}`)
      })
      .then((resultModified) => {
        console.log(resultModified);
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
