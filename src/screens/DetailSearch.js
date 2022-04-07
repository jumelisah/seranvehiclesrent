import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../components/Input';
import {useState} from 'react/cjs/react.development';
import {searchVehicles} from '../redux/actions/vehicles';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, Image, NativeBaseProvider, Text, View} from 'native-base';
import LottieView from 'lottie-react-native';
import Button from '../components/Button';
import EnIcon from 'react-native-vector-icons/Entypo';
import TextInput from '../components/TextInput';
import CameraImg from '../assets/photo-camera.png';

const DetailSearch = ({navigation, route: {params}}) => {
  const {auth, vehicles, pages} = useSelector(state => state);
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
    setPage(vehicles.page.currentPage + 1);
    dispatch(searchVehicles({name, page, location}, false));
  };
  return (
    <NativeBaseProvider>
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
        <ScrollView>
          <View
            flexDirection={'column'}
            width={'100%'}
            height={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            pb={150}>
            {!startLoad &&
              vehicles.search.map(item => {
                return (
                  <View key={item.id} width={'100%'} p={5}>
                    <View
                      width={'100%'}
                      height={300}
                      backgroundColor={'white'}
                      borderBottomRadius={'xl'}>
                      <Image
                        source={{uri: item.image}}
                        alt={item.name}
                        size={'2xl'}
                        width={'100%'}
                        height={'65%'}
                        borderTopRadius={'xl'}
                      />
                      <View p={3}>
                        <Text color={'warmGray.400'} fontSize={'md'}>
                          {item.location}, 0.1 miles from your location
                        </Text>
                        <Text fontWeight={'bold'} fontSize={'md'}>
                          {item.name}
                        </Text>
                        <Text
                          fontWeight={'bold'}
                          fontSize={'md'}
                          color={'success.600'}>
                          Available
                        </Text>
                        <View position={'absolute'} bottom={0} right={0} p={3}>
                          <Text fontSize={'md'} fontWeight={'bold'}>
                            Rp. {item.cost.toLocaleString('id-ID')}/day
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            {pages.isLoading && (
              <LottieView
                source={require('../assets/80729-blue-loading.json')}
                autoPlay
                loop
                style={styles.loading}
              />
            )}
            {!pages.isLoading && vehicles.page.next && (
              <TouchableOpacity>
                <View width={200}>
                  <Button variant={'dark'}>
                    <View flexDirection={'row'}>
                      <Text color={'white'} mr={2}>
                        Show More
                      </Text>
                      <EnIcon
                        name="chevron-thin-down"
                        size={20}
                        color={'white'}
                      />
                    </View>
                  </Button>
                </View>
              </TouchableOpacity>
            )}
          </View>
      {/* <View style={styles.input}>
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
          <Icon name="search" size={30} />
        </TouchableOpacity>
        <Input
          value={name}
          variant={'blue'}
          onChangeText={text => setName(text)}
          searchBar
        />
        <TouchableOpacity onPress={() => setName('')} style={styles.clearIcon}>
          <Icon name="times" size={30} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('FilterSearch', {name, location})}
        style={styles.filterBar}>
        <Icon name="filter" size={30} />
        <Text style={styles.textFilter}>Filter</Text>
      </TouchableOpacity>
      <ScrollView>
        <View>
          {vehicles.search?.map(item => {
            return (
              <View key={item.id} style={styles.searchList}>
                <Image
                  source={{uri: item.image}}
                  style={styles.searchListImage}
                />
                <Text style={styles.location}>
                  {item.location}, 4.1 miles from your location
                </Text>
                <Text style={styles.title}>{item.name}</Text>
                <View style={styles.pricing}>
                  <Text style={styles.available}>Available</Text>
                  <Text style={[styles.positionEnd, styles.price]}>
                    Rp. {item.cost?.toLocaleString('id-ID')}/day
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        {vehicles.page?.next !== null && (
          <TouchableOpacity onPress={getMoreData}>
            <View style={styles.linkMore}>
              <Text style={styles.textMore}>Show more</Text>
            </View>
          </TouchableOpacity>
        )} */}
      </ScrollView>
    </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  loading: {
    width: 200,
  },
});
// const styles = StyleSheet.create({
//   fullPage: {
//     position: 'relative',
//     height: '100%',
//     backgroundColor: 'white',
//     paddingTop: 10,
//   },
//   input: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(0,0,0,0.1)',
//     position: 'relative',
//   },
//   searchIcon: {
//     position: 'absolute',
//     top: 20,
//     left: 30,
//     zIndex: 5,
//   },
//   clearIcon: {
//     position: 'absolute',
//     top: 20,
//     right: 30,
//   },
//   filterBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(0,0,0,0.1)',
//   },
//   textFilter: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'rgba(0,0,0,0.5)',
//     marginLeft: 20,
//   },
//   searchList: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderColor: 'rgba(0,0,0,0.2)',
//     borderWidth: 1,
//     borderRadius: 10,
//     height: 330,
//     shadowColor: 'black',
//   },
//   searchListImage: {
//     width: '100%',
//     height: 200,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   location: {
//     color: 'rgba(0,0,0,0.3)',
//     fontSize: 18,
//     padding: 10,
//     fontWeight: 'bold',
//   },
//   pricing: {
//     flexDirection: 'row',
//   },
//   positionEnd: {
//     marginLeft: 'auto',
//   },
//   filterModule: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'white',
//     top: 0,
//   },
//   filterHeader: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   btnWidth: {
//     width: 130,
//   },
//   filterList: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     margin: 20,
//   },
//   fontMedium: {
//     fontSize: 20,
//   },
//   space: {
//     paddingRight: 20,
//   },
//   textBold: {
//     fontWeight: 'bold',
//   },
//   btnFilter: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     paddingHorizontal: 10,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     paddingRight: 10,
//   },
//   available: {
//     color: 'green',
//     paddingLeft: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   linkMore: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     paddingBottom: 30,
//   },
//   textMore: {
//     fontSize: 20,
//   },
// });

export default DetailSearch;
