import React, { useEffect, useReducer, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, Alert, ImageBackground, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import TeamColumn from '../components/TeamColumn';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, [action.team]: state[action.team] + 1 };
    case 'DECREMENT':
      return { ...state, [action.team]: Math.max(0, state[action.team] - 1) };
    case 'SET_GAME_OVER':
      return { ...state, gameOver: true };
    default:
      return state;
  }
};

const GameScreen = () => {
  const route = useRoute();
  const { points = 18 } = route.params || {};

  const [state, dispatch] = useReducer(reducer, { leftPoints: 0, rightPoints: 0, gameOver: false });

  const handlePress = useCallback((type, team) => {
    if (!state.gameOver) dispatch({ type, team });
  }, [state.gameOver]);

  useEffect(() => {
    if (!state.gameOver && (state.leftPoints === points || state.rightPoints === points)) {
      dispatch({ type: 'SET_GAME_OVER' });
      Alert.alert('¡Juego Terminado!', `${state.leftPoints === points ? 'Nosotros' : 'Ellos'} han ganado`);
    }
  }, [state.leftPoints, state.rightPoints]);

  return (
    <SafeAreaView style={styles.outterContainer}>
      <ImageBackground source={require("../assets/background.jpg")} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <Text style={styles.points}>18</Text>
          <Text style={styles.text}>puntos</Text>
          <View style={styles.innerContainer}>
            <View style={styles.leftSide}>
              <TeamColumn 
                teamName="Nosotros" 
                pointsGoal={points} 
                points={state.leftPoints} 
                onPressPlus={() => handlePress('INCREMENT', 'leftPoints')} 
                onPressMinus={() => handlePress('DECREMENT', 'leftPoints')} 
              />
            </View>
            <View style={styles.rightSide}>
              <TeamColumn 
                teamName="Ellos" 
                pointsGoal={points} 
                points={state.rightPoints} 
                onPressPlus={() => handlePress('INCREMENT', 'rightPoints')} 
                onPressMinus={() => handlePress('DECREMENT', 'rightPoints')} 
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outterContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '100%',
    flexDirection: 'row',
  },
  leftSide: {
    // backgroundColor: 'red',
    flex: 1,
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSide: {
    // backgroundColor: 'blue',
    flex: 1,
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: 'black',
    height: '50%',
    width: '0.5%',
  },
  points: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    paddingLeft: 72
  },
});

export default GameScreen;
