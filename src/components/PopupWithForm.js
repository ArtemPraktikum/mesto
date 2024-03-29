import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector)
    this._submitCallback = submitCallback
    this._form = this._popup.querySelector('.popup__container')
  }
  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__item')
    this._formValues = {}
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }
  setEventListeners() {
    super.setEventListeners()

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submitCallback(this._getInputValues())
    })
  }
  close() {
    super.close()
    this._form.reset()
  }
}
