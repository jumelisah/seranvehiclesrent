import React, {useEffect} from 'react';
import {
  Box,
  Center,
  Image,
  NativeBaseProvider,
  ScrollView,
  Text,
  View,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import ImageDefault from '../assets/photo-camera.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getProfile, onLogout} from '../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box py={5} shadow={2}>
          <Center position={'relative'} mx="auto">
            <Image
              source={{uri: auth.userData.image} || ImageDefault}
              size="md"
              resizeMode="cover"
              alt={'default'}
              borderRadius={100}
            />
            <View position="absolute" right={0} bottom={0}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}>
                <View backgroundColor="#9AD0EC" p={2} borderRadius="full">
                  <Icon name="pencil" size={20} />
                </View>
              </TouchableOpacity>
            </View>
          </Center>
          <Center>
            <Text fontSize={'md'}>
              {auth.userData.name || auth.userData.username || 'No name'}
            </Text>
            <Text fontSize={'md'}>{auth.userData.email}</Text>
            <Text fontSize={'md'}>
              {auth.userData.phone_number || 'Add your phone number'}
            </Text>
          </Center>
        </Box>
        <Box m={4}>
          <TouchableOpacity>
            <View flexDirection={'row'} justifyContent={'space-between'} my={4}>
              <Text fontSize={'xl'} fontWeight={'bold'}>
                Your Favorites
              </Text>
              <Text fontSize={'xl'}>
                <Icon name="chevron-right" size={20} />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View flexDirection={'row'} justifyContent={'space-between'} my={4}>
              <Text fontSize={'xl'} fontWeight={'bold'}>
                FAQ
              </Text>
              <Text fontSize={'xl'}>
                <Icon name="chevron-right" size={20} />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View flexDirection={'row'} justifyContent={'space-between'} my={4}>
              <Text fontSize={'xl'} fontWeight={'bold'}>
                Help
              </Text>
              <Text fontSize={'xl'}>
                <Icon name="chevron-right" size={20} />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
            <View flexDirection={'row'} justifyContent={'space-between'} my={4}>
              <Text fontSize={'xl'} fontWeight={'bold'}>
                Update Password
              </Text>
              <Text fontSize={'xl'}>
                <Icon name="chevron-right" size={20} />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(onLogout())}>
            <View my={4}>
              <Text fontSize={'xl'} fontWeight={'bold'}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Profile;
