import React from 'react';
import {View, ScrollView} from 'react-native';
import Navbar from './Navbar';

const Layout = ({child}) => {
  return (
    <View>
      <ScrollView>{child}</ScrollView>
      <Navbar />
    </View>
  );
};

export default Layout;
