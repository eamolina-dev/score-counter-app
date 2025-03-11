import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';

const CustomButton = ({ text, handleOnPress }) => {
  return (
    <TouchableOpacity onPress={handleOnPress} style={[styles.button]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.blue,
    height: 56,
    width: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20
  },
});

export default CustomButton;
