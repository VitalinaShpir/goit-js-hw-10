import '../css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash';
// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const API = "live_0P4LYrUD2RzxWsDzIlhzu1TTwJUDuhYwNccomvc5O50B6yfZQVjWwUSTbk8vvIaw";

const breedSelect = document.querySelector('.breed-select');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const catImg = document.querySelector('.cat-img');
const catDescr = document.querySelector('.cat-descr');

console.log('hello!!21111222')

 function fetchBreeds() {
    return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API}`).then(
      response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      }
    );
  }
  
   function fetchCatByBreed(breed) {
    return fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breed}&x-api-key=${API}`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      
      return response.json();
    });
  }
console.log(fetchCatByBreed('acur'))

//   -----------------------------------------------


function openBreeds() {
    fetchBreeds()
      .then(breeds => {
        breeds.forEach(breed => {
          const option = document.createElement('option');
          option.value = breed.id;
          option.textContent = breed.name;
          breedSelect.appendChild(option);
          loaderRef.style.display = 'block';
        })
      })
      .catch(error => {
        breedSelect.style.display = 'block';
        loaderRef.style.display = 'none';
        errorRef.style.display = 'block';
        console.error(error);
      });
  }
  openBreeds();


//   ----------------------------------------------


breedSelect.addEventListener('change', onBreedCange);

function onBreedCange(evt){
    loaderRef.style.display = 'block';
  catImg.innerHTML = '';
  catDescr.innerHTML = '';
  const breed = evt.target.value;
  console.log(breed);
  fetchCatByBreed(breed)
    .then(breed => renderCatCard(breed))
    .catch(error => Notiflix.Notify.failure( 'Oops! Something went wrong! Try reloading the page!'))
    .finally(() => loaderRef.style.display = 'block');
}



// ----------------------------------------------




//   -----------------------------------------------


function renderCatCard (breed){
    const markupImg = `<img class="cat-picture" width=400 src="${breed.url}" alt="bbb">`;
    // const markupDescr = `<h1 class="cat-name">${breed.breeds[0].name}</h2><p class="cat-description
    // ">${breed.breeds[0].description}</p><p class="cat-temperament"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
    catInfo.insertAdjacentHTML('beforeend', markupImg);
    // catInfo.insertAdjacentHTML('beforeend', markupDescr);
  }


  