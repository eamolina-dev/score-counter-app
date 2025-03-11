import { Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

const Title = ({ text }) => {

  return (
    <Text style={styles.text}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontSize: 24,
    marginVertical: 8,
  },
});

export default Title;
