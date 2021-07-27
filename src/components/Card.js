export default class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
    templateSelector,
    myId
  ) {
    this._name = data.name //Имя
    this._link = data.link //Ссылка на картинку
    this._cardId = data._id //Id карточки
    this._likeNumber = data.likes.length //Колл. лайков
    this._cardOwnerId = data.owner._id //Id владельца карточки
    this._handleCardClick = handleCardClick //Функция зума
    this._handleLikeClick = handleLikeClick
    this._handleDeleteIconClick = handleDeleteIconClick
    this._templateSelector = templateSelector
    this._myId = myId
  }

  _makeCard = () => {
    this._card = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true)
    this._image = this._card.querySelector('.element__image')
    this._title = this._card.querySelector('.element__title')
    this._likeCounter = this._card.querySelector('.element__like-counter')

    this._trash = this._card.querySelector('.element__trash-button')
    this._like = this._card.querySelector('.element__like-button')

    this._title.textContent = this._name
    this._image.src = this._link
    this._image.alt = this._name
    this._likeCounter.textContent = this._likeNumber

    if (this._myId === this._cardOwnerId) {
      this._trash.classList.add('element__trash-button_visible')
    }

    this._setListeners()
    return this._card
  }
  _setListeners = () => {
    this._like.addEventListener('click', this._handleLike)
    this._trash.addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId)
    })
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name)
    })
  }
  _handleLike = () => {
    this._like.classList.toggle('element__like-button_active')
  }
  // удалить карточку из html
  deleteCard = () => {
    this._card.remove()
    this._card = null
  }
  getCard() {
    return this._makeCard()
  }
}
