import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScoreColumn from './ScoreColumn';

const ScoreBoard = ({ points, leftPoints, rightPoints }) => {
  return (
    <View style={styles.container}>
      <ScoreColumn 
        pointsGoal={points} 
        points={leftPoints} 
      />
      <View style={styles.divider} />
      <ScoreColumn 
        pointsGoal={points} 
        points={rightPoints} 
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
    // backgroundColor: Colors.darkgrey,
    // height: '70%',
    // width: '0.5%',
    // alignSelf: 'flex-start',
    // marginTop: 80
  },
});

export default ScoreBoard;
