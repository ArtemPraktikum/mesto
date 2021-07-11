import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }
  open() {
    this._previewImage = this._popup.querySelector('.fullscreen__image')
    this._previewCaption = this._popup.querySelector('.fullscreen__text')

    this._previewImage.setAttribute('src', this._link)
    this._previewImage.setAttribute('alt', this._name)
    this._previewCaption.textContent = this._name

    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)


  }
}
