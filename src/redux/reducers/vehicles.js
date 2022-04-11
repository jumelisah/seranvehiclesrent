const initialState = {
  data: {},
  message: null,
  cars: {},
  motorbike: {},
  bike: {},
  isError: false,
  vehicle: {},
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
      if (action.replace === true) {
        state.cars = action.payload.result;
        state.page = action.payload.pageInfo;
      } else {
        state.cars = state.cars.concat(action.payload.result);
      }
      return {...state};
    }
    case 'GET_MOTORBIKE': {
      if (action.replace === true) {
        state.motorbike = action.payload.result;
        state.page = action.payload.pageInfo;
      } else {
        state.motorbike = state.motorbike.concat(action.payload.result);
      }
      return {...state};
    }
    case 'GET_BIKE': {
      if (action.replace === true) {
        state.bike = action.payload.result;
        state.page = action.payload.pageInfo;
      } else {
        state.bike = state.bike.concat(action.payload.result);
      }
      return {...state};
    }
    case 'ADD_VEHICLES': {
      state.message = action.payload.message;
      return {...state};
    }
    case 'EDIT_VEHICLES': {
      state.vehicle = action.payload.result;
      state.message = action.payload.message;
      return {...state};
    }
    case 'DELETE_VEHICLE': {
      state.vehicle = action.payload.result;
      state.message = action.payload.message;
      return {...state};
    }
    case 'VEHICLES_ERROR': {
      state.message = null;
      state.isError = true;
      state.errMsg = action.payload;
      return {...state};
    }
    case 'VEHICLES_CLEAR': {
      state.message = null;
      state.isError = false;
      state.errMsg = null;
      return {...state};
    }
    case 'VEHICLES_RESET': {
      state.search = [];
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

export default vehicles;
