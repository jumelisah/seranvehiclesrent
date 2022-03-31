import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Navbar from '../components/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../components/Input';
import {useState} from 'react/cjs/react.development';
import Button from '../components/Button';

const DetailSearch = ({navigation}) => {
  const [showFilter, setShowFilter] = useState(false);
  const data = [
    {id: 1, name: 'Vespa Matic', image: require('../assets/img1.png')},
    {id: 2, name: 'Vespa Matic', image: require('../assets/img1.png')},
    {id: 3, name: 'Vespa Matic', image: require('../assets/img1.png')},
    {id: 4, name: 'Vespa Matic', image: require('../assets/img1.png')},
  ];
  const filterData = [
    {id: 1, name: 'Your Location', value: 'Sleman'},
    {id: 2, name: 'Star Rating', value: 'Select'},
    {id: 3, name: 'Price', value: 'Select'},
    {id: 4, name: 'Date', value: 'Jan 18 2021'},
    {id: 5, name: 'Type', value: 'Motorbike'},
  ];
  // const filterMenu = ({item}) => {
  //   return (
  //     <TouchableOpacity>
  //       <View style={styles.filterList}>
  //         <Text style={[styles.fontMedium, styles.textBold]}>{item.name}</Text>
  //         <Text style={[styles.fontMedium, styles.positionEnd, styles.space]}>
  //           {item.value}
  //         </Text>
  //         <Icon name="chevron-right" size={24} />
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };
  return (
    <SafeAreaView style={styles.fullPage}>
      <View style={styles.input}>
        <TouchableOpacity style={styles.searchIcon}>
          <Icon name="search" size={30} />
        </TouchableOpacity>
        <Input
          value={'Motorbike - Sleman - Jan 21'}
          variant={'blue'}
          searchBar
        />
        <TouchableOpacity
          onPress={() => alert('Hello')}
          style={styles.clearIcon}>
          <Icon name="times" size={30} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setShowFilter(!showFilter)}
        style={styles.filterBar}>
        <Icon name="filter" size={30} />
        <Text style={styles.textFilter}>Filter</Text>
      </TouchableOpacity>
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
                  <Text style={styles.positionEnd}>Rp. 120.000/day</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Navbar />
      {showFilter && (
        <View style={styles.filterModule}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.filterBar}>
              <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
                <Icon name="chevron-left" size={30} />
              </TouchableOpacity>
              <Text style={styles.textFilter}>Filter</Text>
              <View style={[styles.positionEnd, styles.btnWidth]}>
                <Button variant={'blue'}>Reset</Button>
              </View>
            </View>
            <View>
              {filterData.map(item => {
                return (
                  <TouchableOpacity key={item.id}>
                    <View style={styles.filterList}>
                      <Text style={[styles.fontMedium, styles.textBold]}>
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          styles.fontMedium,
                          styles.positionEnd,
                          styles.space,
                        ]}>
                        {item.value}
                      </Text>
                      <Icon name="chevron-right" size={24} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.btnFilter}>
            <Button variant={'blue'}>Apply</Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullPage: {
    position: 'relative',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 10,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    top: 20,
    left: 30,
  },
  clearIcon: {
    position: 'absolute',
    top: 20,
    right: 30,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  textFilter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.5)',
    marginLeft: 20,
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
  positionEnd: {
    marginLeft: 'auto',
  },
  filterModule: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    top: 0,
  },
  filterHeader: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnWidth: {
    width: 130,
  },
  filterList: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  fontMedium: {
    fontSize: 20,
  },
  space: {
    paddingRight: 20,
  },
  textBold: {
    fontWeight: 'bold',
  },
  btnFilter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default DetailSearch;
