import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from './Button';

const ModalDelete = ({question, deleteAction, cancelAction}) => {
  return (
    <View style={styles.modalDelete}>
      <Text style={styles.warning}>{question}</Text>
      <View>
        <View style={styles.inlineButton}>
          <View style={styles.buttonPart}>
            <Button onPress={cancelAction}>Cancel</Button>
          </View>
          <View style={styles.buttonPart}>
            <Button variant={'blue'} onPress={deleteAction}>
              Delete
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ModalDelete;
