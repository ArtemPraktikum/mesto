// попап о себе
const profilePopup = document.querySelector('.profile-popup')
// кнопка открыть
const openButton = document.querySelector('.profile__edit-button')
// форма в попапе о себе
const form = profilePopup.querySelector('.popup__container')
// инпуты в попапе о себе
const nameInput = form.querySelector('#name')
const aboutInput = form.querySelector('#aboutme')
// поля в html имя и увлечения
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')
// попап фулскрин
const popupFullScreen = document.querySelector('.popup_fullscreen')
// попап карточка
const addPopup = document.querySelector('.add-popup')

// функция Открыть\Закрыть любой попап
function togglePopup(popup) {
  popup.classList.toggle('popup_opened')

  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('keydown', closeByEscape);
  }
  else {
    document.removeEventListener('keydown', closeByEscape);
  }
}

// функция Открыть\Закрыть попап о себе
function toggleProfilePopup() {
  togglePopup(profilePopup)
}
// функция Открыть\Закрыть попап фулскрин
function toggleFullScreen() {
  togglePopup(popupFullScreen)
}
// функция Открыть\Закрыть попап карточка
function toggleAddPopup() {
  togglePopup(addPopup)
}

// функции закрыть любой попап при нажатии esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    togglePopup(openedPopup);
  }
}


// функция отправить данные из инпутов попапа о себе в html разметку и toggleProfilePopup
function handleSubmitForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileAbout.textContent = aboutInput.value
  toggleProfilePopup()
}

// функция отправить данные из html разметки в инпуты попапа о себе и toggleProfilePopup
function handleOpenCloseForm() {
  nameInput.value = profileName.textContent
  aboutInput.value = profileAbout.textContent
  toggleProfilePopup()
}

// навесить слушатель на кнопку открыть попап о себе и handleOpenCloseForm
openButton.addEventListener('click', handleOpenCloseForm)

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

// не смог понять как получить нужную подпись из поля описания карточки на которую сделан клик, поэтому получаю инфу из альта картинки а сам альт получает инфу из нужного поля

const fullImage = popupFullScreen.querySelector('.fullscreen__image')

const fullCaption = popupFullScreen.querySelector('.fullscreen__text')


function changeFullScreen(name, link) {
  fullImage.setAttribute('src', link)
  fullCaption.textContent = name
  toggleFullScreen()
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
// форма в попапе карточка
const addForm = addPopup.querySelector('.popup__container')
// инпуты в попапе карточка
const addNameInput = addForm.querySelector('#placeName')
const addAboutInput = addForm.querySelector('#link')
// кнопка открыть попап карточка
const addButton = document.querySelector('.profile__add-button')

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
  imagePreAddTemplate.addEventListener('click', () => {
    changeFullScreen(name, link)
  })

  // вернуть созданную карточку для последующего использования
  return emptyCard
}


// функция вставить в html заполненную карточку
function addOnGalery(item) {
  galery.prepend(item)
}

// функция добавить в html карточки из массива
initialCards.forEach(function fillCard(item) {
const completedСard = createCard(item.name, item.link)
addOnGalery(completedСard)
})

// функция очистить инпуты в попапе карточка и toggleAddPopup
function openClearAddPopup() {
  addNameInput.value = null
  addAboutInput.value = null
  toggleAddPopup()
}

// функция добавить в html карточку с данными из формы
function addCardFromForm(evt) {
  evt.preventDefault();
  const completedСard = createCard(addNameInput.value, addAboutInput.value)
  addOnGalery(completedСard)
  toggleAddPopup()
}

// навесить слушатель на отправить форму и addCardFromForm
addForm.addEventListener('submit', addCardFromForm)

// навесить слушатель на кнопку открыть попап карточка и openClearAddPopup
addButton.addEventListener('click', openClearAddPopup)

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            togglePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          togglePopup(popup)
        }
    })
})
