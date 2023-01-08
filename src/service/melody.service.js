import { storageService } from './storage.service.js';
import { httpService } from './httpService';

const STORAGE_KEY = 'melodyDB';
const BASE_URL = 'tab';

// const STORAGE_FAVORITE_KEY = 'favoriteDB';

export const melodyService = {
  query,
  addMelody,
  remove,
  getGenres,
  getById,
};

async function query(filterBy) {
  try {
    return httpService.get(BASE_URL, filterBy);
  } catch (err) {
    console.log('cant get todos from server', err);
    throw err;
  }
}

// async function query({ genre, text } = {}) {
//   let melodies = _loadMelodiesFromStorage();
//   let melody = {
//     id: 'jpAuJb',
//     name: 'Scarborough Fair',
//     image: 'taeeoz3vbsv4mnxdd7i8',
//     genre: 'irish',
//   };
//   if (!melodies || melodies.length < 1) {
//     const updatedMelodies = [...(melodies = []), melody];
//     _saveMelodiesToStorage(updatedMelodies);
//     return updatedMelodies;
//   }

//   try {
//     let list = melodies;
//     if (genre) {
//       list = list.filter((m) => m.genre === genre);
//     }
//     if (text) {
//       const filterRegex = new RegExp(text, 'i');
//       list = list.filter((m) => filterRegex.test(m.name));
//     }
//     return list;
//   } catch (err) {
//     console.log('cant get melodies from local storage', err);
//     throw err;
//   }
// }

function getGenres() {
  const genres = ['Irish', 'Movies/Series', 'Hebrew', 'General Music', 'Video Games'];
  return genres;
}

function getById(melodyId) {
  return storageService.get(STORAGE_KEY, melodyId);
}

function capitalizeName(name) {
  return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
}

// async function addMelody(melody) {
//   let newMelody = { ...melody, name: capitalizeName(melody.name) };
//   let melodies = _loadMelodiesFromStorage();
//   if (!melodies) melodies = [];
//   const updatedMelodies = [...melodies, newMelody];
//   _saveMelodiesToStorage(updatedMelodies);
// }

async function addMelody(melody) {
  let newMelody = { ...melody, name: capitalizeName(melody.name) };
  console.log('melody:', newMelody);

  try {
    return httpService.post(BASE_URL, newMelody); //destructure the todo object and giving it the name key
  } catch (err) {
    console.log('can not add todo from server', err);
    throw err;
  }
}

function remove(tabId) {
  // return storageService.removeFromStorage(STORAGE_KEY, todoId);
  try {
    return httpService.delete(`${BASE_URL}/${tabId}`);
  } catch (err) {
    console.log('can not delete todo from server', err);
    throw err;
  }
}

// function remove(melodyId) {
//   return storageService.removeFromStorage(STORAGE_KEY, melodyId);
// }

function _saveMelodiesToStorage(melodyData) {
  storageService.saveToStorage(STORAGE_KEY, melodyData);
}

function _loadMelodiesFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY);
}

// function _loadeFavoriteFromStorage() {
//   return storageService.loadFromStorage(STORAGE_FAVORITE_KEY);
// }

// function _saveFavoriteoStorage(favoriteData) {
//   storageService.saveToStorage(STORAGE_FAVORITE_KEY, favoriteData);
// }

// async function saveFavorites(favorites) {
//   const updatedFavorites = [...favorites];
//   _saveFavoriteoStorage(updatedFavorites);
// }

// async function removeFavorite(favoriteToRemove) {
//   let favorites = _loadeFavoriteFromStorage();
//   let updatedFavorites = favorites?.filter((favorite) => favorite.id !== favoriteToRemove);

//   _saveFavoriteoStorage(updatedFavorites);
//   return updatedFavorites;
// }
