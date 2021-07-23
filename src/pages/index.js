import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  formProfile,
  nameInput,
  aboutInput,
  openPopupAboumeButton,
  formAddCard,
  openAddPopupButton,
  userData,
  formConfig,
} from "../utils/constants.js";

// попап 'фуллскрин'
const popupFullScreenClass = new PopupWithImage(".popup_fullscreen");
popupFullScreenClass.setEventListeners();

function createCard(name, link, templateSelector) {
  const card = new Card({
    name: name,
    link: link,
    templateSelector: templateSelector,
    handleCardClick: (link, name) => {
      popupFullScreenClass.open(link, name);
    },
  });
  const cardElement = card.getCard();

  return cardElement;
}


// попап 'карточка'
const addPopupClass = new PopupWithForm(".add-popup", (inputsObj) => {
  preInstalledCards.addItem(
    createCard(
      inputsObj.nameInFormAddCard,
      inputsObj.aboutMeInFormAddCard,
      ".template"
    )
  );
  addPopupClass.close();
});
addPopupClass.setEventListeners();

const user = new UserInfo(userData);

// попап 'о себе'
const profilePopupClass = new PopupWithForm(".profile-popup", (inputsObj) => {
  user.setUserInfo(inputsObj.nameInFormProfile, inputsObj.aboutMeInFormProfile);
  profilePopupClass.close();
});
profilePopupClass.setEventListeners();

// навесить слушатель на кнопку открыть попап 'о себе'
openPopupAboumeButton.addEventListener("click", () => {
  const { name, aboutMe } = user.getUserInfo();
  // изменить инпут 'Имя' в попапе 'о себе' на заголовок 'Имя' из html
  nameInput.value = name;
  // изменить инпут 'обо мне' в попапе 'о себе' на подзаголовок 'обо мне' из html
  aboutInput.value = aboutMe;
  // открыть попап 'о себе'
  profilePopupClass.open();
});

// навесить слушатель на кнопку открыть попап 'карточка'
openAddPopupButton.addEventListener("click", () => {
  addPopupClass.open();
  validateAddPopup.toggleButtonState();
});

const validateProfilePopup = new FormValidator(formConfig, formProfile);
const validateAddPopup = new FormValidator(formConfig, formAddCard);
validateProfilePopup.enableValidation();
validateAddPopup.enableValidation();










const options = {
  cohort: 'cohort-26',
  url: 'https://mesto.nomoreparties.co/v1',
  headers: {
    "Content-Type": 'application/json; charset=utf-8',
    "authorization": '91449a4f-6ddf-4765-abab-e8f1174fa9e0'
  }
}

const api = new Api(options);

api.getInitialCards()
.then((data) => {
  // карточки из массива
  const preInstalledCards = new Section(
    {
      items: data,
      renderer: (item) => {
        preInstalledCards.addItem(createCard(item.name, item.link, ".template"));
      },
    },
    ".elements"
  );
  preInstalledCards.renderItems();
})
