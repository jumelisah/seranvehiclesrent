import React, {useEffect, useState} from 'react';
import {Image, NativeBaseProvider, ScrollView, Text, View} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getVehicleDetail} from '../redux/actions/vehicles';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import Counter from '../components/Counter';
import Button from '../components/Button';
import Rating from '../components/Rating';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import changeCurrency from '../helpers/changeCurrency';

const DetailVehicleAdmin = ({navigation, route: {params}}) => {
  const {vehicles, pages} = useSelector(state => state);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVehicleDetail(params.id));
  }, [dispatch, params.id]);
  const config = {
    dependencies: {
      'linear-gradient': LinearGradient,
    },
  };
  return (
    <NativeBaseProvider config={config}>
      <SafeAreaView>
        <View
          height={'100%'}
          position={'relative'}
          backgroundColor={'warmGray.100'}>
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
          {!pages.isLoading && vehicles.vehicle.cost && (
            <ScrollView>
              <View width={'100%'} position={'relative'} height={'100%'}>
                <Image
                  source={{uri: vehicles.vehicle?.image}}
                  alt={vehicles.vehicle.name}
                  size={'2xl'}
                  width={'100%'}
                  // height={'50%'}
                />
                <View
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  position={'absolute'}
                  width={'100%'}
                  p={5}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={30} color={'white'} />
                  </TouchableOpacity>
                  <View alignItems={'center'}>
                    <Rating />
                  </View>
                </View>
                <View p={5} position={'relative'}>
                  <Text fontSize={'2xl'} fontWeight={'bold'}>
                    {vehicles.vehicle.name}
                  </Text>
                  <Text fontSize={'2xl'} fontWeight={'bold'}>
                    {changeCurrency(vehicles.vehicle.cost)}/day
                  </Text>
                  <Text fontSize={'md'} pt={3}>
                    Max for {vehicles.vehicle.seat} person
                  </Text>
                  <Text fontSize={'md'} py={2}>
                    No prepayment
                  </Text>
                  <Text
                    fontSize={'md'}
                    fontWeight={'bold'}
                    py={2}
                    color={vehicles.vehicle.stock < 1 ? 'red' : 'green.600'}>
                    {`${
                      vehicles.vehicle.stock < 1 ? 'Not available' : 'Available'
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
                    <Text pl={2} fontSize={'md'}>
                      {vehicles.vehicle.location}
                    </Text>
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
                </View>
              </View>
            </ScrollView>
          )}
          {!pages.isLoading && (
            <View
              width={'100%'}
              px={5}
              pt={5}
              position={'absolute'}
              bottom={0}
              backgroundColor={'warmGray.100'}>
              <View
                flexDirection={'row'}
                justifyContent={'space-between'}
                py={3}>
                <Text fontSize={'xl'} fontWeight={'bold'}>
                  Stock:
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
              <Button
                variant={'dark'}
                onPress={() =>
                  navigation.navigate('EditVehicle', {
                    id: vehicles.vehicle.id,
                    qty,
                  })
                }>
                Edit Item
              </Button>
            </View>
          )}
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default DetailVehicleAdmin;
