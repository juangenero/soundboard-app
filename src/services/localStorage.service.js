// - - - ALMACENAMIENTO DE AUDIOS FAVORITOS - - -

const keyFavorites = 'idsFav';

// Obtener array de favoritos
export function getIdsFavLS() {
  try {
    const arrayString = localStorage.getItem(keyFavorites);
    if (arrayString) {
      return JSON.parse(arrayString);
    }
    return [];
  } catch (error) {
    console.error(`getIdsFavLS -> ${error}`);
    return [];
  }
}

// Guardar array de favoritos
function setIdsFavLS(array) {
  try {
    const arrayString = JSON.stringify(array);
    localStorage.setItem(keyFavorites, arrayString);
  } catch (error) {
    console.error(`setIdsFavLS -> ${error}`);
  }
}

// Añadir elemento al array favoritos
export function addFavLS(idAudio) {
  let array = getIdsFavLS();
  array.push(idAudio);
  setIdsFavLS(array);
}

// Eliminar elemento del array favoritos
export function removeFavLS(idAudio) {
  let array = getIdsFavLS();
  array = array.filter((item) => item !== idAudio);
  setIdsFavLS(array);
}
