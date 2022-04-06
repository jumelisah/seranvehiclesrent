import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input, NativeBaseProvider, ScrollView, Text, View} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';

const FilterSearch = ({navigation, route: {params}}) => {
  const [name, setName] = useState(params.name || '');
  const [location, setLocation] = useState(params.location || '');
  const [type, setType] = useState(params.type || '');
  const [minPrice, setMinPrice] = useState(params.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(params.maxPrice || '');
  const [showInputLocation, setShowInputLocation] = useState(false);
  const filterData = [
    {
      id: 1,
      name: 'Your Location',
      value: location ? location : '',
    },
    {id: 2, name: 'Star Rating', value: 'Select'},
    {id: 3, name: 'Price', value: 'Select'},
    {id: 4, name: 'Date', value: 'Jan 18 2021'},
    {
      id: 5,
      name: 'Type',
      value:
        type === 1
          ? 'Cars'
          : type === 2
          ? 'Motorbike'
          : type === 3
          ? 'Bike'
          : 'All',
    },
  ];
  const handleReset = () => {
    setLocation('');
    // setMaxPrice(1000000);
    // setMinPrice(0);
    // setType('');
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <View position={'relative'} height={'100%'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              borderBottomWidth={1}
              borderBottomColor={'rgba(0,0,0,0.2)'}
              px={5}>
              <View flexDirection={'row'}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="chevron-left" size={30} />
                </TouchableOpacity>
                <Text fontSize={'xl'} px={4}>
                  Filter
                </Text>
              </View>
              <View width={120}>
                <Button variant={'blue'} onPress={handleReset}>
                  Reset
                </Button>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => setShowInputLocation(true)}>
                <View
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  p={5}>
                  <Text fontSize={'xl'}>Your Location</Text>
                  <View flexDirection={'row'} alignItems={'center'}>
                    <Text fontSize={'xl'} px={3}>
                      {location}
                    </Text>
                    <Icon name="chevron-right" size={22} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowInputLocation(true)}>
                <View
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  p={5}>
                  <Text fontSize={'xl'}>Star Rating</Text>
                  <View flexDirection={'row'} alignItems={'center'}>
                    <Text fontSize={'xl'} px={3}>
                      Select
                    </Text>
                    <Icon name="chevron-right" size={22} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowInputLocation(true)}>
                <View
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  p={5}>
                  <Text fontSize={'xl'}>Price</Text>
                  <View flexDirection={'row'} alignItems={'center'}>
                    <Text fontSize={'xl'} px={3}>
                      Select
                    </Text>
                    <Icon name="chevron-right" size={22} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowInputLocation(true)}>
                <View
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  p={5}>
                  <Text fontSize={'xl'}>Date</Text>
                  <View flexDirection={'row'} alignItems={'center'}>
                    <Text fontSize={'xl'} px={3}>
                      Jan 18 2021
                    </Text>
                    <Icon name="chevron-right" size={22} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowInputLocation(true)}>
                <View
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  p={5}>
                  <Text fontSize={'xl'}>Type</Text>
                  <View flexDirection={'row'} alignItems={'center'}>
                    <Text fontSize={'xl'} px={3}>
                      {type === 1
                        ? 'Cars'
                        : type === 2
                        ? 'Motorbike'
                        : type === 3
                        ? 'Bike'
                        : 'All'}
                    </Text>
                    <Icon name="chevron-right" size={22} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View p={5}>
            <Button
              variant={'blue'}
              onPress={() =>
                navigation.navigate('Search', {
                  name,
                  location,
                })
              }>
              Apply
            </Button>
          </View>
          {showInputLocation && (
            <View
              position={'absolute'}
              backgroundColor={'rgba(0,0,0,0.2)'}
              width={'100%'}
              height={'100%'}
              justifyContent={'center'}
              alignItems={'center'}>
              <TouchableOpacity onPress={() => setShowInputLocation(false)}>
                <View
                  backgroundColor={'white'}
                  width={250}
                  height={200}
                  p={4}
                  justifyContent={'center'}>
                  <Input
                    size={'xl'}
                    placeholder={'Location'}
                    onChangeText={text => setLocation(text)}
                  />
                  <Button
                    variant={'blue'}
                    onPress={() => setShowInputLocation(false)}>
                    Submit
                  </Button>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default FilterSearch;
