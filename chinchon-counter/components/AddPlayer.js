import React from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Colors } from '../constants/colors';
import CustomButton from '../components/CustomButton';

const AddPlayer = ({ playerName, setPlayerName, handleAddPlayer }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={playerName}
        onChangeText={setPlayerName}
        placeholder="Nombre del jugador"
      />
      <CustomButton 
        text="Agregar Jugador"
        handleOnPress={handleAddPlayer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'white',
    paddingHorizontal: 12,
  },
  input: {
    backgroundColor: Colors.white,
    height: 56,
    width: '100%',
    fontSize: 18,
    borderRadius: 25,
    textAlign: 'center',
    marginVertical: 12,
  },
});

export default AddPlayer;
