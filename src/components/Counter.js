import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useState} from 'react/cjs/react.development';

const Counter = ({num}) => {
  const [sum, setSum] = useState(num);
  const addNum = () => {
    return setSum(sum + 1);
  };
  const minusNum = () => {
    if (sum > 1) {
      return setSum(sum - 1);
    }
  };
  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.btnClick} onPress={minusNum}>
        <Text style={styles.boldText}>-</Text>
      </TouchableOpacity>
      <Text style={[styles.boldText, styles.space]}>{sum}</Text>
      <TouchableOpacity style={styles.btnClick} onPress={addNum}>
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
