const form = document.querySelector('.form');
const labelsForm = document.querySelectorAll('label');
const inputForm = document.querySelectorAll('input');
const inputName = document.querySelector("[name='name']");

// VALIDATE
inputForm.forEach((input) => {
  input.addEventListener('input', removeError);
});

inputName.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\./g, '');
});

function removeError(e) {
  const inputName = e.target.name;
  let label = document.querySelector(`[for="${inputName}"]`);
  label.textContent = '';
}

function validateForm(data) {
  const name = data.name.trim();
  const address = data.address.trim();
  const phone = data.phone.trim();
  let error = [];

  if (name == '') {
    error.push({
      name: 'name',
      message: 'Пожалуйста, введите ваше имя',
    });
  }

  if (address == '') {
    error.push({
      name: 'address',
      message: 'Пожалуйста, введите ваш адрес',
    });
  }
  if (phone == '') {
    error.push({
      name: 'phone',
      message: 'Пожалуйста, введите ваш телефон',
    });
  }

  return error;
}

function showErrors(errors) {
  labelsForm.forEach((label) => (label.textContent = ''));

  errors.forEach((error) => {
    let label = document.querySelector(`[for="${error.name}"]`);
    label.textContent = error.message;
  });
}

//   SUBMIT
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const clientData = {
    name: formData.get('name'),
    address: formData.get('address'),
    phone: formData.get('phone'),
  };

  const errorValidate = validateForm(clientData);
  if (errorValidate.length > 0) {
    showErrors(errorValidate);
  } else {
    let res = await fetch('fakeUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });

    form.reset();
    labelsForm.forEach((label) => (label.textContent = ''));
    modalThanks();
  }
});

function modalThanks() {
  const modalThanks = document.querySelector('[data-target="thanks"]');
  const timeoutClose = 2000;
  modalThanks.classList.add('open');
  setTimeout(function () {
    modalThanks.classList.remove('open');
  }, timeoutClose);
}
