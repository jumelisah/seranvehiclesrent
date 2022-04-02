// import {View, Text} from 'react-native';
import React from 'react';
import Main from './src/screens/Main';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import reduxStore from './src/redux/store';

const {store, persistor} = reduxStore();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      {/* <> */}
        <Main />
        {/* </> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
