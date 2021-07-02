export default class FormValidator {
  #formSelector
  #inputSelector
  #submitButtonSelector
  #inactiveButtonClass
  #errorClass
  #popupSelector
  #inputList
  #buttonElement
  #errorElement
  #form
  constructor({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass}, popupSelector) {
    this.#formSelector  = formSelector
    this.#inputSelector = inputSelector
    this.#submitButtonSelector = submitButtonSelector
    this.#inactiveButtonClass = inactiveButtonClass
    this.#errorClass = errorClass
    this.#popupSelector = popupSelector

  }



  #showInputError = (oneInput) => {
    this.#errorElement = this.#form.querySelector(`.${oneInput.id}-error`)
    this.#errorElement.textContent = oneInput.validationMessage
    this.#errorElement.classList.add(this.#errorClass)
  }

  #hideInputError = (oneInput) => {
    this.#errorElement = this.#form.querySelector(`.${oneInput.id}-error`)
    this.#errorElement.classList.remove(this.#errorClass)
    this.#errorElement.textContent = ''
  }

  #isValid = (oneInput) => {
    if (!oneInput.validity.valid) {
      this.#showInputError(oneInput)
    } else {
      this.#hideInputError(oneInput)
    }
  }

  #hasInvalidInput = () => {
    return this.#inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  #toggleButtonState = () => {
    if (this.#hasInvalidInput()) {
      // сделай кнопку неактивной
      this.#buttonElement.classList.add(this.#inactiveButtonClass)
      this.#buttonElement.disabled = true
    } else {
      // иначе сделай кнопку активной
      this.#buttonElement.classList.remove(this.#inactiveButtonClass)
      this.#buttonElement.disabled = false
    }
  }

  #setEventListeners = () => {
    this.#inputList = Array.from(this.#form.querySelectorAll(this.#inputSelector))
    this.#buttonElement = this.#form.querySelector(this.#submitButtonSelector)

    this.#toggleButtonState()

    this.#inputList.forEach((oneInput) => {
      oneInput.addEventListener('input', () => {
        this.#isValid(oneInput)

        this.#toggleButtonState()
      })
    })
  }

  enableValidation() {
    this.#form = this.#popupSelector.querySelector(this.#formSelector)
    this.#setEventListeners()
  }
}






const profilePopupw = document.querySelector('.profile-popup')
const profilePopupq = document.querySelector('.add-popup')
const validate = new FormValidator({
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__sumbit-button',
  inactiveButtonClass: 'popup__sumbit-button_inactive',
  errorClass: 'popup__item-error_active'
}, profilePopupq)
validate.enableValidation()
const valk = new FormValidator({
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__sumbit-button',
  inactiveButtonClass: 'popup__sumbit-button_inactive',
  errorClass: 'popup__item-error_active'
}, profilePopupw)
.enableValidation()
