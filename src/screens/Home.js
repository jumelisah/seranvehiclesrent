import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  // ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react/cjs/react.development';
import Button from '../components/Button';
import TitleHeader from '../components/TitleHeader';
import {getProfile} from '../redux/actions/auth';
import {
  getVehicles,
  getCars,
  getMotorbike,
  getBike,
} from '../redux/actions/vehicles';
import CameraImg from '../assets/photo-camera.png';

const Home = ({navigation}) => {
  const {auth} = useSelector(state => state);
  const {pages} = useSelector(state => state);
  const {vehicles} = useSelector(state => state);
  const dispatch = useDispatch();
  const data = [
    {id: 1, name: 'Vespa matic', image: require('../assets/pic1.png')},
    {id: 2, image: require('../assets/pic2.png')},
    {id: 3, image: require('../assets/pic3.png')},
    {id: 4, image: require('../assets/pic4.png')},
  ];
  useEffect(() => {
    dispatch(getProfile(auth.token));
    dispatch(getVehicles());
    dispatch(getCars());
    dispatch(getMotorbike());
    dispatch(getBike());
  }, [dispatch, auth.token]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.coverImage}
        onPress={() =>
          navigation.navigate(
            `${
              auth.userData?.role === 'Admin'
                ? 'Detail Vehicle Admin'
                : 'DetailVehicle'
            }`,
            {id: item.id},
          )
        }>
        <Image
          source={item.image ? {uri: item.image} : CameraImg}
          style={styles.listImage}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.fullPage}>
      <ScrollView>
        <Image
          source={require('../assets/home.png')}
          style={styles.headerImage}
        />
        <View style={styles.content}>
          <TitleHeader
            child={'Recommended'}
            resChild={'View more'}
            user={auth.userData?.role}
            onPress={() => navigation.navigate('Search')}
            onAdd={() => navigation.navigate('AddVehicles')}
          />
          <FlatList
            data={vehicles?.data} //pass in our data array
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <TitleHeader
            child={'Hot Deals'}
            user={auth.userData?.role}
            resChild={'View more'}
            onPress={() => navigation.navigate('DetailSearch')}
          />
          <FlatList
            data={vehicles?.cars} //pass in our data array
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <TitleHeader
            child={'Cars'}
            resChild={'View more'}
            user={auth.userData?.role}
            onPress={() => navigation.navigate('DetailSearch')}
          />
          <FlatList
            data={vehicles?.cars} //pass in our data array
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <TitleHeader
            child={'Motorbike'}
            resChild={'View more'}
            user={auth.userData?.role}
            onPress={() => navigation.navigate('DetailSearch')}
          />
          <FlatList
            data={vehicles.motorbike} //pass in our data array
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <TitleHeader
            child={'Bike'}
            resChild={'View more'}
            user={auth.userData?.role}
            onPress={() => navigation.navigate('DetailSearch')}
            onAdd={() => navigation.navigate('AddVehicles')}
          />
          <FlatList
            data={vehicles?.bike} //pass in our data array
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullPage: {
    position: 'relative',
    height: '100%',
    backgroundColor: 'rgba(154, 208, 236, 0.1)',
  },
  headerImage: {
    width: '100%',
  },
  coverImage: {
    width: 300,
    marginRight: 20,
  },
  listImage: {
    flex: 1,
    width: 300,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    margin: 20,
  },
});

export default Home;
