import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import TapArea from './TapArea';
import { Colors } from '../constants/colors';

const TapToModal = ({ children, isVisible, title, value, onChangeText, onPress }) => {
  const [modalVisible, setModalVisible] = useState(isVisible);
  
  const handleBackdropPress = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TapArea onPress={() => setModalVisible(true)}>
        {children}
      </TapArea>

      <Modal 
        isVisible={modalVisible} 
        onBackdropPress={handleBackdropPress}
        animationType='slide'
        backdropOpacity={0.5}
      >
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <TextInput 
            value={value}
            onChangeText={text => onChangeText(text)}
            style={styles.input}
          />
          <TapArea 
            onPress={onPress}
            style={styles.tapArea}
          >
            <Text>Confirm</Text>
          </TapArea>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  modal: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    borderColor: 'blue',
    borderWidth: 3,
    backgroundColor: Colors.lightgrey,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'red',
  },
  input: {
    flex: 2,
    backgroundColor: 'green',
  },
  tapArea: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default TapToModal;
