import React, { useEffect, useReducer, useCallback, useState } from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Header from '../components/Header';
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Scoreboard from '../components/Scoreboard';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, [action.team]: state[action.team] + 1 };
    case 'DECREMENT':
      return { ...state, [action.team]: Math.max(0, state[action.team] - 1) };
    case 'SET_GAME_OVER':
      return { ...state, gameOver: true };
    case 'RESET_GAME':
      return { ...state, [action.team]: 0 }
    default:
      return state;
  }
};

SplashScreen.preventAutoHideAsync();

const GameScreen = () => {
  const route = useRoute();
  const [points, setPoints] = useState(18); 

  const [state, dispatch] = useReducer(reducer, { leftPoints: 0, rightPoints: 0, gameOver: false });

  const [loaded, error] = useFonts({
    'Henny-Penny': require('../assets/fonts/HennyPenny-Regular.ttf'),
    'Atma': require('../assets/fonts/Atma-Regular.ttf'),
  });

  const handlePress = useCallback((type, team) => {
    if (!state.gameOver) dispatch({ type, team });
  }, [state.gameOver]);

  const onChangePoints = (newPoints) => {
    setPoints(newPoints.trim());
  };

  useEffect(() => {
    if (!state.gameOver && (state.leftPoints === points || state.rightPoints === points)) {
      dispatch({ type: 'RESET_GAME', action: 'leftPoints' });
      dispatch({ type: 'RESET_GAME', action: 'rightPoints' });
      dispatch({ type: 'SET_GAME_OVER' });
      Alert.alert('¡Juego Terminado!', `${state.leftPoints === points ? 'Nosotros' : 'Ellos'} han ganado`);
    }
  }, [state.leftPoints, state.rightPoints]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[Colors.blue, Colors.lightgrey]}
          style={styles.background}
        >
          <ScrollView style={styles.scrollView}>
            <Header points={points.toString()} onChangePoints={onChangePoints} />
            <Scoreboard points={points} state={state} handlePress={handlePress} />
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
});

export default GameScreen;
