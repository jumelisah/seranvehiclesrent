import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Input = ({
  onChangeText,
  placeholder,
  keyboardType,
  value,
  secureTextEntry,
}) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(227, 190, 198, 0.9)',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    color: 'white',
  },
});

export default Input;
