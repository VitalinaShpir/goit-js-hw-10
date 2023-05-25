import '../css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash';
// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const DEBOUNCE_DELAY = 300;

const breedSelect = document.querySelector('.breed-select');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

console.log('hello!!2222')


 function fetchBreeds() {
    return fetch('https://api.thecatapi.com/v1/breeds')
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        throw error;
      });
  }
  
   function fetchCatByBreed(breedId) {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        throw error;
      });
  }


function showLoader() {
  loaderRef.style.display = 'block';
}

function hideLoader() {
  loaderRef.style.display = 'none';
}

function openBreeds() {
  showLoader();
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      hideLoader();
      breedSelect.style.display = 'block';
    })
    .catch(error => {
      hideLoader();
      showError();
      console.error(error);
    });
}
openBreeds();



function showError() {
  errorRef.style.display = 'block';
}

function hideError() {
  errorRef.style.display = 'none';
}



// function showCatInfo(cat) {
//   catImageElement.src = cat.url;
//   catBreedElement.textContent = cat.breeds[0].name;
//   catDescriptionElement.textContent = cat.breeds[0].description;
//   catTemperamentElement.textContent = `Temperament: ${cat.breeds[0].temperament}`;

//   catInfoContainerElement.style.display = 'block';
// }




// function hideCatInfo() {
//   catInfoContainerElement.style.display = 'none';
// }










// function fetchAndDisplayCatInfo(breedId) {
//   showLoader();
//   hideCatInfo();

//   fetchCatByBreed(breedId)
//     .then(cats => {
//       if (cats.length > 0) {
//         const cat = cats[0];
//         showCatInfo(cat);
//       } else {
//         throw new Error('No cat found for the selected breed.');
//       }

//       hideLoader();
//     })
//     .catch(error => {
//       hideLoader();
//       showError();
//       console.error(error);
//     });
// }



// breedSelectElement.addEventListener('change', event => {
//   const selectedBreedId = event.target.value;
//   fetchAndDisplayCatInfo(selectedBreedId);
// });

