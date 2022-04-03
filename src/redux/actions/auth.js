import qs from 'qs';
import http from '../../helpers/http';

export const onLogin = (username, password) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'AUTH_CLEAR',
      });
      const dataLogin = {username, password};
      const {data} = await http().post('/auth/login', qs.stringify(dataLogin));
      dispatch({
        type: 'AUTH_LOGIN',
        payload: data.result.token,
      });
    } catch {
      dispatch({
        type: 'AUTH_ERROR',
        payload: 'Wrong password',
      });
    }
  };
};

export const onLogout = () => {
  return async dispatch => {
    try {
      dispatch({type: 'AUTH_LOGOUT'});
    } catch {
      dispatch({
        type: 'AUTH_ERROR',
        payload: 'Failed to logout',
      });
    }
  };
};

export const onRegister = dataRegister => {
  return async dispatch => {
    try {
      const {data} = await http().post('/users', qs.stringify(dataRegister));
      dispatch({
        type: 'AUTH_REGISTER',
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const accountConfirmation = confirmData => {
  return async dispatch => {
    try {
      const {data} = await http().post(
        '/auth/account-confirmation',
        qs.stringify(confirmData),
      );
      dispatch({
        type: 'AUTH_CONFIRM_ACCOUNT',
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const getProfile = token => {
  return async dispatch => {
    try {
      const {data} = await http(token).get('/profile');
      dispatch({
        type: 'AUTH_GET_PROFILE',
        payload: data.result,
      });
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const editProfile = (token, userData) => {
  return async dispatch => {
    try {
      const {data} = await http(token).patch('/users', qs.stringify(userData));
      dispatch({
        type: 'AUTH_CHANGE_PROFILE',
        payload: data.result,
      });
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const changePassword = (token, dataPassword) => {
  return async dispatch => {
    try {
      const {data} = await http(token).patch(
        '/auth/change-password',
        qs.stringify(dataPassword),
      );
      console.log(data)
      dispatch({
        type: 'AUTH_CHANGE_PASSWORD',
        payload: data.message,
      });
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};
