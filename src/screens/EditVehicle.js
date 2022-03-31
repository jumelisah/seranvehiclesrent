import React from 'react';
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

const EditVehicle = ({navigation}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [available, setAvailable] = useState(true);
  const onConfirmDelete = () => {
    setConfirmDelete(true);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.pages}>
          <View style={styles.topWrapper}>
            <Image source={defaultImage} style={styles.imgStyle} />
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
            <Text>Vespa Matic</Text>
            <Text>Rp. 120.000/day</Text>
            <Text>Max for 2 person</Text>
            <Text>No prepayment</Text>
            <Text>Available</Text>
            <View style={styles.inlineGroup}>
              <Text style={styles.textMedium}>Stock :</Text>
              <View style={styles.positionEnd}>
                <Counter num={10} />
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
          {confirmDelete && (
            <View style={styles.modalFull}>
              <View style={styles.modalDelete}>
                <Text style={styles.warning}>
                  Are you sure want to delete this item?
                </Text>
                <View>
                  <Button onPress={() => setConfirmDelete(false)}>
                    Cancel
                  </Button>
                  <Button variant={'blue'}>Delete</Button>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
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
  modalDelete: {
    width: '100%',
    backgroundColor: '#EFDAD7',
    maxWidth: 300,
    padding: 20,
    borderRadius: 10,
  },
  warning: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
