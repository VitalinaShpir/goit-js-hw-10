import { fetchBreeds, fetchCatByBreed } from './cat-api';
import '../css/styles.css';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';



const breedSelect = document.querySelector('.breed-select');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const catImg = document.querySelector('.cat-img');
const catDescr = document.querySelector('.cat-descr');

breedSelect.addEventListener('change', onBreedChange);

Notiflix.Loading.circle('Loading data, please wait...');


 
  fetchBreeds()
      .then(breeds => {
        Notiflix.Loading.remove();
        loaderRef.classList.remove('is-hidden');
        renderBreedList(breeds)
    })
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



function renderBreedList(breeds){
  breedSelect.innerHTML = breeds.map(breed => {
    return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
  }).join('');
  new SlimSelect({
    select: '#single'
  })
}




function onBreedChange(e){
  loaderRef.classList.remove('is-hidden');
  // catImg.innerHTML = '';
  // catDescr.innerHTML = '';
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
  catInfo.innerHTML = '';
  const markupImg = `<img class="cat-picture" width=400 src="${breed.url}" alt="bbb">`;
  const markupDescr = `<div><h1 class="cat-name">${breed.breeds[0].name}</h2><p class="cat-description
  // ">${breed.breeds[0].description}</p><p class="cat-temperament"><b>Temperament:</b> ${breed.breeds[0].temperament}</p></div>`;
  catInfo.insertAdjacentHTML('beforeend', markupImg);
  catInfo.insertAdjacentHTML('beforeend', markupDescr);
 
}

console.log(catInfo)
