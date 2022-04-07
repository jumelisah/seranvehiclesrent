import React, {useEffect} from 'react';
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
import {NativeBaseProvider, Radio, Stack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {editProfile, getProfile} from '../redux/actions/auth';

const EditProfile = ({navigation}) => {
  const {auth} = useSelector(state => state);
  const {pages} = useSelector(state => state);
  const [picture, setPicture] = useState();
  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState();
  const [dataUser, setDataUser] = useState({
    name: auth.userData?.name,
    email: auth.userData?.email,
    phone_number: auth.userData?.phone_number,
    address: auth.userData?.address,
    birthdate: auth.userData?.birthdate,
    gender: auth.userData?.gender,
  });
  const [moduleOption, setModuleOption] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile(auth?.token));
  }, [auth.token, dispatch]);
  const handlePhotoGallery = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        setPicture(response.assets[0].uri);
        setFileName(response.assets[0].fileName);
        setFileType(response.assets[0].type);
        console.log(response);
        console.log(picture);
        console.log(fileName);
        console.log(fileType);
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
        setPicture(response.assets[0].uri);
      }
    });
    setModuleOption(false);
  };
  const updateProfile = async () => {
    const data = {
      name: dataUser.name,
      email: dataUser.email,
      phone_number: dataUser.phone_number,
      address: dataUser.address,
      // birthdate: dataUser.birthdate,
      fileName,
      fileType,
      picture,
    };
    console.log(dataUser);
    dispatch(editProfile(auth.token, data));
    await dispatch(getProfile(auth?.token));
  };
  const Example = () => {
    return (
      <Radio.Group
        name="exampleGroup"
        defaultValue="1"
        accessibilityLabel="Choose gender">
        <Stack
          direction={{
            base: 'row',
            md: 'row',
          }}
          alignItems="center"
          justifyContent="center"
          marginVertical={20}
          space={4}
          w="100%">
          <Radio
            value="1"
            colorScheme="blue"
            size="lg"
            my={1}
            selected={() => setDataUser({gender: 'Male'})}>
            Male
          </Radio>
          <Radio
            value="2"
            colorScheme="blue"
            size="lg"
            my={1}
            selected={() => setDataUser({gender: 'Male'})}>
            Female
          </Radio>
        </Stack>
      </Radio.Group>
    );
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
                    source={
                      picture
                        ? {uri: picture}
                        : auth.userData?.image
                        ? {uri: auth.userData.image}
                        : {CameraImg}
                    }
                    style={styles.uploadedImg}
                  />
                  <TouchableOpacity
                    style={styles.iconPlus}
                    onPress={() => setModuleOption(true)}>
                    <Icon name="plus" size={20} />
                  </TouchableOpacity>
                </View>
                <Example />
                <View>
                  <Text>Name</Text>
                  <Input
                    variant={'transparent'}
                    placeholder={
                      dataUser.name !== 'undefined'
                        ? dataUser.name
                        : 'Input your name'
                    }
                    onChangeText={text => setDataUser({name: text})}
                  />
                  <Text>Email Address</Text>
                  <Input
                    variant={'transparent'}
                    placeholder={dataUser.email || 'Input yur email'}
                    onChangeText={text => setDataUser({email: text})}
                  />
                  <Text>Phone Number</Text>
                  <Input
                    variant={'transparent'}
                    placeholder={
                      dataUser.phone_number || 'Input your phone number'
                    }
                    onChangeText={text => setDataUser({phone_number: text})}
                  />
                  <Text>Date of Birth</Text>
                  <Input
                    variant={'transparent'}
                    placeholder={dataUser.birthdate || 'Input your birthdate'}
                    onChangeText={text => setDataUser({birthdate: text})}
                  />
                  <Text>Delivery Address</Text>
                  <Input
                    variant={'transparent'}
                    placeholder={dataUser.address || 'Input your address'}
                    onChangeText={text => setDataUser({address: text})}
                  />
                  <View>
                    {/* <View style={styles.inlineGroup}>
                      <Text style={styles.textMedium}>Available stock :</Text>
                      <View style={styles.positionEnd}>
                        <Counter num={1} />
                      </View>
                    </View> */}
                    <Button variant={'blue'} onPress={() => updateProfile()}>
                      Save Change
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

export default EditProfile;
