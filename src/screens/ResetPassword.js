import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

const ForgotPassword = () => {
  return (
    <View>
      <ImageBackground
        source={require('../assets/bgResetPassword.png')}
        resizeMode="cover"
        style={styles.pageBackground}>
        <View style={styles.fullPage}>
          <Text style={styles.textHeader}>LET’S EXPLORE THE WORLD</Text>
          <View style={styles.formInput}>
            <Text style={styles.textWhite}>
              Enter your email to get reset password code
            </Text>
            <Input placeholder={'Enter your email adress'} variant={'pink'} />
            <Button variant={'blue'}>Send Code</Button>
            <Button>Resend Code</Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  fullPage: {
    display: 'flex',
    height: '100%',
    maxWidth: 400,
    justifyContent: 'center',
    padding: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  pageBackground: {
    height: '100%',
  },
  textHeader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  btn: {
    backgroundColor: 'red',
  },
  input: {
    backgroundColor: 'rgba(227, 190, 198, 0.8)',
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
  formInput: {
    marginTop: 200,
  },
  link: {
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 20,
    marginBottom: 20,
  },
  textWhite: {
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ForgotPassword;
