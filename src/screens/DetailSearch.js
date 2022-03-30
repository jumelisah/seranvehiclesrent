import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Navbar from '../components/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailSearch = ({navigation}) => {
  const data = [
    {id: 1, name: 'Vespa Matic', image: require('../assets/img1.png')},
    {id: 2, name: 'Vespa Matic', image: require('../assets/img1.png')},
    {id: 3, name: 'Vespa Matic', image: require('../assets/img1.png')},
    {id: 4, name: 'Vespa Matic', image: require('../assets/img1.png')},
  ];
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity>
        <Image source={item.image} />
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.fullPage}>
      <View style={styles.filterBar}>
        <Icon name="filter" size={30} />
        <Text>Filter</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          {data.map(item => {
            return (
              <View key={item.id} style={styles.searchList}>
                <Image source={item.image} style={styles.searchListImage} />
                <Text style={styles.location}>
                  Sudirman, 4.1 miles from your location
                </Text>
                <Text>{item.name} (Max. 2 person)</Text>
                <View style={styles.pricing}>
                  <Text>No prepayment</Text>
                  <Text style={styles.text}>Rp. 120.000/day</Text>
                </View>
              </View>
            );
          })}
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
  filterBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
  },
  searchList: {
    margin: 20,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
  },
  searchListImage: {
    width: '100%',
    maxHeight: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  location: {
    color: 'rgba(0,0,0,0.3)',
    fontSize: 18,
    padding: 10,
    fontWeight: 'bold',
  },
  pricing: {
    flexDirection: 'row',
  },
  text: {
    marginLeft: 'auto',
  },
});

export default DetailSearch;
