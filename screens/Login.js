import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

const Login = ({navigation}) => {
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/bgLogin.png')}
        resizeMode="cover"
        style={styles.pageBackground}>
        <ScrollView>
          <View style={styles.fullPage}>
            <Text style={styles.textHeader}>LET’S EXPLORE THE WORLD</Text>
            <View style={styles.formInput}>
              <Input placeholder={'Username'} />
              <Input placeholder={'Password'} secureTextEntry={true} />
              <TouchableOpacity
                onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={styles.link}>Forgot password?</Text>
              </TouchableOpacity>
              <Button variant={'blue'}>Login</Button>
              <Button>
                <Image
                  source={require('../assets/googleIcon.png')}
                  style={styles.logo}
                />
                Login with Google
              </Button>
            </View>
            <View>
              <Text style={styles.textWhite}>
                Don’t have account?
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate('Signup')}>
                  Sign up now
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
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
    marginTop: 200,
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

export default Login;
