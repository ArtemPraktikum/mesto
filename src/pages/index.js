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
  formAddCard,
  formAvatar,
  nameInput,
  aboutInput,
  openPopupAboumeButton,
  openAvatarPopupButton,
  openAddPopupButton,
  submitPopupAboumeButton,
  submitAddPopupButton,
  submitAvatarPopupButton,
  userData,
  formConfig,
} from '../utils/constants.js'

const user = new UserInfo(userData)

// валидировать форму в попапе 'о себе'
const validateProfilePopup = new FormValidator(formConfig, formProfile)
validateProfilePopup.enableValidation()
// валидировать форму в попапе 'карточка'
const validateAddPopup = new FormValidator(formConfig, formAddCard)
validateAddPopup.enableValidation()
// валидировать форму в попапе 'аватар'
const validateAvatarPopup = new FormValidator(formConfig, formAvatar)
validateAvatarPopup.enableValidation()

// открыть попап 'о себе'
openPopupAboumeButton.addEventListener('click', () => {
  const { name, aboutMe } = user.getUserInfoFromPage()
  // изменить инпут 'Имя' в попапе 'о себе' на заголовок 'Имя' из html
  nameInput.value = name
  // изменить инпут 'обо мне' в попапе 'о себе' на подзаголовок 'обо мне' из html
  aboutInput.value = aboutMe
  // открыть попап 'о себе'
  profilePopupClass.open()
  submitPopupAboumeButton.classList.add('popup__sumbit-button_inactive')
  submitPopupAboumeButton.disabled = true
})
// открыть попап 'карточка'
openAddPopupButton.addEventListener('click', () => {
  addPopupClass.open()
  validateAddPopup.toggleButtonState()
})
// открыть попап 'аватар'
openAvatarPopupButton.addEventListener('click', () => {
  avatarPopupClass.open()
  validateAvatarPopup.toggleButtonState()
})

const PopupWithSubmitClass = new PopupWithSubmit('.popup-delete')
PopupWithSubmitClass.setEventListeners()

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
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '91449a4f-6ddf-4765-abab-e8f1174fa9e0',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userArray, cardsArray]) => {
    myId = userArray._id // вынести мой id в глоб. обл. вид.
    user.setUserInfo(userArray.name, userArray.about, userArray.avatar) // заполнить информацию о пользователе
    cardsGalery.renderItems({
      // отрисовать предустановленные карточки
      items: cardsArray,
      renderer: (item) => {
        cardsGalery.addItemAppend(createCard(item, '.template'))
      },
    })
  })
  .catch((error) => {
    console.log(error)
  })

// попап 'фуллскрин'
const popupFullScreenClass = new PopupWithImage('.popup_fullscreen')
popupFullScreenClass.setEventListeners()

// попап 'о себе'
const profilePopupClass = new PopupWithForm('.profile-popup', (inputsObj) => {
  submitPopupAboumeButton.textContent = 'Сохранение...'
  api
    .updateUserInfo(inputsObj.nameInFormProfile, inputsObj.aboutMeInFormProfile)
    .then((userArray) => {
      user.setUserInfo(userArray.name, userArray.about, userArray.avatar)
    })
    .then(() => {
      profilePopupClass.close()
    })
    .finally(() => {
      submitPopupAboumeButton.textContent = 'Сохранить'
    })
})
profilePopupClass.setEventListeners()

// попап 'карточка'
const addPopupClass = new PopupWithForm('.add-popup', (inputsObj) => {
  submitAddPopupButton.textContent = 'Создание...'
  api
    .postCard(inputsObj.nameInFormAddCard, inputsObj.aboutMeInFormAddCard)
    .then((responseCardElement) => {
      cardsGalery.addItemPrepend(createCard(responseCardElement, '.template'))
    })
    .then(() => {
      addPopupClass.close()
    })
    .finally(() => {
      submitAddPopupButton.textContent = 'Создать'
    })
})
addPopupClass.setEventListeners()

// попап 'аватар'
const avatarPopupClass = new PopupWithForm('.avatar-popup', (inputsObj) => {
  submitAvatarPopupButton.textContent = 'Сохранение...'
  api.updateAvatar(inputsObj.avatarInformAvatar).then((userArray) => {
    user.setUserInfo(userArray.name, userArray.about, userArray.avatar)
  })
  .then(() => {
  avatarPopupClass.close()
  })
  .finally(() => {
    submitAvatarPopupButton.textContent = 'Сохранить'
  })
})
avatarPopupClass.setEventListeners()
