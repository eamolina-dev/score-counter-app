import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../constants/colors';

const CustomModal = ({ children, isVisible, setIsVisible }) => {
  return (
    <Modal 
      isVisible={isVisible} 
      onBackdropPress={() => setIsVisible(false)}
      animationType='slide'
      // backdropColor='transparent'
      backdropOpacity={0.5}
      // statusBarTranslucent={true}
    >
      <View style={styles.modal}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignSelf: 'center',
    borderColor: 'blue',
    borderWidth: 2,
  },
  modal: {
    height: 200,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    borderColor: 'blue',
    borderWidth: 3,
    backgroundColor: Colors.lightgrey,
  },
});

export default CustomModal;
