

const submit = document.querySelector('.header__search-icon');
let inputValue = document.querySelector('.header-input');
const gallery = document.querySelector('.gallery');

let query = 'nature';
let perPage = '20';
let msgAboutNullAnswer = 'Sorry, nothing was found for your query. Try changing the query and re-enabling the search.';

const createRequestWithNewURL = () => {
  gallery.innerHTML = '';
  query = inputValue.value;
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&orientation=landscape&client_id=xuDc8Ih3-wl4c13_mA0xvJuazv8R68rZ0gvEEDFk4K8`;
  getData(url);
};

submit.addEventListener('click', createRequestWithNewURL);

const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&orientation=landscape&client_id=xuDc8Ih3-wl4c13_mA0xvJuazv8R68rZ0gvEEDFk4K8`;

async function getData(url) {
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  const answerArray = data.results;
  // console.log(data.results[0].urls.regular);
  if ((res.status === 200 && answerArray.length === 0) || res.status === 400) {
      showMsgAboutNullAnswer(msgAboutNullAnswer);
    } else {
      answerArray.forEach(img => {
        showAnswerImg(img.alt_description, img.urls.regular)
      });
    }
  }
  // else {

  // }
// }
getData(url);

const showMsgAboutNullAnswer = (msgAboutNullAnswer) => {
  const p = document.createElement('p');
  p.classList.add('gallery__msg-null-answer');
  p.innerHTML = msgAboutNullAnswer;
  gallery.append(p);
};

const showAnswerImg = (alt,url) => {
  const div = document.createElement('div');
  const img = document.createElement('img');
  img.alt = alt;
  img.src = url;

  div.classList.add('gallery__picture');

  gallery.append(div);
  div.append(img);
};