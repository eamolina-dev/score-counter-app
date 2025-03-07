import React from 'react';
import { View, StyleSheet } from 'react-native';
import Match from '../assets/svg/match.svg';

const PointsGroup = ({ points, height, width }) => {
  const Group = ({ style, tilt }) => {
    return (
      <Match 
        height={64} 
        width={64} 
        style={style}
        transform={[{ rotate: tilt }]}
      />
    );
  };

  return (
    <View style={[styles.pointsGroup, { height, width }]}>
      <Group
        style={[styles.match1, { opacity: points >= 1 ? 1 : 0 }]}
        tilt="0deg"
      />
      <Group
        style={[styles.match2, { opacity: points >= 2 ? 1 : 0 }]}
        tilt="90deg"
      />
      <Group
        style={[styles.match3, { opacity: points >= 3 ? 1 : 0 }]}
        tilt="180deg"
      />
      <Group
        style={[styles.match4, { opacity: points >= 4 ? 1 : 0 }]}
        tilt="270deg"
      />
      <Group
        style={[styles.match5, { opacity: points >= 5 ? 1 : 0 }]}
        tilt="45deg"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pointsGroup: {
    position: 'relative',
    alignSelf: 'stretch',
    borderColor: 'yellow',
    borderWidth: 2,
  },
  match1: {
    position: 'absolute',
    top: 10,
    left: -11,
  },
  match2: {
    position: 'absolute',
    top: -19,
    left: 23,
  },
  match3: {
    position: 'absolute',
    top: 20,
    left: 48,
  },
  match4: {
    position: 'absolute',
    top: 51,
    left: 14,
  },
  match5: {
    position: 'absolute',
    top: 13,
    left: 22,
  },
});

export default PointsGroup;
