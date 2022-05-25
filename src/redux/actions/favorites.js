import http from '../../helpers/http';
import qs from 'qs';

export const removeFavorite = (token, dataReservation) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'PAGES_LOADING',
      });
      dispatch({
        type: 'TRANSACTION_CLEAR',
      });
      const {data} = await http(token).post(
        '/histories',
        qs.stringify(dataReservation),
      );
      dispatch({
        type: 'CREATE_TRANSACTION',
        payload: data.result,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    }
  };
};
