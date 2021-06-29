export const popupFullScreenInCard = document.querySelector('.popup_fullscreen')

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

    this.#setListenersToElem()

    return this.#card
  }
  #setListenersToElem() {
    this.#like = this.#card.querySelector('.element__like-button')
    this.#trash = this.#card.querySelector('.element__trash-button')
    this.#fullImage = popupFullScreenInCard.querySelector('.fullscreen__image')
    this.#fullCaption  = popupFullScreenInCard.querySelector('.fullscreen__text')

    this.#like.addEventListener('click', () => {
      this.#like.classList.toggle('element__like-button_active')
    })

    this.#trash.addEventListener('click', () => {
      this.#trash.closest('.element').remove()
    })

    this.#image.addEventListener('click', () => {
      this.#fullImage.setAttribute('src', this.#link)
      this.#fullCaption.textContent = this.#name

      popupFullScreenInCard.classList.toggle('popup_opened')
      })
  }

  getCard() {
    return this.#makeCard()
  }

}

