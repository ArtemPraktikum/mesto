export default class UserInfo {
  constructor(selectorsObj) {
    this._nameElement = document.querySelector(selectorsObj.nameSelector)
    this._aboutMeElement = document.querySelector(selectorsObj.aboutMeSelector)
    this._avatar = document.querySelector(selectorsObj.avatarSelector)
  }
  getUserInfoFromPage() {
    this._userObj = {
      name: this._nameElement.textContent,
      aboutMe: this._aboutMeElement.textContent,
    }
    return this._userObj
  }
  setUserInfo(inputNameValue, inputAboutmeValue, avatarLink) {
    this._nameElement.textContent = inputNameValue
    this._aboutMeElement.textContent = inputAboutmeValue
    this._avatar.setAttribute('src', avatarLink)
  }
}
