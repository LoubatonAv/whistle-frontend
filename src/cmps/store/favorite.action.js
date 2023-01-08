import { melodyService } from '../../service/melody.service';

export function onLoadFavorites() {
  return (dispatch, getState) => {
    melodyService.query().then((favorites) => {
      const action = { type: 'SET_FAVORITES', favorites };
      dispatch(action);
    });
  };
}

export function removeFavorite(movie) {
  const id = movie.id;
  return (dispatch, getState) => {
    melodyService.removeFavorite(id).then(() => {
      const action = { type: 'REMOVE_FAVORITE', id };
      dispatch(action);
    });
  };
}

export function addFavorite(favorite) {
  return (dispatch, getState) => {
    melodyService.addFavorite(favorite).then(() => {
      const action = { type: 'ADD_FAVORITE', favorite };
      dispatch(action);
    });
  };
}
