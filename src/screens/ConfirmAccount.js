import {Center, NativeBaseProvider, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import {accountConfirmation} from '../redux/actions/auth';

const ConfirmAccount = ({navigation}) => {
  const {auth} = useSelector(state => state);
  const [code, setCode] = useState();
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const confirmAccount = () => {
    const data = {email, code};
    dispatch(accountConfirmation(data));
  }
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <ImageBackground
          source={require('../assets/bgSignup.png')}
          resizeMode="cover"
          style={styles.pageBackground}>
          <ScrollView>
            <View style={styles.fullPage}>
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
            </View>
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
