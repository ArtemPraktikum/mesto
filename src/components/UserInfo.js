export default class UserInfo {
  constructor(selectorsObj) {
    this._nameElement = document.querySelector(selectorsObj.nameSelector)
    this._aboutMeElement = document.querySelector(selectorsObj.aboutMeSelector)
  }
  getUserInfo() {
    this._userObj = {
    name: this._nameElement.textContent,
    aboutMe: this._aboutMeElement.textContent
    }
    return this._userObj
  }
  setUserInfo(inputName, inputAboutme) {
    this._nameElement.textContent = inputName
    this._aboutMeElement.textContent = inputAboutme
  }
}

