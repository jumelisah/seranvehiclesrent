const initialState = {
  data: [],
  isFavorite: undefined,
  removedElements: [],
};

const favorites = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FAVORITES': {
      state.isFavorite = action.payload;
      return {...state};
    }
    case 'ADD_FAVORITES': {
      state.data = [...state.data, action.payload];
      return {...state};
    }
    case 'REMOVE_FAVORITES': {
      state.removedElements = state.data.splice(action.payload, 1);
      return {...state};
    }
    default:
      return {...state};
  }
};

export default favorites;
