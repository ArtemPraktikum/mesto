const popupFullScreen = document.querySelector('.popup_fullscreen')

export default class Card {
  constructor(name, link, templateSelector) {
    this._name = name
    this._link = link
    this._templateSelector = templateSelector
  }
  _makeCard() {
    this._card = this._templateSelector.cloneNode(true);
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
    this._trash.closest('.element').remove()
  }
  _openPreviewImage = () => {
    this._fullImage = popupFullScreen.querySelector('.fullscreen__image')
    this._fullCaption = popupFullScreen.querySelector('.fullscreen__text')

    this._fullImage.setAttribute('src', this._link)
    this._fullCaption.textContent = this._name
    popupFullScreen.classList.add('popup_opened')
    document.addEventListener('keydown', this._closePreviewImageOnEsc)
  }
  _closePreviewImageOnEsc = (evt) => {
    if (evt.key === 'Escape') {
      popupFullScreen.classList.remove('popup_opened')
      document.removeEventListener('keydown', this._closePreviewImageOnEsc);
    }
  }

  getCard() {
    return this._makeCard()
  }
}
