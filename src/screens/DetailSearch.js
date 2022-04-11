import React, {useEffect} from 'react';
import {SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react/cjs/react.development';
import {searchVehicles} from '../redux/actions/vehicles';
import {useDispatch, useSelector} from 'react-redux';
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

const DetailSearch = ({navigation, route: {params}}) => {
  const {vehicles, pages} = useSelector(state => state);
  const [name, setName] = useState(params?.name ? params?.name : '');
  const [location, setLocation] = useState(
    params?.location ? params.location : '',
  );
  const [category, setCategory] = useState(params?.category || '');
  const [minPrice, setMinPrice] = useState(params?.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(params?.maxPrice || 1000000);
  const [type, setType] = useState(params?.type || '');
  const [page, setPage] = useState(1);
  const [startLoad, setStartLoad] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchVehicles({name, location}));
  }, [dispatch, name, location]);
  const handleSearch = () => {
    setStartLoad(true);
    dispatch(searchVehicles({name, location}, true));
    setStartLoad(false);
  };
  const getMoreData = () => {
    if (vehicles.page.next !== null) {
      setPage(vehicles.page.currentPage + 1);
      dispatch(searchVehicles({name, page, location}, false));
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
              onPress={() => navigation.navigate('FilterSearch', {name})}>
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
        {!pages.isLoading && vehicles.search.length > 0 && (
          <FlatList
            data={vehicles.search}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            onEndReached={getMoreData}
            onEndReachedThreshold={0.5}
          />
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

export default DetailSearch;
