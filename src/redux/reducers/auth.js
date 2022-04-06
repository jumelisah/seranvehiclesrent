const initialState = {
  userData: {},
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
    case 'AUTH_FORGOT_PASSWORD': {
      state.message = action.payload.message;
      return {...state};
    }
    case 'AUTH_GET_PROFILE': {
      state.userData = action.payload;
      return {...state};
    }
    case 'AUTH_CHANGE_PROFILE': {
      state.userData = action.payload;
      return {...state};
    }
    case 'AUTH_CHANGE_PASSWORD': {
      state.message = action.payload;
      state.errMsg = null;
      state.isError = false;
      return {...state};
    }
    case 'AUTH_ERROR': {
      state.message = null;
      state.isError = true;
      state.errMsg = action.payload;
      return {...state};
    }
    case 'AUTH_CLEAR': {
      state.isError = false;
      state.errMsg = null;
      state.message = null;
      return {...state};
    }
    default:
      return {...state};
  }
};

export default auth;
