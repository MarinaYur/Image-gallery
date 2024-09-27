

const submit = document.querySelector('.header__search-icon');
let input = document.querySelector('.header-input');
const gallery = document.querySelector('.gallery');
const clear = document.querySelector('.header__clear');

let query = 'nature';
let perPage = '28';
let msgAboutNullAnswer = 'Sorry, nothing was found for your query. Try changing the query and re-enabling the search.';
let msgServerIsNotResponding = 'The server is not responding. Please try again';

const createRequestWithNewURL = () => {
  gallery.innerHTML = '';
  query = input.value;
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&orientation=landscape&client_id=xuDc8Ih3-wl4c13_mA0xvJuazv8R68rZ0gvEEDFk4K8`;
  getData(url);
};



const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&orientation=landscape&client_id=xuDc8Ih3-wl4c13_mA0xvJuazv8R68rZ0gvEEDFk4K8`;

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  const answerArray = data.results;
  if ((res.status === 200 && answerArray.length === 0) || res.status === 400) {
      showMsgAboutNullAnswer(msgAboutNullAnswer);
    } else if (res.status === 200) {
      answerArray.forEach(img => {
        showAnswerImg(img.alt_description, img.urls.regular)
      });
    } else {
      showMsgAboutNullAnswer(msgServerIsNotResponding)
    }
  }
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

submit.addEventListener('click', createRequestWithNewURL);

document.addEventListener( 'keyup', event => {
  if( event.code === 'Enter' && document.activeElement === input) createRequestWithNewURL();
});

document.addEventListener( 'input', event => {
  if (input.value) {
    clear.classList.remove('header__clear');
  } else clear.classList.add('header__clear');
});

clear.addEventListener('click', () => {
  input.value = '';
  clear.classList.add('header__clear');
})