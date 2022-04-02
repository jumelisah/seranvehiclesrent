import {combineReducers} from 'redux';
import auth from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import persistReducer from 'redux-persist/es/persistReducer';
import {persistReducer} from 'redux-persist';

const persisAuth = {
  key: 'auth',
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  auth: persistReducer(persisAuth, auth),
});

export default rootReducers;
