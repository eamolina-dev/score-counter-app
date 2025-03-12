import React, { useEffect, useReducer, useCallback, useState } from 'react';
import { StyleSheet, Alert, View, StatusBar, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Logo from '../assets/svg/logo.svg';
import Team from '../components/Team';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScoreBoard from '../components/ScoreBoard';
import { Colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import PointsGoal from '../components/PointsGoal';
import { styles } from './GameScreen-styles';
import { ScoreButtonGroup, ModalComponent, GameModal } from './GameScreenAuxComponents'; 
import EditModal from '../components/EditModal';
import { GameOverModal } from './GameScreenAuxComponents';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { 
        ...state, 
        [action.team]: state[action.team] < state.points ? state[action.team] + 1 : state[action.team] 
      };
    case 'DECREMENT':
      return { ...state, [action.team]: Math.max(0, state[action.team] - 1) };
    case 'SET_GAME_OVER':
      return { ...state, gameOver: action.gameStatus };
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

  const [pointsModalIsVisible, setPointsModalIsVisible] = useState(false);
  const [nameModalIsVisible, setNameModalIsVisible] = useState(false);
  const [gameModalIsVisible, setGameModalIsVisible] = useState(false);

  const [newGoal, setNewGoal] = useState('');
  const [newName, setNewName] = useState('');
  const [winner, setWinner] = useState('');

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
    // 'Henny-Penny': require('../assets/fonts/HennyPenny-Regular.ttf'),
    // 'Atma': require('../assets/fonts/Atma-Regular.ttf'),
    'Russo-One': require('../assets/fonts/RussoOne-Regular.ttf'),
  });

  const handlePress = useCallback((type, team) => {
    dispatch({ type, team });
  }, [dispatch]);
  
  useEffect(() => {
    if (state.gameOver) return;
  
    if (state.leftPoints === state.points || state.rightPoints === state.points) {
      const winnerName = state.leftPoints === state.points ? state.leftTeamName : state.rightTeamName;
      setWinner(winnerName);
      dispatch({ type: 'SET_GAME_OVER', gameStatus: true });
      setGameModalIsVisible(true);
    }
  }, [state.leftPoints, state.rightPoints]);  

  useEffect(() => {
    const hideSplash = async () => {
      if (loaded || error) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [loaded, error]);  

  if (!loaded && !error) {
    return null;
  }

  const onChangeTeamName = (team) => {
    setNewName(team);
    setChangingLeft(team === state.leftTeamName);
    setNameModalIsVisible(true);
  };

  const onConfirmName = () => {
    const teamKey = changingLeft ? 'leftTeamName' : 'rightTeamName';
    dispatch({ type: 'CHANGE_TEAM_NAME', team: teamKey, newName });
    setNameModalIsVisible(false);
  };

  const onChangePoints = () => {
    setNewGoal(state.points.toString());
    setPointsModalIsVisible(true);
  };

  const onConfirmGoal = () => {
    const parsedGoal = parseInt(newGoal);
    if (!isNaN(parsedGoal)) {
      if (parsedGoal > 50) {
        dispatch({ type: 'CHANGE_POINTS_GOAL', newGoal: 50 });
      } else {
        dispatch({ type: 'CHANGE_POINTS_GOAL', newGoal: parsedGoal });
      }
      setPointsModalIsVisible(false);
    } else {
      Alert.alert("Error", "Ingrese un número válido");
    }
  };

  const onConfirmGame = () => {
    dispatch({ type: 'RESET_GAME' });
    setGameModalIsVisible(false);
  };

  const onCancelModal = () => {
    setPointsModalIsVisible(false);
    setNameModalIsVisible(false);
    setGameModalIsVisible(false);
    dispatch({ type: 'SET_GAME_OVER', gameStatus: false });
    setWinner('');
  };

  const loserChangingScore = (team) => {
    return (
      state.leftPoints == state.points && team == 'right'
      || state.rightPoints == state.points && team == 'left'
    );
  };

  const onPressMinus = ({ team }) => {
    if (loserChangingScore(team)) return;

    handlePress('DECREMENT', `${team}Points`)
  };

  const onPressPlus = ({ team }) => {
    if (loserChangingScore(team)) return;

    handlePress('INCREMENT', `${team}Points`)
  }; 
  
  return (
    <SafeAreaView style={styles.screen}>
      <LinearGradient
        colors={true ? [Colors.darkblue, '#000000'] : []}
        style={styles.background}
      />
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.pointsGoal}>
            <PointsGoal points={state.points} onPressPoints={() => onChangePoints()} />
          </View>
          <View style={styles.teamNames}>
            <Team name={state.leftTeamName} onChangeName={() => onChangeTeamName(state.leftTeamName)} />
            <Team name={state.rightTeamName} onChangeName={() => onChangeTeamName(state.rightTeamName)} />
          </View>
        </View>
        <View style={styles.scoreboard}>
          <ScoreBoard 
            points={state.points}
            leftPoints={state.leftPoints}
            rightPoints={state.rightPoints}
          />
        </View>
        <View style={styles.ads}>
          {/* <Logo height={12} width={12} /> */}
          <Text style={styles.adsText}>
            {state.leftPoints.toString()}
          </Text>
          <Text style={styles.adsText}>
            {state.rightPoints.toString()}
          </Text>
        </View>
        <View style={styles.scoreButtons}>
          <ScoreButtonGroup team="left" onPressLeft={onPressMinus} onPressRight={onPressPlus} />
          <ScoreButtonGroup team="right" onPressLeft={onPressMinus} onPressRight={onPressPlus} />
        </View>

        {/* MODALS */}
        <GameOverModal 
          winner={winner} 
          onPressLeft={onCancelModal} 
          onPressRight={onConfirmGame}
          isVisible={gameModalIsVisible} 
          onBackdropPress={onCancelModal} 
        />
        <EditModal 
          value={newGoal}
          onChangeText={setNewGoal}
          onPressLeft={onCancelModal}
          onPressRight={onConfirmGoal}
          isVisible={pointsModalIsVisible}
          onBackdropPress={onCancelModal}
          changingPoints={true}
        />
        <EditModal 
          value={newName}
          onChangeText={setNewName}
          onPressLeft={onCancelModal}
          onPressRight={onConfirmName}
          isVisible={nameModalIsVisible}
          onBackdropPress={onCancelModal}
          changingPoints={false}
        />
      </View>
    </SafeAreaView>
    
  );
};

export default GameScreen;
