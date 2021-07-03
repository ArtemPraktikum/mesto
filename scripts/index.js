import Card from './Card.js'
import FormValidator from './FormValidator.js'

// попап 'о себе'
const profilePopup = document.querySelector('.profile-popup')
// форма в попапе 'о себе'
const formProfile = profilePopup.querySelector('.popup__container')
// инпуты в форме в попапе 'о себе': Имя, обо мне.
const nameInput = formProfile.querySelector('#name')
const aboutInput = formProfile.querySelector('#aboutme')
// заголовок и подзаголовок в html: Имя, обо мне.
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')
// кнопка открыть попап 'о себе'
const openButton = document.querySelector('.profile__edit-button')


// попап 'карточка'
const addPopup = document.querySelector('.add-popup')
// форма в попапе 'карточка'
const formAddCard = addPopup.querySelector('.popup__container')
// инпуты в попапе 'карточка': Название, ссылка.
const addNameInput = formAddCard.querySelector('#placeName')
const addAboutInput = formAddCard.querySelector('#link')
// кнопка открыть попап 'карточка'
const addButton = document.querySelector('.profile__add-button')



// секция с карточками
const galery = document.querySelector('.elements')

//Шесть карточек «из коробки»
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// функция Открыть\Закрыть любой попап
export function togglePopup(popup) {
  // открыть/закрыть попап
  popup.classList.toggle('popup_opened')

  // если попап открылся
  if (popup.classList.contains('popup_opened')) {
    //добавить возможность закрыть его нажав esc
    document.addEventListener('keydown', closeByEscape);
  }
  // если попап закрылся
  else {
    // убрать возможность закрыть его нажав esc
    document.removeEventListener('keydown', closeByEscape);
  }
}

// функции закрыть любой попап при нажатии esc
function closeByEscape(evt) {
  // если нажать esc
  if (evt.key === 'Escape') {
    // найти открытый попап
    const openedPopup = document.querySelector('.popup_opened')
    // закрыть открытый попап
    togglePopup(openedPopup);
  }
}
// все попапы
const popups = document.querySelectorAll('.popup')
// выбрать каждый попап
popups.forEach((popup) => {
  // добавить каждому попапу листенер при клике
  popup.addEventListener('mousedown', (evt) => {
    // если попап открыт при клике вне формы закрыть его
    if (evt.target.classList.contains('popup_opened')) {
      togglePopup(popup)
    }
    // закрыть попап при клике по крестику
    if (evt.target.classList.contains('popup__close-button')) {
      togglePopup(popup)
    }
  })
})

// функция отправить данные из инпутов попапа 'о себе' в html и закрыть попап 'о себе'
function handleSubmitForm(evt) {
  // отмена действия по умолчанию у submit
  evt.preventDefault();
  // изменить заголовок 'Имя' в html на текст из инпута 'Имя' в попапе 'о себе'
  profileName.textContent = nameInput.value
  // изменить подзаголовок 'обо мне' в html на текст из инпута 'обо мне' в попапе 'о себе'
  profileAbout.textContent = aboutInput.value
  // закрыть попап 'о себе'
  togglePopup(profilePopup)
}

// функция отправить данные из html в инпуты попапа 'о себе' и открыть попап 'о себе'
function handleOpenCloseForm() {
  // изменить инпут 'Имя' в попапе 'о себе' на заголовок 'Имя' из html
  nameInput.value = profileName.textContent
  // изменить инпут 'обо мне' в попапе 'о себе' на подзаголовок 'обо мне' из html
  aboutInput.value = profileAbout.textContent
  // открыть попап 'о себе'
  togglePopup(profilePopup)
}

// навесить слушатель на кнопку открыть попап 'о себе' и handleOpenCloseForm
openButton.addEventListener('click', handleOpenCloseForm)

// навесить слушатель на отправить форму и handleSubmitForm
formProfile.addEventListener('submit', handleSubmitForm)

// функция вставить в html заполненную карточку
function addOnGalery(item) {
  galery.prepend(item)
}
// функция добавить в html карточки из массива
initialCards.forEach(function fillCard(item) {
  const completedСard = new Card(item.name, item.link, '.template')
  addOnGalery(completedСard.getCard())
})

// функция очистить инпуты в попапе 'карточка' и открыть попап 'карточка'
function openClearAddPopup() {
  formAddCard.reset()
  togglePopup(addPopup)
  validateAddPopup.toggleButtonState()
}

// функция добавить в html карточку с данными из инпутов попапа 'карточка'
function addCardFromForm(evt) {
  // отмена действия по умолчанию у submit
  evt.preventDefault();
  // создать наполненную карточку
  const completedСard = new Card(addNameInput.value, addAboutInput.value, '.template')
  // добавить в html
  addOnGalery(completedСard.getCard())
  // закрыть попап 'карточка'
  togglePopup(addPopup)
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

//Спасибо за ревью уважаемая Анна<3!
