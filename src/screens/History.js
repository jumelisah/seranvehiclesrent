import React, {useEffect} from 'react';
import {SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import {NativeBaseProvider, Checkbox, Image, View, Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getHistoryUser} from '../redux/actions/history';
import {dateToString} from '../helpers/dateToString';
import Icon from 'react-native-vector-icons/FontAwesome';
import EnIcon from 'react-native-vector-icons/Entypo';

const History = ({navigation}) => {
  const {auth, history} = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHistoryUser(auth.token));
  }, [dispatch, auth.token]);
  const [choosenId, setChoosenId] = React.useState();
  const renderItem = ({item}) => {
    const yearA = new Date(item.rent_date).getFullYear();
    const yearB = new Date(item.return_date).getFullYear();
    return (
      <TouchableOpacity
        onPress={() => {
          if (choosenId !== item.id) {
            setChoosenId(item.id);
          } else {
            setChoosenId();
          }
        }}>
        <View
          ml={choosenId === item.id ? -50 : 5}
          mr={5}
          py={3}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <View flexDirection={'row'}>
            <Image
              source={{uri: item.image}}
              alt={item.vehicle}
              width={120}
              height={100}
              borderRadius={'xl'}
            />
            <View ml={5}>
              <Text fontWeight={'bold'}>{item.vehicle}</Text>
              <Text>
                {yearA === yearB
                  ? `${dateToString(item.rent_date)} to ${dateToString(
                      item.return_date,
                    )} ${yearA}`
                  : `${dateToString(item.rent_date)} ${yearA} to ${dateToString(
                      item.return_date,
                    )} ${yearB}`}
              </Text>
              <Text fontWeight={'bold'}>Prepayment: {item.cost}</Text>
              <Text fontWeight={'bold'} color={'success.600'}>
                {item.status}
              </Text>
            </View>
          </View>
          {choosenId === item.id && (
            <TouchableOpacity onPress={() => alert('Halo')}>
              <View
                backgroundColor={'rgb(154, 208, 236)'}
                py={2}
                px={4}
                borderRadius={'xl'}>
                <Icon name="trash-o" size={25} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <View p={5}>
          <Text fontSize={'md'} color={'warmGray.900'} pb={3}>
            Today
          </Text>
          <View>
            <View
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              pb={3}>
              <Text width={'85%'}>
                Please finish your payment for vespa for Vespa Rental Jogja
              </Text>
              <EnIcon name="chevron-small-right" size={20} />
            </View>
            <Text width={'85%'}>
              Your payment for a vintage bike at Jogja just confirmed
            </Text>
          </View>
        </View>
        <FlatList
          data={history.data}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default History;
