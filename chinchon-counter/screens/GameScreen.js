import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, FlatList, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Scoreboard from '../components/Scoreboard';
import CustomButton from '../components/CustomButton';
import { Colors } from '../constants/colors';
import Modal from "react-native-modal";
import CustomModal from '../components/CustomModal';
import IconButton from '../components/IconButton';
import PlayerScores from '../components/PlayerScores';
import { SafeAreaView } from 'react-native-safe-area-context';
import Score from '../components/Score';
import ScoreEditModal from '../components/ScoreEditModal';
import TapArea from '../components/TapArea';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const GameScreen = () => {
  const route = useRoute();
  // const players = route.params?.players || [];
  const [players, setPlayers] = useState([
    { id: 1, name: "Daniel", scores: [0, 0] },
    { id: 2, name: "Flavia", scores: [0, 0] },
    // { id: 3, name: "Agustin", scores: [0, 0] },
    // { id: 4, name: "Meme", scores: [0, 0] },
    // { id: 5, name: "Moco", scores: [0, 0] },
    // { id: 6, name: "Rafa", scores: [0, 0] },
    // { id: 7, name: "Fernando", scores: [0, 0] },
    // { id: 8, name: "Jose", scores: [0, 0] },
  ]);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedRound, setSelectedRound] = useState(null);
  const [newScore, setNewScore] = useState('');
  const [scoreModalIsVisible, setScoreModalIsVisible] = useState(false);
  const [gameModalIsVisible, setGameModalIsVisible] = useState(false);
  const [winner, setWinner] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [losers, setLosers] = useState([]);

  const [loaded, error] = useFonts({
    'Russo-One': require('../assets/fonts/RussoOne-Regular.ttf'),
  });

  useEffect(() => {
    if (gameOver) return;
  
    const playersStillPlaying = totals.filter(t => t <= 100);
  
    if (playersStillPlaying.length === 1) {
      const winnerIndex = totals.findIndex(t => t <= 100);
      
      const winner = players[winnerIndex];
  
      setWinner(winner);
      setGameOver(true);
      // setGameModalIsVisible(true);
    }
  }, [players]);
  

  useEffect(() => {
    const newLosers = players.filter(player => 
      player.scores.reduce((total, score) => total + score, 0) > 100 &&
      !losers.includes(player)
    );
  
    if (newLosers.length > 0) {
      setLosers(prevLosers => [...prevLosers, ...newLosers]);
    }
  }, [players]);

  const onAddRound = () => {
    setPlayers(players.map(p => 
      losers.includes(p) ? p : { ...p, scores: [...p.scores, 0] }
    ));
  };  

  const getPlayerIndex = (playerId) => players.findIndex(player => player.id === playerId);

  const onPressScore = (playerId, roundIndex) => {
    const playerIndex = getPlayerIndex(playerId);
    if (playerIndex === -1) return;
  
    setSelectedPlayer(playerId);
    setSelectedRound(roundIndex);
    setNewScore(players[playerIndex].scores[roundIndex]);
    setScoreModalIsVisible(true);
  };
  
  const onChangeScore = (score) => {
    setNewScore(score);
  };

  const onConfirmScore = () => {
    if (selectedPlayer !== null && selectedRound !== null) {
      setPlayers(players.map(player =>
        player.id === selectedPlayer
          ? {
              ...player,
              scores: player.scores.map((score, index) =>
                index === selectedRound ? parseInt(newScore) || 0 : score
              ),
            }
          : player
      ));
    }
    setScoreModalIsVisible(false);
  };  

  const onCancelModal = () => {
    setScoreModalIsVisible(false);
  };

  const onPressHook = (playerId) => {
    setPlayers(prevPlayers => {
      return prevPlayers.map(player => {
        if (player.id === playerId) {
          const otherPlayers = prevPlayers.filter(p => p.id !== playerId);
  
          const maxScorePlayer = otherPlayers.reduce((maxPlayer, currentPlayer) => {
            const currentScore = currentPlayer.scores.reduce((total, score) => total + score, 0);
            const maxScore = maxPlayer.scores.reduce((total, score) => total + score, 0);
  
            return currentScore > maxScore ? currentPlayer : maxPlayer;
          }, otherPlayers[0]);
  
          const copiedScores = maxScorePlayer ? [...maxScorePlayer.scores] : [];
  
          return { ...player, scores: copiedScores };
        }
        return player;
      });
    });
  };  
  

  const onPressChinchon = (player) => {
    setWinner(player);
    setGameOver(true);
    setGameModalIsVisible(true);
  };

  const GameModal = ({ isVisible, onBackdropPress }) => (
    <CustomModal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles.modal}>
        <Text style={styles.modalText}>¡Fin del Juego!</Text>
        <Text style={styles.modalText}>Ganador: {winner.name}</Text>
      </View>
    </CustomModal>
  );

  // const calculateTotals = () => columns.map((scores) => scores.reduce((total, s) => total + s, 0));
  const calculateTotals = () => players.map((p) => p.scores.reduce((total, s) => total + s, 0));

  const totals = calculateTotals();
  console.log(totals);
  const maxScore = Math.max(...totals);
  const minScore = Math.min(...totals);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <View style={styles.body}>
          <FlatList
            data={players}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            contentContainerStyle={styles.bodyContent}
            renderItem={({ item }) => (
              <View style={styles.playerColumn}>
                <Text style={styles.playerName}>{item.name}</Text>

                <FlatList
                  data={item.scores}
                  keyExtractor={(_, index) => index.toString()}
                  horizontal
                  // contentContainerStyle={styles.scoresContent}
                  renderItem={({ item: score, index }) => (
                    <Score 
                      score={score} 
                      onChangeScore={() => onPressScore(item.id, index)}
                    />
                  )}
                />

                <Text style={styles.playerName}>{totals[getPlayerIndex(item.id)]}</Text>
                {totals[getPlayerIndex(item.id)] > 100 && <IconButton
                  onPress={() => onPressHook(item.id)}
                  style={styles.hook}
                  iconName='hook'
                  iconSize={32}
                  iconColor='white'
                />}
                <IconButton
                  onPress={() => onPressChinchon(item)}
                  style={styles.chinchonButton}
                  iconName='cards'
                  iconSize={32}
                  iconColor='white'
                />
                <Text style={styles.chinchon}>Chinchon</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.footer}>
          <CustomButton text="Agregar Ronda" handleOnPress={onAddRound} />
        </View>

        {/* MODAL */}
        <ScoreEditModal 
          value={newScore.toString()}
          onChangeText={onChangeScore}
          onPressLeft={onCancelModal}
          onPressRight={onConfirmScore}
          isVisible={scoreModalIsVisible}
          onBackdropPress={onCancelModal}
        />

        <GameModal 
          isVisible={gameModalIsVisible}
          onBackdropPress={onCancelModal}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  body: {
    flex: 10, 
    // alignSelf: 'stretch',
    // width: '100%',
    // backgroundColor: 'blue',
  },
  bodyContent: {
    // flex: 1,
    flexGrow: 1,
    // alignSelf: 'stretch',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // paddingRight: 80,
    // alignItems: 'flex-start',
  },
  playerColumn: {
    // flex: 1,
    // alignSelf: 'stretch',
    // justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
    marginHorizontal: 8,
  },
  playerName: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Russo-One',
  },
  chinchon: {
    color: 'white',
    fontSize: 10,
  },
  header: {
    flex: 1, 
    alignSelf: 'stretch',
    // backgroundColor: 'red',
  },
  headerList: {  
    // backgroundColor: 'yellow',
    // justifyContent: 'center'
  },
  headerContent: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'green',

  },
  footer: {
    flex: 2, 
    alignSelf: 'stretch',
    // backgroundColor: 'green',
  },
  modal: {
    height: 100,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
        // borderWidth: 1,
    // borderColor: 'white',
  },
  modalText: {
    fontFamily: 'Russo-One',
    fontSize: 24,
  },
  // modalInput: {
  //   fontFamily: 'Russo-One',
  //   fontSize: 24,
  //   backgroundColor: 'white',
  //   height: 64,
  //   width: '90%',
  //   borderRadius: 16,
  //   textAlign: 'center',
  //   textAlignVertical: 'center',
  //   marginTop: 12,
  //   marginBottom: 8,
  //   backgroundColor: Colors.lightgrey
  // },
  // modalHeader: {
  //   width: 50,
  //   // borderColor: 'red',
  //   // borderWidth: 2,
  // },
  // modalBody: {
  //   width: 220,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // borderColor: 'blue',
  //   // borderWidth: 2,
  // },
  // modalFooter: {
  //   width: 50,
  //   // borderColor: 'red',
  //   // borderWidth: 2,
  // },
  // player: {
  //   fontSize: 18,
  //   color: Colors.white,
  //   marginBottom: 8,
  //   borderWidth: 1,
  //   borderColor: Colors.white,
  // },
  // column: {
  //   alignItems: 'center',
  //   padding: 8,
  //   marginHorizontal: 5,
  //   borderRadius: 8,
  //   borderWidth: 1,
  //   borderColor: Colors.white,
  // },
});

export default GameScreen;
