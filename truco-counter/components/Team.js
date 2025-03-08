import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import TapArea from './TapArea';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';

const Team = ({ name, onChangeName, areGood }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[areGood ? '#2C6871' : '#551717', "transparent"]}
        style={styles.shadow}
      />
      <TapArea
        onPress={onChangeName}
        style={styles.tapArea}
      >
        <Text style={styles.team}>
          {name}
        </Text>
      </TapArea>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  team: {
    flex: 1,
    alignSelf: 'stretch',
    fontFamily: 'Russo-One',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.white,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  tapArea: {
    flex: 1,
    alignSelf: 'stretch',
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
});

export default Team;
