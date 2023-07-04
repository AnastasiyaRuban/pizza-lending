const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const menuItem = document.querySelectorAll('.menu__link');
const form = document.querySelector('.form');
const labelsForm = document.querySelectorAll('label');
const inputForm = document.querySelectorAll('input');
const inputName = document.querySelector("[name='name']");

burger.addEventListener('click', toggleOpenMenu);
document.addEventListener('click', (e) => {
    const openPopup = document.querySelectorAll('.popup.open')
    if (openPopup.length > 0) {
        openPopup.forEach(popup => popup.classList.remove('open'))
    }
  if (
    e.target.classList.contains('menu') ||
    e.target.classList.value.includes('burger')
  ) {
    return;
  } else {
    const openMenu = document.querySelector('.menu.active');
    if (openMenu) {
      closeMenu();
    }
  }
});

menuItem.forEach((item) => {
  item.addEventListener('click', closeMenu);
});

function toggleOpenMenu() {
  menu.classList.toggle('active');
  burger.classList.toggle('active');
  document.body.classList.toggle('lock');
}

function closeMenu() {
  menu.classList.remove('active');
  burger.classList.remove('active');
  document.body.classList.remove('lock');
}

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

form.addEventListener('submit', (e) => {
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
    let request = new XMLHttpRequest();

    request.open('POST', 'fakeURL.php', true);
    request.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    );
    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status === 200) {
        console.log('Отправлено');
      }
    });

    request.send(formData);

    form.reset();
    labelsForm.forEach((label) => (label.textContent = ''));
    popupThanks();
  }
});

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

function popupThanks() {
  const popupThanks = document.querySelector('[data-target="thanks"]');
  const timeoutClose = 2000;
  popupThanks.classList.add('open');
  setTimeout(function () {
    popupThanks.classList.remove('open');
  }, timeoutClose);
}
