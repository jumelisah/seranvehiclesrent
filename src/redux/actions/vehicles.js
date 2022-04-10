import http from '../../helpers/http';
import RNFetchBlob from 'rn-fetch-blob';

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
      dispatch({
        type: 'PAGES_LOADING',
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

export const addVehicles = (token, newData) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'PAGES_LOADING',
      });
      console.log(newData);
      const {data} = await RNFetchBlob.fetch(
        'POST',
        'https://fw5-backend-beginner.herokuapp.com/vehicles',
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        [
          newData.picture
            ? {
                name: 'image',
                filename: newData.fileName,
                type: newData.fileType,
                data: RNFetchBlob.wrap(newData.picture),
              }
            : {},
          {name: 'name', data: newData.name},
          {name: 'year', data: newData.year},
          {name: 'cost', data: newData.cost},
          {name: 'qty', data: newData.qty.toString()},
          {name: 'type', data: newData.type.toString()},
          {name: 'seat', data: newData.seat},
          {name: 'category_id', data: newData.category_id.toString()},
          {name: 'location', data: newData.location},
        ],
      );
      dispatch({
        type: 'CLEAR_VEHICLES',
      });
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

export const searchVehicles = (dataSearch, replace = true) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'VEHICLES_CLEAR',
      });
      if (!dataSearch.page) {
        dataSearch.page = 1;
      }
      const url = `/popular?name=${dataSearch.name}&location=${dataSearch.location}&page=${dataSearch.page}`;
      const {data} = await http().get(url);
      dispatch({
        type: 'VEHICLE_SEARCH',
        payload: data,
        replace,
      });
    } catch (e) {
      dispatch({
        type: 'VEHICLES_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};
