// import { defaults } from '@pnotify/core';
import getRefs from './refs.js';
// import CreateMarcup from './createMarcup.js';
import imagesApi from './apiService.js';

// setNotifySettings();
const { inputRef } = getRefs();
// const galleryRef = document.querySelector('.gallery');
// console.log(`~ galleryRef`, galleryRef);
// const createMarcup = new CreateMarcup(galleryRef);
// console.log(`~ createMarcup`, createMarcup);
let page = 1;

let debounce = require('lodash.debounce');
inputRef.addEventListener('input', debounce(onInput, 500));

function onInput(event) {
  const perPage = 12;
  imagesApi
    .fetchImages(event.target.value, page, perPage)
    .then(renderMarkup)
    .catch(imagesApi.onError);
}

function renderMarkup(data) {
  console.log(`~ data`, data);
  // createMarcup.renderMarkup(data);
}

// function setNotifySettings() {
//   defaults.delay = 2000;
//   defaults.stack.dir1 = 'up';
//   defaults.stack.dir2 = 'right';
//   defaults.mode = 'light';
//   defaults.firstpos1 = 25;
//   defaults.firstpos2 = 25;
//   defaults.spacing1 = 36;
//   defaults.spacing2 = 36;
//   defaults.push = 'bottom';
//   defaults.context = document.body;
//   defaults.positioned = true;
// }
