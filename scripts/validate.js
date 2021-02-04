// Функция добавить класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  // Найти элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  // Заменить содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage
  // Показать сообщение об ошибке
  errorElement.classList.add('popup__item-error_active')
}

// Функция удалить класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  // Найти элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  // Скрыть сообщение об ошибке
  errorElement.classList.remove('popup__item-error_active')
  // Очистить ошибку
  errorElement.textContent = ''
}

// Функция проверить валидность поля
const isValid = (formElement, inputElement) => {

  // Если поле не проходит валидацию, показать ошибку
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)

  // Если проходит, скроем
  } else {
    hideInputError(formElement, inputElement)
  }
}

// Функция принимает массив полей и проверяет на валидность
const hasInvalidInput = (inputList) => {
  // пройти по массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
    return !inputElement.validity.valid
  })
}

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__sumbit-button_inactive')
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__sumbit-button_inactive')
  }
}

// функция, навесить инпуты
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы и делаем из них массив
  const inputList = Array.from(formElement.querySelectorAll('.popup__item'))
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__sumbit-button')
  // вызвать до введения данных в инпуты для изначально-неактивного состояния кнопки
  toggleButtonState(inputList, buttonElement)
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement)
    })
  })
}

const enableValidation = () => {
  // Найдём все формы с указанным классом
  const formList = Array.from(document.querySelectorAll('.popup__container'))

  // Перебрать полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement)
  })
}

// Вызовем функцию
enableValidation()

