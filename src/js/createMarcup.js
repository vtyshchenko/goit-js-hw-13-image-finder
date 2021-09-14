import { error } from '@pnotify/core';
import galleryTempl from '../templates/gallery.hbs';
import imageCardTempl from '../templates/image_card.hbs';

class CreateMarcup {
  constructor(galleryRef) {
    this.galleryRef = galleryRef;
  }

  renderMarkup(response) {
    //     this.countryInfoRef.innerHTML = '';
    //     if (response) {
    //       if (response.length > 10) {
    //         this.onManyValues();
    //       } else {
    //         this.countryInfoRef.innerHTML = this.createMarcup(response);
    //       }
    //     }
  }

  createMarcup(data) {
    //     if (data.length > 1) {
    //       return countryListTempl(data);
    //     } else {
    //       this.countryFilterRef.value = '';
    //       return countryCardTempl(data[0]);
    //     }
  }
}

export default CreateMarcup;
