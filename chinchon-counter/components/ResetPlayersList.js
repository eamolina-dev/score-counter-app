import React from 'react';
import { View, Button, StyleSheet} from 'react-native';
import CustomButton from '../components/CustomButton';

const ResetPlayersList = ({ playersListLength, handleResetPlayersList }) => {
  return (
    <View style={styles.container}>
      {playersListLength >= 1 && playersListLength <= 8 && (
        <CustomButton 
          text="Borrar Lista"
          handleOnPress={handleResetPlayersList}
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

export default ResetPlayersList;
