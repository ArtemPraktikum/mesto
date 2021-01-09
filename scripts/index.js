let openButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close-button')

function togglePopup() {
  popup.classList.toggle('popup_opened')
}

openButton.addEventListener('click', togglePopup)

closeButton.addEventListener('click', togglePopup)

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup()
  }
})

let form = popup.querySelector('.popup__container')


form.addEventListener('submit', event => {
  event.preventDefault()
  let nameInput = form.querySelector('#name')
  let aboutInput = form.querySelector('#aboutme')


  nameInput.getAttribute('value')
  aboutInput.getAttribute('value')

  let profileName = document.querySelector('.profile__title')
  let profileAbout = document.querySelector('.profile__subtitle')

  profileName.textContent = nameInput.value
  profileAbout.textContent = aboutInput.value

  togglePopup()
})
