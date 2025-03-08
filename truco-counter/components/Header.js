import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import PointsGoal from './PointsGoal';
import Team from './Team';

const Header = ({ points, onPressPoints }) => {
  const TeamName = ({ team }) => {
    return (
      <Team name={`${team}TeamName`} onChangeName={() => onChangeTeamName(team)} areGood={true} />
    );
  };  

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={[Colors.red, Colors.green]} 
        style={[StyleSheet.absoluteFill, {flex: 1}]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      />
      <View style={styles.pointsGoal}>
        <PointsGoal points={points} />
      </View>
      <View style={styles.teamNames}>
        <TeamName team="left" />
        <TeamName team="right" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsGoal: {
    flex: 2,
  },
  teamNames: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
