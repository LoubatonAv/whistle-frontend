const initialState = {
  melodies: [],
  filterBy: null,
  genres: ['irish', 'hebrew'],
};

export function melodyReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case 'SET_MELODIES':
      newState = { ...state, melodies: action.melodies };
      break;

    case 'REMOVE_MELODY':
      newState = { ...state, melodies: state.melodies.filter((melody) => melody.id !== action.personId) };
      break;
    case 'SET_FILTER':
      newState = { ...state, filterBy: action.filterBy };
      break;

    default:
      return newState;
  }
  return newState;
}
