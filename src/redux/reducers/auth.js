const initialState = {
  token: null,
  message: null,
  isError: false,
  errMsg: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN': {
      state.message = null;
      state.token = action.payload;
      return {...state};
    }
    case 'AUTH_LOGOUT': {
      return {...initialState};
    }
    case 'AUTH_REGISTER': {
      state.message = action.payload.message;
      return {...state};
    }
    case 'AUTH_CONFIRM_ACCOUNT': {
      state.message = action.payload.message;
      return {...state};
    }
    case 'AUTH_ERROR': {
      state.token = null;
      state.message = null;
      state.isError = true;
      state.errMsg = action.payload;
      return {...state};
    }
    case 'AUTH_CLEAR': {
      state.isError = false;
      state.errMsg = null;
      return {...state};
    }
    default:
      return {...state};
  }
};

export default auth;
