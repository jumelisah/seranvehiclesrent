import React, {useEffect} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react/cjs/react.development';
import {searchVehicles} from '../redux/actions/vehicles';
import {useDispatch, useSelector} from 'react-redux';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Box,
  FlatList,
  Image,
  NativeBaseProvider,
  Text,
  View,
} from 'native-base';
import TextInput from '../components/TextInput';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { NavigationRouteContext } from '@react-navigation/native';

const DetailSearch = ({navigation, route: {params}}) => {
  const {auth, vehicles, pages} = useSelector(state => state);
  const [name, setName] = useState(params?.name ? params?.name : '');
  const location = params?.location || '';
  const category = params?.category || '';
  const minPrice = params?.cost_min || 0;
  const maxPrice = params?.cost_max || 1000000;
  const sortBy = params?.sortBy || 'id+DESC';
  const type = params?.type || '';
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchVehicles({
        name,
        location,
        cost_max: maxPrice,
        cost_min: minPrice,
        type,
        category,
        sortBy,
      }),
    );
  }, [dispatch, name, location, maxPrice, minPrice, category, sortBy, type]);
  const handleSearch = () => {
    dispatch(
      searchVehicles({
        name,
        location,
        cost_max: maxPrice,
        cost_min: minPrice,
        type,
        category,
        sortBy,
      }),
    );
  };
  const getMoreData = () => {
    if (vehicles.page.next !== null) {
      setPage(page + 1);
      dispatch(
        searchVehicles(
          {
            name,
            page,
            location,
            cost_min: minPrice,
            cost_max: maxPrice,
            type,
            category,
            sortBy,
          },
          false,
        ),
      );
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
        onPress={() => {
          if (auth.userData.role === 'User') {
            navigation.navigate('DetailVehicle', {id: item.id});
          } else {
            navigation.navigate('Detail Vehicle Admin', {id: item.id});
          }
        }}>
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
              <Text>{item.location}</Text>
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
        <View px={5} pt={5}>
          <TextInput
            placeholder={'Search here'}
            value={name}
            iconLeft={
              <TouchableOpacity>
                <View ml={2}>
                  <Icon name="search" size={30} />
                </View>
              </TouchableOpacity>
            }
            onChangeText={text => setName(text)}
            icon={
              <TouchableOpacity onPress={() => setName('')}>
                <View mr={2}>
                  <Icon name="times" size={30} />
                </View>
              </TouchableOpacity>
            }
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FilterSearch', {
                  name,
                  location,
                  sortBy,
                  minPrice,
                  maxPrice,
                });
              }}>
              <View
                flexDirection={'row'}
                alignItems={'center'}
                py={2}
                borderBottomWidth={1}
                borderBottomColor={'warmGray.300'}>
                <Icon name="filter" size={25} />
                <Text ml={2} fontSize={'xl'}>
                  Filter
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {vehicles.search.length > 0 && (
          <FlatList
            data={vehicles.search}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            onEndReached={getMoreData}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, index) => String(item.id)}
            refreshing={pages.isLoading}
            onRefresh={handleSearch}
          />
        )}
        {!pages.isLoading && vehicles.search.length < 1 && (
          <View width={'100%'} height={'100%'}>
            <View
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text fontSize={'2xl'}>No data</Text>
              <MiIcon name="pedal-bike" size={200} color={'rgba(0,0,0,0.3)'} />
            </View>
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

export default DetailSearch;
