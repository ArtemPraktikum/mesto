// Функция добавить класс с ошибкой
function showInputError(formElement, inputElement, errorMessage, errorActiveClass) {
  // Найти элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  // Заменить содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage
  // Показать сообщение об ошибке
  errorElement.classList.add(errorActiveClass)
}

// Функция удалить класс с ошибкой
function hideInputError(formElement, inputElement, errorActiveClass) {
  // Найти элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  // Скрыть сообщение об ошибке
  errorElement.classList.remove(errorActiveClass)
  // Очистить ошибку
  errorElement.textContent = ''
}

// Функция проверить валидность поля
function isValid(formElement, inputElement, errorActiveClass) {

  // Если поле не проходит валидацию, показать ошибку
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorActiveClass)
  // Если проходит, скроем
  } else {
    hideInputError(formElement, inputElement, errorActiveClass)
  }
}

// Функция принимает массив полей и проверяет на валидность
function hasInvalidInput(inputList) {
  // пройти по массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
    return !inputElement.validity.valid
  })
}

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
function toggleButtonState(inputList, buttonElement, buttonElementOffClass) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(buttonElementOffClass)
    buttonElement.disabled = true
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(buttonElementOffClass)
    buttonElement.disabled = false
  }
}

// функция, навесить инпуты
function setEventListeners(formClass, inputClass, sumbitButtonClass, buttonElementOffClass, errorActiveClass) {
  // Находим все поля внутри формы и делаем из них массив
  const inputList = Array.from(formClass.querySelectorAll(inputClass))
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formClass.querySelector(sumbitButtonClass)

  // вызвать до введения данных в инпуты для изначально-неактивного состояния кнопки
  toggleButtonState(inputList, buttonElement, buttonElementOffClass)

  // Обойдём все элементы полученной коллекции
  inputList.forEach((oneInput) => {
    // каждому полю добавим обработчик события input
    oneInput.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formClass, oneInput, errorActiveClass)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, buttonElementOffClass)
    })
  })
}

function enableValidation(obj) {
  // Найдём все формы с указанным классом
  const formList = Array.from(document.querySelectorAll(obj.formSelector))
  // Перебрать полученную коллекцию
  formList.forEach((oneForm) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(oneForm, obj.inputSelector, obj.submitButtonSelector, obj.inactiveButtonClass, obj.errorClass)
  })
}

// Вызовем функцию
enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__sumbit-button',
  inactiveButtonClass: 'popup__sumbit-button_inactive',
  errorClass: 'popup__item-error_active'
})

// роль  inputErrorClass: 'popup__input_type_error' у меня выполняет псевдокласс :invalid на классе всех инпутах
