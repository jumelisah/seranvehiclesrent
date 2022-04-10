import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  NativeBaseProvider,
  ScrollView,
  Text,
  View,
  Box,
  Select,
  CheckIcon,
  Image,
  VStack,
} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import EnIcon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {getVehicleDetail} from '../redux/actions/vehicles';
import {ChangeDate} from '../helpers/changeDate';
import {addTransaction} from '../redux/actions/transaction';

const Payment = ({navigation, route: {params}}) => {
  const {auth} = useSelector(state => state);
  const {vehicles} = useSelector(state => state);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Prepayment (no tax)');
  const price = params.qty * vehicles.vehicle.cost;
  const [rentDate, setRentDate] = useState(params.rentDate);
  const [returnDate, setReturnDate] = useState(ChangeDate(params.returnDate));
  const [recipient, setRecipient] = useState();
  const [firstName, setFirstName] = useState(auth.userData.name);
  const [lastName, setLastName] = useState();
  const [mobilePhone, setMobilePhone] = useState(auth.userData.phone_number);
  const [email, setEmail] = useState(auth.userData.email);
  const [address, setAddress] = useState(auth.userData.address);
  const [cardNumber, setCardNumber] = useState();
  const [formError, setFormError] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVehicleDetail(params.id));
  }, [dispatch, params.id]);
  const onReservation = async () => {
    if (lastName) {
      setRecipient(`${firstName} ${lastName}`);
    } else {
      setRecipient(firstName);
    }
    const data = {
      vehicle_id: params.id,
      rent_date: rentDate,
      return_date: returnDate,
      recipient,
      phone_number: mobilePhone,
      email,
      address,
      sum: params.qty,
    };
    if (
      !rentDate ||
      !returnDate ||
      !recipient ||
      !mobilePhone ||
      !email ||
      !address ||
      !cardNumber
    ) {
      setFormError('Please input the fields');
      alert(recipient)
    } else {
      dispatch(addTransaction(auth.token, data));
      await setStep(2);
    }
  };
  const Round = ({num}) => {
    return (
      <Box
        bg={
          step >= num
            ? {
                linearGradient: {
                  colors: ['#1572A1', '#9AD0EC'],
                  start: [0, 0],
                  end: [1, 0],
                },
              }
            : ''
        }
        backgroundColor={`${step < num ? 'rgba(0,0,0,0.2)' : ''}`}
        width={10}
        height={10}
        rounded="full"
        alignItems={'center'}>
        <Text fontSize={'2xl'} fontWeight={'bold'} color={'white'}>
          {num}
        </Text>
      </Box>
    );
  };
  const Line = ({num}) => {
    return (
      <Box
        bg={
          step > num
            ? {
                linearGradient: {
                  colors: ['#1572A1', '#9AD0EC'],
                  start: [0, 0],
                  end: [1, 0],
                },
              }
            : ''
        }
        backgroundColor={`${step <= num ? 'rgba(0,0,0,0.2)' : ''}`}
        width={10}
        height={1}
      />
    );
  };
  const config = {
    dependencies: {
      'linear-gradient': LinearGradient,
    },
  };
  return (
    <NativeBaseProvider config={config}>
      <SafeAreaView>
        <View height={'100%'}>
          {step < 4 && (
            <View p={5} flexDirection={'row'} alignItems={'center'}>
              <TouchableOpacity
                onPress={() => {
                  if (step > 1) {
                    setStep(step - 1);
                  } else {
                    navigation.goBack();
                  }
                }}>
                <Icon name={'chevron-left'} size={25} />
              </TouchableOpacity>
              <Text fontSize={'2xl'} pl={3}>
                Payment
              </Text>
            </View>
          )}
          {step === 4 && (
            <View p={5} flexDirection={'row'} alignItems={'center'}>
              <TouchableOpacity onPress={() => navigation.navigate('History')}>
                <Icon name={'chevron-left'} size={25} />
              </TouchableOpacity>
              <Text fontSize={'2xl'} pl={3}>
                See History
              </Text>
            </View>
          )}
          <ScrollView>
            {step < 4 && (
              <View
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}>
                <Round num={1} />
                <Line num={1} />
                <Round num={2} />
                <Line num={2} />
                <Round num={3} />
              </View>
            )}
            {step === 1 && (
              <View p={5}>
                <TextInput
                  value={cardNumber}
                  placeholder={'ID Card number'}
                  variant={'transparent'}
                  onChangeText={text => setCardNumber(text)}
                  keyboardType={'numeric'}
                />
                <TextInput
                  value={firstName}
                  placeholder={'Name'}
                  variant={'transparent'}
                  onChangeText={text => setFirstName(text)}
                />
                <TextInput
                  value={lastName}
                  placeholder={'Last Name'}
                  variant={'transparent'}
                  onChangeText={text => setLastName(text)}
                />
                <TextInput
                  value={mobilePhone}
                  placeholder={'Mobile phone (Must be active)'}
                  variant={'transparent'}
                  onChangeText={text => setMobilePhone(text)}
                  keyboardType={'phone-pad'}
                />
                <TextInput
                  value={email}
                  placeholder={'Email address'}
                  variant={'transparent'}
                  onChangeText={text => setEmail(text)}
                  keyboardType={'email-address'}
                />
                <TextInput
                  value={address}
                  placeholder={'Location (home, office, etc.)'}
                  variant={'transparent'}
                  onChangeText={text => setAddress(text)}
                />
                <Select
                  selectedValue={paymentMethod}
                  minWidth="200"
                  accessibilityLabel="Type"
                  placeholder="Payment Type"
                  borderWidth={1}
                  borderColor={'black'}
                  borderRadius={'xl'}
                  fontSize={'sm'}
                  selectedItem={{endIcon: <CheckIcon size="5" />}}
                  mt={1}
                  p={4}
                  onValueChange={itemValue => setPaymentMethod(itemValue)}>
                  <Select.Item
                    label="Prepayment (no tax)"
                    value={'Prepayment (no tax)'}
                  />
                  <Select.Item
                    label="Pay at the end (include tax)"
                    value={'Pay at the end (include tax)'}
                  />
                  <Select.Item
                    label="Partial payment (include tax)"
                    value={'Partial payment (include tax)'}
                  />
                </Select>
              </View>
            )}
            {step === 2 && (
              <View p={5}>
                <Image
                  source={{uri: vehicles.vehicle.image}}
                  alt={vehicles.vehicle.name}
                  size={'xl'}
                  width={'100%'}
                  height={250}
                  borderRadius={'xl'}
                />
                <View>
                  <Text fontSize={'md'} pt={1}>
                    {params.qty} {vehicles.vehicle.name}
                  </Text>
                  <Text fontSize={'md'} pt={1}>
                    {paymentMethod}
                  </Text>
                  <Text fontSize={'md'} pt={1}>
                    4 days
                  </Text>
                  <Text fontSize={'md'} pt={1}>
                    Jan 18 2021 to Jan 22 2021
                  </Text>
                </View>
              </View>
            )}
            {step === 3 && (
              <View p={5}>
                <VStack space={1} alignItems={'center'} py={5}>
                  <Text fontWeight={'bold'}>Payment code:</Text>
                  <Text fontSize={'3xl'}>90887620</Text>
                  <Text textAlign={'center'}>
                    Insert your payment code while you transfer booking Order
                  </Text>
                  <Text>Pay before</Text>
                  <Text fontSize={'xl'} color={'rose.800'} fontWeight={'bold'}>
                    01:59:38
                  </Text>
                  <Text>Bank Account Information</Text>
                  <Text fontSize={'2xl'} fontWeight={'bold'}>
                    0290-90203-345-2
                  </Text>
                  <Text>Seran Vehicles Rent</Text>
                </VStack>
                <VStack
                  space={1}
                  borderTopWidth={1}
                  alignItems={'center'}
                  py={5}>
                  <View flexDirection={'row'}>
                    <Text fontWeight={'bold'}>Booking Code: </Text>
                    <Text color={'green.700'} fontWeight={'bold'}>
                      VSP09875
                    </Text>
                  </View>
                  <Text>Use booking code to pickup your vehicles</Text>
                  <TouchableOpacity>
                    <View
                      p={3}
                      my={2}
                      backgroundColor={'#9AD0EC'}
                      borderRadius={10}>
                      <Text fontWeight={'bold'}>
                        Copy Payment & Booking Code
                      </Text>
                    </View>
                  </TouchableOpacity>
                </VStack>
                <VStack SPACE={1} py={5}>
                  <Text>Order details:</Text>
                  <Text>
                    {params.qty} {vehicles.vehicle.name}
                  </Text>
                  <Text>{paymentMethod}</Text>
                  <Text fontSize={'md'} pt={1}>
                    4 days
                  </Text>
                  <Text fontSize={'md'} pt={1}>
                    Jan 18 2021 to Jan 22 2021
                  </Text>
                </VStack>
              </View>
            )}
            {step === 4 && (
              <View p={5}>
                <Text
                  textAlign={'center'}
                  fontWeight={'bold'}
                  color={'green.600'}
                  fontSize={'xl'}
                  pb={5}>
                  Payment Success!
                </Text>
                <View>
                  <Image
                    source={{uri: vehicles.vehicle.image}}
                    alt={vehicles.vehicle.name}
                    size={'xl'}
                    width={'100%'}
                    height={250}
                    borderRadius={10}
                  />
                  <View
                    width={55}
                    position={'absolute'}
                    right={0}
                    bottom={0}
                    m={5}>
                    <Box
                      bg={{
                        linearGradient: {
                          colors: ['#1572A1', '#9AD0EC'],
                          start: [0, 0],
                          end: [1, 0],
                        },
                      }}
                      py={1}
                      px={2}
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
                  </View>
                </View>
                <VStack space={1} py={5} fontSize={'md'}>
                  <Text>
                    {params.qty} {vehicles.vehicle.name}
                  </Text>
                  <Text>{paymentMethod}</Text>
                  <Text fontSize={'md'} pt={1}>
                    4 days
                  </Text>
                  <Text fontSize={'md'} pt={1}>
                    Jan 18 2021 to Jan 22 2021
                  </Text>
                </VStack>
                <View py={5} borderTopWidth={1}>
                  <Text>ID: 9087627392624</Text>
                  <Text>
                    {auth.userData.name !== 'undefined'
                      ? auth.userData.name
                      : ''}
                    ({auth.userData.email})
                  </Text>
                  <View flexDirection={'row'}>
                    <Text>08123456789</Text>
                    <Text fontWeight={'bold'} color={'green.600'}>
                      (Active)
                    </Text>
                  </View>
                  <Text>Jakarta, Indonesia</Text>
                </View>
              </View>
            )}
          </ScrollView>
          <View p={5}>
            {step === 1 && (
              <View>
                <Button variant={'dark'} onPress={onReservation}>
                  Order Vehicle
                </Button>
                <Button variant={'blue'}>See Order Detail</Button>
              </View>
            )}
            {(step === 2 || step === 3) && (
              <View
                py={2}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                borderTopWidth={1}>
                <Text fontSize={'4xl'}>
                  Rp. {price.toLocaleString('id-ID')}
                </Text>
                <EnIcon
                  name={'info-with-circle'}
                  size={30}
                  color={'rgba(0,0,0,0.3)'}
                />
              </View>
            )}
            {step === 2 && (
              <Button variant={'dark'} onPress={() => setStep(3)}>
                Get Payment Code
              </Button>
            )}
            {step === 3 && (
              <Button variant={'dark'} onPress={() => setStep(4)}>
                Finish Payment
              </Button>
            )}
            {step === 4 && (
              <Button variant={'dark'} onPress={() => setStep(4)}>
                Total payment: Rp. {price}
              </Button>
            )}
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Payment;
