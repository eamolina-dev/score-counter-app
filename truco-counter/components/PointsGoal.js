import React from 'react';
import { StyleSheet, Text } from 'react-native';
import TapArea from './TapArea';

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapArea: {
    flex: 1,
    justifyContent: 'center',
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

export default PointsGoal;
