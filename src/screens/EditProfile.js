import React, {useEffect} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useState} from 'react/cjs/react.development';
import Button from '../components/Button';
import {Image, NativeBaseProvider, Radio, Stack, Text, View} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {editProfile, getProfile} from '../redux/actions/auth';
import TextInput from '../components/TextInput';
import LottieView from 'lottie-react-native';
import {ChangeDate} from '../helpers/changeDate';

const EditProfile = ({navigation}) => {
  const {auth, pages} = useSelector(state => state);
  const [picture, setPicture] = useState();
  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState();
  const [name, setName] = useState(auth.userData?.name);
  const [email, setEmail] = useState(auth.userData?.email);
  const [phoneNumber, setPhoneNumber] = useState(auth.userData?.phone_number);
  const [address, setAddress] = useState(auth.userData?.address);
  const [birthdate, setBirthdate] = useState(auth.userData?.birthdate);
  const [gender, setGender] = useState(auth.userData?.gender);
  const [moduleOption, setModuleOption] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(
    new Date(auth.userData.birthdate) || new Date(),
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile(auth?.token));
  }, [auth.token, dispatch]);
  const dateNow = String(date.getDate()).padStart(2, '0');
  const monthNow = String(date.getMonth() + 1).padStart(2, '0');
  const formatDate = auth.userData?.birthdate
    ? `${date.getFullYear()}/${monthNow}/${dateNow}`
    : null;
  const handlePhotoGallery = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        setPicture(response.assets[0].uri);
        setFileName(response.assets[0].fileName);
        setFileType(response.assets[0].type);
      }
    });
    setModuleOption(false);
  };
  const handlePhotoCamera = () => {
    const options = {
      noData: true,
    };
    launchCamera(options, response => {
      if (response.assets) {
        setPicture(response.assets[0].uri);
        setFileName(response.assets[0].fileName);
        setFileType(response.assets[0].type);
      }
    });
    setModuleOption(false);
  };
  const updateProfile = async () => {
    const data = {
      name,
      email,
      phone_number: phoneNumber,
      address,
      gender,
      birthdate: ChangeDate(birthdate),
      fileName,
      fileType,
      picture,
    };
    dispatch(editProfile(auth.token, data));
    // await dispatch(getProfile(auth?.token));
  };
  const Gender = () => {
    return (
      <Radio.Group
        name="Gender Group"
        value={gender}
        onChange={nextValue => setGender(nextValue)}
        accessibilityLabel="Choose gender">
        <Stack
          direction={{
            base: 'row',
            md: 'row',
          }}
          alignItems="center"
          justifyContent="center"
          marginVertical={20}
          space={4}
          w="100%">
          <Radio value="Male" colorScheme="blue" size="lg" my={1}>
            Male
          </Radio>
          <Radio value="Female" colorScheme="blue" size="lg" my={1}>
            Female
          </Radio>
        </Stack>
      </Radio.Group>
    );
  };
  return (
    <NativeBaseProvider>
      <View
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={5}>
        <View flexDirection={'row'}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={30} color={'black'} />
          </TouchableOpacity>
          <Text fontSize={'xl'} px={3} fontWeight={'bold'}>
            Add new item
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text fontSize={'xl'} color={'warmGray.400'} fontWeight={'bold'}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View width={100} mx={'auto'}>
          <Image
            source={picture ? {uri: picture} : {uri: auth.userData?.image}}
            width={100}
            height={100}
            borderRadius={'full'}
            alt={auth.userData.username}
          />
          <View position={'absolute'} bottom={0} right={0}>
            <TouchableOpacity onPress={() => setModuleOption(true)}>
              <View
                borderRadius={'full'}
                width={8}
                height={8}
                backgroundColor={'rgb(154, 208, 236)'}
                justifyContent={'center'}
                alignItems={'center'}>
                <Icon name="plus" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View px={5}>
          <Gender />
          <Text>Name</Text>
          <TextInput
            value={name}
            variant={'transparent'}
            placeholder={name ? name : 'Input your name'}
            onChangeText={text => setName(text)}
          />
          <Text>Email Address</Text>
          <TextInput
            variant={'transparent'}
            keyboardType={'email-address'}
            value={email}
            placeholder={email || 'Input your email'}
            onChangeText={text => setEmail(text)}
          />
          <Text>Phone Number</Text>
          <TextInput
            variant={'transparent'}
            keyboardType={'phone-pad'}
            value={phoneNumber}
            placeholder={phoneNumber || 'Input your phone number'}
            onChangeText={text => setPhoneNumber(text)}
          />
          <Text>Date of Birth</Text>
          <TextInput
            variant={'transparent'}
            keyboardType={'numeric'}
            value={ChangeDate(new Date(birthdate))}
            placeholder={'Input your birthdate'}
            icon={
              <TouchableOpacity onPress={() => setOpen(true)}>
                <View mr={2}>
                  <Icon name="calendar" size={30} />
                </View>
              </TouchableOpacity>
            }
          />
          <Text>Delivery Address</Text>
          <TextInput
            variant={'transparent'}
            value={address}
            placeholder={address || 'Input your address'}
            onChangeText={text => setAddress(text)}
          />
          <Button variant={'blue'} onPress={() => updateProfile()}>
            Save Change
          </Button>
        </View>
      </ScrollView>
      {moduleOption && (
        <View
          position={'absolute'}
          width={'100%'}
          height={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          backgroundColor={'rgba(0,0,0,0.4)'}>
          <TouchableOpacity onPress={() => setModuleOption(false)}>
            <View
              flexDirection={'row'}
              backgroundColor={'white'}
              width={250}
              height={150}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={'md'}>
              <TouchableOpacity onPress={handlePhotoGallery}>
                <View p={5}>
                  <Icon name="picture-o" size={50} color={'#1572A1'} />
                  <Text>Gallery</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePhotoCamera}>
                <View p={5}>
                  <Icon name="camera" size={50} color={'#1572A1'} />
                  <Text>Camera</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {pages.isLoading && (
        <View
          position={'absolute'}
          width={'100%'}
          height={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          backgroundColor={'rgba(0,0,0,0.4)'}>
          <LottieView
            source={require('../assets/98196-loading-teal-dots.json')}
            autoPlay
            loop
          />
        </View>
      )}
      {open && (
        <View>
          <DateTimePicker
            value={new Date(birthdate) || new Date()}
            onChange={(e, dateValue) => {
              setBirthdate(dateValue);
              setOpen(false);
            }}
            onError={() => setOpen(false)}
            maximumDate={new Date()}
          />
        </View>
      )}
    </NativeBaseProvider>
  );
};

export default EditProfile;
