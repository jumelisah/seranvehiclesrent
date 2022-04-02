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
