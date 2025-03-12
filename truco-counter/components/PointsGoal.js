import React from 'react';
import { StyleSheet, Text } from 'react-native';
import TapArea from './TapArea';
import { Colors } from '../constants/colors';

const PointsGoal = ({ points, onPressPoints }) => {
  return (
    <TapArea 
      onPress={onPressPoints}
      style={styles.tapArea}
    >
      <Text style={styles.points}>
        {points}
      </Text>
    </TapArea>
  );
};

const styles = StyleSheet.create({
  tapArea: {
    flex: 1,
    justifyContent: 'center',
  },
  points: {
    fontFamily: 'Russo-One',
    fontSize: 48,
    borderColor: Colors.yellow,
    textShadowColor: Colors.yellow,
    textShadowRadius: 3,
    color: Colors.darkblue
  },
});

export default PointsGoal;
