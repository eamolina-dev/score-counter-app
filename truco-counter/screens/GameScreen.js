import React, { useEffect, useReducer, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, Button, Text, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_LEFT':
      return { ...state, leftPoints: state.leftPoints + 1 };
    case 'DECREMENT_LEFT':
      return { ...state, leftPoints: Math.max(0, state.leftPoints - 1) };
    case 'INCREMENT_RIGHT':
      return { ...state, rightPoints: state.rightPoints + 1 };
    case 'DECREMENT_RIGHT':
      return { ...state, rightPoints: Math.max(0, state.rightPoints - 1) };
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

  const onPressLeftIncrement = useCallback(() => {
    if (!state.gameOver) dispatch({ type: 'INCREMENT_LEFT' });
  }, [state.gameOver]);
  

  const onPressLeftDecrement = useCallback(() => {
    if (!state.gameOver) dispatch({ type: 'DECREMENT_LEFT' });
  }, [state.gameOver]);
  

  const onPressRightIncrement = useCallback(() => {
    if (!state.gameOver) dispatch({ type: 'INCREMENT_RIGHT' });
  }, [state.gameOver]);
  

  const onPressRightDecrement = useCallback(() => {
    if (!state.gameOver) dispatch({ type: 'DECREMENT_RIGHT' });
  }, [state.gameOver]);

  useEffect(() => {
    if (state.gameOver) return;
  
    if (state.leftPoints === points) {
      dispatch({ type: 'SET_GAME_OVER' });
      winnerAlert('Nosotros');
    } else if (state.rightPoints === points) {
      dispatch({ type: 'SET_GAME_OVER' });
      winnerAlert('Ellos');
    }
  }, [state.leftPoints, state.rightPoints, state.gameOver]);  

  const winnerAlert = (winner) => {
    Alert.alert('¡Juego Terminado!', `${winner} ha ganado`, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../assets/notebook.jpg")} resizeMode="cover" style={styles.image}>
        <View style={styles.innerContainer}>
          <View style={styles.leftSide}>
            <View style={styles.pointsGroup}>
              <FontAwesome name='minus' size={24} color='black' style={styles.point} />
              <FontAwesome name='minus' size={24} color='black' style={styles.point} />
              <FontAwesome name='minus' size={24} color='black' style={styles.point} />
              <FontAwesome name='minus' size={24} color='black' style={styles.point} />
              <FontAwesome name='minus' size={24} color='black' style={styles.point} />
            </View>
            <Text>Nosotros</Text>
            <Text>{state.leftPoints}</Text>
            <View style={styles.leftButtons}>
              <TouchableOpacity onPress={onPressLeftIncrement} style={styles.button} >
                <FontAwesome name='plus' size={32} color='black' />
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressLeftDecrement} style={styles.button} >
                <FontAwesome name='minus' size={32} color='black' />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.rightSide}>
            <Text>Ellos</Text>
            <Text>{state.rightPoints}</Text>
            <View style={styles.rightButtons}>
              <TouchableOpacity onPress={onPressRightIncrement} style={styles.button} >
                <FontAwesome name='plus' size={32} color='black' />
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressRightDecrement} style={styles.button} >
                <FontAwesome name='minus' size={32} color='black' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  leftSide: {
    // backgroundColor: 'red',
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightSide: {
    // backgroundColor: 'blue',
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: "#841584",
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: 'black',
    height: '50%',
    width: '0.5%',
  },
  pointsGroup: {
    borderColor: 'black',
    borderWidth: 1,
    height: 92,
    width: 92,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },  
  point: {
    transform: [{ rotate: "90deg" }],
    margin: 0,
    padding: 0,
  },
});

export default GameScreen;
