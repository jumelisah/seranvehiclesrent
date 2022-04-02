const initialState = {
  errMsg: {},
  isError: false,
};

const error = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTION_ERROR': {
      state.data = action.payload.result;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default error;
