// попап 'о себе'
export const profilePopup = document.querySelector('.profile-popup')
// попап 'карточка'
export const addPopup = document.querySelector('.add-popup')
// форма в попапе 'о себе'
export const formProfile = profilePopup.querySelector('.popup__container')
// инпуты в форме в попапе 'о себе': Имя, обо мне.
export const nameInput = formProfile.querySelector('#name')
export const aboutInput = formProfile.querySelector('#aboutMe')
// кнопка открыть попап 'о себе'
export const openPopupAboumeButton = document.querySelector('.profile__edit-button')
// форма в попапе 'карточка'
export const formAddCard = addPopup.querySelector('.popup__container')
// кнопка открыть попап 'карточка'
export const openAddPopupButton = document.querySelector('.profile__add-button')
export const userData = {
  nameSelector: '.profile__title',
  aboutMeSelector: '.profile__subtitle'
}
export const formConfig = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__sumbit-button',
  inactiveButtonClass: 'popup__sumbit-button_inactive',
  errorClass: 'popup__item-error_active'
}
