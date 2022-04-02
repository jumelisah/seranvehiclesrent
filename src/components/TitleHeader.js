import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const TitleHeader = ({child, resChild, onPress, user, onAdd}) => {
  return (
    <View style={styles.title}>
      {(user === 'Admin' || user === 'admin') && (
        <TouchableOpacity style={styles.btnPlus} onPress={onAdd}>
          <Text style={styles.plusBtn}>+</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.header}>{child}</Text>
      <TouchableOpacity style={styles.link} onPress={onPress}>
        <Text style={styles.line}>{resChild}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    // display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  link: {
    marginLeft: 'auto',
  },
  line: {
    textDecorationLine: 'underline',
  },
  btnPlus: {
    alignItems: 'center',
  },
  plusBtn: {
    backgroundColor: 'rgb(154, 208, 236)',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 8,
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'bold',
  },
});

export default TitleHeader;
