import qs from 'qs';
import RNFetchBlob from 'rn-fetch-blob';
import http from '../../helpers/http';

export const onLogin = (username, password) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'PAGES_LOADING',
      });
      dispatch({
        type: 'AUTH_CLEAR',
      });
      const dataLogin = {username, password};
      const {data} = await http().post('/auth/login', qs.stringify(dataLogin));
      dispatch({
        type: 'AUTH_LOGIN',
        payload: data.result.token,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'PAGES_LOADING',
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

export const forgotPassword = dataForgot => {
  return async dispatch => {
    try {
      dispatch({
        type: 'PAGES_LOADING',
      });
      dispatch({
        type: 'AUTH_CLEAR',
      });
      console.log(dataForgot);
      const {data} = await http().post(
        '/auth/forgot-password',
        qs.stringify(dataForgot),
      );
      console.log(data);
      dispatch({
        type: 'AUTH_FORGOT_PASSWORD',
        payload: data,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'PAGES_LOADING',
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
      dispatch({
        type: 'PAGES_LOADING',
      });
      console.log(userData);
      const {data} = await RNFetchBlob.fetch(
        'PATCH',
        'https://fw5-backend-beginner.herokuapp.com/users',
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'image',
            filename: userData.fileName,
            type: userData.fileType,
            data: RNFetchBlob.wrap(userData.picture),
          },
        ],
      );
      console.log(data);
      dispatch({
        type: 'AUTH_CHANGE_PROFILE',
        payload: data.result,
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: 'AUTH_ERROR',
        payload: e,
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
