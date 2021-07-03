export default class FormValidator {
  constructor({
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    errorClass
  }, formSelector) {
    this._formSelector = formSelector
    this._inputSelector = inputSelector
    this._submitButtonSelector = submitButtonSelector
    this._inactiveButtonClass = inactiveButtonClass
    this._errorClass = errorClass
  }



  _showInputError = (oneInput) => {
    this._errorElement = this._formSelector.querySelector(`.${oneInput.id}-error`)
    this._errorElement.textContent = oneInput.validationMessage
    this._errorElement.classList.add(this._errorClass)
  }

  _hideInputError = (oneInput) => {
    this._errorElement = this._formSelector.querySelector(`.${oneInput.id}-error`)
    this._errorElement.classList.remove(this._errorClass)
    this._errorElement.textContent = ''
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

  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.disabled = true
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass)
      this._buttonElement.disabled = false
    }
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector))
    this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector)

    this.toggleButtonState()

    this._inputList.forEach((oneInput) => {
      oneInput.addEventListener('input', () => {
        this._isValid(oneInput)

        this.toggleButtonState()
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }
}
