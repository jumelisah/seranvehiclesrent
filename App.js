// import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Main from './src/screens/Main';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import reduxStore from './src/redux/store';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const {store, persistor} = reduxStore();
PushNotification.createChannel({
  channelId: 'payment',
  channelName: 'Payment Notification',
});
const App = () => {
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log(token);
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
