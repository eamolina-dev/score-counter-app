import React from 'react';
import { Text, StyleSheet } from 'react-native';
import TapArea from './TapArea';

const Team = ({ name, onChangeName }) => {
  return (
    <TapArea
      onPress={onChangeName}
      style={styles.tapArea}
    >
      <Text style={styles.team}>
        {name}
      </Text>
    </TapArea>
  );
};

const styles = StyleSheet.create({
  team: {
    fontFamily: 'Atma',
    backgroundColor: 'grey',
    height: 50,
    width: 150,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 30,
  },
  tapArea: {
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default Team;
