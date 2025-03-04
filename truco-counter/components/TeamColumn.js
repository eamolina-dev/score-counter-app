import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../constants/colors';
import Points from './Points';
import ScoreButtons from './ScoreButtons';
import { LinearGradient } from 'expo-linear-gradient';

const TeamColumn = ({ teamName, pointsGoal, points, onPressPlus, onPressMinus }) => {
  const half = Math.floor(pointsGoal / 2);
  const goods = points - half;

  const [name, setName] = useState(teamName);

  const onChangeName = (newName) => {
    setName(newName.trim());
  };

  return (
    <View style={styles.container}>
      {/* <LinearGradient
        colors={[points >= half ? Colors.green : Colors.red, 'transparent']}
        style={styles.background}
      /> */}
      <LinearGradient
        colors={[Colors.lightgrey, Colors.blue]}
        style={styles.gradientContainer}
      >
        <TextInput
          style={styles.team}
          value={name}
          onChangeText={onChangeName}
          selectionColor={Colors.darkgrey}
        />
      </LinearGradient>
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
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  gradientContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  team: {
    fontFamily: 'Atma',
    backgroundColor: 'transparent',
    // height: '100%',
    // alignSelf: 'stretch',
    width: 130,
    fontSize: 20,
    textAlign: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  pointsContainer: {
    height: '70%',
    alignSelf: 'stretch',

    // borderColor: 'black',
    // borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bad: {
    //backgroundColor: Colors.red,
  },
  good: {
    //backgroundColor: Colors.green,
  },
  points: {
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default TeamColumn;
