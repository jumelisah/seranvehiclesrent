import React from 'react';
import {NativeBaseProvider, Text, View} from 'native-base';

const Chat = () => {
  return (
    <NativeBaseProvider>
      <View p={5}>
        <View borderBottomWidth={1} borderBottomColor={'warmGray.600'} py={5}>
          <Text fontWeight={'bold'} fontSize={'md'}>
            User 1
          </Text>
          <Text fontSize={'md'}>How many vespa left?</Text>
          <View position={'absolute'} right={0}>
            <Text color={'warmGray.400'} py={5}>
              2 hours ago
            </Text>
          </View>
        </View>
        <View borderBottomWidth={1} borderBottomColor={'warmGray.600'} py={5}>
          <Text fontWeight={'bold'} fontSize={'md'}>
            User 1
          </Text>
          <Text fontSize={'md'}>Okay, thank you for the good service</Text>
          <View position={'absolute'} right={0}>
            <Text color={'warmGray.400'} py={5}>
              Yesterday
            </Text>
          </View>
        </View>
        <View borderBottomWidth={1} borderBottomColor={'warmGray.600'} py={5}>
          <Text fontWeight={'bold'} fontSize={'md'}>
            User 1
          </Text>
          <Text fontSize={'md'}>Okay, thank you for the good service</Text>
          <View position={'absolute'} right={0}>
            <Text color={'warmGray.400'} py={5}>
              Yesterday
            </Text>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default Chat;
