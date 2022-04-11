import {combineReducers} from 'redux';
import auth from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import persistReducer from 'redux-persist/es/persistReducer';
import {persistReducer} from 'redux-persist';
import vehicles from './vehicles';
import pages from './pages';
import history from './history';
import transactions from './transactions';
import favorites from './favorites';

const persisAuth = {
  key: 'auth',
  storage: AsyncStorage,
};

const persisFav = {
  key: 'favorites',
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  auth: persistReducer(persisAuth, auth),
  vehicles,
  pages,
  history,
  transactions,
  favorites: persistReducer(persisFav, favorites),
});

export default rootReducers;
