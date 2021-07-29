export default class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
    templateSelector,
    userId
  ) {
    this._name = data.name //Имя
    this._link = data.link //Ссылка на картинку
    this._cardId = data._id //Id карточки
    this._likes = data.likes //Массив с лайками
    this._cardOwnerId = data.owner._id //Id владельца карточки

    this._handleCardClick = handleCardClick //Функция открытия большой картнки
    this._handleLikeClick = handleLikeClick
    this._handleDeleteIconClick = handleDeleteIconClick
    this._templateSelector = templateSelector
    this._userId = userId
  }

  _makeCard = () => {
    this._card = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true)
    this._image = this._card.querySelector('.element__image') //Картика в карт.
    this._title = this._card.querySelector('.element__title') //Текст в карт.
    this._likeCounter = this._card.querySelector('.element__like-counter') //Цифра лайков в карт.

    this._deleteButton = this._card.querySelector('.element__trash-button') //Кнопка удалить в карт.
    this._likeButton = this._card.querySelector('.element__like-button') //Кнопка лайк в карт.

    this._title.textContent = this._name
    this._image.src = this._link
    this._image.alt = this._name
    this._likeCounter.textContent = this._likes.length
    //Скрывать счётчик лайков если он == 0        (сделать если останется время)
    // if (this._likeCounter.textContent == 0) {
    //   this._likeCounter.classList.add('element__like-counter_hiden')
    // }
    //Показывать кнопку удалить только на карточках пользователя
    if (this._userId === this._cardOwnerId) {
      this._deleteButton.classList.add('element__trash-button_visible')
    }
    //Если юзер уже ставил лайк показать в html закрашенный лайк
    if (this._isLiked()) {
      this._likeButton.classList.add('element__like-button_active')
    }

    this._setListeners()
    return this._card
  }
  _setListeners = () => {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._isLiked())
    })

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId)
    })

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name)
    })
  }
  //поставить лайк в html
  changeLikeColor = () => {
    this._likeButton.classList.toggle('element__like-button_active')
  }
  // удалить карточку из html
  deleteCard = () => {
    this._card.remove()
    this._card = null
  }

  _isLiked = () => {
    return this._likes.some((like) => like._id === this._userId)
  }

  getCard() {
    return this._makeCard()
  }
  updateLikes = (updatedLikes) => {
    this._likes = updatedLikes
    this._likeCounter.textContent = updatedLikes.length
  }
}
