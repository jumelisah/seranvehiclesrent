import qs from 'qs';
import http from '../../helpers/http';

export const getVehicles = dataFilter => {
  return async dispatch => {
    try {
      const {data} = await http().get('/popular');
      dispatch({
        type: 'GET_VEHICLES',
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const getVehicleDetail = id => {
  return async dispatch => {
    try {
      const {data} = await http().get(`/vehicles/${id}`);
      dispatch({
        type: 'GET_VEHICLE_DETAIL',
        payload: data.result,
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const getCars = dataFilter => {
  return async dispatch => {
    try {
      const {data} = await http().get('/popular?category=1');
      dispatch({
        type: 'GET_CARS',
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const getMotorbike = dataFilter => {
  return async dispatch => {
    try {
      const {data} = await http().get('/popular?category=2');
      dispatch({
        type: 'GET_MOTORBIKE',
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const getBike = dataFilter => {
  return async dispatch => {
    try {
      const {data} = await http().get('/popular?category=3');
      dispatch({
        type: 'GET_BIKE',
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const addVehicles = (token, dataVehicle) => {
  return async dispatch => {
    try {
      const {data} = await http(token).post(
        '/vehicles',
        qs.stringify(dataVehicle),
      );
      dispatch({
        type: 'PAGES_LOADING',
      });
      dispatch({
        type: 'CLEAR_VEHICLES',
      });
      dispatch({
        type: 'ADD_VEHICLES',
        payload: data.message,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const deleteVehicle = (token, id) => {
  return async dispatch => {
    try {
      const {data} = await http(token).delete(`/vehicles/${id}`);
      dispatch({
        type: 'DELETE_VEHICLE',
        payload: data.message,
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};
