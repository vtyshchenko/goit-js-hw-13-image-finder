import { defaults } from '@pnotify/core';
import getRefs from './refs.js';

setNotifySettings();
const { galleryRef, inputRef } = getRefs;
// const createMarcup = new CreateMarcup(galleryRef);

countryFilterRef.addEventListener('input', debounce(onInput, 500));

function onInput(event) {
  inputRef.fetchCountries(event.target.value).then(renderMarkup).catch(countries.onError);
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
