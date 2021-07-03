import {
  togglePopup
} from './index.js'
const popupFullScreen = document.querySelector('.popup_fullscreen')

export default class Card {
  constructor(name, link, templateSelector) {
    this._name = name
    this._link = link
    this._templateSelector = templateSelector
  }
  _makeCard() {
    this._card = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    this._image = this._card.querySelector('.element__image')
    this._title = this._card.querySelector('.element__title')
    this._title.textContent = this._name
    this._image.setAttribute('src', this._link)
    this._image.setAttribute('alt', this._name)
    this._setListeners()
    return this._card
  }
  _setListeners() {
    this._like = this._card.querySelector('.element__like-button')
    this._trash = this._card.querySelector('.element__trash-button')

    this._like.addEventListener('click', this._handleLike)
    this._trash.addEventListener('click', this._deleteCard)
    this._image.addEventListener('click', this._openPreviewImage)
  }
  _handleLike = () => {
    this._like.classList.toggle('element__like-button_active')
  }
  _deleteCard = () => {
    this._card.remove()
    this._card = null
  }
  _openPreviewImage = () => {
    this._fullImage = popupFullScreen.querySelector('.fullscreen__image')
    this._fullCaption = popupFullScreen.querySelector('.fullscreen__text')

    this._fullImage.setAttribute('src', this._link)
    this._fullImage.setAttribute('alt', this._name)
    this._fullCaption.textContent = this._name

    togglePopup(popupFullScreen)
  }

  getCard() {
    return this._makeCard()
  }
}
