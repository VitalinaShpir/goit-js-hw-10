import '../css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const DEBOUNCE_DELAY = 300;

const breedSelect = document.querySelector('.breed-select');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// function showLoader() {
//   loaderRef.style.display = 'block';
// }

// function hideLoader() {
//   loaderRef.style.display = 'none';
// }

// function showError() {
//   errorRef.style.display = 'block';
// }

// function hideError() {
//   errorRef.style.display = 'none';
// }

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




// function populateBreeds() {
//   showLoader();

//   fetchBreeds()
//     .then(breeds => {
//       breeds.forEach(breed => {
//         const option = document.createElement('option');
//         option.value = breed.id;
//         option.textContent = breed.name;
//         breedSelectElement.appendChild(option);
//       });

//       hideLoader();
//       breedSelectElement.style.display = 'block';
//     })
//     .catch(error => {
//       hideLoader();
//       showError();
//       console.error(error);
//     });
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


// populateBreeds();