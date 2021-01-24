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

// пишу код пятой проектной работы с этого места

// 1. Шесть карточек «из коробки»

const initialCards = [
  {
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
const itemTemplate = document.querySelector('.template').content
const galery = document.querySelector('.elements')

function renderItem(item) {
  const preAddTemplate = itemTemplate.cloneNode(true);
  const imageTemplate = preAddTemplate.querySelector('.element__image')
  preAddTemplate.querySelector('.element__title').innerText = item.name;
  imageTemplate.setAttribute('src', item.link)
  imageTemplate.setAttribute('alt', `фото ${item.name}`)

	galery.prepend(preAddTemplate);
}
function render() {
	initialCards.forEach(renderItem);
}
render()

// 2. Форма добавления карточки

let addPopup = document.querySelector('.add-popup')
let addButton = document.querySelector('.profile__add-button')
let closeButtonAdd = addPopup.querySelector('.popup__close-button')

function openClear() {
  let addNameInput = addForm.querySelector('#name')
  let addAboutInput = addForm.querySelector('#aboutme')
  addNameInput.value = null
  addAboutInput.value = null
  toggleAddPopup()
}

function toggleAddPopup() {
  let addPopup = document.querySelector('.add-popup')
  addPopup.classList.toggle('popup_opened')
}
addPopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    toggleAddPopup()
  }
})
addButton.addEventListener('click', openClear)
closeButtonAdd.addEventListener('click', toggleAddPopup)

// 3. Добавление карточки
let addForm = addPopup.querySelector('.popup__container')

function addCard(evt) {
  evt.preventDefault();
  let addPopup = document.querySelector('.add-popup')
  let addForm = addPopup.querySelector('.popup__container')
  let addNameInput = addForm.querySelector('#name')
  let addAboutInput = addForm.querySelector('#aboutme')
  const preAddTemplate = itemTemplate.cloneNode(true);
  const imageTemplate = preAddTemplate.querySelector('.element__image')
  preAddTemplate.querySelector('.element__title').textContent = addNameInput.value;
  imageTemplate.setAttribute('src', addAboutInput.value)
  imageTemplate.setAttribute('alt', addNameInput.value)

  galery.prepend(preAddTemplate);
  newCard()
  toggleAddPopup()
}
// newCard добавляет созданным вручную карточкам евенты удаления и лайка
function newCard() {
  document.querySelector('.element__trash-button').addEventListener('click', handleDelete)
  document.querySelector('.element__like-button').addEventListener('click', toggleLike)
}

addForm.addEventListener('submit', addCard)

// 4. Лайк карточки

let like = document.querySelectorAll('.element__like-button')

function toggleLike(evt) {
  evt.target.classList.toggle('element__like-button_active')
}

like.forEach((item) => {
  item.addEventListener('click', toggleLike)
})

// 5. Удаление карточки

let trash = document.querySelectorAll('.element__trash-button')

function handleDelete(evt) {
  evt.target.closest('.element').remove()
}

trash.forEach((item) => {
  item.addEventListener('click', handleDelete)
})

// 6. Открытие попапа с картинкой














