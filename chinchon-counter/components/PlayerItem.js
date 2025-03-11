import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import TouchableIcon from './TouchableIcon';
import { Colors } from '../constants/colors';

const PlayerItem = ({ id, playerName, handleEditPlayer, handleDeletePlayer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(playerName);

  const handleSave = () => {
    handleEditPlayer(id, name);
    setIsEditing(false);
    console.log("Nuevo nombre:" + name);
  };

  return (
    <View style={styles.container}>
      <TouchableIcon
        icon={isEditing ? "check" : "pencil"}
        size={24}
        color="black"
        onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
      />

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={newName => setName(newName)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <Text style={styles.playerName}>{playerName}</Text>
      )}

      <TouchableIcon 
        icon="close" 
        size={24} 
        color="black" 
        onPress={() => handleDeletePlayer(id)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange,
    height: 52,
    width: '100%',
    marginVertical: 8,
    padding: 12,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    width: 150,
  },
});

export default PlayerItem;
