import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useState} from 'react/cjs/react.development';

const Counter = ({num, onPlus, onMinus}) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.btnClick} onPress={onMinus}>
        <Text style={styles.boldText}>-</Text>
      </TouchableOpacity>
      <Text style={[styles.boldText, styles.space]}>{num}</Text>
      <TouchableOpacity style={styles.btnClick} onPress={onPlus}>
        <Text style={styles.boldText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
  },
  btnClick: {
    backgroundColor: '#9AD0EC',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginLeft: 20,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  space: {
    marginLeft: 20,
  },
});

export default Counter;
