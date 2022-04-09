import React, {useState} from 'react';
import {Text} from 'native-base';
import TextInput from './TextInput';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputPassword = ({placeholder, onChangeText, setVariant}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextInput
      type={showPassword ? 'text' : 'password'}
      icon={
        <Text pY={'auto'} px={3}>
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color={'black'}
            onPress={() => setShowPassword(!showPassword)}
          />
        </Text>
      }
      placeholder={placeholder}
      onChangeText={onChangeText}
      variant={setVariant}
    />
  );
};

export default InputPassword;
