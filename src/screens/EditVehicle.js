import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import defaultImage from '../assets/pic6.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react/cjs/react.development';
import Button from '../components/Button';
import Counter from '../components/Counter';
import {SafeAreaView} from 'react-native-safe-area-context';
import ModalDelete from '../components/ModalDelete';
import {useDispatch, useSelector} from 'react-redux';
import {deleteVehicle, getVehicleDetail} from '../redux/actions/vehicles';
import { Stack } from 'native-base';

const EditVehicle = ({navigation, route: {params}}) => {
  const {auth} = useSelector(state => state);
  const {vehicles} = useSelector(state => state);
  const [price, setPrice] = useState(vehicles.vehicle.cost);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [available, setAvailable] = useState(true);
  const dispatch = useDispatch();
  const onConfirmDelete = () => {
    setConfirmDelete(true);
  };
  useEffect(() => {
    dispatch(getVehicleDetail(params.id));
  }, [dispatch, params.id]);
  const handleDelete = () => {
    dispatch(deleteVehicle(auth.token, params.id));
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView>
      <View style={styles.pages}>
        <ScrollView>
          <View style={styles.topWrapper}>
            <Image
              source={{uri: vehicles.vehicle?.image} || defaultImage}
              style={styles.imgStyle}
            />
            <TouchableOpacity
              style={styles.headerLeft}
              onPress={() => navigation.goBack()}>
              <Icon style={styles.textWhite} name="chevron-left" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deleteBtn, styles.headerRight]}
              onPress={onConfirmDelete}>
              <Icon name="trash-o" size={18} />
            </TouchableOpacity>
          </View>
          <View>
            <Text>{vehicles.vehicle.name}</Text>
            <Text>Rp. {vehicles.vehicle.cost}/day</Text>
            <Text>Max for {vehicles.vehicle.seat} person</Text>
            <Text>No prepayment</Text>
            <Text>Available</Text>
            <View style={styles.inlineGroup}>
              <Text style={styles.textMedium}>Stock :</Text>
              <View style={styles.positionEnd}>
                <Counter num={vehicles.vehicle.qty} />
              </View>
            </View>
            <View style={styles.inlineButton}>
              <View style={styles.buttonPart}>
                <Button
                  variant={`${available ? 'blue' : ''}`}
                  textUnactive={`${available ? '' : 'Unactive'}`}
                  onPress={() => setAvailable(true)}>
                  Available
                </Button>
              </View>
              <View style={styles.buttonPart}>
                <Button
                  variant={`${!available ? 'blue' : ''}`}
                  textUnactive={`${available ? 'Unactive' : ''}`}
                  onPress={() => setAvailable(false)}>
                  Full Book
                </Button>
              </View>
            </View>
            <Button variant={'dark'}>Update Changes</Button>
          </View>
        </ScrollView>
        {confirmDelete && (
          <View style={styles.modalFull}>
            <ModalDelete
              question={'Are you sure want to delete this item?'}
              deleteAction={handleDelete}
              cancelAction={() => setConfirmDelete(false)}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pages: {
    position: 'relative',
    height: '100%',
  },
  topWrapper: {
    position: 'relative',
  },
  imgStyle: {
    width: '100%',
    height: 300,
  },
  headerLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  headerRight: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  textWhite: {
    color: 'white',
  },
  deleteBtn: {
    backgroundColor: '#9AD0EC',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  modalFull: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  positionEnd: {
    marginStart: 'auto',
  },
  inlineButton: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  buttonPart: {
    width: '50%',
    padding: 10,
  },
  textMedium: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EditVehicle;
