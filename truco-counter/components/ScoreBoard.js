import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ScoreColumn from './ScoreColumn';
import { Colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const ScoreBoard = ({ points, leftPoints, rightPoints }) => {
  const half = Math.floor(points / 2);
  // const [markMidLine, setMarkMidLine] = useState(false);

  const markMidLine = leftPoints >= half || rightPoints >= half;

  return (
    <View style={styles.container}>
      <ScoreColumn 
        pointsGoal={points} 
        points={leftPoints} 
        markMidLine={markMidLine}
        // team='left'
      />
      {/* <LinearGradient colors={[Colors.red, Colors.green]}> */}
        <View style={styles.divider} />
      {/* </LinearGradient> */}
      <ScoreColumn 
        pointsGoal={points} 
        points={rightPoints} 
        markMidLine={markMidLine}
        // team='right'
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
  // leftSide: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // rightSide: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  divider: {
    backgroundColor: '#070B14',
    height: '100%',
    width: 3,
    alignSelf: 'flex-start' 
  },
});

export default ScoreBoard;
