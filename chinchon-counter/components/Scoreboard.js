import { ScrollView, StyleSheet } from 'react-native';
import PlayerColumn from './PlayerColumn';

const Scoreboard = ({ players, columns, onChangeScore, totals, maxScore, minScore }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
    {players.map((player, playerIndex) => (
      <PlayerColumn
        key={player.id}
        player={player}
        scores={columns[playerIndex]}
        onChangeScore={(newScore, index) => onChangeScore(newScore, index)}
        totalScore={totals[playerIndex]}
        maxScore={maxScore}
        minScore={minScore}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    width: '100%'
  },
});

export default Scoreboard;
