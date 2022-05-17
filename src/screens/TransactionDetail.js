import {Image, NativeBaseProvider, Text, View} from 'native-base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

const TransactionDetail = ({navigation, route: {params}}) => {
  const {history, auth} = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <NativeBaseProvider>
      <View p={5}>
        {/* <Image
          source={{uri: vehicles.vehicle.image}}
          alt={vehicles.vehicle.name}
          size={'xl'}
          width={'100%'}
          height={250}
          borderRadius={'xl'}
        /> */}
        <View>
          <Text fontSize={'md'} pt={1}>
            params.qty vehicles.vehicle.name
          </Text>
          <Text fontSize={'md'} pt={1}>
            paymentMethod
          </Text>
          <Text fontSize={'md'} pt={1}>
            4 days
          </Text>
          <Text fontSize={'md'} pt={1}>
            Jan 18 2021 to Jan 22 2021
          </Text>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default TransactionDetail;
