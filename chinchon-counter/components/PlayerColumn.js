import { View, Text, StyleSheet } from 'react-native';
import Score from './Score';
import { Colors } from '../constants/colors';
import PlayerScores from './PlayerScores';

const PlayerColumn = ({ player, scores, onChangeScore, onConfirmScore, totalScore, maxScore, minScore }) => {
  const backgroundColor =
    totalScore === maxScore ? Colors.red : totalScore === minScore ? Colors.green : 'transparent';

  return (
    <View style={[styles.column, { backgroundColor }]}>
      <Text style={styles.player}>{player.name}</Text>
      <PlayerScores 
        scores={scores}
        onChangeScore={onChangeScore}
        onConfirmScore={onConfirmScore}
      />
      <Text style={styles.total}>Total: {totalScore}</Text>
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

export default PlayerColumn;
