// - - - ALMACENAMIENTO DE SWITCH FAVORITOS - - -
const keyFavActive = 'favActive';

export function getFavActiveLocalStorage() {
  return JSON.parse(localStorage.getItem(keyFavActive)) || false;
}

export function setFavActiveLocalStorage(value) {
  localStorage.setItem(keyFavActive, JSON.stringify(value));
}

// - - - ALMACENAMIENTO DE AUDIOS FAVORITOS - - -

const keyFavorites = 'favorites';

// Guardar array de favoritos
function setFavsLocalStorage(array) {
  try {
    const arrayString = JSON.stringify(array);
    localStorage.setItem(keyFavorites, arrayString);
  } catch (error) {
    console.error(`setFavsLocalStorage -> ${error}`);
  }
}

// Obtener array de favoritos
export function getFavsLocalStorage() {
  try {
    const arrayString = localStorage.getItem(keyFavorites);
    if (arrayString) {
      return JSON.parse(arrayString);
    }
    return [];
  } catch (error) {
    console.error(`getFavsLocalStorage -> ${error}`);
    return [];
  }
}

// Añadir elemento al array favoritos
export function addAudioToFavs(idAudio) {
  const array = getFavsLocalStorage();
  array.push(idAudio);
  setFavsLocalStorage(array);
}

// Eliminar elemento del array favoritos
export function removeAudioFromFavs(idAudio) {
  let array = getFavsLocalStorage();
  array = array.filter((item) => item !== idAudio);
  setFavsLocalStorage(array);
}
