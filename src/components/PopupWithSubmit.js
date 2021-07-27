import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._submitButton = this._popup.querySelector('.popup__sumbit-button')
  }
  setEventListeners() {
    super.setEventListeners()

    this._submitButton.addEventListener('click', () => {
      this._submitCallback()
    })
  }
  fillSubmitCallback = (method) => {
    this._submitCallback = method
  } 
}
