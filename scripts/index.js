// попап 'о себе'
const profilePopup = document.querySelector('.profile-popup')
// форма в попапе 'о себе'
const form = profilePopup.querySelector('.popup__container')
// инпуты в форме в попапе 'о себе': Имя, обо мне.
const nameInput = form.querySelector('#name')
const aboutInput = form.querySelector('#aboutme')
// заголовок и подзаголовок в html: Имя, обо мне.
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')
// кнопка открыть попап 'о себе'
const openButton = document.querySelector('.profile__edit-button')

// попап 'фулскрин'
const popupFullScreen = document.querySelector('.popup_fullscreen')
// картинка в попапе 'фулскрин'
const fullImage = popupFullScreen.querySelector('.fullscreen__image')
// текст в попапе 'фулскрин'
const fullCaption = popupFullScreen.querySelector('.fullscreen__text')

// попап 'карточка'
const addPopup = document.querySelector('.add-popup')
// форма в попапе 'карточка'
const addForm = addPopup.querySelector('.popup__container')
// инпуты в попапе 'карточка': Название, ссылка.
const addNameInput = addForm.querySelector('#placeName')
const addAboutInput = addForm.querySelector('#link')
// кнопка открыть попап 'карточка'
const addButton = document.querySelector('.profile__add-button')

// темплейт из html
const itemTemplate = document.querySelector('.template').content

// секция с карточками
const galery = document.querySelector('.elements')

//Шесть карточек «из коробки»
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

// функция Открыть\Закрыть любой попап
function togglePopup(popup) {
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
form.addEventListener('submit', handleSubmitForm)

// Вся работа с попапом 'о себе' велась до этого момента






// функция октрыть попап 'фулскрин' с названием и ссылкой
function changeFullScreen(name, link) {
  // задать ссылку на изображение
  fullImage.setAttribute('src', link)
  // установить текст в название
  fullCaption.textContent = name
  // открыть попап 'фулскрин'
  togglePopup(popupFullScreen)
}

// функция изменить цвета лайка
function toggleLike(evt) {
  // при клике на кнопку лайка переключить цвет
  evt.target.classList.toggle('element__like-button_active')
}
// функция удалить карточку
function handleDelete(evt) {
  // при клике на кнопку 'мусорка' удалить карточку
  evt.target.closest('.element').remove()
}



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

  //добавить в заголовок название
  titlePreAddTemplate.textContent = name
  // добавить в src картинки ссылку
  imagePreAddTemplate.setAttribute('src', link)
  // добавить в alt картинки название
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

// функция очистить инпуты в попапе 'карточка' и открыть попап 'карточка'
function openClearAddPopup() {
  addNameInput.value = null
  addAboutInput.value = null
  togglePopup(addPopup)
}

// функция добавить в html карточку с данными из инпутов попапа 'карточка'
function addCardFromForm(evt) {
  // отмена действия по умолчанию у submit
  evt.preventDefault();
  // создать наполненную карточку
  const completedСard = createCard(addNameInput.value, addAboutInput.value)
  // добавить в html
  addOnGalery(completedСard)
  // закрыть попап 'карточка'
  togglePopup(addPopup)
}

// навесить слушатель на отправить форму и addCardFromForm
addForm.addEventListener('submit', addCardFromForm)

// навесить слушатель на кнопку открыть попап карточка и openClearAddPopup
addButton.addEventListener('click', openClearAddPopup)

// все попапы
const popups = document.querySelectorAll('.popup')
// выбрать каждый попап
popups.forEach((popup) => {
    // добавить каждому попапу листенер при клике
    popup.addEventListener('click', (evt) => {
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
