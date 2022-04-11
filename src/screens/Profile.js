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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useDispatch, useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  const {auth, pages} = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile(auth.token));
  }, [dispatch, auth.token]);
  return (
    <NativeBaseProvider>
      <ScrollView>
        {!pages.isLoading && (
          <View>
            <Box py={5} shadow={2}>
              <Center position={'relative'} mx="auto">
                <Image
                  source={{uri: auth.userData?.image} || ImageDefault}
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
                  {auth.userData?.name || auth.userData?.username || 'No name'}
                </Text>
                <Text fontSize={'md'}>{auth.userData?.email}</Text>
                <Text fontSize={'md'}>
                  {auth.userData?.phone_number || 'Add your phone number'}
                </Text>
              </Center>
            </Box>
            <Box m={4}>
              <TouchableOpacity onPress={() => navigation.navigate('My Favorites')}>
                <View
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  my={4}>
                  <Text fontSize={'xl'} fontWeight={'bold'}>
                    Your Favorites
                  </Text>
                  <Text fontSize={'xl'}>
                    <Icon name="chevron-right" size={20} />
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  my={4}>
                  <Text fontSize={'xl'} fontWeight={'bold'}>
                    FAQ
                  </Text>
                  <Text fontSize={'xl'}>
                    <Icon name="chevron-right" size={20} />
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  my={4}>
                  <Text fontSize={'xl'} fontWeight={'bold'}>
                    Help
                  </Text>
                  <Text fontSize={'xl'}>
                    <Icon name="chevron-right" size={20} />
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChangePassword')}>
                <View
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  my={4}>
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
          </View>
        )}
        {pages.isLoading && (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              flexDirection="column"
              alignItems="center"
              width={'100%'}
              marginTop={25}>
              <SkeletonPlaceholder.Item
                width={80}
                height={80}
                borderRadius={50}
                marginBottom={5}
              />
              <SkeletonPlaceholder.Item
                width={120}
                height={20}
                marginBottom={5}
              />
              <SkeletonPlaceholder.Item
                width={150}
                height={20}
                marginBottom={5}
              />
              <SkeletonPlaceholder.Item
                width={100}
                height={20}
                marginBottom={5}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item marginTop={30} marginHorizontal={20}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={50}
                marginBottom={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={50}
                marginBottom={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={50}
                marginBottom={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={50}
                marginBottom={10}
              />
              <SkeletonPlaceholder.Item
                width={150}
                height={50}
                marginBottom={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Profile;
