export default function getRefs() {
  return {
    inputRef: document.getElementById('input'),
    buttonRef: document.querySelector('.btn-show-more'),
    galleryRef: document.querySelector('.gallery'),

    modelWindowRef: document.querySelector('.js-lightbox'),
    menuBtnRef: document.querySelector('.lightbox__button'),
    imageRef: document.querySelector('.lightbox__image'),
    overlayRef: document.querySelector('.lightbox__overlay'),

    switchRef: document.querySelector('.switch__toggle'),
  };
}
