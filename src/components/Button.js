import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Button = ({children, variant, onPress, textUnactive}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.parent,
          variant === 'blue'
            ? styles.blue
            : variant === 'dark'
            ? styles.dark
            : styles.white,
        ]}>
        <Text
          style={[
            styles.text,
            textUnactive === 'Unactive' ? styles.textUnactive : '',
            variant === 'dark' ? styles.textWhite : '',
          ]}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#9AD0EC',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  blue: {
    backgroundColor: '#9AD0EC',
  },
  dark: {
    backgroundColor: '#1572A1',
  },
  textWhite: {
    color: 'white',
  },
  white: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textUnactive: {
    color: 'rgba(0,0,0,0.1)',
  },
});
