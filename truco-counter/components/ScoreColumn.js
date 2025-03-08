import React from 'react';
import { View, StyleSheet } from 'react-native';
import Points from './Points';
import { Colors } from '../constants/colors';

const ScoreColumn = ({ pointsGoal, points, markMidLine, team }) => {
  const half = Math.floor(pointsGoal / 2);
  const bads = points >= half ? half : points;
  const goods = points >= half ? points - half : 0;

  return (
    <View style={styles.pointsContainer}>
      <Points totalPoints={half} points={bads} />
      {markMidLine && <View style={styles.divider} />}
      <Points totalPoints={half} points={goods} />
    </View>
  );
};

const styles = StyleSheet.create({
  pointsContainer: {
    flex: 1,
    height: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
    // borderColor: 'white',
    // borderWidth: 1
  },
  divider: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    backgroundColor: '#070B14',
    height: 3,
  },
});

export default ScoreColumn;
