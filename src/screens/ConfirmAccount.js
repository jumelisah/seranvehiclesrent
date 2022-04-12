import {Center, NativeBaseProvider, Text, View, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import {accountConfirmation} from '../redux/actions/auth';
import LottieView from 'lottie-react-native';
import TextInput from '../components/TextInput';

const ConfirmAccount = ({navigation, route: {params}}) => {
  const {auth, pages} = useSelector(state => state);
  const [code, setCode] = useState();
  const [email, setEmail] = useState(params?.email || '');
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.message) {
      navigation.navigate('Login', {username: email, message: auth.message});
    }
    dispatch({
      type: 'AUTH_CLEAR',
    });
  }, [dispatch, navigation, email, auth.message]);
  const confirmAccount = () => {
    const data = {email, code};
    dispatch(accountConfirmation(data));
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <ImageBackground
          source={require('../assets/bgSignup.png')}
          resizeMode="cover"
          style={styles.pageBackground}>
          <ScrollView>
            <View p={5}>
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
              {!auth.isError && params.message && (
                <View backgroundColor={'success.100'} p={5}>
                  <Text color={'success.600'}>{params.message}</Text>
                </View>
              )}
              <View mt={5} pt={5}>
                <TextInput
                  value={email}
                  placeholder={'Email'}
                  onChangeText={text => setEmail(text)}
                  keyboardType={'email-address'}
                />
                <TextInput
                  value={code}
                  placeholder={'Code confirmation'}
                  onChangeText={text => setCode(text)}
                  keyboardType={'numeric'}
                />
              </View>
              <Button variant={'dark'} onPress={confirmAccount}>
                Confirm Your Email
              </Button>
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
            {/* <View style={styles.fullPage}>
              <Text style={styles.textHeader}>LET’S HAVE SOME RIDE</Text>
              <View style={styles.formInput}>
                <VStack space={4} style={styles.formInput}>
                  {auth.isError && (
                    <Center h={39} bg={'rose.100'} rounded={'md'}>
                      <Text fontSize={'md'} color={'danger.700'}>
                        {auth.errMsg}
                      </Text>
                    </Center>
                  )}
                </VStack>
                <Input
                  placeholder={'Email'}
                  variant={'pink'}
                  onChangeText={setEmail}
                />
                <Input
                  placeholder={'Confirmation Code'}
                  variant={'pink'}
                  onChangeText={setCode}
                />
                <Button variant={'blue'} onPress={() => confirmAccount()}>confirm Account</Button>
                <Button>
                  <Image
                    source={require('../assets/googleIcon.png')}
                    style={styles.logo}
                  />
                  Signup with Google
                </Button>
              </View>
              <View>
                <Text style={styles.textWhite}>
                  Already have an account?
                  <Text
                    style={styles.link}
                    onPress={() => navigation.navigate('Login')}>
                    Login now
                  </Text>
                </Text>
              </View>
            </View> */}
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

export default ConfirmAccount;
