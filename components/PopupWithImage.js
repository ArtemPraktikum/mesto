import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }
  open(link, name) {
    this._previewImage = this._popup.querySelector('.fullscreen__image')
    this._previewCaption = this._popup.querySelector('.fullscreen__text')

    this._previewImage.setAttribute('src', link)
    this._previewImage.setAttribute('alt', name)
    this._previewCaption.textContent = name

    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)


  }
}
