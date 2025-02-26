import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../constants/colors';

const ScoreButtons = ({ onPressPlus, onPressMinus }) => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity onPress={onPressPlus} style={[styles.button, styles.plusButton]} >
        <FontAwesome name='plus' size={32} color='black' />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressMinus} style={[styles.button, styles.minusButton]} >
        <FontAwesome name='minus' size={32} color='black' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    height: '20%',
    paddingTop: 24,
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
  },
  button: {
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8
  },
  plusButton: {
    backgroundColor: Colors.green,
  },
  minusButton: {
    backgroundColor: Colors.red,
  },
});

export default ScoreButtons;