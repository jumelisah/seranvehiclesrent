import React from 'react';
import {TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react/cjs/react.development';
import Button from '../components/Button';
import {NativeBaseProvider, Stack, View, Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {changePassword} from '../redux/actions/auth';
import InputPassword from '../components/InputPassword';
import LottieView from 'lottie-react-native';

const EditProfile = ({navigation}) => {
  const {auth, pages} = useSelector(state => state);
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [wrongInput, setWrongInput] = useState();
  const [showModal, setShowModal] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const dispatch = useDispatch();
  const handleChangePassword = () => {
    setWrongInput();
    if (!password) {
      setWrongInput('Please input the password');
    } else if (!newPassword || newPassword.length < 6) {
      setWrongInput('Please input password with 6 characters or more');
    } else {
      setWrongInput();
    }
    const data = {password, newPassword, repeatPassword};
    dispatch(changePassword(auth.token, data));
    setShowModal(true);
  };
  return (
    <NativeBaseProvider>
      <Stack position={'relative'} style={{height: '100%'}}>
        <View flexDirection={'row'} p={5}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={30} />
          </TouchableOpacity>
          <Text fontSize={'xl'} fontWeight={'bold'} px={3}>
            Change Password
          </Text>
          <TouchableOpacity
            style={styles.positionEnd}
            onPress={() => navigation.goBack()}>
            <Text fontSize={'xl'} fontWeight={'bold'} color={'gray.400'}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View p={5}>
            <Text py={2}>Current password</Text>
            <InputPassword
              setVariant={'transparent'}
              placeholder={'Input your current password'}
              onChangeText={text => setPassword(text)}
            />
            <Text py={2}>New password</Text>
            <InputPassword
              setVariant={'transparent'}
              placeholder={'Input new password'}
              onChangeText={text => setNewPassword(text)}
            />
            <Text py={2}>Repeat password</Text>
            <InputPassword
              setVariant={'transparent'}
              placeholder={'Repeat new password'}
              onChangeText={text => setRepeatPassword(text)}
            />
            <View>
              <Button variant={'blue'} onPress={handleChangePassword}>
                Save Change
              </Button>
            </View>
          </View>
        </ScrollView>
        {showModal && (
          <View
            position={'absolute'}
            height={'100%'}
            width={'100%'}
            backgroundColor={'rgba(0,0,0,0.2)'}
            justifyContent={'center'}
            alignItems={'center'}>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <View
                backgroundColor={'white'}
                width={300}
                height={200}
                alignItems={'center'}
                justifyContent={'center'}
                px={3}>
                <Text color={auth.isError ? 'red.700' : 'success.500'} pt={6}>
                  <Icon
                    name={`${
                      auth.isError ? 'times-circle-o' : 'check-circle-o'
                    }`}
                    size={50}
                  />
                </Text>
                <Text textAlign={'center'} fontSize={'xl'}>
                  {wrongInput
                    ? wrongInput
                    : auth.isError
                    ? auth.errMsg
                    : auth.message
                    ? auth.message
                    : ''}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Stack>
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
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  positionEnd: {
    marginStart: 'auto',
  },
  lottie: {
    width: 200,
  },
});

export default EditProfile;
