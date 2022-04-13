import {NativeBaseProvider, Text, View} from 'native-base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

const TransactionDetail = ({navigation, route: {params}}) => {
  const {history, auth} = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <NativeBaseProvider>
      <View>
        <Text>alo</Text>
      </View>
    </NativeBaseProvider>
  );
};

export default TransactionDetail;
