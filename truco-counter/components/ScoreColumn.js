import React from 'react';
import { View, StyleSheet } from 'react-native';
import Points from './Points';

const ScoreColumn = ({ pointsGoal, points }) => {
  const half = Math.floor(pointsGoal / 2);
  const bads = points >= half ? half : points;
  const goods = points >= half ? points - half : 0;

  return (
    <View style={styles.pointsContainer}>
      <Points totalPoints={half} points={bads} />
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
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default ScoreColumn;
