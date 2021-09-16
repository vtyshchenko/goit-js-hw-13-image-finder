import { defaults } from '@pnotify/core';

import getRefs from './refs.js';
import CreateMarcup from './createMarcup.js';
import imagesApi from './apiService.js';

setNotifySettings();

let debounce = require('lodash.debounce');

const { galleryRef, inputRef, buttonRef } = getRefs();
const createMarcup = new CreateMarcup(galleryRef);
const perPage = 12;
let page = 1;
let textSearch = '';
let elem = '';

inputRef.addEventListener('input', debounce(onInput, 500));
buttonRef.addEventListener('click', debounce(onClick, 500));

function onInput(event) {
  galleryRef.innerHTML = '';
  page = 1;
  textSearch = event.target.value;
  upload(page);
}

function onClick() {
  page += 1;
  upload(page);
  // inputRef.scrollIntoView({ block: ' nearest' });
}

function upload(page) {
  imagesApi.fetchImages(textSearch, page, perPage).then(renderMarkup).catch(imagesApi.onError);
}

function renderMarkup(data) {
  if (data && data.hits.length > 0) {
    buttonRef.classList.remove('visually-hidden');
  } else {
    buttonRef.classList.add('visually-hidden');
  }
  createMarcup.renderMarkup(data);
  const elem = document.querySelector(`#id${data.hits[0].id}`);
  elem.scrollIntoView({ block: 'end', inline: 'nearest', behavior: 'smooth' });
}

function setNotifySettings() {
  defaults.delay = 8000;
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
