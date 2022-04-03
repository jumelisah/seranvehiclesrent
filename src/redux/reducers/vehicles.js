const initialState = {
  data: {},
  message: null,
  cars: {},
  motorbike: {},
  bike: {},
  isError: false,
  vehicle: [],
  search: [],
  page: {},
};

const vehicles = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_VEHICLES': {
      state.data = action.payload.result;
      return {...state};
    }
    case 'GET_VEHICLE_DETAIL': {
      state.vehicle = action.payload;
      return {...state};
    }
    case 'VEHICLE_SEARCH': {
      if (action.replace === true) {
        state.search = action.payload.result;
      } else {
        state.search = state.search.concat(action.payload.result);
      }
      state.page = action.payload.pageInfo;
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
    case 'ADD_VEHICLES': {
      state.message = action.payload;
      return {...state};
    }
    case 'DELETE_VEHICLE': {
      state.message = action.payload;
      return {...state};
    }
    case 'VEHICLES_ERROR': {
      state.isError = true;
      state.errMsg = action.payload;
      return {...state};
    }
    case 'VEHICLES_CLEAR': {
      state.isError = false;
      state.errMsg = null;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default vehicles;
