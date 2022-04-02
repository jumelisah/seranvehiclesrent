import {applyMiddleware, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

export default () => {
  const store = createStore(rootReducers, applyMiddleware(logger, thunk));
  const persistor = persistStore(store);
  return {store, persistor};
};
