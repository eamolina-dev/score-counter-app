import React from 'react';
import { View, StyleSheet } from 'react-native';
import Match from '../assets/svg/match.svg';

const PointsGroup = ({ points, height = 100, width = 100 }) => {
  const scale = height / 100;

  const Group = ({ style, tilt }) => {
    return (
      <Match 
        height={64 * scale} 
        width={64 * scale} 
        style={[style, { transform: [{ rotate: tilt }] }]}
      />
    );
  };

  return (
    <View style={[styles.pointsGroup, { height, width }]}>
      <Group
        style={[styles.match1, { opacity: points >= 1 ? 0.9 : 0, top: 10 * scale, left: -11 * scale }]}
        tilt="0deg"
      />
      <Group
        style={[styles.match2, { opacity: points >= 2 ? 0.9 : 0, top: -19 * scale, left: 23 * scale }]}
        tilt="90deg"
      />
      <Group
        style={[styles.match3, { opacity: points >= 3 ? 0.9 : 0, top: 20 * scale, left: 48 * scale }]}
        tilt="180deg"
      />
      <Group
        style={[styles.match4, { opacity: points >= 4 ? 0.9 : 0, top: 51 * scale, left: 14 * scale }]}
        tilt="270deg"
      />
      <Group
        style={[styles.match5, { opacity: points >= 5 ? 0.9 : 0, top: 13 * scale, left: 22 * scale }]}
        tilt="45deg"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pointsGroup: {
    position: 'relative',
    alignSelf: 'stretch',
  },
  match1: { position: 'absolute' },
  match2: { position: 'absolute' },
  match3: { position: 'absolute' },
  match4: { position: 'absolute' },
  match5: { position: 'absolute' },
});

export default PointsGroup;
