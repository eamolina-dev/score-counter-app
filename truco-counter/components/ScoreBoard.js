import React from 'react';
import { View, StyleSheet } from 'react-native';
import TeamColumn from './ScoreColumn';
import { Colors } from '../constants/colors';

const ScoreBoard = ({ points, state, handlePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <TeamColumn 
          teamName="Nosotros" 
          pointsGoal={points} 
          points={state.leftPoints} 
          onPressPlus={() => handlePress('INCREMENT', 'leftPoints')} 
          onPressMinus={() => handlePress('DECREMENT', 'leftPoints')} 
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.rightSide}>
        <TeamColumn 
          teamName="Ellos" 
          pointsGoal={points} 
          points={state.rightPoints} 
          onPressPlus={() => handlePress('INCREMENT', 'rightPoints')} 
          onPressMinus={() => handlePress('DECREMENT', 'rightPoints')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'lightblue',
  },
  leftSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    // backgroundColor: Colors.darkgrey,
    // height: '70%',
    // width: '0.5%',
    // alignSelf: 'flex-start',
    // marginTop: 80
  },
});

export default ScoreBoard;
