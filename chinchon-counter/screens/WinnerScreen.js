import React from 'react';
import { StyleSheet} from 'react-native';
import { Colors } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../components/Title';

const WinnerScreen = ({ playerName }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Title text="Ganador/a" />

      <Title text={playerName} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    padding:'20%'
  },
});

export default WinnerScreen;
