import React, {useEffect} from 'react';
import {Image, NativeBaseProvider, Text, View} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getHistoryDetail} from '../redux/actions/history';
import {dateDifference, twoDates} from '../helpers/changeDate';
import Button from '../components/Button';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TransactionDetail = ({navigation, route: {params}}) => {
  const {history, auth} = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.token) {
      dispatch(getHistoryDetail(auth.token, params.id));
    }
  }, [auth.token, dispatch, params.id]);
  return (
    <NativeBaseProvider>
      <View p={5} flexDirection={'row'} alignItems={'center'}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={'black'} />
        </TouchableOpacity>
        <Text fontSize={'xl'} fontWeight={'bold'} marginLeft={3}>
          Reservation detail
        </Text>
      </View>
      <View p={5}>
        <Image
          source={{uri: history.detail.image}}
          alt={history.detail.vehicle}
          size={'xl'}
          width={'100%'}
          height={250}
          borderRadius={'xl'}
        />
        <View paddingTop={5}>
          <Text pt={1} fontWeight={'bold'}>
            {history.detail.vehicle} {history.detail.year}
          </Text>
          <Text>Location: {history.detail.location}</Text>
          <Text>
            {dateDifference(
              new Date(history.detail.rent_date),
              new Date(history.detail.return_date),
            )}{' '}
            days
          </Text>
          <Text>
            {twoDates(
              new Date(history.detail.rent_date),
              new Date(history.detail.return_date),
            )}
          </Text>
        </View>
        <View paddingTop={3}>
          <Text fontWeight={'bold'}>Identity:</Text>
          <Text>
            {history.detail.recipient} ({history.detail.phone_number})
          </Text>
          <Text>{history.detail.email}</Text>
        </View>
        {history.detail.status === 'Wait for payment' && (
          <Button variant="dark">Finish Payment</Button>
        )}
        {(history.detail.status === 'Booked' ||
          history.detail.status === 'Wait for payment') && (
          <Button variant="dark">Cancel</Button>
        )}
        {(history.detail.status !== 'Booked' ||
          history.detail.status !== 'Wait for payment') && (
          <Button>{history.detail.status}</Button>
        )}
      </View>
    </NativeBaseProvider>
  );
};

export default TransactionDetail;
