

const submit = document.querySelector('.header__search-icon');
let inputValue = document.querySelector('.header-input');
const gallery = document.querySelector('.gallery');

let query = 'nature';
let perPage = '20';


submit.addEventListener('click', () => {
console.log(inputValue.value);
});
// let userRequestInput = inputValue.value;
// if (inputValue.value) {
  // console.log(inputValue);
// }

const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&orientation=landscape&client_id=xuDc8Ih3-wl4c13_mA0xvJuazv8R68rZ0gvEEDFk4K8`;

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  const answerArray = data.results;
  console.log(data.results[0].urls.regular);
  if (res.status === 200) {
    if (answerArray.length === 0) {
      showMsgAboutNullAnswer();
    } else {
      answerArray.forEach(img => {
        showAnswerImg(img.alt_description, img.urls.regular)
      });
    }
  }
}
getData();

const showMsgAboutNullAnswer = () => {
  const p = document.createElement('p');
  p.classList.add('gallery__msg-null-answer');
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