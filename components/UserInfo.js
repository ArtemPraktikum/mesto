export default class UserInfo {
  constructor(selectorsObj) {
    this._nameElement = document.querySelector(selectorsObj.nameSelector)
    this._aboutmeElement = document.querySelector(selectorsObj.aboutmeSelector)
  }
  getUserInfo() {
    this._userObj = {
    name: this._nameElement.textContent,
    aboutme: this._aboutmeElement.textContent
    }
    return this._userObj
  }
  setUserInfo(inputName, inputAboutme) {
    this._nameElement.textContent = inputName
    this._aboutmeElement.textContent = inputAboutme
  }
}

