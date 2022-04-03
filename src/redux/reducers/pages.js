const initialState = {
  isLoading: false,
};

const pages = (state = initialState, action) => {
  switch (action.type) {
    case 'PAGES_LOADING': {
      state.isLoading = !state.isLoading;
      return {...state};
    }
    default:
      return {...state};
  }
};

export default pages;
