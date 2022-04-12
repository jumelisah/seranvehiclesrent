import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ArrowForwardIcon,
  CheckIcon,
  ChevronRightIcon,
  Input,
  NativeBaseProvider,
  ScrollView,
  Select,
  Text,
  View,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';

const FilterSearch = ({navigation, route: {params}}) => {
  const [name, setName] = useState(params.name || '');
  const [location, setLocation] = useState(params.location || '');
  const [type, setType] = useState(params.type || '');
  const [minPrice, setMinPrice] = useState(params.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(params.maxPrice || 10000000);
  const [sortBy, setSortBy] = useState(params?.sortBy || 'id+DESC');
  const [showInputLocation, setShowInputLocation] = useState(false);
  const [showInputPrice, setShowInputPrice] = useState(false);
  const handleReset = () => {
    setLocation('');
    setMaxPrice(1000000);
    setMinPrice(0);
    setSortBy('id+DESC');
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
                      {location ? location : 'Select'}
                    </Text>
                    <Icon name="chevron-right" size={22} />
                  </View>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => setShowInputLocation(true)}>
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
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => setShowInputPrice(true)}>
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
              {/* <TouchableOpacity onPress={() => setShowInputPrice(true)}>
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
              </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={() => setShowInputLocation(true)}>
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
              </TouchableOpacity> */}
              <View
                p={5}
                flexDirection={'row'}
                width={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Text fontSize={'xl'} width={'40%'}>
                  Sort By
                </Text>
                <View width={'60%'}>
                  <Select
                    selectedValue={sortBy}
                    accessibilityLabel="Sort by"
                    placeholder="Select"
                    textAlign={'right'}
                    borderWidth={0}
                    borderBottomColor={'black'}
                    fontSize={'xl'}
                    selectedItem={{endIcon: <CheckIcon size="10" />}}
                    onValueChange={itemValue => setSortBy(itemValue)}>
                    <Select.Item label="Newest" value={'id+DESC'} />
                    <Select.Item label="Lowest price" value={'cost+ASC'} />
                    <Select.Item label="Highest price" value={'cost+DESC'} />
                    {/* <Select.Item label="+ Add category" value={4} /> */}
                  </Select>
                </View>
              </View>
            </View>
          </ScrollView>
          <View p={5}>
            <Button
              variant={'blue'}
              onPress={() =>
                navigation.navigate('Search', {
                  name,
                  location,
                  cost_min: minPrice,
                  cost_max: maxPrice,
                  sortBy,
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
                    value={location}
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
          {showInputPrice && (
            <View
              position={'absolute'}
              backgroundColor={'rgba(0,0,0,0.2)'}
              width={'100%'}
              height={'100%'}
              justifyContent={'center'}
              alignItems={'center'}>
              <TouchableOpacity onPress={() => setShowInputPrice(false)}>
                <View
                  backgroundColor={'white'}
                  width={250}
                  height={200}
                  p={4}
                  justifyContent={'center'}>
                  <Input
                    size={'xl'}
                    value={minPrice}
                    placeholder={'Minimum price'}
                    onChangeText={text => setMinPrice(text)}
                    keyboardType={'numeric'}
                  />
                  <Input
                    size={'xl'}
                    value={maxPrice}
                    placeholder={'Maximum price'}
                    onChangeText={text => setMaxPrice(text)}
                    keyboardType={'numeric'}
                  />
                  <Button
                    variant={'blue'}
                    onPress={() => setShowInputPrice(false)}>
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
