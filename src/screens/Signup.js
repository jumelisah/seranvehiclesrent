import React, {useState} from 'react';
import {Image, NativeBaseProvider, Text, View} from 'native-base';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import {onRegister} from '../redux/actions/auth';
import TextInput from '../components/TextInput';
import InputPassword from '../components/InputPassword';

const Signup = ({navigation}) => {
  const {auth, pages} = useSelector(state => state);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const register = () => {
    const data = {username, email, password, confirmPassword: password};
    // if (username === null || email === null || password === null) {
    //   setErrRegister(true);
    //   setRegisterMsg('Please fill in all the fields');
    // }
    dispatch(onRegister(data));
    // setTimeout(() => {
    //   if (!auth.isError) {
    //     navigation.navigate('ConfirmAccount');
    //   }
    // }, 5000);
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <ImageBackground
          source={require('../assets/bgSignup.png')}
          resizeMode="cover"
          style={styles.pageBackground}>
          <ScrollView>
            <View p={5} mt={5}>
              <View height={200}>
                <Text
                  fontWeight={'bold'}
                  fontSize={'3xl'}
                  color={'white'}
                  mb={5}
                  pb={5}>
                  LET’S HAVE SOME RIDE
                </Text>
              </View>
              {!pages.isLoading && auth.isError && (
                <View backgroundColor={'rose.100'} p={5}>
                  <Text color={'rose.600'}>{auth.errMsg}</Text>
                </View>
              )}
              {!auth.isError && auth.message && (
                <View backgroundColor={'success.100'} p={5}>
                  <Text color={'success.600'}>{auth.message}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Account Confirmation')}>
                    <Text color={'success.600'} underline>
                      Click here to confirm your account
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <View mt={5} pt={5}>
                <TextInput
                  value={username}
                  placeholder={'Username'}
                  onChangeText={text => setUsername(text)}
                />
                <TextInput
                  value={email}
                  placeholder={'Email'}
                  onChangeText={text => setEmail(text)}
                  keyboardType={'email-address'}
                />
                <InputPassword
                  // value={password}
                  placeholder={'Password'}
                  onChangeText={text => setPassword(text)}
                />
              </View>
              <Button variant={'dark'} onPress={register}>
                Signup
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
                    Signup with Google
                  </Text>
                </View>
              </Button>
              <View flexDirection={'row'}>
                <Text fontSize={'md'} color={'white'}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text fontSize={'md'} pl={2} color={'white'} underline>
                    Login now
                  </Text>
                </TouchableOpacity>
              </View>
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
                  // style={styles.lottie}
                />
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </NativeBaseProvider>
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
  textWhite: {
    color: 'white',
  },
  formInput: {
    marginTop: 150,
  },
  link: {
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 16,
    height: 16,
    paddingRight: 20,
  },
});

export default Signup;
