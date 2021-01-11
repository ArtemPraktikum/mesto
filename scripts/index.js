let popup = document.querySelector('.popup')
let openButton = document.querySelector('.profile__edit-button')
let closeButton = popup.querySelector('.popup__close-button')

let form = popup.querySelector('.popup__container')

let nameInput = form.querySelector('#name')
let aboutInput = form.querySelector('#aboutme')
let profileName = document.querySelector('.profile__title')
let profileAbout = document.querySelector('.profile__subtitle')

//Открытие\Закрытие попапа
function togglePopup() {
  popup.classList.toggle('popup_opened')
}

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup()
  }
})
//Работа формы
function handleSubmitForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileAbout.textContent = aboutInput.value
  togglePopup()
}


function openCloseOver() {
  nameInput.value = profileName.textContent
  aboutInput.value = profileAbout.textContent
  togglePopup()
}

openButton.addEventListener('click', openCloseOver)
closeButton.addEventListener('click', togglePopup)

form.addEventListener('submit', handleSubmitForm)
