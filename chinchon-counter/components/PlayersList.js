import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PlayerItem from './PlayerItem';
import { Colors } from '../constants/colors';

const PlayersList = ({ players, handleEditPlayer, handleDeletePlayer }) => {
  return (
    <FlatList
      data={players}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PlayerItem
          id={item.id}
          playerName={item.name}
          handleEditPlayer={handleEditPlayer}
          handleDeletePlayer={handleDeletePlayer}
        />
      )}
      contentContainerStyle={styles.list}
      keyboardShouldPersistTaps="handled"
    />      
  );
};

const styles = StyleSheet.create({
  list: {
    // flexGrow: 1, // Permite que el contenido se expanda dentro de FlatList
    // borderWidth: 1,
    // borderColor: 'white',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 50,
    marginVertical: 24,
    backgroundColor: Colors.black,
    borderRadius: '5%',
  },
});

export default PlayersList;
