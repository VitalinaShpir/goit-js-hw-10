export const fetchBreeds = breedId => {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  )
      .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
};




