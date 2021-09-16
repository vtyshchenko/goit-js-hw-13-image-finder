import { error, info } from '../../node_modules/@pnotify/core/dist/PNotify.js';

const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const KEY = '23423301-88813f09fe7b27f5f83c66d56';

async function fetchImages(searchQuery, page, perPage) {
  if (searchQuery.length === 0) {
    return Promise.resolve('');
  }

  const url = `${BASE_URL}&q=${searchQuery}&page=${page}&per_page=${perPage}&key=${KEY}`;
  console.log(`~ url`, url);
  const myRequest = new Request(url);
  return await fetch(myRequest).then(getDataFromResponse).catch(onError);
}

function getDataFromResponse(response) {
  switch (response.status) {
    case 200:
      return response.json();
    case 404:
      info({
        text: 'Nothing found!',
      });
      return Promise.resolve('');
    default:
      throw new Error(`Something went wrong on api server! Response status ${response.status}`);
  }
}

function onError(err) {
  error({ text: `Something went wrong: ${err}!` });
}

export default { fetchImages, onError };
// {
//   "comments": 78,
//   "downloads": 63296,
//   "favorites": 558,
//   "id": 1508613,
//   "imageHeight": 2135,
//   "imageSize": 1630104,
//   "imageWidth": 2894,
//   "largeImageURL": "https://pixabay.com/get/57e5d54b4c53af14f6da8c7dda793376173cd8e7524c704c702873dc9f44c551_1280.jpg",
//   "likes": 575,
//   "pageURL": "https://pixabay.com/photos/cat-animal-cat-portrait-cat-s-eyes-1508613/",
//   "previewHeight": 110,
//   "previewURL": "https://cdn.pixabay.com/photo/2016/07/10/21/47/cat-1508613_150.jpg",
//   "previewWidth": 150,
//   "tags": "cat, animal, cat portrait",
//   "type": "photo",
//   "user": "cocoparisienne",
//   "userImageURL": "https://cdn.pixabay.com/user/2018/11/26/11-06-29-714_250x250.jpg",
//   "user_id": 127419,
//   "views": 127450,
//   "webformatHeight": 472,
//   "webformatURL": "https://pixabay.com/get/57e5d54b4c53af14f6da8c7dda793376173cd8e7524c704c702873dc9f44c551_640.jpg",
//   "webformatWidth": 640
// }
