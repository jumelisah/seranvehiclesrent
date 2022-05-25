import React, {useEffect, useState} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import Button from '../components/Button';
import Counter from '../components/Counter';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {deleteVehicle, editVehicles} from '../redux/actions/vehicles';
import {
  Image,
  Input,
  NativeBaseProvider,
  Text,
  View,
  VStack,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Rating from '../components/Rating';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const EditVehicle = ({navigation, route: {params}}) => {
  const {auth, pages} = useSelector(state => state);
  const {vehicles} = useSelector(state => state);
  const [name, setName] = useState(vehicles.vehicle.name);
  const [price, setPrice] = useState(String(vehicles.vehicle.cost));
  const [location, setLocation] = useState(vehicles.vehicle.location);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [available, setAvailable] = useState(true);
  const [qty, setQty] = useState(vehicles.vehicle.qty || params.qty);
  const [largeImage, setLargeImage] = useState(false);
  const [picture, setPicture] = useState();
  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState();
  const [moduleOption, setModuleOption] = useState(false);
  const [moduleOpen, setModuleOpen] = useState(false);
  const dispatch = useDispatch();
  const onConfirmDelete = () => {
    setConfirmDelete(true);
  };
  useEffect(() => {
    if (vehicles.vehicle.is_deleted === 1) {
      navigation.navigate('Home', {message: vehicles.message});
    }
  }, [navigation, vehicles.message, vehicles.vehicle.is_deleted]);
  const config = {
    dependencies: {
      'linear-gradient': LinearGradient,
    },
  };
  const handlePhotoGallery = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        if (response.assets[0].fileSize > 2097152) {
          setLargeImage(true);
        } else {
          setLargeImage(false);
        }
        setPicture(response.assets[0].uri);
        setFileName(response.assets[0].fileName);
        setFileType(response.assets[0].type);
      } else {
        setPicture();
        setLargeImage(false);
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
        if (response.assets[0].fileSize > 2097152) {
          setLargeImage(true);
        } else {
          setLargeImage(false);
        }
        setPicture(response.assets[0].uri);
        setFileName(response.assets[0].fileName);
        setFileType(response.assets[0].type);
      } else {
        setPicture();
        setLargeImage(false);
      }
    });
    setModuleOption(false);
  };
  const handleUpdate = () => {
    const data = {
      name,
      cost: price,
      picture,
      fileName,
      fileType,
      qty,
      location,
      available: available ? 1 : 0,
    };
    dispatch(editVehicles(auth.token, vehicles.vehicle.id, data));
    setModuleOpen(true);
  };
  return (
    <NativeBaseProvider config={config}>
      <SafeAreaView>
        <View position={'relative'} height={'100%'}>
          {pages.isLoading && (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item width={'100%'} height={250} />
              <SkeletonPlaceholder.Item padding={20}>
                <SkeletonPlaceholder.Item
                  width={250}
                  height={30}
                  marginBottom={10}
                />
                <SkeletonPlaceholder.Item width={250} height={30} />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item paddingBottom={20} paddingLeft={20}>
                <SkeletonPlaceholder.Item
                  width={150}
                  height={15}
                  marginBottom={10}
                />
                <SkeletonPlaceholder.Item
                  width={100}
                  height={15}
                  marginBottom={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={15}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item paddingBottom={20} paddingLeft={20}>
                <SkeletonPlaceholder.Item
                  width={250}
                  height={50}
                  marginBottom={10}
                />
                <SkeletonPlaceholder.Item
                  width={250}
                  height={50}
                  marginBottom={10}
                />
              </SkeletonPlaceholder.Item>
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
              <SkeletonPlaceholder.Item width={'100%'} height={80} />
            </SkeletonPlaceholder>
          )}
          {!pages.isLoading && (
            <ScrollView>
              <View position={'relative'}>
                <TouchableOpacity onPress={() => setModuleOption(true)}>
                  <Image
                    source={{uri: picture ? picture : vehicles.vehicle.image}}
                    alt={vehicles.vehicle.name || 'Detail'}
                    size={'2xl'}
                    width={'100%'}
                  />
                </TouchableOpacity>
                {largeImage && (
                  <Text color={'rose.600'} textAlign={'center'} py={2}>
                    File too large. Maximal size allowed: 2MB
                  </Text>
                )}
                <View
                  position={'absolute'}
                  flexDirection={'row'}
                  width={'100%'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  p={5}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={30} color={'white'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onConfirmDelete}>
                    <View
                      backgroundColor={'#9AD0EC'}
                      borderRadius={'full'}
                      width={10}
                      height={10}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Icon name="trash-o" size={20} color={'white'} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <View width={250} p={5}>
                    <Input
                      borderWidth={0}
                      borderBottomWidth={1}
                      value={name}
                      size={'2xl'}
                      onChangeText={text => setName(text)}
                    />
                    <Input
                      type={'number'}
                      keyboardType={'numeric'}
                      borderWidth={0}
                      borderBottomWidth={1}
                      value={price}
                      size={'2xl'}
                      onChangeText={text => setPrice(text)}
                    />
                  </View>
                  <View position={'absolute'} right={0} p={5}>
                    <Rating />
                  </View>
                </View>
                <VStack space={1} px={5}>
                  <Text>Max for {vehicles.vehicle.seat} person</Text>
                  <Text>No prepayment</Text>
                  <Text
                    fontSize={'md'}
                    fontWeight={'bold'}
                    py={2}
                    color={
                      vehicles.vehicle.stock < 1 ||
                      vehicles.vehicle.available < 1
                        ? 'rose.600'
                        : 'green.600'
                    }>
                    {`${
                      vehicles.vehicle.stock < 1 ||
                      vehicles.vehicle.available < 1
                        ? 'Full Booked'
                        : 'Available'
                    }`}
                  </Text>
                  <View py={1} flexDirection={'row'} alignItems={'center'}>
                    <View
                      backgroundColor={'#9AD0EC'}
                      px={3}
                      py={2}
                      borderRadius={10}>
                      <Icon name="map-marker" size={20} color={'#1572A1'} />
                    </View>
                    <Input
                      value={location}
                      onChangeText={text => setLocation(text)}
                      fontSize={'md'}
                      borderWidth={0}
                      borderBottomWidth={1}
                    />
                  </View>
                  <View py={1} flexDirection={'row'} alignItems={'center'}>
                    <View
                      backgroundColor={'#9AD0EC'}
                      px={3}
                      py={2}
                      borderRadius={10}>
                      <FaIcon name="walking" size={20} color={'#1572A1'} />
                    </View>
                    <Text pl={2} fontSize={'md'}>
                      3.2 miles from your location
                    </Text>
                  </View>
                </VStack>
              </View>
            </ScrollView>
          )}
          {!pages.isLoading && (
            <View>
              <View flexDirection={'row'} px={5} py={2}>
                <View width={'50%'} pr={1}>
                  <Button
                    variant={`${available ? 'blue' : ''}`}
                    textUnactive={`${available ? '' : 'Unactive'}`}
                    onPress={() => setAvailable(true)}>
                    Available
                  </Button>
                </View>
                <View width={'50%'} pl={1}>
                  <Button
                    variant={`${!available ? 'blue' : ''}`}
                    textUnactive={`${available ? 'Unactive' : ''}`}
                    onPress={() => setAvailable(false)}>
                    Full Book
                  </Button>
                </View>
              </View>
              <View px={5}>
                <View flexDirection={'row'} justifyContent={'space-between'}>
                  <Text fontSize={'xl'} fontWeight={'bold'}>
                    Available Stock:
                  </Text>
                  <Counter
                    num={qty}
                    onPlus={() => {
                      setQty(qty + 1);
                    }}
                    onMinus={() => {
                      if (qty > 0) {
                        setQty(qty - 1);
                      }
                    }}
                  />
                </View>
                <Button variant={'dark'} onPress={handleUpdate}>
                  Update Changes
                </Button>
              </View>
            </View>
          )}
          {confirmDelete && !pages.isLoading && (
            <View
              width={'100%'}
              height={'100%'}
              backgroundColor={'rgba(0,0,0,0.4)'}
              position={'absolute'}
              justifyContent={'center'}
              alignItems={'center'}>
              <View
                backgroundColor={'#9AD0EC'}
                p={5}
                width={'80%'}
                borderRadius={'xl'}>
                <Text
                  fontSize={'xl'}
                  fontWeight={'bold'}
                  textAlign={'center'}
                  pb={5}>
                  Are you sure want to delete this vehicle?
                </Text>
                <View width={'100%'} flexDirection={'row'}>
                  <View width={'50%'} px={2}>
                    <Button onPress={() => setConfirmDelete(false)}>
                      Cancel
                    </Button>
                  </View>
                  <View width={'50%'} px={2}>
                    <Button
                      variant={'dark'}
                      onPress={() => {
                        dispatch(
                          deleteVehicle(auth.token, vehicles.vehicle.id),
                        );
                        setConfirmDelete(false);
                      }}>
                      Delete
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          )}
          {confirmDelete && !pages.isLoading && (
            <View
              width={'100%'}
              height={'100%'}
              backgroundColor={'rgba(0,0,0,0.4)'}
              position={'absolute'}
              justifyContent={'center'}
              alignItems={'center'}>
              <View
                backgroundColor={'#9AD0EC'}
                p={5}
                width={'80%'}
                borderRadius={'xl'}>
                <Text
                  fontSize={'xl'}
                  fontWeight={'bold'}
                  textAlign={'center'}
                  pb={5}>
                  Are you sure want to delete this vehicle?
                </Text>
                <View width={'100%'} flexDirection={'row'}>
                  <View width={'50%'} px={2}>
                    <Button onPress={() => setConfirmDelete(false)}>
                      Cancel
                    </Button>
                  </View>
                  <View width={'50%'} px={2}>
                    <Button
                      variant={'dark'}
                      onPress={() =>
                        dispatch(deleteVehicle(auth.token, vehicles.vehicle.id))
                      }>
                      Delete
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          )}
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
          {!pages.isLoading &&
            moduleOpen &&
            (vehicles.message || vehicles.errMsg) && (
              <View
                position={'absolute'}
                width={'100%'}
                height={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
                backgroundColor={'rgba(0,0,0,0.4)'}>
                <TouchableOpacity onPress={() => setModuleOpen(false)}>
                  <View
                    backgroundColor={'white'}
                    p={5}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={250}
                    height={200}
                    borderRadius={'md'}>
                    <Icon
                      name={vehicles.isError ? 'times' : 'check'}
                      size={50}
                      color={vehicles.isError ? 'red' : 'green'}
                    />
                    <Text
                      textAlign={'center'}
                      fontSize={'xl'}
                      color={vehicles.isError ? 'red' : 'green.600'}>
                      {vehicles.isError ? vehicles.errMsg : vehicles.message}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default EditVehicle;
