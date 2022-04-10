const initialState = {
  data: {},
  message: null,
  cars: {},
  motorbike: {},
  bike: {},
  isError: false,
  transaction: [],
  page: {},
};

const transactions = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TRANSACTION': {
      state.data = action.payload;
      return {...state};
    }
    case 'TRANSACTION_ERROR': {
      state.message = null;
      state.isError = true;
      state.errMsg = action.payload;
      return {...state};
    }
    case 'TRANSACTION_CLEAR': {
      state.message = null;
      state.isError = false;
      state.errMsg = null;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default transactions;
