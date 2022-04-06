import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {
  NativeBaseProvider,
  Checkbox,
  Box,
  HStack,
  Heading,
  VStack,
  Image,
  View,
  Text,
} from 'native-base';

const History = () => {
  const data = [
    {id: 1, image:"https://res.cloudinary.com/juumelisa/image/upload/v1648448571/SERAN/uploads/vehicles/vehicles-1648448568547.png"},
    {id: 2, image:"https://res.cloudinary.com/juumelisa/image/upload/v1648448571/SERAN/uploads/vehicles/vehicles-1648448568547.png"},
    {id: 3, image:"https://res.cloudinary.com/juumelisa/image/upload/v1648448571/SERAN/uploads/vehicles/vehicles-1648448568547.png"},
    {id: 4, image:"https://res.cloudinary.com/juumelisa/image/upload/v1648448571/SERAN/uploads/vehicles/vehicles-1648448568547.png"},
  ];
  const [choosenId, setChoosenId] = React.useState([1, 3]);
  const getSelectedId = () => {
    if (choosenId.length === 0) {
      return '[]';
    } else {
      let arrayString = choosenId.reduce(
        (accumulator, currentValue) => accumulator + ', ' + currentValue,
      );
      return `[ ${arrayString} ]`;
    }
  };
  const Example = () => {
    const [groupValue, setGroupValue] = React.useState([]);
  
    const getSelectedGroupValue = () => {
      if (groupValue.length === 0) return "[]";
      let arrayString = groupValue.reduce((accumulator, currentValue) => accumulator + ", " + currentValue);
      return "[" + arrayString + "]";
    };
  
    return <Box display="flex" justifyContent="space-between" alignItems="center">
        <HStack mb={3} alignItems="baseline">
          <Heading mt={3}>CheckboxGroup </Heading>
        </HStack>
        <Checkbox.Group colorScheme="green" defaultValue={groupValue} onChange={values => {
        setGroupValue(values || []);
      }}>
          <Checkbox value="Item 1" my={1}>
            Item 1
          </Checkbox>
          <Checkbox value="Item 2" my={1}>
            Item 2
          </Checkbox>
          <Checkbox value="Item 3" my={1}>
            Item 3
          </Checkbox>
          <Checkbox colorScheme="orange" isIndeterminate value="Indeterminate Item" my={1}>
            Indeterminate Item
          </Checkbox>
        </Checkbox.Group>
        <VStack mt={3}>
          <Box>
            <Text fontSize="md">Selected Values: </Text>
            <Text fontSize="md" bold>
              {getSelectedGroupValue()}
            </Text>
          </Box>
        </VStack>
      </Box>;
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <ScrollView>
          <Text style={styles.header}>History Order</Text>
          <View>
            <View>
              <Example />
              <Text>A week ago</Text>
            </View>
            <View>
              <Text>A month ago</Text>
            </View>
          </View>
          <View>
            <Checkbox.Group
              colorScheme="green"
              defaultValue={choosenId}
              onChange={values => {
                setChoosenId(values || []);
              }}>
              {data.map(item => {
                return (
                  <View
                    key={item.id}
                    display="flex"
                    // flexDirection="row-reverse"
                    justifyContent="space-between"
                    w={'100%'}
                    p={5}>
                    <Checkbox
                      value={item.id}
                      my={1}
                      id={item.id}
                      flexDirection={'row-reverse'}
                      width={'100%'}>
                      <View flexDirection={'row'} alignItems={'center'}>
                        <Image
                          source={{uri: item.image}}
                          alt="lamborghini"
                          height={100}
                          width={100}
                        />
                        <View>
                          <Text>Vespa Matic</Text>
                          <Text>Jan 18 2021 to Jan 21 2021</Text>
                        </View>
                      </View>
                    </Checkbox>
                  </View>
                );
              })}
              <View>
                <Text>{getSelectedId()}</Text>
              </View>
            </Checkbox.Group>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 40,
  },
});

export default History;
