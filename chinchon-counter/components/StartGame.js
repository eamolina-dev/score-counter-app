import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

const StartGame = ({ players }) => {
  const navigation = useNavigation();

  const handleStartGame = () => {
    navigation.navigate('Game', { players });
  };

  return (
    <View style={styles.container}>
      {players.length >= 2 && players.length <= 8 && (
        <CustomButton 
          text="Comenzar Juego"
          handleOnPress={handleStartGame}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'white',
    paddingHorizontal: 12,
    marginVertical: 8,
  },
});

export default StartGame;
