import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import TapArea from './TapArea';

const Header = ({ points, onPressPoints }) => {
  return (
    <View style={styles.container}>
      <TapArea 
        onPress={onPressPoints}
        style={styles.tapArea}
      >
        <Text style={styles.points}>
          {points}
        </Text>
      </TapArea>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapArea: {
    borderColor: 'black',
    borderWidth: 1,
  },
  points: {
    fontSize: 48,
    fontFamily: 'Henny-Penny',
  },
});

export default Header;
