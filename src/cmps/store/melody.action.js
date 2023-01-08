import { melodyService } from '../../service/melody.service.js';

export function loadMelodies(filterBy) {
  return (dispatch, getState) => {
    melodyService.query(filterBy).then((melody) => {
      const action = { type: 'SET_MELODIES', melodies: melody };
      dispatch(action);
    });
  };
}

export function addMelody(melody) {
  return async (dispatch) => {
    try {
      const savedMelody = await melodyService.addMelody(melody);
      const action = {
        type: 'ADD_MELODY',
        todo: savedMelody,
      };
      dispatch(action);
    } catch (err) {
      console.log('Can not add todo', melody);
    }
  };
}

export function removeMelody(melodyId) {
  return (dispatch) => {
    melodyService.remove(melodyId).then(() => {
      const action = { type: 'REMOVE_MELODY', personId: melodyId };
      dispatch(action);
    });
  };
}
