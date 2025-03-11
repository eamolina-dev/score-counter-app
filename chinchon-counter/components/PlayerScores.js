import { View, StyleSheet } from 'react-native';
import Score from './Score';
import { Colors } from '../constants/colors';
import { useState } from 'react';

const PlayerScores = ({ scores, onChangeScore, onConfirmScore }) => {
  const [playerScores, setPlayerScores] = useState(scores);

  return (
    <View style={styles.container}>
      {playerScores.map((score, index) => (
        <Score 
          key={index} 
          score={score} 
          onChangeScore={(newScore) => onChangeScore(newScore, index)} 
        />      
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    fontSize: 18,
    color: Colors.white,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  column: {
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.white,
  },
});

export default PlayerScores;
