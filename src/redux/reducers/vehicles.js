const initialState = {
  data: {},
  cars: {},
  motorbike: {},
  bike: {},
  isError: false,
};

const vehicles = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_VEHICLES': {
      state.data = action.payload.result;
      return {...state};
    }
    case 'GET_CARS': {
      state.cars = action.payload.result;
      return {...state};
    }
    case 'GET_MOTORBIKE': {
      state.motorbike = action.payload.result;
      return {...state};
    }
    case 'GET_BIKE': {
      state.bike = action.payload.result;
      return {...state};
    }
    case 'VEHICLES_ERROR': {
      state.isError = true;
      state.errMsg = action.payload;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default vehicles;
