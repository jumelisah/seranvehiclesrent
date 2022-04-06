import React from 'react';
import {StyleSheet} from 'react-native';
import {NativeBaseProvider, View} from 'native-base';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <NativeBaseProvider>
      <View
        position={'absolute'}
        width={'100%'}
        height={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        backgroundColor={'rgba(0,0,0,0.5)'}>
        <LottieView
          source={require('../assets/98196-loading-teal-dots.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 200,
  },
});

export default Loading;
