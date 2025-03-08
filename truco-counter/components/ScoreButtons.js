import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../constants/colors';
import TapArea from './TapArea';
import { FontAwesome6 } from "@expo/vector-icons";

const ScoreButtons = ({ leftButton, rightButton, onPressLeft, onPressRight, color }) => {
  return (
    <View style={styles.buttons}>
      <TapArea onPress={onPressLeft}>
        <View style={[styles.button, styles.minusButton]}>
          <FontAwesome6 name={leftButton} size={32} color={color} />
        </View>
      </TapArea>
      <TapArea onPress={onPressRight}>
        <View style={[styles.button, styles.plusButton]}>
          <FontAwesome6 name={rightButton} size={32} color={color} />
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
    borderColor: Colors.green,
    borderWidth: 5,
    // border: 0.9,
  },
  minusButton: {
    borderColor: Colors.red,
    borderWidth: 5,
    // opacity: 0.7
  },
});

export default ScoreButtons;
