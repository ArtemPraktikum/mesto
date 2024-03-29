export default class FormValidator {
  constructor(
    {inputErrorClass, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass },
    formElement
  ) {
    this._inputErrorClass = inputErrorClass
    this._inputSelector = inputSelector
    this._submitButtonSelector = submitButtonSelector
    this._inactiveButtonClass = inactiveButtonClass
    this._errorClass = errorClass
    this._formElement = formElement
  }
  resetValidation() {
    this._toggleButtonState()

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

  _showInputError = (oneInput) => {
    this._errorElement = this._formElement.querySelector(
      `.${oneInput.id}-error`
    )
    this._errorElement.textContent = oneInput.validationMessage
    this._errorElement.classList.add(this._errorClass)

    oneInput.classList.add(this._inputErrorClass)
  }

  _hideInputError = (oneInput) => {
    this._errorElement = this._formElement.querySelector(
      `.${oneInput.id}-error`
    )
    this._errorElement.classList.remove(this._errorClass)
    this._errorElement.textContent = ''

    oneInput.classList.remove(this._inputErrorClass)
  }

  _isValid = (oneInput) => {
    if (!oneInput.validity.valid) {
      this._showInputError(oneInput)
    } else {
      this._hideInputError(oneInput)
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.disabled = true
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass)
      this._buttonElement.disabled = false
    }
  }

  _setEventListeners = () => {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    )
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    )

    this._toggleButtonState()

    this._inputList.forEach((oneInput) => {
      oneInput.addEventListener('input', () => {
        this._isValid(oneInput)

        this._toggleButtonState()
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }
}
