import { info } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import imageCardTempl from '../templates/image_card.hbs';

class CreateMarcup {
  constructor(galleryRef) {
    this.galleryRef = galleryRef;
  }

  renderMarkup(response) {
    if (response) {
      this.galleryRef.innerHTML += this.createMarcup(response);
    }
  }

  createMarcup(data) {
    if (data.hits.length > 0) {
      const imagesList = imageCardTempl(data.hits);
      return imagesList;
    } else {
      info({
        text: 'Nothing found!',
      });
      return '';
    }
  }
}

export default CreateMarcup;
