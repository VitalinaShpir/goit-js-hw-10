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


export { fetchBreeds, fetchCatByBreed };