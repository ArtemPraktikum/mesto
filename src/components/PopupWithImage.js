import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  open(link, name) {
    this._previewImage = this._popup.querySelector('.fullscreen__image')
    this._previewCaption = this._popup.querySelector('.fullscreen__text')

    this._previewImage.setAttribute('src', link)
    //запись атрибута как this._previewImage.setAttribute.src не рабоает?! интересно почему
    this._previewImage.setAttribute('alt', name)
    this._previewCaption.textContent = name

    super.open()
  }
}
