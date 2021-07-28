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
validateProfilePopup.enableValidation()
const validateAddPopup = new FormValidator(formConfig, formAddCard)
validateAddPopup.enableValidation()

const PopupWithSubmitClass = new PopupWithSubmit('.popup-delete')
PopupWithSubmitClass.setEventListeners()
const options = {
  cohort: 'cohort-26',
  url: 'https://mesto.nomoreparties.co/v1',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    authorization: '91449a4f-6ddf-4765-abab-e8f1174fa9e0',
  },
}
function createCard(item, templateSelector) {
  const card = new Card(
    {
      data: item,
      handleCardClick: (link, name) => {
        popupFullScreenClass.open(link, name)
      },

      handleLikeClick: (cardId, isLiked) => {
        if (!isLiked) {
          api
            .likeCard(cardId)
            .then((updatedCard) => {
              card.updateLikes(updatedCard.likes)
              card.changeLikeColor()
            })
            .catch((res) => {
              console.log(res)
            })
        } else {
          api
            .UnlikeCard(cardId)
            .then((updatedCard) => {
              card.updateLikes(updatedCard.likes)
              card.changeLikeColor()
            })
            .catch((res) => {
              console.log(res)
            })
        }
      },

      handleDeleteIconClick: (cardId) => {
        PopupWithSubmitClass.open()
        PopupWithSubmitClass.fillSubmitCallback(() => {
          // удалить карточку с сервера
          api.deleteCard(cardId).then(() => {
            card.deleteCard()
            PopupWithSubmitClass.close()
          })
        })
      },
    },
    templateSelector,
    myId
  )
  const cardElement = card.getCard()

  return cardElement
}

const cardsGalery = new Section('.elements')

let myId = null
const api = new Api(options)

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userArray, cardsArray]) => {
    myId = userArray._id // вынести мой id в глоб. обл. вид.
    user.setUserInfo(userArray.name, userArray.about, userArray.avatar) // заполнить информацию о пользователе
    cardsGalery.renderItems({
      // отрисовать предустановленные карточки
      items: cardsArray,
      renderer: (item) => {
        cardsGalery.addItemAppend(createCard(item, '.template'))
      },
    })
  }
)

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
      cardsGalery.addItemPrepend(createCard(responseCardElement, '.template'))
    })
  addPopupClass.close()
})
addPopupClass.setEventListeners()
// api.changeAvatar('https://html5css.ru/howto/img_snow.jpg')