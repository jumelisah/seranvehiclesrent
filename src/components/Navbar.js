import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Navbar = () => {
  const dataNav = [
    {title: 'home', icon: 'home', link: ''},
    {title: 'search', icon: 'search', link: ''},
    {title: 'notification', icon: 'sticky-note-o', link: ''},
    {title: 'profile', icon: 'user', link: ''},
  ];
  return (
    <View style={styles.nav}>
      {dataNav.map(item => {
        return (
          <TouchableOpacity key={item.title} style={styles.menuBar}>
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
    padding: 10,
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
