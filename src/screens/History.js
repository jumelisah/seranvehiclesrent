import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {NativeBaseProvider, View, Text} from 'native-base';
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
import EnIcon from 'react-native-vector-icons/Entypo';
import LottieView from 'lottie-react-native';
import changeCurrency from '../helpers/changeCurrency';
import defaultImg from '../assets/photo-camera.png';
import ImageTbn from '../components/ImageTbn';

const History = ({navigation}) => {
  const {auth, history, pages} = useSelector(state => state);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (history.data.length < 1) {
      if (auth.userData.role === 'admin') {
        dispatch(getHistoryAdmin(auth.token));
      } else {
        dispatch(getHistoryUser(auth.token));
      }
    }
  }, [dispatch, auth.token, auth.userData.role, history.data]);
  const [choosenId, setChoosenId] = React.useState();
  const renderItem = ({item}) => {
    const yearA = new Date(item.rent_date).getFullYear();
    const yearB = new Date(item.return_date).getFullYear();
    return (
      <View px={5} pt={5}>
        <View
          py={3}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <View flexDirection={'row'}>
            <ImageTbn source={item.image} />
            <View ml={3}>
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
              <Text fontWeight={'bold'}>
                Prepayment: {changeCurrency(item.cost)}
              </Text>
              <Text fontWeight={'bold'} color={'success.600'}>
                {item.status}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (choosenId !== item.id) {
                setChoosenId(item.id);
              } else {
                setChoosenId();
              }
            }}>
            <EnIcon name="dots-three-vertical" size={25} />
          </TouchableOpacity>
          {choosenId === item.id && (
            <View
              position={'absolute'}
              bottom={0}
              right={5}
              backgroundColor={'white'}
              borderRadius={'md'}>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Transaction Detail', {id: item.id})
                  }>
                  <View
                    flexDirection={'row'}
                    alignItems={'center'}
                    py={2}
                    px={4}
                    borderRadius={'xl'}
                    borderBottomWidth={0.2}>
                    <View width={28}>
                      <Icon name="info-circle" size={25} />
                    </View>
                    <Text>Transaction detail</Text>
                  </View>
                </TouchableOpacity>
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
                    flexDirection={'row'}
                    alignItems={'center'}
                    py={2}
                    px={4}
                    borderRadius={'xl'}>
                    <View width={28}>
                      <Icon name="trash-o" size={25} />
                    </View>
                    <Text>Delete history</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
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
