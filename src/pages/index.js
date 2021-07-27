import './index.css'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import {
  formProfile,
  nameInput,
  aboutInput,
  openPopupAboumeButton,
  formAddCard,
  openAddPopupButton,
  userData,
  formConfig,
} from '../utils/constants.js'



// попап 'фуллскрин'
const popupFullScreenClass = new PopupWithImage('.popup_fullscreen')
popupFullScreenClass.setEventListeners()

const user = new UserInfo(userData)

// навесить слушатель на кнопку открыть попап 'о себе'
openPopupAboumeButton.addEventListener('click', () => {
  const { name, aboutMe } = user.getUserInfoFromPage()
  // изменить инпут 'Имя' в попапе 'о себе' на заголовок 'Имя' из html
  nameInput.value = name
  // изменить инпут 'обо мне' в попапе 'о себе' на подзаголовок 'обо мне' из html
  aboutInput.value = aboutMe
  // открыть попап 'о себе'
  profilePopupClass.open()
})

// навесить слушатель на кнопку открыть попап 'карточка'
openAddPopupButton.addEventListener('click', () => {
  addPopupClass.open()
  validateAddPopup.toggleButtonState()
})

const validateProfilePopup = new FormValidator(formConfig, formProfile)
const validateAddPopup = new FormValidator(formConfig, formAddCard)
validateProfilePopup.enableValidation()
validateAddPopup.enableValidation()

const options = {
  cohort: 'cohort-26',
  url: 'https://mesto.nomoreparties.co/v1',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    authorization: '91449a4f-6ddf-4765-abab-e8f1174fa9e0',
  },
}

const api = new Api(options)

// заполнить информацию о пользователе
api.getUserInfo().then((userArray) => {
  user.setUserInfo(userArray.name, userArray.about, userArray.avatar)
})

function createCard(name, link, templateSelector, likeNumber) {
  const card = new Card({
    name: name,
    link: link,
    templateSelector: templateSelector,
    likeNumber: likeNumber,
    handleCardClick: (link, name) => {
      popupFullScreenClass.open(link, name)
    },
  })
  const cardElement = card.getCard()

  return cardElement
}

const cardsGalery = new Section('.elements')

// отрисовать предустановленные карточки
api.getInitialCards().then((cardsArray) => {
  cardsGalery.renderItems({
    items: cardsArray,
    renderer: (item) => {
      cardsGalery.addItemAppend(
        createCard(item.name, item.link, '.template', item.likes)
      )
    },
  })
})

// попап 'о себе'
const profilePopupClass = new PopupWithForm('.profile-popup', (inputsObj) => {
  api
    .updateUserInfo(inputsObj.nameInFormProfile, inputsObj.aboutMeInFormProfile)
    .then((userArray) => {
      user.setUserInfo(userArray.name, userArray.about, userArray.avatar)
    })
  profilePopupClass.close()
})
profilePopupClass.setEventListeners()

// попап 'карточка'
const addPopupClass = new PopupWithForm('.add-popup', (inputsObj) => {
  api
    .postCard(inputsObj.nameInFormAddCard, inputsObj.aboutMeInFormAddCard)
    .then((responseCardElement) => {
      cardsGalery.addItemPrepend(
        createCard(
          responseCardElement.name,
          responseCardElement.link,
          '.template',
          responseCardElement.likes
        )
      )
    })
  addPopupClass.close()
})
addPopupClass.setEventListeners()

