import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const TitleHeader = ({child, resChild, onPress}) => {
  return (
    <View style={styles.title}>
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
});

export default TitleHeader;
