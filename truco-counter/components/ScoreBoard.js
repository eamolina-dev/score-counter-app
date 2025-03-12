import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScoreColumn from './ScoreColumn';
import { Colors } from '../constants/colors';

const ScoreBoard = ({ points, leftPoints, rightPoints }) => {
  const half = Math.floor(points / 2);

  const markMidLine = leftPoints >= half || rightPoints >= half;

  return (
    <View style={styles.scoreboard}>
      {/* <View style={styles.topDivider} /> */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  scoreboard: {
    flex: 1,
  },
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
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    // alignSelf: 'flex-start',
  },
  topDivider: {
    backgroundColor: Colors.lightgrey,
    height: 1,
    width: '100%',
    // alignSelf: 'flex-start' 
  },
});

export default ScoreBoard;
