import React, { useState } from 'react';
import { StyleSheet} from 'react-native';
import PlayersList from '../components/PlayersList';
import AddPlayer from '../components/AddPlayer';
import StartGame from '../components/StartGame';
import ResetPlayersList from '../components/ResetPlayersList';
import { Colors } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../components/Title';

const HomeScreen = () => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (playerName.trim() && players.length < 8 && !players.some(player => player.name === playerName)) {
      const newPlayer = { id: Date.now().toString(), name: playerName.trim() };
      setPlayers([newPlayer, ...players]);
      setPlayerName('');
    }
  };

  const handleEditPlayer = (id, newName) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, name: newName } : player
    ));
    console.log("Nuevo nombre en home screen:" + newName);
  };  

  const handleDeletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const handleDeletePlayersList = () => {
    setPlayers([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title text="Anotador de Chinchon" />

      <AddPlayer playerName={playerName} setPlayerName={setPlayerName} handleAddPlayer={handleAddPlayer} />

      <PlayersList players={players} handleEditPlayer={handleEditPlayer} handleDeletePlayer={handleDeletePlayer} />

      <StartGame players={players} />

      <ResetPlayersList playersListLength={players.length} handleResetPlayersList={handleDeletePlayersList} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    padding:'20%'
  },
});

export default HomeScreen;
