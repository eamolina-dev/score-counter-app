import React, { useEffect, useReducer, useCallback, useState } from 'react';
import { StyleSheet, Alert, View, Text, Button, TextInput, StatusBar, useColorScheme } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Header from '../components/Header';
import Logo from '../assets/svg/logo.svg';
import Team from '../components/Team';
import ScoreButtons from '../components/ScoreButtons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TapArea from '../components/TapArea';
import CustomModal from '../components/CustomModal';
import ScoreBoard from '../components/ScoreBoard';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from "@expo/vector-icons";

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, [action.team]: Math.min(state.points , state[action.team] + 1) };
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
  const [winner, setWinner] = useState('');

  const [changingLeft, setChangingLeft] = useState(true);

  const isDarkMode = useColorScheme() === 'dark';

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
      dispatch({ type: 'SET_GAME_OVER' });
      setCustomModal(true);
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

  const onChangeTeamName = (team) => {
    setNewName(state[`${team}TeamName`]);
    setChangingLeft(team === 'left');
    setNameModalIsVisible(true);
  };
  
  const handleChangeTeamName = () => {
    const teamKey = changingLeft ? 'leftTeamName' : 'rightTeamName';
    dispatch({ type: 'CHANGE_TEAM_NAME', team: teamKey, newName });
    setNameModalIsVisible(false);
  };  

  const onChangePoints = () => {
    setNewGoal(state.points.toString());
    setPointsModalIsVisible(true);
  };

  const handleChangePoints = () => {
    const parsedGoal = parseInt(newGoal);
    if (!isNaN(parsedGoal)) {
      dispatch({ type: 'CHANGE_POINTS_GOAL', newGoal: parsedGoal });
      setPointsModalIsVisible(false);
    } else {
      Alert.alert("Error", "Ingrese un número válido");
    }
  };  


  const ScoreButtonGroup = ({ team }) => (
    <ScoreButtons
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

  const onPressSettings = () => {};


  return (
    <SafeAreaView style={styles.screen}>
      <LinearGradient
        colors={true ? ['#070B14', '#000000'] : []}
        style={styles.background}
      />
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
      <LinearGradient 
        colors={[Colors.red, Colors.green]} 
        style={styles.header}
        start={{ x: 0, y: 0.5 }} // Inicia desde la izquierda
        end={{ x: 1, y: 0.5 }} // Termina en la derecha
      >
          {/* <View style={styles.header}> */}
          <View style={styles.headerLeft}>
            <Logo width={80} height={80} />
          </View>
          <View style={styles.headerMid}>
            <Header points={state.points.toString()} onPressPoints={onChangePoints} />
          </View>
          <View style={styles.headerRight}>
            <TapArea onPress={onPressSettings}>
            {/* () => dispatch({ type: 'RESET_GAME' }) */}
              <View style={styles.settings}>
                <FontAwesome name='gear' size={32} color='black' />
                <Text style={styles.settingsText}>Ajustes</Text>
              </View>
            </TapArea>
          </View>
        {/* </View> */}
        </LinearGradient>
          <View style={styles.teamNames}>
            <TeamName team="left" />
            <TeamName team="right" />
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
        </View>

        {/* GAME OVER MODAL */}
        <CustomModal isVisible={nameModalIsVisible} setIsVisible={setNameModalIsVisible}>
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={styles.modalText}>¡Fin del Juego!</Text>
            <Text style={styles.modalText}>Ganador: {winner}</Text>
            
            <ScoreButtons 
              leftButton='xmark'
              rightButton='check'
              onPressLeft={() => {}}
              onPressRight={() => {}}
              color='black'
            />
          </View>
        </CustomModal>

        {/* POINTS MODAL */}
        <CustomModal isVisible={pointsModalIsVisible} setIsVisible={setPointsModalIsVisible}>
          <View style={styles.pointsModal}>
            <Text style={styles.modalText}>Cambiar Puntos</Text>
            <TextInput 
              value={newGoal}
              onChangeText={handleChangePoints}
              style={styles.input}
            />
            
            <ScoreButtons 
              leftButton='xmark'
              rightButton='check'
              onPressLeft={() => {}}
              onPressRight={() => {}}
              color='black'
            />
          </View>
        </CustomModal>

        {/* GAME OVER MODAL */}
        <CustomModal isVisible={nameModalIsVisible} setIsVisible={setNameModalIsVisible}>
          <View style={styles.pointsModal}>
            <Text style={styles.modalText}>Cambiar Nombre</Text>
            <TextInput 
              value={newName}
              onChangeText={handleChangeTeamName}
              style={styles.input}
            />
            
            <ScoreButtons 
              leftButton='xmark'
              rightButton='check'
              onPressLeft={() => {}}
              onPressRight={() => {}}
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
    flex: 2,
    flexDirection: 'row',
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMid: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
  },
  teamNames: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  scoreboard: {
    flex: 15,
  },
  scoreButtons: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  ads: {
    flex: 1,
  },
  modal: {
    height: 300,
  },
  tapArea: {
    flex: 1
  },
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: 56,
    borderRadius: 28,
    color: Colors.white,
  },
  settingsText: {
    fontFamily: 'Russo-One',
    fontSize: 12
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
  pointsModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: 'Russo-One',
    fontSize: 24,
  },
  button: {
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  plusButton: {
    borderColor: Colors.green,
    borderWidth: 5,
  },
  minusButton: {
    borderColor: Colors.red,
    borderWidth: 5,
  },
});

export default GameScreen;
