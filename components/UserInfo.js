export default class UserInfo {
  constructor(selectorsObj) {
    this._nameElement = formProfile.querySelector(selectorsObj.nameSelector)
    this._aboutmeElement = formProfile.querySelector(selectorsObj.aboutmeSelector)
  }
  getUserInfo() {
    this._UserInfoObj = {}
    this._UserInfoObj.name = this._nameElement
    return this._UserInfoObj
  }
}




const inputSelectorsInProfilePopup = {
  nameSelector: '.nameInFormProfile',
  aboutmeSelector: '.aboutmeInFormProfile'
}
const user = new UserInfo(inputSelectorsInProfilePopup)
