const popupFullScreen = document.querySelector('.popup_fullscreen')

export default class Card {
  #name
  #link
  #templateSelector
  #card
  #image
  #title
  #like
  #trash
  #fullImage
  #fullCaption
  constructor(name, link, templateSelector) {
    this.#name = name
    this.#link = link
    this.#templateSelector = templateSelector
  }
  #makeCard() {
    this.#card = this.#templateSelector.cloneNode(true);
    this.#image = this.#card.querySelector('.element__image')
    this.#title = this.#card.querySelector('.element__title')
    this.#title.textContent = this.#name
    this.#image.setAttribute('src', this.#link)
    this.#image.setAttribute('alt', this.#name)
    this.#setListeners()
    return this.#card
  }
  #setListeners() {
    this.#like = this.#card.querySelector('.element__like-button')
    this.#trash = this.#card.querySelector('.element__trash-button')

    this.#like.addEventListener('click', this.#handleLike)
    this.#trash.addEventListener('click', this.#deleteCard)
    this.#image.addEventListener('click', this.#openPreviewImage)
  }
  #handleLike = () => {
    this.#like.classList.toggle('element__like-button_active')
  }
  #deleteCard = () => {
    this.#trash.closest('.element').remove()
  }
  #openPreviewImage = () => {
    this.#fullImage = popupFullScreen.querySelector('.fullscreen__image')
    this.#fullCaption  = popupFullScreen.querySelector('.fullscreen__text')
    
    this.#fullImage.setAttribute('src', this.#link)
    this.#fullCaption.textContent = this.#name
    popupFullScreen.classList.add('popup_opened')
    document.addEventListener('keydown', this.#closePreviewImageOnEsc)
  }
  #closePreviewImageOnEsc = (evt) => {
    if (evt.key === 'Escape') {
      popupFullScreen.classList.remove('popup_opened')
      document.removeEventListener('keydown', this.#closePreviewImageOnEsc);
    }
  }

  getCard() {
    return this.#makeCard()
  }
}
