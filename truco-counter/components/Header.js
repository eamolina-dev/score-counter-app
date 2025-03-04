import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { Colors } from '../constants/colors';

const Header = ({ points, onChangePoints }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.points}
        value={points}
        onChangeText={onChangePoints}
        selectionColor={Colors.darkgrey}
      />
      <Text style={styles.text}>
        puntos
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // paddingLeft: 32,
    // borderColor: 'black',
    // borderWidth: 3,
  },
  points: {
    fontSize: 48,
    fontFamily: 'Henny-Penny',
    paddingBottom: 0,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Henny-Penny',
    color: Colors.darkgrey,
    paddingBottom: 24
  },
});

export default Header;
