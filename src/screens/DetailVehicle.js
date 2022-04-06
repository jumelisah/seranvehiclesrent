import React, {useEffect, useState} from 'react';
import {
  Box,
  Image,
  NativeBaseProvider,
  ScrollView,
  Text,
  View,
} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getVehicleDetail} from '../redux/actions/vehicles';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import FeIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import Counter from '../components/Counter';
import Button from '../components/Button';

const DetailVehicle = ({navigation, route: {params}}) => {
  const {vehicles} = useSelector(state => state);
  const [qty, setQty] = useState(1);
  const [love, setLove] = useState(false);
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
                <View flexDirection={'row'} alignItems={'center'}>
                  <Box
                    bg={{
                      linearGradient: {
                        colors: ['#1572A1', '#9AD0EC'],
                        start: [0, 0],
                        end: [1, 0],
                      },
                    }}
                    p={1}
                    mr={2}
                    rounded="xl"
                    _text={{
                      fontSize: 'sm',
                      fontWeight: 'medium',
                      color: 'warmGray.50',
                      textAlign: 'center',
                    }}>
                    <View flexDirection={'row'}>
                      <Text color={'white'} pr={1}>
                        4.5
                      </Text>
                      <Icon name="star" size={18} color={'white'} />
                    </View>
                  </Box>
                  <TouchableOpacity onPress={() => setLove(!love)}>
                    <Icon
                      name={`${love ? 'heart' : 'heart-o'}`}
                      size={25}
                      color={'white'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View p={5} position={'relative'}>
                <View position={'absolute'} right={0} p={5}>
                  <TouchableOpacity>
                    <FeIcon name="message-circle" size={30} color={'#1572A1'} />
                  </TouchableOpacity>
                </View>
                <Text fontSize={'2xl'} fontWeight={'bold'}>
                  {vehicles.vehicle.name}
                </Text>
                <Text fontSize={'2xl'} fontWeight={'bold'}>
                  Rp {vehicles.vehicle?.cost}/day
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
          <View
            width={'100%'}
            px={5}
            pt={5}
            position={'absolute'}
            bottom={0}
            backgroundColor={'warmGray.100'}>
            <View flexDirection={'row'} justifyContent={'space-between'}>
              <Text fontSize={'xl'} fontWeight={'bold'}>
                Select Vehicles:
              </Text>
              <Counter
                num={qty}
                onPlus={() => {
                  if (qty < vehicles.vehicle.qty) {
                    setQty(qty + 1);
                  }
                }}
                onMinus={() => {
                  if (qty > 1) {
                    setQty(qty - 1);
                  }
                }}
              />
            </View>
            <Button
              variant={'dark'}
              onPress={() =>
                navigation.navigate('Payment', {id: vehicles.vehicle.id, qty})
              }>
              Reservation
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default DetailVehicle;
