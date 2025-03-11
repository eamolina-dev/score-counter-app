import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import { Colors } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DEFAULT_SETTINGS } from '../constants/config';
import Title from '../components/Title';

const SettingsScreen = () => {
  const [scoreGoal, setScoreGoal] = useState(DEFAULT_SETTINGS.SCORE_GOAL);
  const [lowerLimit, setLowerLimit] = useState(DEFAULT_SETTINGS.LOWER_LIMIT);

  useEffect(() => {
    // Cargar valores guardados
    const loadSettings = async () => {
      try {
        const savedScoreGoal = await AsyncStorage.getItem('scoreGoal');
        const savedLowerLimit = await AsyncStorage.getItem('lowerLimit');

        if (savedScoreGoal !== null) setScoreGoal(parseInt(savedScoreGoal));
        if (savedLowerLimit !== null) setLowerLimit(parseInt(savedLowerLimit));
      } catch (error) {
        console.error('Error cargando configuración:', error);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    if (isNaN(scoreGoal) || isNaN(lowerLimit)) {
      Alert.alert('Error', 'Por favor, ingresa valores numéricos válidos.');
      return;
    }

    try {
      await AsyncStorage.setItem('scoreGoal', scoreGoal.toString());
      await AsyncStorage.setItem('lowerLimit', lowerLimit.toString());
      Alert.alert('Guardado', 'Configuración guardada correctamente.');
    } catch (error) {
      console.error('Error guardando configuración:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title text="Puntos" />
      <Title text="Limite Superior" />
      <TextInput
        style={styles.input}
        value={scoreGoal.toString()}
        onChangeText={(text) => setScoreGoal(parseInt(text) || '')} // analizar si esta bien o como resolver de buena manera
        keyboardType="numeric"
      />

      <Title text="Limite Inferior" />
      <TextInput
        style={styles.input}
        value={lowerLimit.toString()}
        onChangeText={(text) => setLowerLimit(parseInt(text) || '')} // analizar si esta bien o como resolver de buena manera
        keyboardType="numeric"
      />

      <CustomButton text="Guardar" handleOnPress={handleSave} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    padding:'20%',
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

export default SettingsScreen;
