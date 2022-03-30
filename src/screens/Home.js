import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  // ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Navbar from '../components/Navbar';
import TitleHeader from '../components/TitleHeader';

const Home = ({navigation}) => {
  const data = [
    {id: 1, image: require('../assets/pic1.png')},
    {id: 2, image: require('../assets/pic2.png')},
    {id: 3, image: require('../assets/pic3.png')},
    {id: 4, image: require('../assets/pic4.png')},
  ];
  const renderItem = ({item}) => {
    //the app will represent each list item via a Text component
    return (
      <TouchableOpacity style={styles.coverImage}>
        <Image source={item.image} style={styles.listImage} />
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
            onPress={() => navigation.navigate('DetailSearch')}
          />
          <FlatList
            data={data} //pass in our data array
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <TitleHeader child={'Hot Deals'} resChild={'View more'} />
          <FlatList
            data={data} //pass in our data array
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <TitleHeader child={'Cars'} resChild={'View more'} />
          <FlatList
            data={data} //pass in our data array
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <TitleHeader child={'Bike'} resChild={'View more'} />
          <FlatList
            data={data} //pass in our data array
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <TitleHeader child={'Motorbike'} resChild={'View more'} />
          <FlatList
            data={data} //pass in our data array
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <Navbar />
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
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    margin: 20,
  },
});

export default Home;
