import { error } from '../../node_modules/@pnotify/core/dist/PNotify.js';

const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const KEY = '23423301-88813f09fe7b27f5f83c66d56';

async function fetchImages(searchQuery, page, perPage) {
  if (searchQuery.length === 0) {
    return Promise.resolve('');
  }

  const url = `${BASE_URL}&q=${searchQuery}&page=${page}&per_page=${perPage}&key=${KEY}`;
  const myRequest = new Request(url);
  return await fetch(myRequest).then(getDataFromResponse).catch(onError);
}

function getDataFromResponse(response) {
  switch (response.status) {
    case 200:
      return response.json();
    default:
      throw new Error(`Something went wrong on api server! Response status ${response.status}`);
  }
}

function onError(err) {
  error({ text: `Something went wrong: ${err}!` });
  return -1;
}

export default { fetchImages, onError };
