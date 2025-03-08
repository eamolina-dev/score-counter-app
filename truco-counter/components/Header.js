import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TapArea from './TapArea';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';

const Header = ({ points, onPressPoints }) => {
  return (
    <TapArea 
      onPress={onPressPoints}
      style={styles.tapArea}
    >
      <Text style={styles.points}>
        {points}
      </Text>
      <Text style={styles.text}>
        Puntos
      </Text>
    </TapArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapArea: {
    flex: 1,
    // justifyContent: 'center',
  },
  points: {
    fontFamily: 'Russo-One',
    fontSize: 48,
  },
  text: {
    fontFamily: 'Russo-One',
    fontSize: 12,
  },
});

export default Header;
