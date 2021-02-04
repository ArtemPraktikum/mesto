// попап о себе
const popup = document.querySelector('.popup')
// кнопка открыть
const openButton = document.querySelector('.profile__edit-button')
// кнопка закрыть
const closeButton = popup.querySelector('.popup__close-button')
// форма в попапе о себе
const form = popup.querySelector('.popup__container')
// инпуты в попапе о себе
const nameInput = form.querySelector('#name')
const aboutInput = form.querySelector('#aboutme')
// поля в html имя и увлечения
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')

// функция Открыть\Закрыть попап о себе
function togglePopup() {
  popup.classList.toggle('popup_opened')
}

// функция отправить данные из инпутов попапа о себе в html разметку и togglePopup
function handleSubmitForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileAbout.textContent = aboutInput.value
  togglePopup()
}

// функция отправить данные из html разметки в инпуты попапа о себе и togglePopup
function handleOpenCloseForm() {
  nameInput.value = profileName.textContent
  aboutInput.value = profileAbout.textContent
  togglePopup()
  document.addEventListener('keydown', RemoveClassOnEscPopup)

}
// функции закрыть попап о себе при нажатии esc
function RemoveClassOnEscPopup(evt) {
  if (evt.key === "Escape") {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', RemoveClassOnEscPopup)
  }
}
function RemoveClassOnEscAddPopup(evt) {
  if (evt.key === "Escape") {
    addPopup.classList.remove('popup_opened')
    document.removeEventListener('keydown', RemoveClassOnEscAddPopup)
  }
}
function RemoveClassOnEscopupFullscreen(evt) {
  if (evt.key === "Escape") {
    popupFullscreen.classList.remove('popup_opened')
    document.removeEventListener('keydown', RemoveClassOnEscopupFullscreen)
  }
}

// навесить слушатель на кнопку открыть попап о себе и handleOpenCloseForm
openButton.addEventListener('click', handleOpenCloseForm)

// навесить слушатель на кнопку закрыть попап о себе и togglePopup
closeButton.addEventListener('click', togglePopup)

// навесить слушатель на отправить форму и handleSubmitForm
form.addEventListener('submit', handleSubmitForm)


// пишу код пятой проектной работы с этого места


// 1. Шесть карточек «из коробки»

// масив имена и ссылки
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


// попап фулскрин
const popupFullscreen = document.querySelector('.popup_fullscreen')


// не смог понять как получить нужную подпись из поля описания карточки на которую сделан клик, поэтому получаю инфу из альта картинки а сам альт получает инфу из нужного поля

function changeFullScreen(evt) {
  const imageSrc = evt.target.closest('.element__image').getAttribute('src')
  const FullImage = popupFullscreen.querySelector('.fullscreen__image')

  const fullCaption = popupFullscreen.querySelector('.fullscreen__text')

  FullImage.setAttribute('src', imageSrc)
  fullCaption.textContent = evt.target.closest('.element__image').getAttribute('alt')

  toggleFullScreen()
  document.addEventListener('keydown', RemoveClassOnEscopupFullscreen)
}

// функция Открыть\Закрыть попап фулскрин
function toggleFullScreen() {
  popupFullscreen.classList.toggle('popup_opened')
}
// функция переключить цвета лайка
function toggleLike(evt) {
  evt.target.classList.toggle('element__like-button_active')
}
// функция удаления карточки
function handleDelete(evt) {
  evt.target.closest('.element').remove()
}

// темплейт из html
const itemTemplate = document.querySelector('.template').content
// секция с карточками
const galery = document.querySelector('.elements')
// попап карточка
const addPopup = document.querySelector('.add-popup')
// форма в попапе карточка
const addForm = addPopup.querySelector('.popup__container')
// инпуты в попапе карточка
const addNameInput = addForm.querySelector('#placeName')
const addAboutInput = addForm.querySelector('#link')
// кнопка открыть попап карточка
const addButton = document.querySelector('.profile__add-button')
// кнопка закрыть попап карточка
const closeButtonAdd = addPopup.querySelector('.popup__close-button')
// кнопка закрыть попап фулскрин
const closeButtonFull = popupFullscreen.querySelector('.popup__close-button')

// функция создать карточку с неопределенными данными готовыми к заполнению
function createCard(name, link) {
  // создать клон карточки
  const emptyCard = itemTemplate.cloneNode(true);
  // выбрать в ней картинку
  const imagePreAddTemplate = emptyCard.querySelector('.element__image')
  // выбрать в ней заголовок
  const titlePreAddTemplate = emptyCard.querySelector('.element__title')
  // выбрать в ней кнопку лайка
  const likePreAddTemplate = emptyCard.querySelector('.element__like-button')
  // выбрать в ней кнопку мусорка
  const trashPreAddTemplate = emptyCard.querySelector('.element__trash-button')

  //добавить в заголовок что-то
  titlePreAddTemplate.textContent = name
  // добавить в src картинки что-то
  imagePreAddTemplate.setAttribute('src', link)
  // добавить в alt картинки что-то
  imagePreAddTemplate.setAttribute('alt', name)
  // добавить кнопке лайка возможность переключать цвет при клике
  likePreAddTemplate.addEventListener('click', toggleLike)
  // добавить кнопке мусорка возможность удалить карточку в которой она находится
  trashPreAddTemplate.addEventListener('click', handleDelete)
  // добавить картинке возможность открыться побольше
  imagePreAddTemplate.addEventListener('click', changeFullScreen)

  // вернуть созданную карточку для последующего использования
  return emptyCard
}


// функция вставить в html заполненную карточку
function addOnGalery(item) {
  galery.prepend(item)
}

// функция добавить в html карточки из массива
initialCards.forEach(function fillCard(item) {
let completedСard = createCard(item.name, item.link)
addOnGalery(completedСard)
})

// функция Открыть\Закрыть попап карточка
function toggleAddPopup() {
  addPopup.classList.toggle('popup_opened')
}

// функция очистить инпуты в попапе карточка и toggleAddPopup
function openClearAddPopup() {
  addNameInput.value = null
  addAboutInput.value = null
  toggleAddPopup()
  document.addEventListener('keydown', RemoveClassOnEscAddPopup)
}

// функция добавить в html карточку с данными из формы
function addCardFromForm(evt) {
  evt.preventDefault();
  let completedСard = createCard(addNameInput.value, addAboutInput.value)
  addOnGalery(completedСard)
  toggleAddPopup()
}

// навесить слушатель на отправить форму и addCardFromForm
addForm.addEventListener('submit', addCardFromForm)

// навесить слушатель на кнопку открыть попап карточка и openClearAddPopup
addButton.addEventListener('click', openClearAddPopup)

// навесить слушатель на кнопку закрыть попап карточка и toggleAddPopup
closeButtonAdd.addEventListener('click', toggleAddPopup)

// навесить слушатель на кнопку закрыть попап фулскрин и toggleFullScreen
closeButtonFull.addEventListener('click', toggleFullScreen)

// функция и слушатель закрыть попап о себе при клике вне формы
popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup()
  }
})

// функция и слушатель закрыть попап карточка при клике вне формы
addPopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    toggleAddPopup()
  }
})
// функция и слушатель закрыть попап фулскрин при клике вне формы
popupFullscreen.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    toggleFullScreen()
  }
})
