import React, { useEffect, useReducer, useCallback, useState } from 'react';
import { StyleSheet, Alert, View, Text, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Header from '../components/Header';
import Logo from '../assets/svg/logo.svg';
import Team from '../components/Team';
import ScoreButtons from '../components/ScoreButtons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TapArea from '../components/TapArea';
import TapToModal from '../components/TapToModal';
import CustomModal from '../components/CustomModal';
import ScoreBoard from '../components/ScoreBoard';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
      onPressPlus={() => handlePress('INCREMENT', team)} 
      onPressMinus={() => handlePress('DECREMENT', team)} 
    />
  );

  const TeamName = ({ team }) => {
    const isLeftTeam = team === state.leftTeamName;

    return (
      <TapToModal 
        title="Cambiar Nombre"
        isVisible={nameModalIsVisible}
        setIsVisible={setNameModalIsVisible}
        value={newName}
        onChangeText={setNewName}
        onPress={isLeftTeam ? handleChangeLeftTeamName : handleChangeRightTeamName}
        onConfirm={() => console.log('Valor confirmado:', newName)}
      >
        {isLeftTeam ? 
          <Team name={state.leftTeamName} onChangeName={onChangeLeftTeamName} /> 
          : <Team name={state.rightTeamName} onChangeName={onChangeRightTeamName} />}
      </TapToModal>
    );
  };

  const onPressSettings = () => {};


  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Logo width={80} height={80} />
          </View>
          <View style={styles.headerMid}>
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
          <View style={styles.headerRight}>
            <TapArea onPress={onPressSettings}>
            {/* () => dispatch({ type: 'RESET_GAME' }) */}
              <View style={styles.settings}>
                <FontAwesome name='gear' size={32} color='black' />
              </View>
            </TapArea>
          </View>
        </View>
        <View style={styles.teamNames}>
          <TeamName team={state.leftTeamName} />
          <TeamName team={state.rightTeamName} />
        </View>
        <View style={styles.scoreboard}>
          <ScoreBoard 
            points={state.points}
            leftPoints={state.leftPoints}
            rightPoints={state.rightPoints}
          />
        </View>
        <View style={styles.scoreButtons}>
          <ScoreButtonGroup team="leftPoints" />
          <ScoreButtonGroup team="rightPoints" />
        </View>
        <View style={styles.ads}>
        </View>

        <CustomModal isVisible={customModal} setIsVisible={setCustomModal}>
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>¡Fin del Juego!</Text>
            <Text style={{ fontSize: 16, marginVertical: 10 }}>Ganador: {winner}</Text>
            <Button title="OK" onPress={() => { dispatch({ type: 'RESET_GAME' }); setCustomModal(false); }} />
            <Button title="CANCEL" onPress={() => { setCustomModal(false); }} />
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
  container: {
    flex: 1,
  },
  header: {
    flex: 3,
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  headerLeft: {
    flex: 1,
    backgroundColor: 'blue'
  },
  headerMid: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    backgroundColor: 'green'
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
  settings: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: 56,
    borderRadius: 28,
  },
});

export default GameScreen;
