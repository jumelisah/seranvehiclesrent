const initialState = {
  data: [],
};

const favorites = (state = initialState, action) => {
  switch (action.payload) {
    case 'GET_FAVORITES': {
      state.data = action.payload;
      return {...state};
    }
    case 'ADD_FAVORITES': {
      state.data = action.payload;
      return {...state};
    }
    case 'REMOVE_FAVORITES': {
      state.data = action.payload;
      return {...state};
    }
    default:
      return {...state};
  }
};

export default favorites;
