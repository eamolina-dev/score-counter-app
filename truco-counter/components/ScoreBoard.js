import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScoreColumn from './ScoreColumn';
import { Colors } from '../constants/colors';

const ScoreBoard = ({ points, leftPoints, rightPoints }) => {
  const half = Math.floor(points / 2);

  const markMidLine = leftPoints >= half || rightPoints >= half;

  return (
    <View style={styles.container}>
      <ScoreColumn 
        pointsGoal={points} 
        points={leftPoints} 
        markMidLine={markMidLine}
      />
        <View style={styles.divider} />
      <ScoreColumn 
        pointsGoal={points} 
        points={rightPoints} 
        markMidLine={markMidLine}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: Colors.darkblue,
    height: '100%',
    width: 3,
    alignSelf: 'flex-start' 
  },
});

export default ScoreBoard;
