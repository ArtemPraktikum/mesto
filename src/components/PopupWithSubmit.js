import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector)
    this._submitCallback = submitCallback
    this._submitButton = this._popup.querySelector('.popup__sumbit-button')
  }
  setEventListeners() {
    super.setEventListeners()

    this._submitButton.addEventListener('click', () => {
      this._submitCallback()
    })
  }
}
