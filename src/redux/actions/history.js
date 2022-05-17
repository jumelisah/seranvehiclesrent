import http from '../../helpers/http';

export const getHistoryUser = token => {
  return async dispatch => {
    try {
      dispatch({
        type: 'PAGES_LOADING',
      });
      const {data} = await http(token).get('/histories/user');
      dispatch({
        type: 'GET_HISTORY',
        payload: data.result[0],
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'HISTORY_ERROR',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    }
  };
};

export const getHistoryAdmin = token => {
  return async dispatch => {
    try {
      dispatch({
        type: 'PAGES_LOADING',
      });
      const {data} = await http(token).get('/histories');
      dispatch({
        type: 'GET_HISTORY',
        payload: data.result,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'HISTORY_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const getHistoryDetail = (token, id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'PAGES_LOADING',
      });
      const {data} = await http(token).get(`/histories/${id}`);
      dispatch({
        type: 'GET_HISTORY_DETAIL',
        payload: data,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'HISTORY_ERROR',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    }
  };
};

export const deleteHistoryUser = (token, id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'REMOVE_HISTORY',
      });
      dispatch({
        type: 'HISTORY_CLEAR',
      });
      const {data} = await http(token).patch(`/histories/delete/user/${id}`);
      dispatch({
        type: 'DELETE_HISTORY_USER',
        payload: data.message,
      });
    } catch (e) {
      dispatch({
        type: 'HISTORY_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const deleteHistoryAdmin = (token, id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'REMOVE_HISTORY',
      });
      dispatch({
        type: 'HISTORY_CLEAR',
      });
      const {data} = await http(token).patch(`/histories/delete/${id}`);
      dispatch({
        type: 'DELETE_HISTORY_USER',
        payload: data.message,
      });
    } catch (e) {
      dispatch({
        type: 'HISTORY_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};
