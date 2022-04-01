import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  const dataNav = [
    {title: 'home', icon: 'home', screen: 'Home'},
    {title: 'search', icon: 'search', screen: 'DetailSearch'},
    {title: 'notification', icon: 'sticky-note-o', screen: 'History'},
    {title: 'profile', icon: 'user', screen: 'EditProfile'},
  ];
  return (
    <View style={styles.nav}>
      {dataNav.map(item => {
        return (
          <TouchableOpacity
            key={item.title}
            style={styles.menuBar}
            onPress={() => navigation.navigate(item.screen)}>
            <Text
              style={[
                styles.menuList,
                item.title === 'home' ? styles.active : '',
              ]}>
              <Icon name={item.icon} size={20} />
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  menuBar: {
    width: '25%',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuList: {
    // flex: 1,
    textAlign: 'center',
    padding: 10,
  },
  active: {
    borderRadius: 10,
    backgroundColor: '#9AD0EC',
    color: '#1572A1',
  },
});
