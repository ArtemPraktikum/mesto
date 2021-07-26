export default class Card {
  constructor({name, link, templateSelector, likeNumber, handleCardClick}) {
    this._name = name
    this._link = link
    this._templateSelector = templateSelector
    this.likeNumber = likeNumber
    this._handleCardClick = handleCardClick
  }
  _makeCard = () => {
    this._card = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    this._image = this._card.querySelector('.element__image')
    this._title = this._card.querySelector('.element__title')
    this._like = this._card.querySelector('.element__like-button')
    this._trash = this._card.querySelector('.element__trash-button')

    this._likeNumberElement = this._card.querySelector('.element__like-counter')
    this._title.textContent = this._name
    this._image.setAttribute('src', this._link)
    this._image.setAttribute('alt', this._name)
    this._likeNumberElement.textContent = this.likeNumber.length
    this._setListeners()
    return this._card
  }
  _setListeners = () => {
    this._like.addEventListener('click', this._handleLike)
    this._trash.addEventListener('click', this._deleteCard)
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name)
    })
  }
  _handleLike = () => {
    this._like.classList.toggle('element__like-button_active')
  }
  _deleteCard = () => {
    this._card.remove()
    this._card = null
  }
  getCard() {
    return this._makeCard()
  }
}
