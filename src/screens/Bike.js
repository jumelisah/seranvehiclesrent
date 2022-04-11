import React, {useEffect} from 'react';
import {SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react/cjs/react.development';
import {getBike} from '../redux/actions/vehicles';
import {useDispatch, useSelector} from 'react-redux';
import {
  Box,
  FlatList,
  Image,
  NativeBaseProvider,
  Text,
  View,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const BikeList = ({navigation}) => {
  const {vehicles, pages} = useSelector(state => state);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBike());
  }, [dispatch]);
  const getMoreData = () => {
    if (vehicles.page.next !== null) {
      setPage(page + 1);
      dispatch(getBike(page, false));
    }
  };
  const config = {
    dependencies: {
      'linear-gradient': LinearGradient,
    },
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailVehicle', {id: item.id})}>
        <View
          mx={5}
          pt={5}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <View flexDirection={'row'}>
            <View>
              <Image
                source={{uri: item.image}}
                alt={item.name}
                width={120}
                height={100}
                borderRadius={'xl'}
              />
              <View height={20} position={'absolute'} right={-20} top={-15}>
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
              </View>
            </View>
            <View px={5}>
              <Text fontWeight={'bold'}>{item.name}</Text>
              <Text>Max for {item.seat} person</Text>
              <Text>2.1 km from your location</Text>
              <Text
                fontWeight={'bold'}
                color={item.qty > 2 ? 'green.600' : 'rose.600'}>
                {item.qty > 2
                  ? 'Available'
                  : item.qty > 0
                  ? `${item.qty} vehicles left`
                  : 'Not available'}
              </Text>
              <Text fontWeight={'bold'}>
                Rp. {item.cost.toLocaleString('id-ID')}/day
              </Text>
              <Text fontWeight={'bold'} color={'success.600'}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <NativeBaseProvider config={config}>
      <SafeAreaView>
        {!pages.isLoading && vehicles.bike.length > 0 && (
          <View py={5}>
            <FlatList
              data={vehicles.bike}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              onEndReached={getMoreData}
              onEndReachedThreshold={0.5}
            />
          </View>
        )}
        {pages.isLoading && (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              marginLeft={20}
              marginTop={20}>
              <SkeletonPlaceholder.Item
                width={100}
                height={100}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={180}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={80}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              marginLeft={20}
              marginTop={20}>
              <SkeletonPlaceholder.Item
                width={100}
                height={100}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={180}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={80}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              marginLeft={20}
              marginTop={20}>
              <SkeletonPlaceholder.Item
                width={100}
                height={100}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={180}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={80}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              marginLeft={20}
              marginTop={20}>
              <SkeletonPlaceholder.Item
                width={100}
                height={100}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={180}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={80}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              marginLeft={20}
              marginTop={20}>
              <SkeletonPlaceholder.Item
                width={100}
                height={100}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={180}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={80}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={15}
                  borderRadius={8}
                  marginBottom={5}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  loading: {
    width: 200,
  },
});

export default BikeList;
