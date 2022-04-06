import React from 'react';
import {Box, Text, View} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const Rating = () => {
  return (
    <View>
      <Box
        bg={{
          linearGradient: {
            colors: ['#1572A1', '#9AD0EC'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        px={2}
        py={1}
        mr={2}
        rounded="xl">
        <View flexDirection={'row'}>
          <Text color={'white'} pr={1}>
            4.5
          </Text>
          <Icon name="star" size={18} color={'white'} />
        </View>
      </Box>
    </View>
  );
};

export default Rating;
