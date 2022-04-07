import React from 'react';
import {NativeBaseProvider, Text, View} from 'native-base';

const Chat = () => {
  return (
    <NativeBaseProvider>
      <View>
        <Text>Halo</Text>
      </View>
    </NativeBaseProvider>
  );
};

export default Chat;
