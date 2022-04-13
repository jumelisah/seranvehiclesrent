import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {Image, NativeBaseProvider, ScrollView, Text, View} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {onLogin} from '../redux/actions/auth';
import TextInput from '../components/TextInput';

const Login = ({navigation, route: {params}}) => {
  const {auth} = useSelector(state => state);
  const {pages} = useSelector(state => state);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState(params?.message || null);
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    dispatch({
      type: 'AUTH_CLEAR',
    });
  }, [dispatch]);
  const doLogin = async () => {
    setMessage(null);
    dispatch(onLogin(username, password));
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <ImageBackground
          source={require('../assets/bgLogin.png')}
          resizeMode="cover"
          style={styles.pageBackground}>
          <View position={'relative'} width={'100%'} height={'100%'}>
            <ScrollView>
              <View my={5}>
                <Text
                  fontSize={'3xl'}
                  fontWeight={'bold'}
                  color={'white'}
                  p={5}
                  my={5}>
                  LET'S EXPLORE THE WORLD
                </Text>
                <View p={5} mt={5}>
                  {auth?.isError && (
                    <View bg={'rose.100'} rounded={'md'} p={5}>
                      <Text fontSize={'md'} color={'danger.600'}>
                        {auth.errMsg}
                      </Text>
                    </View>
                  )}
                  {params?.message && (
                    <View bg={'success.100'} rounded={'md'} p={5}>
                      <Text fontSize={'md'} color={'success.700'}>
                        {params?.message}
                      </Text>
                    </View>
                  )}
                  <TextInput
                    placeholder={'Username or email'}
                    onChangeText={text => setUsername(text)}
                    value={username}
                  />
                  <TextInput
                    type={showPassword ? 'text' : 'password'}
                    icon={
                      <Text pt={3} px={3}>
                        <Icon
                          name={showPassword ? 'eye' : 'eye-slash'}
                          size={30}
                          color={'black'}
                          onPress={() => setShowPassword(!showPassword)}
                        />
                      </Text>
                    }
                    placeholder={'Password'}
                    onChangeText={text => setPassword(text)}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPassword')}>
                    <Text fontSize={'sm'} color={'white'} underline py={3}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                  <Button variant={'dark'} onPress={doLogin}>
                    Login
                  </Button>
                  <Button>
                    <View
                      flexDirection={'row'}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Image
                        source={require('../assets/googleIcon.png')}
                        width={18}
                        height={18}
                        alt={'login with google'}
                      />
                      <Text fontSize={20} fontWeight={'bold'} px={3}>
                        Login with Google
                      </Text>
                    </View>
                  </Button>
                  <View flexDirection={'row'}>
                    <Text color={'white'} fontSize={'md'}>
                      Don’t have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Signup')}>
                      <Text underline color={'white'} fontSize={'md'} px={2}>
                        Signup now
                      </Text>
                    </TouchableOpacity>
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
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  pageBackground: {
    height: '100%',
  },
  lottie: {
    width: 200,
  },
});

export default Login;
