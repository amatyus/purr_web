const form = document.querySelector('.form__feedback'),
  formInputs = document.querySelectorAll('.form__input'),
  panel = document.querySelector('.js__notification'),
  panelButton = panel.querySelector('.notification__btn')

form.onsubmit = function () {
  emptyInputs = Array.from(formInputs).filter((input) => input.value === '')

  formInputs.forEach((input) => {
    if (input.value === '') {
      input.classList.add('error')

      console.log('input not value')
    } else {
      input.classList.remove('error')
    }
  })

  if (emptyInputs.length !== 0) {
    console.log('input not value')
    return false
  }
}

panelButton.addEventListener('click', function () {
  panel.classList.add('hidden')
})
