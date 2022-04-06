import React, {useEffect} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import {useState} from 'react/cjs/react.development';
import Button from '../components/Button';
import Counter from '../components/Counter';
import {SafeAreaView} from 'react-native-safe-area-context';
import ModalDelete from '../components/ModalDelete';
import {useDispatch, useSelector} from 'react-redux';
import {deleteVehicle, getVehicleDetail} from '../redux/actions/vehicles';
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

const EditVehicle = ({navigation, route: {params}}) => {
  const {auth} = useSelector(state => state);
  const {vehicles} = useSelector(state => state);
  const [name, setName] = useState(vehicles.vehicle.name);
  const [price, setPrice] = useState(vehicles.vehicle.cost.toString());
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [available, setAvailable] = useState(true);
  const [qty, setQty] = useState(vehicles.vehicle.qty);
  const dispatch = useDispatch();
  const onConfirmDelete = () => {
    setConfirmDelete(true);
  };
  useEffect(() => {
    dispatch(getVehicleDetail(params.id));
  }, [dispatch, params.id]);
  const config = {
    dependencies: {
      'linear-gradient': LinearGradient,
    },
  };
  const handleDelete = () => {
    dispatch(deleteVehicle(auth.token, params.id));
    navigation.navigate('Home');
  };
  return (
    <NativeBaseProvider config={config}>
      <SafeAreaView>
        <View position={'relative'} height={'100%'}>
          <ScrollView>
            <View position={'relative'}>
              <Image
                source={{uri: vehicles.vehicle.image}}
                alt={vehicles.vehicle.name}
                size={'2xl'}
                width={'100%'}
              />
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
                    value={vehicles.vehicle.name}
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
              </VStack>
            </View>
          </ScrollView>
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
            <Button variant={'dark'}>Update Changes</Button>
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default EditVehicle;
