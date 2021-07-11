import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'
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
const profilePopupClass = new Popup('.profile-popup')
profilePopupClass.setEventListeners()
// попап 'карточка'
const addPopupClass = new Popup('.add-popup')
addPopupClass.setEventListeners()
// попап 'фуллскрин'
export const popupFullScreenClass = new Popup('.popup_fullscreen')
popupFullScreenClass.setEventListeners()

// функция отправить данные из инпутов попапа 'о себе' в html и закрыть попап 'о себе'
function handleSubmitForm(evt) {
  // отмена действия по умолчанию у submit
  evt.preventDefault();
  // изменить заголовок 'Имя' в html на текст из инпута 'Имя' в попапе 'о себе'
  profileName.textContent = nameInput.value
  // изменить подзаголовок 'обо мне' в html на текст из инпута 'обо мне' в попапе 'о себе'
  profileAbout.textContent = aboutInput.value
  // закрыть попап 'о себе'
  profilePopupClass.close()
}
// функция отправить данные из html в инпуты попапа 'о себе' и открыть попап 'о себе'
function handleOpenCloseForm() {
  // изменить инпут 'Имя' в попапе 'о себе' на заголовок 'Имя' из html
  nameInput.value = profileName.textContent
  // изменить инпут 'обо мне' в попапе 'о себе' на подзаголовок 'обо мне' из html
  aboutInput.value = profileAbout.textContent
  // открыть попап 'о себе'
  profilePopupClass.open()
}

// навесить слушатель на кнопку открыть попап 'о себе' и handleOpenCloseForm
openButton.addEventListener('click', handleOpenCloseForm)
// навесить слушатель на отправить форму и handleSubmitForm
formProfile.addEventListener('submit', handleSubmitForm)

// функция вставить в html заполненную карточку
function addOnGalery(item) {
  galery.prepend(item)
}
// карточки из массива
const preInstalledCards = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.template')
    const cardElement = card.getCard()

    preInstalledCards.setItem(cardElement)
  }}, '.elements')

preInstalledCards.renderItems()

// функция очистить инпуты в попапе 'карточка' и открыть попап 'карточка'
function openClearAddPopup() {
  formAddCard.reset()
  addPopupClass.open()
  validateAddPopup.toggleButtonState()
}

// функция добавить в html карточку с данными из инпутов попапа 'карточка' и закрыть попап
function addCardFromForm(evt) {
  // отмена действия по умолчанию у submit
  evt.preventDefault();
  // создать наполненную карточку
  const completedСard = new Card(addNameInput.value, addAboutInput.value, '.template')
  // добавить в html
  addOnGalery(completedСard.getCard())
  // закрыть попап 'карточка'
  addPopupClass.close()
}

// навесить слушатель на отправить форму и addCardFromForm
formAddCard.addEventListener('submit', addCardFromForm)
// навесить слушатель на кнопку открыть попап карточка и openClearAddPopup
addButton.addEventListener('click', openClearAddPopup)

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
