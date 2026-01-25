import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const VSComponent = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../imagenes/versus.png')} 
        style={styles.vsImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsImage: {
    width: 60,
    height: 60,
  },
});

export default VSComponent;