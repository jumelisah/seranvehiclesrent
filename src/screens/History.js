import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {NativeBaseProvider, Image, View, Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteHistoryAdmin,
  deleteHistoryUser,
  getHistoryAdmin,
  getHistoryUser,
} from '../redux/actions/history';
import {dateToString} from '../helpers/dateToString';
import Icon from 'react-native-vector-icons/FontAwesome';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';

const History = ({navigation}) => {
  const {auth, history, pages} = useSelector(state => state);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.userData.role === 'admin') {
      dispatch(getHistoryAdmin(auth.token));
    } else {
      dispatch(getHistoryUser(auth.token));
    }
  }, [dispatch, auth.token, auth.userData.role]);
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
            <TouchableOpacity
              onPress={async id => {
                if (auth.userData.role === 'admin') {
                  dispatch(deleteHistoryAdmin(auth.token, item.id));
                  await dispatch(getHistoryAdmin(auth.token));
                } else {
                  dispatch(deleteHistoryUser(auth.token, item.id));
                  await dispatch(getHistoryUser(auth.token));
                }
              }}>
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
        <View height={'100%'}>
          {/* <View p={5}>
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
          </View> */}
          {loadingIcon && (
            <View width={'100%'}>
              <LottieView
                source={require('../assets/80729-blue-loading.json')}
                autoPlay
                loop
                style={styles.lottie}
              />
            </View>
          )}
          {!pages.isLoading && history.data.length > 0 && (
            <FlatList
              data={history.data}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={() => setLoadingIcon(true)}
              //     onRefresh={() => dispatch(getHistoryUser(auth.token))}
              //   />
              // }
              refreshing={loadingIcon}
              onRefresh={() => dispatch(getHistoryUser(auth.token))}
            />
          )}
          {history.data.length < 1 && (
            <View
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text fontSize={'2xl'}>No history</Text>
              <MiIcon name="pedal-bike" size={200} color={'rgba(0,0,0,0.3)'} />
            </View>
          )}
        </View>
        {pages.isLoading && !history.isError && (
          <View
            position={'absolute'}
            width={'100%'}
            height={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            backgroundColor={'rgba(0,0,0,0.3)'}>
            <LottieView
              source={require('../assets/98196-loading-teal-dots.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  pageBackground: {
    height: '100%',
  },
  lottie: {
    width: 200,
  },
});

export default History;
