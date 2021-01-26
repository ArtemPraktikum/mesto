const popup = document.querySelector('.popup')
const openButton = document.querySelector('.profile__edit-button')
const closeButton = popup.querySelector('.popup__close-button')

const form = popup.querySelector('.popup__container')

const nameInput = form.querySelector('#name')
const aboutInput = form.querySelector('#aboutme')
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')

//функция Открыть\Закрыть попап о себе
function togglePopup() {
  popup.classList.toggle('popup_opened')
}

//функция и слушатель закрыть попап о себе при клике вне попапа
popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup()
  }
})

//функция отправить данные из инпутов попапа о себе в html разметку и togglePopup
function handleSubmitForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileAbout.textContent = aboutInput.value
  togglePopup()
}

//функция отправить данные из html разметки в инпуты попапа о себе и togglePopup
function handleOpenCloseForm() {
  nameInput.value = profileName.textContent
  aboutInput.value = profileAbout.textContent
  togglePopup()
}

// навесить слушатель на кнопку открыть попап о себе и handleOpenCloseForm
openButton.addEventListener('click', handleOpenCloseForm)

// навесить слушатель на кнопку закрыть попап о себе и togglePopup
closeButton.addEventListener('click', togglePopup)

// навесить слушатель на отправить форму и handleSubmitForm
form.addEventListener('submit', handleSubmitForm)


// пишу код пятой проектной работы с этого места

// 1. Шесть карточек «из коробки»

// масив исходных карточек
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

  preAddTemplate.querySelector('.element__title').textContent = item.name;
  imageTemplate.setAttribute('src', item.link)
  imageTemplate.setAttribute('alt', `${item.name}`)

	galery.prepend(preAddTemplate);
}
function render() {
	initialCards.forEach(renderItem);
}
render()


















// 2. Форма добавления карточки

const addPopup = document.querySelector('.add-popup')
const addButton = document.querySelector('.profile__add-button')
const closeButtonAdd = addPopup.querySelector('.popup__close-button')

function toggleAddPopup() {
  addPopup.classList.toggle('popup_opened')
}

function openClearAddPopup() {
  const addNameInput = addForm.querySelector('#placeName')
  const addAboutInput = addForm.querySelector('#link')
  addNameInput.value = null
  addAboutInput.value = null
  toggleAddPopup()
}

addPopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    toggleAddPopup()
  }
})
addButton.addEventListener('click', openClearAddPopup)
closeButtonAdd.addEventListener('click', toggleAddPopup)

// 3. Добавление карточки

// addListenersToNewCard добавляет созданным вручную карточкам евенты
function addListenersToNewCard() {
  document.querySelector('.element__trash-button').addEventListener('click', handleDelete)
  document.querySelector('.element__like-button').addEventListener('click', toggleLike)
  document.querySelector('.element__image').addEventListener('click', changeFullScreen)
}



const addForm = addPopup.querySelector('.popup__container')
















function addCard(evt) {
  evt.preventDefault();
  const addForm = addPopup.querySelector('.popup__container')
  const addNameInput = addForm.querySelector('#placeName')
  const addAboutInput = addForm.querySelector('#link')

  const preAddTemplate = itemTemplate.cloneNode(true);
  const imageTemplate = preAddTemplate.querySelector('.element__image')

  preAddTemplate.querySelector('.element__title').textContent = addNameInput.value;
  imageTemplate.setAttribute('src', addAboutInput.value)
  imageTemplate.setAttribute('alt', addNameInput.value)

  galery.prepend(preAddTemplate);
  addListenersToNewCard()
  toggleAddPopup()
}













addForm.addEventListener('submit', addCard)

// 4. Лайк карточки

const like = document.querySelectorAll('.element__like-button')

function toggleLike(evt) {
  evt.target.classList.toggle('element__like-button_active')
}

like.forEach((item) => {
  item.addEventListener('click', toggleLike)
})

// 5. Удаление карточки

const trash = document.querySelectorAll('.element__trash-button')

function handleDelete(evt) {
  evt.target.closest('.element').remove()
}

trash.forEach((item) => {
  item.addEventListener('click', handleDelete)
})

// 6. Открытие попапа с картинкой

const image = document.querySelectorAll('.element__image')
const popupFullscreen = document.querySelector('.popup_fullscreen')

function toggleFullScreen() {
  popupFullscreen.classList.toggle('popup_opened')
}
image.forEach((item) => {
  item.addEventListener('click', changeFullScreen)
})

// закрытие попока с картинкой

const closeButtonFull = popupFullscreen.querySelector('.popup__close-button')

closeButtonFull.addEventListener('click', toggleFullScreen)

popupFullscreen.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    toggleFullScreen()
  }
})

// показ нужной надписи и картинки в фуллскрин попапе


// не смог понять как получить нужную подпись из поля описания карточки на которую сделан клик, поэтому получаю инфу из альта картинки а сам альт получает инфу из нужного поля

function changeFullScreen(evt) {
  const imageSrc = evt.target.closest('.element__image').getAttribute('src')
  const FullImage = popupFullscreen.querySelector('.fullscreen__image')


  const fullCaption = popupFullscreen.querySelector('.fullscreen__text')


  FullImage.setAttribute('src', imageSrc)
  fullCaption.textContent =evt.target.closest('.element__image').getAttribute('alt')

  toggleFullScreen()
}
