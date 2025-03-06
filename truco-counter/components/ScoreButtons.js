import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../constants/colors';
import TapArea from './TapArea';

const ScoreButtons = ({ onPressPlus, onPressMinus }) => {
  return (
    <View style={styles.buttons}>
      <TapArea 
        onPress={onPressPlus} 
      >
        <View style={[styles.button, styles.plusButton]}>
          <FontAwesome name='plus' size={32} color='black' />
        </View>
      </TapArea>
      <TapArea 
        onPress={onPressMinus} 
      >
        <View style={[styles.button, styles.minusButton]}>
          <FontAwesome name='minus' size={32} color='black' />
        </View>
      </TapArea>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  plusButton: {
    borderColor: Colors.newgreen,
    borderWidth: 5,
  },
  minusButton: {
    borderColor: Colors.newred,
    borderWidth: 5,
  },
});

export default ScoreButtons;
