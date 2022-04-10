const initialState = {
  data: [],
  message: null,
  isError: false,
  errMsg: null,
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HISTORY': {
      state.data = action.payload[0];
      if (!Array.isArray(action.payload[0])) {
        state.data = [action.payload[0]];
      }
      return {...state};
    }
    case 'HISTORY_ERROR': {
      state.isError = true;
      state.errMsg = action.payload;
      return {...state};
    }
    default:
      return {...state};
  }
};

export default history;
