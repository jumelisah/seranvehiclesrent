import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useState} from 'react/cjs/react.development';
import CameraImg from '../assets/photo-camera.png';
import Input from '../components/Input';
import Button from '../components/Button';
import Counter from '../components/Counter';
import {
  Center,
  CheckIcon,
  NativeBaseProvider,
  Select,
  Stack,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {addVehicles} from '../redux/actions/vehicles';

const AddVehicles = ({navigation}) => {
  const {auth} = useSelector(state => state);
  const {pages} = useSelector(state => state);
  const {vehicles} = useSelector(state => state);
  const [picture, setPicture] = useState({photo: null});
  const [category, setCategory] = useState();
  const [type, setType] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [cost, setCost] = useState();
  const [year, setYear] = useState();
  const [seat, setSeat] = useState();
  const [location, setLocation] = useState();
  const [qty, setQty] = useState(1);
  const [moduleOption, setModuleOption] = useState(false);
  const [moduleSave, setModuleSave] = useState(false);
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const handlePhotoGallery = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        setPicture({photo: response.assets[0].uri});
        setImage(response.assets);
      }
    });
    setModuleOption(false);
  };
  const handlePhotoCamera = () => {
    const options = {
      noData: true,
    };
    launchCamera(options, response => {
      if (response.assets) {
        setPicture({photo: response.assets[0].uri});
        setImage(response.assets);
      }
    });
    setModuleOption(false);
  };
  const addData = () => {
    const data = {
      name,
      cost,
      year,
      location,
      type,
      category_id: category,
      image,
      seat,
      qty,
    };
    console.log(data)
    setModuleSave(true);
    dispatch(addVehicles(auth.token, data));
  };
  return (
    <NativeBaseProvider>
      <View style={styles.pages}>
        <View style={styles.fullPage}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backIcon}>
              <Icon name="chevron-left" size={30} />
            </TouchableOpacity>
            <Text style={styles.textHeader}>Add new item</Text>
            <TouchableOpacity style={styles.positionEnd}>
              <Text style={styles.textCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formSection}>
            <View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.uploadSection}>
                  <Image
                    source={picture.photo ? {uri: picture.photo} : CameraImg}
                    style={styles.uploadedImg}
                  />
                  <TouchableOpacity
                    style={styles.iconPlus}
                    onPress={() => setModuleOption(true)}>
                    <Icon name="plus" size={20} />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text>Name</Text>
                  <Input
                    type={'line'}
                    placeholder={'Input the product name min. 30 characters'}
                    onChangeText={text => setName(text)}
                  />
                  <Text>Price</Text>
                  <Input
                    type={'line'}
                    placeholder={'Input the product price'}
                    onChangeText={text => setCost(text)}
                  />
                  <Text>Year</Text>
                  <Input
                    type={'line'}
                    placeholder={'Input the product year'}
                    onChangeText={text => setYear(text)}
                  />
                  <Text>Seat</Text>
                  <Input
                    type={'line'}
                    placeholder={'Input the product seat'}
                    onChangeText={text => setSeat(text)}
                  />
                  <Text>Description</Text>
                  <Input
                    type={'line'}
                    placeholder={'Type delivery information'}
                  />
                  <Text>Location</Text>
                  <Input
                    type={'line'}
                    placeholder={'Select location'}
                    onChangeText={text => setLocation(text)}
                  />
                  <Text>Category</Text>
                  <Select
                    selectedValue={category}
                    minWidth="200"
                    accessibilityLabel="Category"
                    placeholder="Select Category"
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderBottomColor={'black'}
                    fontSize={'sm'}
                    selectedItem={{endIcon: <CheckIcon size="5" />}}
                    my={1}
                    onValueChange={itemValue => setCategory(itemValue)}>
                    <Select.Item label="Car" value={1} />
                    <Select.Item label="Motrbike" value={2} />
                    <Select.Item label="Bike" value={3} />
                    <Select.Item label="+ Add category" value={4} />
                  </Select>
                  <Text>Type</Text>
                  <Select
                    selectedValue={type}
                    minWidth="200"
                    accessibilityLabel="Type"
                    placeholder="Select Type"
                    borderWidth={0}
                    borderBottomWidth={1}
                    borderBottomColor={'black'}
                    fontSize={'sm'}
                    selectedItem={{endIcon: <CheckIcon size="5" />}}
                    mt={1}
                    onValueChange={itemValue => setType(itemValue)}>
                    <Select.Item label="Manual" value={1} />
                    <Select.Item label="Matic" value={2} />
                  </Select>
                  <View>
                    <View style={styles.inlineGroup}>
                      <Text style={styles.textMedium}>Available stock :</Text>
                      <View style={styles.positionEnd}>
                        <Counter num={1} />
                      </View>
                    </View>
                    <Button variant={'blue'} onPress={addData}>
                      Save Product
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        {moduleOption && (
          <TouchableOpacity
            style={styles.moduleUpload}
            onPress={() => setModuleOption(false)}>
            <View style={styles.pickOption}>
              <TouchableOpacity
                style={styles.buttonUpload}
                onPress={handlePhotoGallery}>
                <Icon name="picture-o" size={50} style={styles.chooseUpload} />
                <Text style={styles.textOpt}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonUpload}
                onPress={handlePhotoCamera}>
                <Icon name="camera" size={50} style={styles.chooseUpload} />
                <Text style={styles.textOpt}>Camera</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        {moduleSave && (
          <Stack
            position={'absolute'}
            height={'100%'}
            width={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            backgroundColor={'rgba(0,0,0,0.3)'}>
            <TouchableOpacity onPress={() => setModuleSave(false)}>
              <Center backgroundColor={'white'} width={250} height={200} p={4}>
                {pages.isLoading && (
                  <Image
                    source={require('../assets/loading-buffering.gif')}
                    style={{width: 50}}
                  />
                )}
                {!pages.isLoading && (
                  <Text>
                    <Icon
                      name={`${
                        vehicles?.isError ? 'times-circle-o' : 'check-circle-o'
                      }`}
                      size={50}
                    />
                  </Text>
                )}
                <Text>
                  {`${
                    vehicles?.message
                      ? vehicles.message
                      : vehicles?.errMsg
                      ? vehicles.errMsg
                      : 'Loading'
                  }`}
                </Text>
              </Center>
            </TouchableOpacity>
          </Stack>
        )}
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  pages: {
    position: 'relative',
    height: '100%',
  },
  fullPage: {
    padding: 20,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginRight: 10,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  positionEnd: {
    marginStart: 'auto',
  },
  textCancel: {
    color: 'rgba(0,0,0,0.2)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formSection: {
    marginVertical: 30,
  },
  uploadSection: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
  },
  uploadedImg: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  iconPlus: {
    backgroundColor: '#9AD0EC',
    padding: 10,
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  moduleUpload: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%',
  },
  pickOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    // Width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  buttonUpload: {
    padding: 50,
    // paddingVertical: 20,
  },
  chooseUpload: {
    color: '#1572A1',
  },
  textOpt: {
    color: '#1572A1',
    textAlign: 'center',
  },
  inlineGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  textMedium: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddVehicles;
