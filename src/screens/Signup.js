import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

const Signup = ({navigation}) => {
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/bgSignup.png')}
        resizeMode="cover"
        style={styles.pageBackground}>
        <ScrollView>
          <View style={styles.fullPage}>
            <Text style={styles.textHeader}>LET’S HAVE SOME RIDE</Text>
            <View style={styles.formInput}>
              <Input placeholder={'Username'} />
              <Input placeholder={'Mobile phone'} />
              <Input placeholder={'Password'} secureTextEntry={true} />
              <Button variant={'blue'}>Signup</Button>
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

export default Signup;
