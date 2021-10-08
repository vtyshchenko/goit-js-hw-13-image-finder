import { defaults } from '@pnotify/core';

import getRefs from './refs.js';
import CreateMarcup from './createMarcup.js';
import imagesApi from './apiService.js';

setNotifySettings();

let debounce = require('lodash.debounce');

const {
  galleryRef,
  inputRef,
  buttonRef,
  modelWindowRef,
  menuBtnRef,
  imageRef,
  overlayRef,
  switchRef,
} = getRefs();

const perPage = 12;
let page = 1;
let textSearch = '';
let galleryItems = [];
let number = 0;

const createMarcup = new CreateMarcup(galleryRef);

inputRef.addEventListener('input', debounce(onInput, 500));

galleryRef.addEventListener('click', onClickPicture);
overlayRef.addEventListener('click', onClickOverlay);
menuBtnRef.addEventListener('click', onClickButtonClose);

function getImageIndex(imageLink) {
  for (const imageObj of galleryItems) {
    if (imageObj.webformatURL === imageLink) {
      number = galleryItems.indexOf(imageObj);
    }
  }
}

function setImageAttr(src, alt) {
  imageRef.setAttribute('src', src);
  imageRef.setAttribute('alt', alt);
}

function closeModalForm() {
  modelWindowRef.classList.remove('is-open');
  setImageAttr('', '');
  window.removeEventListener('keyup', onKeyPress);
}

function renderOnButtonClick(is_hiiden, data) {
  if (is_hiiden && data && data.hits.length > 0) {
    buttonRef.classList.remove('visually-hidden');
    buttonRef.addEventListener('click', debounce(onClick, 500));
  }
  render(data);
}

function renderOnIntersectionObserverApi(data) {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        getNewPage();
      }
    });
  }, options);
  render(data);

  observer.observe(galleryRef.querySelector('li:last-child'));
}

function renderMarkup(data) {
  const is_hiiden = buttonRef.classList.contains('visually-hidden');

  if (switchRef.checked) {
    renderOnButtonClick(is_hiiden, data);
  } else {
    if (!is_hiiden) {
      buttonRef.classList.add('visually-hidden');
      buttonRef.removeEventListener('click', debounce(onClick, 500));
    }

    renderOnIntersectionObserverApi(data);
  }

  if (galleryItems.length === 0) {
    if (!is_hiiden) {
      buttonRef.classList.add('visually-hidden');
    }
  }
}

function render(data) {
  createMarcup.renderMarkup(data);
  if (data && data.hits.length > 0) {
    galleryItems = [...galleryItems, ...data.hits];
    const elem = document.querySelector(`#id${data.hits[0].id}`);
    elem.scrollIntoView({ block: 'end', inline: 'nearest', behavior: 'smooth' });
  }
}

function getPicture(delta) {
  if (delta > 0 && number == galleryItems.length - 1) {
    number = 0;
  } else if (delta < 0 && number == 0) {
    number = galleryItems.length - 1;
  } else {
    number += delta;
  }
  setImageAttr(galleryItems[number].largeImageURL, galleryItems[number].tags);
}

function upload(page) {
  imagesApi.fetchImages(textSearch, page, perPage).then(renderMarkup).catch(imagesApi.onError);
}

function getNewPage() {
  page += 1;
  upload(page);
}

function onInput(event) {
  galleryRef.innerHTML = '';
  galleryItems = [];
  page = 1;
  textSearch = event.target.value;
  upload(page);
}

function onClick() {
  getNewPage();
}

function onClickPicture(event) {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    getImageIndex(event.target.src);
    setImageAttr(galleryItems[number].largeImageURL, galleryItems[number].tag);
    modelWindowRef.classList.add('is-open');
    window.addEventListener('keyup', onKeyPress);
  }
}

function onClickButtonClose(event) {
  if (event.target.dataset.action === 'close-lightbox') {
    closeModalForm();
  }
}

function onClickOverlay() {
  closeModalForm();
}

function onKeyPress(event) {
  switch (event.key) {
    case 'Esc':
    case 'Escape':
      closeModalForm();
      break;
    case 'Left':
    case 'ArrowLeft':
      getPicture(-1);
      break;
    case 'Right':
    case 'ArrowRight':
      getPicture(1);
      break;
  }
}

function setNotifySettings() {
  defaults.delay = 2000;
  defaults.stack.dir1 = 'up';
  defaults.stack.dir2 = 'right';
  defaults.mode = 'light';
  defaults.firstpos1 = 25;
  defaults.firstpos2 = 25;
  defaults.spacing1 = 36;
  defaults.spacing2 = 36;
  defaults.push = 'bottom';
  defaults.context = document.body;
  defaults.positioned = true;
}
