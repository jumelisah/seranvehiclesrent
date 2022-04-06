import React, {useEffect, useState} from 'react';
// import {View, Text, StyleSheet, ImageBackground} from 'react-native';
// import Button from '../components/Button';
// import Input from '../components/Input';
import {ImageBackground, StyleSheet} from 'react-native';
import {NativeBaseProvider, ScrollView, Text, View} from 'native-base';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {forgotPassword} from '../redux/actions/auth';
import InputPassword from '../components/InputPassword';

const ForgotPassword = ({navigation}) => {
  const {auth} = useSelector(state => state);
  const {pages} = useSelector(state => state);
  const [username, setUsername] = useState();
  const [inputError, setInputError] = useState(false);
  const [confirmCode, setConfirmCode] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.message === 'Password was changed') {
      navigation.navigate('Login', {message: auth.message, username});
    }
  });
  useEffect(() => {
    dispatch({
      type: 'AUTH_CLEAR',
    });
  }, [dispatch]);
  const handleForgotPassword = () => {
    setInputError(false);
    if (!username) {
      setInputError(true);
    } else {
      dispatch(forgotPassword({username}));
    }
  };
  const handleResetPassword = async () => {
    const redirect = () => {
      if (!pages.isLoading && !auth.isError) {
        navigation.navigate('Login');
      }
    };
    setInputError(false);
    if (!confirmCode || !password || !confirmPassword) {
      setInputError(true);
    } else {
      dispatch(
        forgotPassword({username, confirmCode, password, confirmPassword}),
      );
    }
    await redirect();
  };
  return (
    // <View>
    //   <ImageBackground
    //     source={require('../assets/bgResetPassword.png')}
    //     resizeMode="cover"
    //     style={styles.pageBackground}>
    //     <View style={styles.fullPage}>
    //       <Text style={styles.textHeader}>LET’S EXPLORE THE WORLD</Text>
    //       <View style={styles.formInput}>
    //         <Text style={styles.textWhite}>
    //           Enter your email to get reset password confirmcode
    //         </Text>
    //         <Input placeholder={'Enter your email adress'} variant={'pink'} />
    //         <Button variant={'blue'}>Send confirmCode</Button>
    //         <Button>Resend confirmCode</Button>
    //       </View>
    //     </View>
    //   </ImageBackground>
    // </View>
    <NativeBaseProvider>
      <ImageBackground
        source={require('../assets/bgResetPassword.png')}
        resizeMode="cover"
        style={styles.pageBackground}>
        <View
          position={'relative'}
          width={'100%'}
          height={'100%'}
          justifyContent={'center'}
          alignItems={'center'}>
          <ScrollView>
            <View my={5} style={styles.largeSpace}>
              <Text
                fontSize={'3xl'}
                fontWeight={'bold'}
                color={'white'}
                p={5}
                my={5}>
                LET'S EXPLORE THE WORLD
              </Text>
              <View>
                <View p={5} mt={5}>
                  {auth?.isError && (
                    <View bg={'rose.100'} rounded={'md'} p={5}>
                      <Text fontSize={'md'} color={'danger.600'}>
                        {auth.errMsg}
                      </Text>
                    </View>
                  )}
                  {inputError && (
                    <View bg={'rose.100'} rounded={'md'} p={5}>
                      <Text fontSize={'md'} color={'danger.600'}>
                        Please input your email
                      </Text>
                    </View>
                  )}
                  {auth.message && (
                    <View bg={'success.100'} rounded={'md'} p={5}>
                      <Text fontSize={'md'} color={'success.700'}>
                        {auth.message}
                      </Text>
                    </View>
                  )}
                  {!auth.message && (
                    <View>
                      <TextInput
                        placeholder={
                          'Enter your email to get reset password code'
                        }
                        onChangeText={text => setUsername(text)}
                        keyboardType={'email-address'}
                      />
                      <Button variant={'dark'} onPress={handleForgotPassword}>
                        Submit
                      </Button>
                    </View>
                  )}
                  {auth.message && (
                    <View>
                      <TextInput
                        placeholder={'Enter confirmation code'}
                        onChangeText={text => setConfirmCode(text)}
                        keyboardType={'numeric'}
                      />
                      <InputPassword
                        placeholder={'Input new password'}
                        onChangeText={text => setPassword(text)}
                      />
                      <InputPassword
                        placeholder={'Repeat new password'}
                        onChangeText={text => setConfirmPassword(text)}
                      />
                      <Button variant={'dark'} onPress={handleResetPassword}>
                        Reset Password
                      </Button>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        {pages.isLoading && (
          <View
            position={'absolute'}
            width={'100%'}
            height={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            backgroundColor={'rgba(0,0,0,0.3)'}>
            <LottieView
              source={require('../assets/98196-loading-teal-dots.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        )}
      </ImageBackground>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  pageBackground: {
    height: '100%',
  },
  largeSpace: {
    marginTop: 100,
  },
});

export default ForgotPassword;
