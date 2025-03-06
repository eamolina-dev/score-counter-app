import React, { useEffect, useReducer, useCallback, useState } from 'react';
import { StyleSheet, Alert, View, Text, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Header from '../components/Header';
import Logo from '../assets/svg/logo.svg';
import Team from '../components/Team';
import ScoreButtons from '../components/ScoreButtons';
import ScoreColumn from '../components/ScoreColumn';
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import TapArea from '../components/TapArea';
import TapToModal from '../components/TapToModal';
import CustomModal from '../components/CustomModal';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, [action.team]: state[action.team] + 1 };
    case 'DECREMENT':
      return { ...state, [action.team]: Math.max(0, state[action.team] - 1) };
    case 'SET_GAME_OVER':
      return { ...state, gameOver: true };
    case 'RESET_GAME':
      return { 
        ...state, 
        leftPoints: 0,
        rightPoints: 0,
        gameOver: false
      };
    case 'CHANGE_TEAM_NAME':
      return { ...state, [action.team]: action.newName };
    case 'CHANGE_POINTS_GOAL':
      return { 
        ...state, 
        points: action.newGoal, 
        leftPoints: 0, 
        rightPoints: 0, 
        gameOver: false 
      };
    default:
      return state;
  }
};

SplashScreen.preventAutoHideAsync();

const GameScreen = () => {
  const route = useRoute();

  const [nameModalIsVisible, setNameModalIsVisible] = useState(false);
  const [pointsModalIsVisible, setPointsModalIsVisible] = useState(false);
  const [customModal, setCustomModal] = useState(false);



  const [newName, setNewName] = useState('');
  const [newGoal, setNewGoal] = useState('');

  const [changingLeft, setChangingLeft] = useState(true);

  const initialState = {
    points: 18,
    leftPoints: 0,
    rightPoints: 0,
    gameOver: false,
    leftTeamName: 'Nosotros',
    rightTeamName: 'Ellos',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [loaded, error] = useFonts({
    'Henny-Penny': require('../assets/fonts/HennyPenny-Regular.ttf'),
    'Atma': require('../assets/fonts/Atma-Regular.ttf'),
  });

  const handlePress = useCallback((type, team) => {
    if (!state.gameOver) dispatch({ type, team });
  }, [state.gameOver]);

  useEffect(() => {
    if (!state.gameOver && (state.leftPoints === state.points || state.rightPoints === state.points)) {
      dispatch({ type: 'SET_GAME_OVER' });
      setCustomModal(true);
    }
  }, [state.leftPoints, state.rightPoints, state.points]);  

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const onChangeLeftTeamName = () => {
    setNewName(state.leftTeamName);
    setChangingLeft(true);
    setNameModalIsVisible(true);
  };

  const onChangeRightTeamName = () => {
    setNewName(state.rightTeamName);
    setChangingLeft(false);
    setNameModalIsVisible(true);
  };

  const handleChangeLeftTeamName = () => {
    dispatch({ type: 'CHANGE_TEAM_NAME', team: 'leftTeamName', newName: newName });
    setNameModalIsVisible(false);
  };
  
  const handleChangeRightTeamName = () => {
    dispatch({ type: 'CHANGE_TEAM_NAME', team: 'rightTeamName', newName: newName });
    setNameModalIsVisible(false);
  };   

  const onChangePoints = () => {
    setNewGoal(state.points.toString());
    setPointsModalIsVisible(true);
  };

  const handleChangePoints = () => {
    dispatch({ type: 'CHANGE_POINTS_GOAL', newGoal: parseInt(newGoal) });
    setPointsModalIsVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TapToModal 
              title="Cambiar Puntos"
              isVisible={pointsModalIsVisible}
              setIsVisible={setPointsModalIsVisible}
              value={newGoal}
              onChangeText={setNewGoal}
              onPress={handleChangePoints}
              onConfirm={() => console.log('Valor confirmado:', newName)}
            >
              <Header points={state.points.toString()} onPressPoints={onChangePoints} />
            </TapToModal>
          </View>
          <View style={styles.teamNames}>
            <TapToModal 
              title="Cambiar Nombre"
              isVisible={nameModalIsVisible}
              setIsVisible={setNameModalIsVisible}
              value={newName}
              onChangeText={setNewName}
              onPress={handleChangeLeftTeamName}
              onConfirm={() => console.log('Valor confirmado:', newName)}
            >
              <Team name={state.leftTeamName} onChangeName={onChangeLeftTeamName} />
            </TapToModal>
            <TapToModal 
              title="Cambiar Nombre"
              isVisible={nameModalIsVisible}
              setIsVisible={setNameModalIsVisible}
              value={newName}
              onChangeText={setNewName}
              onPress={handleChangeRightTeamName}
              onConfirm={() => console.log('Valor confirmado:', newName)}
            >
              <Team name={state.rightTeamName} onChangeName={onChangeRightTeamName} />
            </TapToModal>
          </View>
          <View style={styles.scoreboard}>
            <ScoreColumn 
              pointsGoal={state.points} 
              points={state.leftPoints} 
            />
            <ScoreColumn 
              pointsGoal={state.points} 
              points={state.rightPoints} 
            />
          </View>
          <View style={styles.scoreButtons}>
            <ScoreButtons 
              onPressPlus={() => handlePress('INCREMENT', 'leftPoints')} 
              onPressMinus={() => handlePress('DECREMENT', 'leftPoints')} 
            />
            <ScoreButtons 
              onPressPlus={() => handlePress('INCREMENT', 'rightPoints')} 
              onPressMinus={() => handlePress('DECREMENT', 'rightPoints')} 
            />
          </View>
          <View style={styles.ads}>
            {/* <Logo width={40} height={40} /> */}
            <TapArea 
              onPress={() => dispatch({ type: 'RESET_GAME' })} 
              style={{ backgroundColor: 'gray', padding: 10, marginTop: 20 }}
            >
              <Text style={{ color: 'white' }}>Reiniciar Juego</Text>
            </TapArea>
          </View>

          <CustomModal 
            isVisible={customModal}
            setIsVisible={setCustomModal}
          >
            <Button title='OK' onPress={() => {dispatch({ type: 'RESET_GAME' }), setCustomModal(false)}} />
            <Button title='X' onPress={() => {dispatch({ type: 'RESET_GAME' }), setCustomModal(false)}} />
          </CustomModal>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 3,
    backgroundColor: 'red'
  },
  teamNames: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  scoreboard: {
    flex: 15,
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  scoreButtons: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  ads: {
    flex: 1,
    backgroundColor: 'green'
  },
  modal: {
    height: 300,
    backgroundColor: 'blue',
  },
  tapArea: {
    backgroundColor: 'red',
    flex: 1
  },
});

export default GameScreen;
