import http from '../../helpers/http';
import RNFetchBlob from 'rn-fetch-blob';
import {BACKEND_URL} from '@env';

export const getVehicles = dataFilter => {
  return async dispatch => {
    try {
      dispatch({
        type: 'PAGES_LOADING',
      });
      const {data} = await http().get('/popular');
      dispatch({
        type: 'GET_VEHICLES',
        payload: data,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    }
  };
};

export const getVehicleDetail = id => {
  return async dispatch => {
    try {
      dispatch({
        type: 'PAGES_LOADING',
      });
      dispatch({
        type: 'VEHICLES_CLEAR',
      });
      const {data} = await http().get(`/vehicles/${id}`);
      dispatch({
        type: 'GET_VEHICLE_DETAIL',
        payload: data.result,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    }
  };
};

export const getCars = (page = 1, replace = true) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'VEHICLES_CLEAR',
      });
      dispatch({
        type: 'PAGES_ISLOADING',
      });
      const {data} = await http().get(
        `/popular?category=1&page=${page}&limit=10`,
      );
      dispatch({
        type: 'GET_CARS',
        payload: data,
        replace,
      });
      dispatch({
        type: 'PAGES_ISLOADING',
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'PAGES_ISLOADING',
      });
    }
  };
};

export const getMotorbike = (page = 1, replace = true) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'VEHICLES_CLEAR',
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
      const {data} = await http().get(
        `/popular?category=2&page=${page}&limit=10`,
      );
      dispatch({
        type: 'GET_MOTORBIKE',
        payload: data,
        replace,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    }
  };
};

export const getBike = (page = 1, replace = true) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'VEHICLES_CLEAR',
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
      const {data} = await http().get(
        `/popular?category=3&page=${page}&limit=10`,
      );
      dispatch({
        type: 'GET_BIKE',
        payload: data,
        replace,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    }
  };
};

export const addVehicles = (token, newData) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'VEHICLES_CLEAR',
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
      const vehicleData = [];
      for (let x in newData) {
        if (
          data[x] &&
          x !== 'picture' &&
          x !== 'fileName' &&
          x !== 'fileType'
        ) {
          vehicleData.push({name: x, data: newData[x]});
        }
      }
      if (newData.picture) {
        vehicleData.push({
          name: 'image',
          filename: newData.fileName,
          type: newData.fileType,
          data: RNFetchBlob.wrap(newData.picture),
        });
      }
      const {data} = await RNFetchBlob.fetch(
        'POST',
        `${BACKEND_URL}/vehicles`,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        vehicleData,
      );
      dispatch({
        type: 'ADD_VEHICLES',
        payload: JSON.parse(data),
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    }
  };
};

export const editVehicles = (token, id, newData) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'VEHICLES_CLEAR',
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
      const vehicleData = [];
      for (let x in newData) {
        if (
          data[x] &&
          x !== 'picture' &&
          x !== 'fileName' &&
          x !== 'fileType'
        ) {
          vehicleData.push({name: x, data: newData[x]});
        }
      }
      if (newData.picture) {
        vehicleData.push({
          name: 'image',
          filename: newData.fileName,
          type: newData.fileType,
          data: RNFetchBlob.wrap(newData.picture),
        });
      }
      const {data} = await RNFetchBlob.fetch(
        'PATCH',
        `${BACKEND_URL}/vehicles/${id}`,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        vehicleData,
      );
      dispatch({
        type: 'EDIT_VEHICLES',
        payload: JSON.parse(data),
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    }
  };
};

export const deleteVehicle = (token, id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'PAGES_LOADING',
      });
      const {data} = await http(token).patch(`/vehicles/delete/${id}`);
      dispatch({
        type: 'DELETE_VEHICLE',
        payload: data,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    }
  };
};

export const searchVehicles = (dataSearch, replace = true) => {
  return async dispatch => {
    try {
      if (replace) {
        dispatch({
          type: 'VEHICLES_RESET',
        });
      }
      dispatch({
        type: 'PAGES_LOADING',
      });
      if (!dataSearch.page) {
        dataSearch.page = 1;
      }
      const url = `/popular?sortBy=${dataSearch.sortBy}&name=${dataSearch.name}&category=${dataSearch.category}&location=${dataSearch.location}&cost_max=${dataSearch.cost_max}&cost_min=${dataSearch.cost_min}&limit=8&page=${dataSearch.page}`;
      const {data} = await http().get(url);
      dispatch({
        type: 'VEHICLE_SEARCH',
        payload: data,
        replace,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    }
  };
};
