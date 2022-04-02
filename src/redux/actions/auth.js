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
      console.log(dataRegister);
      const {data} = await http().post('/users', qs.stringify(dataRegister));
      console.log(data);
      dispatch({
        type: 'AUTH_REGISTER',
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response.message,
      });
    }
  };
};

export const AccountConfirmation = confirmData => {
  return async dispatch => {
    try {
      const {data} = await http().post(
        '/auth/account-confirmation',
        qs.stringify(confirmData),
      );
      console.log(data);
      dispatch({
        type: 'AUTH_CONFIRM_ACCOUNT',
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response.message,
      });
    }
  };
};
