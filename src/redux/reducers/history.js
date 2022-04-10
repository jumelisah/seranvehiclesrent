const initialState = {
  data: [],
  message: null,
  isError: false,
  errMsg: null,
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HISTORY': {
      state.data = action.payload;
      if (!Array.isArray(action.payload)) {
        state.data = [action.payload];
      }
      return {...state};
    }
    case 'GET_HISTORY_USER': {
      state.message = action.payload;
      state.isError = false;
      state.errMsg = null;
      return {...state};
    }
    case 'HISTORY_ERROR': {
      state.isError = true;
      state.errMsg = action.payload;
      return {...state};
    }
    case 'HISTORY_CLEAR': {
      state = initialState;
      return {...state};
    }
    default:
      return {...state};
  }
};

export default history;
