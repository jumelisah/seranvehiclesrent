import React from 'react';
import {Input, Text} from 'native-base';

const TextInput = ({
  type,
  onChangeText,
  placeholder,
  value,
  icon,
  iconLeft,
  keyboardType,
  variant,
}) => {
  return (
    <Input
      type={type}
      InputLeftElement={iconLeft}
      InputRightElement={icon}
      size={'md'}
      p={4}
      placeholder={placeholder}
      value={value}
      backgroundColor={
        variant === 'transparent' ? 'warmGray.100' : 'rgb(154, 208, 236)'
      }
      borderColor={variant === 'transparent' ? 'black' : 'rgb(154, 208, 236)'}
      color={'black'}
      placeholderTextColor={'black'}
      my={2}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
};

export default TextInput;
