// попап 'о себе'
export const profilePopup = document.querySelector('.profile-popup')
// форма в попапе 'о себе'
export const formProfile = profilePopup.querySelector('.popup__container')
// инпуты в форме в попапе 'о себе': Имя, обо мне.
export const nameInput = formProfile.querySelector('#name')
export const aboutInput = formProfile.querySelector('#aboutme')
// заголовок и подзаголовок в html: Имя, обо мне.
export const profileName = document.querySelector('.profile__title')
export const profileAbout = document.querySelector('.profile__subtitle')
// кнопка открыть попап 'о себе'
export const openButton = document.querySelector('.profile__edit-button')
// попап 'карточка'
export const addPopup = document.querySelector('.add-popup')
// форма в попапе 'карточка'
export const formAddCard = addPopup.querySelector('.popup__container')
// инпуты в попапе 'карточка': Название, ссылка.
export const addNameInput = formAddCard.querySelector('#placeName')
export const addAboutInput = formAddCard.querySelector('#link')
// кнопка открыть попап 'карточка'
export const addButton = document.querySelector('.profile__add-button')
// секция с карточками
export const galery = document.querySelector('.elements')

// все попапы
export const popups = document.querySelectorAll('.popup')
//Шесть карточек «из коробки»
export const initialCards = [{
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
