import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Button = ({children, variant}) => {
  return (
    <TouchableOpacity>
      <View style={variant === 'blue' ? styles.parent : styles.white}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#9AD0EC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  white: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
