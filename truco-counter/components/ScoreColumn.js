import React from 'react';
import { View, StyleSheet } from 'react-native';
import Points from './Points';

const ScoreColumn = ({ pointsGoal, points }) => {
  const half = Math.floor(pointsGoal / 2);
  const goods = points - half;

  const fullGroups = Math.floor(half / 5);
  const rest = half % 5;

  return (
    <View style={styles.pointsContainer}>
      <Points fullGroups={fullGroups} rest={rest} points={points} />
      <Points fullGroups={fullGroups} rest={rest} points={points} />
      {/* {points >= half && <Points points={goods} />} */}
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
