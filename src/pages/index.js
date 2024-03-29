// Импорт css для webpack
import './index.css'

// Импорт классов
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

// Импорт констант из отдельного файла констант
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
  userSelectors,
  formConfig,
} from '../utils/constants.js'

// пустая переменная в глоб. обл. вид. для последующего наполнения её userId
export let userId = null

// экземпляр класса UserInfo
const user = new UserInfo(userSelectors)
// Экземпляр класса Section
const cardsGalery = new Section('.elements')
// Экземпляр класса api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '91449a4f-6ddf-4765-abab-e8f1174fa9e0',
    'Content-Type': 'application/json',
  },
})

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

  nameInput.value = name
  aboutInput.value = aboutMe

  profilePopupClass.open()
  validateProfilePopup.resetValidation()
})
// открыть попап 'карточка'
openAddPopupButton.addEventListener('click', () => {
  addPopupClass.open()
  validateAddPopup.resetValidation()
})
// открыть попап 'аватар'
openAvatarPopupButton.addEventListener('click', () => {
  avatarPopupClass.open()
  validateAvatarPopup.resetValidation()
})

// Функция: создать экземпляр карточки
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
            .catch((error) => {
              console.log(error)
            })
        } else {
          api
            .UnlikeCard(cardId)
            .then((updatedCard) => {
              card.updateLikes(updatedCard.likes)
              card.changeLikeColor()
            })
            .catch((error) => {
              console.log(error)
            })
        }
      },

      handleDeleteIconClick: (cardId) => {
        popupWithSubmitClass.open()
        popupWithSubmitClass.fillSubmitCallback(() => {
          // удалить карточку с сервера
          api
            .deleteCard(cardId)
            .then(() => {
              card.deleteCard()
              popupWithSubmitClass.close()
            })
            .catch((error) => {
              console.log(error)
            })
        })
      },
    },
    templateSelector,
    userId
  )
  const cardElement = card.getCard()

  return cardElement
}

// Данные необходимые при загрузке страницы
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userArray, cardsArray]) => {
    userId = userArray._id // вынести мой id в глоб. обл. вид.
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

// попап 'подтверждения удаления карточки'
const popupWithSubmitClass = new PopupWithSubmit('.popup-delete')
popupWithSubmitClass.setEventListeners()
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
    .catch((error) => {
      console.log(error)
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
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      submitAddPopupButton.textContent = 'Создать'
    })
})
addPopupClass.setEventListeners()

// попап 'аватар'
const avatarPopupClass = new PopupWithForm('.avatar-popup', (inputsObj) => {
  submitAvatarPopupButton.textContent = 'Сохранение...'
  api
    .updateAvatar(inputsObj.avatarInformAvatar)
    .then((userArray) => {
      user.setUserInfo(userArray.name, userArray.about, userArray.avatar)
    })
    .then(() => {
      avatarPopupClass.close()
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      submitAvatarPopupButton.textContent = 'Сохранить'
    })
})
avatarPopupClass.setEventListeners()
