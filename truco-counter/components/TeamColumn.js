import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import Points from './Points';
import ScoreButtons from './ScoreButtons';

const TeamColumn = ({ teamName, pointsGoal, points, onPressPlus, onPressMinus }) => {
  const half = Math.floor(pointsGoal / 2);
  const goods = points - half;

  return (
    <View style={styles.container}>
      <View style={styles.teamContainer}>
        <Text style={styles.team}>{teamName}</Text>
      </View>
      <View style={[styles.pointsContainer, points >= half ? styles.good : styles.bad]}>
        <Points points={points >= half ? half : points} />
        {points >= half && <Points points={goods} />}
      </View>
      <ScoreButtons onPressPlus={onPressPlus} onPressMinus={onPressMinus} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  teamContainer: {
    height: '10%',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  team: {
    // fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: 'bold'
  },
  pointsContainer: {
    height: '70%',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bad: {
    backgroundColor: Colors.red,
    opacity: 0.5,
  },
  good: {
    backgroundColor: Colors.green,
    opacity: 0.5,
  },
  points: {
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default TeamColumn;
