const pizzaBtns = document.querySelectorAll('.pizza__image');
const modal = document.querySelector('[data-target="product"]');
const modalCloseBtn = document.querySelector('.modal__close-btn');
pizzaBtns.forEach((btn) => {
  btn.addEventListener('click', openModal);
});

modalCloseBtn.addEventListener('click', closeModal);

function openModal(e) {
  const params = getParams(e.target);
  modal.setAttribute('open', true);
  fillInModal(params, modal);
}

function closeModal() {
  const openModal = document.querySelector('dialog[open = "true"]');
  openModal.removeAttribute('open');
}

function getParams(elem) {
  const product = elem.parentElement;
  const name = product.querySelector('.pizza__name').textContent;
  const compound = product.querySelector('.pizza__compound').textContent;
  const alt = product.querySelector('.pizza__image').alt;
  const src = getSrc(product);

  return {
    src,
    alt,
    name,
    compound,
  };
}

function getSrc(elem) {
  const url = window.location.href;
  const srcImgAbsolute = elem.querySelector('img').src;
  const srcImgRelative = srcImgAbsolute.replace(url, '');

  return srcImgRelative;
}

function fillInModal(params, modal) {
  modal.querySelector('.modal__name').textContent = params.name;
  modal.querySelector('.modal__compound').textContent = params.compound;
  modal.querySelector('.modal__image').src = params.src;
  modal.querySelector('.modal__image').alt = params.alt;
}

modal.addEventListener('click', (e) => {
  if (!e.target.classList.contains('modal')) return;
  else closeModal();
});
