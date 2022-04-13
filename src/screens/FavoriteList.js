import React, {useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
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

const FavoriteList = ({navigation}) => {
  const {auth, favorites, pages} = useSelector(state => state);
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
    return (
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
            alt={item.name}
            width={120}
            height={100}
            borderRadius={'xl'}
          />
          <View ml={5}>
            <Text fontWeight={'bold'}>{item.name}</Text>
            <Text fontWeight={'bold'}>Cost: {item.cost}</Text>
            <Text
              fontWeight={'bold'}
              color={item.available === 1 ? 'success.600' : 'rose.600'}>
              {item.available === 1 ? 'Available' : 'Not available'}
            </Text>
            <Text>{item.location}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="heart" size={25} color={'red'} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <View height={'100%'}>
          {!pages.isLoading && favorites.data.length > 0 && (
            <FlatList
              data={favorites.data}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => String(item.id)}
            />
          )}
          {favorites.data.length < 1 && (
            <View
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text fontSize={'2xl'}>No Favorite yet</Text>
              <MiIcon name="pedal-bike" size={200} color={'rgba(0,0,0,0.3)'} />
            </View>
          )}
        </View>
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

export default FavoriteList;
