import qs from 'qs';
import RNFetchBlob from 'rn-fetch-blob';
import http from '../../helpers/http';
import {BACKEND_URL} from '@env';
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
      dispatch({
        type: 'AUTH_CLEAR',
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
      const {data} = await http().post('/users', qs.stringify(dataRegister));
      dispatch({
        type: 'AUTH_REGISTER',
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

export const accountConfirmation = confirmData => {
  return async dispatch => {
    try {
      dispatch({
        type: 'AUTH_CLEAR',
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
      const {data} = await http().post(
        '/auth/account-confirmation',
        qs.stringify(confirmData),
      );
      dispatch({
        type: 'AUTH_CONFIRM_ACCOUNT',
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
      dispatch({
        type: 'AUTH_CLEAR',
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
      const {data} = await http(token).get('/profile');
      dispatch({
        type: 'AUTH_GET_PROFILE',
        payload: data.result,
      });
      dispatch({
        type: 'PAGES_LOADING',
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
      const profileData = [];
      for (let x in userData) {
        if (x !== 'picture' && x !== 'fileName' && x !== 'fileType') {
          profileData.push({name: x, data: String(userData[x])});
        }
      }
      if (userData.picture !== undefined) {
        profileData.push({
          name: 'image',
          filename: userData.fileName,
          type: userData.fileType,
          data: RNFetchBlob.wrap(userData.picture),
        });
      }
      const {data} = await RNFetchBlob.fetch(
        'PATCH',
        `${BACKEND_URL}/profile`,
        {
          Accept: 'application/json, text/plain, */*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        profileData,
      );
      dispatch({
        type: 'AUTH_CHANGE_PROFILE',
        payload: JSON.parse(data),
      });
      dispatch({
        type: 'PAGES_LOADING',
      });
    } catch (e) {
      console.log(e);
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

export const changePassword = (token, dataPassword) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'AUTH_CLEAR',
      });
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
