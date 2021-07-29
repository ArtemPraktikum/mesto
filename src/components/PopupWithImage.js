import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._previewImage = this._popup.querySelector('.fullscreen__image')
    this._previewCaption = this._popup.querySelector('.fullscreen__text')
  }
  open(link, name) {
    this._previewImage.src = link
    this._previewImage.alt = name
    this._previewCaption.textContent = name

    super.open()
  }
}
