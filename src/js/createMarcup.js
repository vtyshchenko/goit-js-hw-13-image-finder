import galleryTempl from '../templates/gallery.hbs';
import imageCardTempl from '../templates/image_card.hbs';

class CreateMarcup {
  constructor(galleryRef) {
    this.galleryRef = galleryRef;
  }

  renderMarkup(response) {
    this.galleryRef.innerHTML = '';
    if (response) {
      this.galleryRef.innerHTML = this.createMarcup(response);
    }
  }

  createMarcup(data) {
    const images = imageCardTempl(data);
    console.log(`~ images`, images);
    // return galleryTempl(images);
  }
}

export default CreateMarcup;
