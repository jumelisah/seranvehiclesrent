import React, {useEffect} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import FeIcon from 'react-native-vector-icons/Feather';
import {useState} from 'react/cjs/react.development';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/Button';
import {Image, NativeBaseProvider, Text, View, Box} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {ChangeDate} from '../helpers/changeDate';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {getVehicleDetail} from '../redux/actions/vehicles';
import Counter from '../components/Counter';
import TextInput from '../components/TextInput';

const VehicleDetail = ({navigation, route: {params}}) => {
  const {pages, vehicles} = useSelector(state => state);
  const [qty, setQty] = useState(1);
  const [love, setLove] = useState(false);
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [date, setDate] = useState(today.setDate(today.getDate() + 1));
  const [returnDate, setReturnDate] = useState();
  const [days, setDays] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVehicleDetail(params.id));
  }, [dispatch, params.id]);
  const config = {
    dependencies: {
      'linear-gradient': LinearGradient,
    },
  };
  const onChangeDate = (e, value) => {
    setDate(value);
    setOpen(false);
  };
  // const onReservation = async () => {
  //   setReturnDate(new Date(returnDate.setDate(returnDate.getDate() + days)));
  //   await alert(returnDate);
  // };
  return (
    <NativeBaseProvider config={config}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!pages.isLoading && (
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
                Rp {vehicles.vehicle.cost}/day
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
            <View px={5}>
              <View
                py={4}
                flexDirection={'row'}
                justifyContent={'space-between'}>
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
              <View flexDirection={'row'} width={'100%'} alignItems={'center'}>
                <View width={'70%'} pr={3}>
                  <TextInput
                    variant={'transparent'}
                    keyboardType={'numeric'}
                    value={ChangeDate(new Date(date))}
                    placeholder={'Select date'}
                    icon={
                      <TouchableOpacity onPress={() => setOpen(true)}>
                        <View mr={2}>
                          <Icon name="calendar" size={30} />
                        </View>
                      </TouchableOpacity>
                    }
                  />
                </View>
                <View width={'30%'}>
                  <TextInput
                    placeholder={'1'}
                    value={days}
                    onChangeText={text => setDays(parseInt(text, 10))}
                    variant={'transparent'}
                    keyboardType={'numeric'}
                    icon={
                      <View pr={3}>
                        <Text>days</Text>
                      </View>
                    }
                  />
                </View>
              </View>
              <Button
                variant={'dark'}
                onPress={() =>
                  navigation.navigate('Payment', {
                    id: vehicles.vehicle.id,
                    qty,
                    rentDate: ChangeDate(date),
                    returnDate: new Date(date.setDate(date.getDate() + days)),
                    days,
                  })
                }>
                Reservation
              </Button>
            </View>
          </View>
        )}
      </ScrollView>
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
            <SkeletonPlaceholder.Item width={60} height={15} marginTop={10} />
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
      {open && (
        <View>
          <DateTimePicker
            value={new Date(date) || date}
            onChange={(e, value) => {
              setDate(value);
              setOpen(false);
            }}
            onError={() => setOpen(false)}
            minimumDate={today}
          />
        </View>
      )}
    </NativeBaseProvider>
  );
};

export default VehicleDetail;
