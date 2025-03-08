import React, { useEffect, useReducer, useCallback, useState } from 'react';
import { StyleSheet, Alert, View, Text, TextInput, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Logo from '../assets/svg/logo.svg';
import Team from '../components/Team';
import Buttons from '../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomModal from '../components/CustomModal';
import ScoreBoard from '../components/ScoreBoard';
import { Colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import PointsGoal from '../components/PointsGoal';

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
    setNewName(state[`${team}TeamName`]);
    setChangingLeft(team === 'left');
    setNameModalIsVisible(true);
  };

  const onChangePoints = () => {
    setNewGoal(state.points.toString());
    setPointsModalIsVisible(true);
  };

  const onConfirmGoal = () => {
    const parsedGoal = parseInt(newGoal);
    if (!isNaN(parsedGoal)) {
      dispatch({ type: 'CHANGE_POINTS_GOAL', newGoal: parsedGoal });
      setPointsModalIsVisible(false);
    } else {
      Alert.alert("Error", "Ingrese un número válido");
    }
  };

  const onConfirmName = () => {
    const teamKey = changingLeft ? 'leftTeamName' : 'rightTeamName';
    dispatch({ type: 'CHANGE_TEAM_NAME', team: teamKey, newName });
    setNameModalIsVisible(false);
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
  };

  const ScoreButtonGroup = ({ team }) => (
    <Buttons
      leftButton='minus'
      rightButton='plus'
      onPressLeft={() => handlePress('DECREMENT', `${team}Points`)}
      onPressRight={() => handlePress('INCREMENT', `${team}Points`)} 
      color='white'
    />
  );

  const TeamName = ({ team }) => {
    const areGood = team === 'left' ?
                    state.leftPoints >= Math.floor(state.points / 2)
                    : state.rightPoints >= Math.floor(state.points / 2); 

    return (
      <Team name={state[`${team}TeamName`]} onChangeName={() => onChangeTeamName(team)} areGood={areGood} />
    );
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
          <LinearGradient 
            colors={[Colors.red, Colors.green]} 
            style={[StyleSheet.absoluteFill]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          />
          <View style={styles.pointsGoal}>
            <PointsGoal points={state.points} onPressPoints={() => onChangePoints()} />
          </View>
          <View style={styles.teamNames}>
            <TeamName team="left" />
            <TeamName team="right" />
          </View>
        </View>
        <View style={styles.scoreboard}>
          <ScoreBoard 
            points={state.points}
            leftPoints={state.leftPoints}
            rightPoints={state.rightPoints}
          />
        </View>
        <View style={styles.scoreButtons}>
          <ScoreButtonGroup team="left" />
          <ScoreButtonGroup team="right" />
        </View>
        <View style={styles.ads}>
          <Logo height={12} width={12} />
        </View>

        {/* GAME OVER MODAL */}
        <CustomModal isVisible={gameModalIsVisible} onBackdropPress={onCancelModal}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>¡Fin del Juego!</Text>
            <Text style={styles.modalText}>Ganador: {winner}</Text>
            
            <Buttons 
              leftButton='xmark'
              rightButton='check'
              onPressLeft={onCancelModal}
              onPressRight={onConfirmGame}
              color='black'
            />
          </View>
        </CustomModal>

        {/* POINTS MODAL */}
        <CustomModal isVisible={pointsModalIsVisible} onBackdropPress={onCancelModal}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>Cambiar Puntos</Text>
            <TextInput 
              value={newGoal}
              onChangeText={goal => setNewGoal(goal)}
              style={styles.input}
            />
            
            <Buttons 
              leftButton='xmark'
              rightButton='check'
              onPressLeft={onCancelModal}
              onPressRight={onConfirmGoal}
              color='black'
            />
          </View>
        </CustomModal>

        {/* GAME OVER MODAL */}
        <CustomModal isVisible={nameModalIsVisible} onBackdropPress={onCancelModal}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>Cambiar Nombre</Text>
            <TextInput 
              value={newName}
              onChangeText={name => setNewName(name)}
              style={styles.input}
            />
            
            <Buttons 
              leftButton='xmark'
              rightButton='check'
              onPressLeft={onCancelModal}
              onPressRight={onConfirmName}
              color='black'
            />
          </View>
        </CustomModal>
      </View>
    </SafeAreaView>
    
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreboard: {
    flex: 15,
  },
  scoreButtons: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ads: {
    flex: 1,
  },
  tapArea: {
    flex: 1
  },
  input: {
    fontFamily: 'Russo-One',
    fontSize: 24,
    backgroundColor: 'white',
    height: 64,
    width: 64,
    borderRadius: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: 'Russo-One',
    fontSize: 24,
  },
  logo: {
    opacity: 0.8
  },
  teamNames: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameScreen;
