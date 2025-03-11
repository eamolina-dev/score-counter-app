import { Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Colors } from '../constants/colors';
import TapArea from './TapArea';

const Score = ({ score, onChangeScore }) => {
  return (
    <TapArea
      onPress={() => onChangeScore(score)}
      style={styles.tapArea}
    >
      <Text style={styles.score}>
        {score}
      </Text>
    </TapArea>
  );
};

const styles = StyleSheet.create({
  score: {
    width: 50,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    textAlign: 'center',
    color: Colors.white,
    borderColor: Colors.lightblue,
    borderRadius: 12,
  },
});

export default Score;
