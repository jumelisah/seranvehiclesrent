import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {View} from 'native-base';
import ImageDefault from '../assets/photo-camera.png';

const ImageTbn = ({source}) => {
  const [imageSrc, setImageSrc] = useState();
  useEffect(() => {
    if (source) {
      setImageSrc({uri: source});
    }
  }, [source]);
  const onErrorSource = () => {
    setImageSrc(ImageDefault);
  };
  return (
    <View width={120}>
      <Image
        source={imageSrc}
        alt={'halo'}
        style={styles.imgthumb}
        onError={onErrorSource}
      />
    </View>
  );
};

export default ImageTbn;

const styles = StyleSheet.create({
  imgthumb: {
    width: 120,
    height: 100,
    borderRadius: 10,
  },
});
