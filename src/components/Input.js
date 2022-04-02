import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Input = ({
  onChangeText,
  placeholder,
  keyboardType,
  value,
  secureTextEntry,
  variant,
  searchBar,
  type,
  name,
}) => {
  return (
    <TextInput
      style={[
        type === 'line' ? styles.lineInput : styles.input,
        variant === 'blue'
          ? styles.blue
          : variant === 'pink'
          ? styles.pink
          : variant === 'transparent'
          ? styles.white
          : '',
        searchBar ? styles.search : '',
      ]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      name={name}
    />
  );
};

const styles = StyleSheet.create({
  lineInput: {
    paddingBottom: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(255,255,255,0)',
  },
  input: {
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
  },
  search: {
    paddingHorizontal: 50,
  },
  blue: {
    backgroundColor: 'rgba(154, 208, 236, 0.3)',
    color: 'black',
  },
  pink: {
    backgroundColor: 'rgba(227, 190, 198, 0.9)',
    color: 'white',
  },
  white: {
    backgroundColor: 'rgba(255,255,255,0)',
    color: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default Input;
