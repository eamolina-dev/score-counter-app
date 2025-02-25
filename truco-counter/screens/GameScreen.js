import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Button, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

const GameScreen = () => {
  const route = useRoute();
  const { points } = route.params || {};

  const [leftPoints, setLeftPoints] = useState(0);
  const [rightPoints, setRightPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const onPressLeftIncrement = () => {
    if (!gameOver) setLeftPoints(prev => prev + 1);
  };

  const onPressRightIncrement = () => {
    if (!gameOver) setRightPoints(prev => prev + 1);
  };

  useEffect(() => {
    console.log("antes return");
    if (gameOver) return;
    console.log("despues return");
    console.log(points);

    if (leftPoints === points) {
      setGameOver(true);
      testingAlert('Jugador Rojo');
    } else if (rightPoints === points) {
      setGameOver(true);
      testingAlert('Jugador Azul');
    }
  }, [leftPoints, rightPoints]);

  const testingAlert = (winner) => {
    Alert.alert('¡Juego Terminado!', `${winner} ha ganado`, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leftSide}>
        <Text>{leftPoints}</Text>
        <Button onPress={onPressLeftIncrement} title="Increment" color="#841584" />
      </View>
      <View style={styles.rightSide}>
        <Text>{rightPoints}</Text>
        <Button onPress={onPressRightIncrement} title="Increment" color="#841584" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  leftSide: {
    backgroundColor: 'red',
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSide: {
    backgroundColor: 'blue',
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameScreen;
