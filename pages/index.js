import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'

import {
  formProfile,
  nameInput,
  aboutInput,
  profileName,
  profileAbout,
  openButton,
  formAddCard,
  addNameInput,
  addAboutInput,
  addButton,
  galery,
  initialCards
} from '../utils/constants.js';

// попап 'о себе'
const profilePopupClass = new PopupWithForm(
  '.profile-popup', (inputsObj) => {
    // изменить заголовок 'Имя' в html на текст из инпута 'Имя' в попапе 'о себе'
    profileName.textContent = inputsObj.nameInFormProfile
    // изменить подзаголовок 'обо мне' в html на текст из инпута 'обо мне' в попапе 'о себе'
    profileAbout.textContent = inputsObj.aboutmeInFormProfile
  }
)
profilePopupClass.setEventListeners()

// попап 'фуллскрин'
export const popupFullScreenClass = new PopupWithImage('.popup_fullscreen')
popupFullScreenClass.setEventListeners()

// попап 'карточка'
const addPopupClass = new PopupWithForm(
  '.add-popup', (inputsObj) => {
    const card = new Card(inputsObj.nameInFormAddCard, inputsObj.aboutmeInFormAddCard, '.template')
    const cardElement = card.getCard()
    preInstalledCards.setItem(cardElement)
  }
)
addPopupClass.setEventListeners()


// функция отправить данные из html в инпуты попапа 'о себе' и открыть попап 'о себе'
function openAboutmePopup() {
  // изменить инпут 'Имя' в попапе 'о себе' на заголовок 'Имя' из html
  nameInput.value = profileName.textContent
  // изменить инпут 'обо мне' в попапе 'о себе' на подзаголовок 'обо мне' из html
  aboutInput.value = profileAbout.textContent
  // открыть попап 'о себе'
  profilePopupClass.open()
}
// навесить слушатель на кнопку открыть попап 'о себе' и openAboutmePopup
openButton.addEventListener('click', openAboutmePopup)

// функция очистить инпуты в попапе 'карточка' и открыть попап 'карточка'
function openAddcardPopup() {
  // открыть попап 'карточка'
  addPopupClass.open()
  // валидировать submit кнопку
  validateAddPopup.toggleButtonState()
}
// навесить слушатель на кнопку открыть попап 'карточка' и openAddcardPopup
addButton.addEventListener('click', openAddcardPopup)


const formConfig = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__sumbit-button',
  inactiveButtonClass: 'popup__sumbit-button_inactive',
  errorClass: 'popup__item-error_active'
}
const validateProfilePopup = new FormValidator(formConfig, formProfile)
const validateAddPopup = new FormValidator(formConfig, formAddCard)
validateProfilePopup.enableValidation()
validateAddPopup.enableValidation()

// карточки из массива
const preInstalledCards = new Section({
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, '.template')
      const cardElement = card.getCard()

      preInstalledCards.setItem(cardElement)
    }
  },
  '.elements'
)

preInstalledCards.renderItems()
