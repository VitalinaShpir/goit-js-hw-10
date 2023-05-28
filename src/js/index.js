import '../css/styles.css';
import Notiflix from 'notiflix';

const API =
  'live_HEs7npt4enTv8IppoFAzotzjElNW9aw61wQB5T2Fw18DPSakhIju9elgFzOgYqmc';


const fetchBreeds = () => {
  return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};


const fetchCatByBreed = breedId => {
  return fetch(`https://api.thecatapi.com/v1/images/${breedId}?api_key=${API}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};


const breedSelect = document.querySelector('.breed-select');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const catImg = document.querySelector('.cat-img');
const catDescr = document.querySelector('.cat-descr');

breedSelect.addEventListener('change', onBreedChange);

Notiflix.Loading.circle('Loading data, please wait...');

renderBreeds();
function renderBreeds(){
  loaderRef.classList.remove('is-hidden');
  fetchBreeds()
      .then(breeds => renderBreedList(breeds))
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      })
      .finally(() => {
        breedSelect.classList.remove('is-hidden');
        loaderRef.classList.add('is-hidden');
      })
}


function renderBreedList(breeds){
  const listMarkup = breeds.map(breed => {
    return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
  }).join('');

breedSelect.insertAdjacentHTML('beforeend', listMarkup);
}




function onBreedChange(e){
  loaderRef.classList.remove('is-hidden');
  catImg.innerHTML = '';
  catDescr.innerHTML = '';
  const breedId = e.target.value;
  fetchCatByBreed(breedId)
      .then(breed => renderCatCard(breed))
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      })
      .finally(()=> loaderRef.classList.add('is-hidden'));

}


function renderCatCard (breed){
  const markupImg = `<img class="cat-picture" width=400 src="${breed.url}" alt="bbb">`;
  const markupDescr = `<h1 class="cat-name">${breed.breeds[0].name}</h2><p class="cat-description
  // ">${breed.breeds[0].description}</p><p class="cat-temperament"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
  catInfo.insertAdjacentHTML('beforeend', markupImg);
  catInfo.insertAdjacentHTML('beforeend', markupDescr);
}