import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import TapArea from './TapArea';
import { Colors } from '../constants/colors';

const TapToModal = ({ children, isVisible, setIsVisible, title, value, onChangeText, onPress }) => {
  return (
    <View style={styles.container}>
      <TapArea onPress={() => setIsVisible(true)}>
        {children}
      </TapArea>

      <Modal 
        isVisible={isVisible} 
        onBackdropPress={() => setIsVisible(false)}
        animationType='slide'
        // backdropColor='transparent'
        backdropOpacity={0.5}
        // statusBarTranslucent={true}
      >
        <View style={styles.modal}>
          {/* <Text style={styles.title}>{title}</Text>
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
          </TapArea> */}

          <TapArea 
            onPress={onPress}
            style={styles.tapArea}
          >
            <Text>Nuevo Juego</Text>
          </TapArea>
          <TapArea 
            onPress={onPress}
            style={styles.tapArea}
          >
            <Text>Cancelar</Text>
          </TapArea>
        </View>
      </Modal>
    </View>
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
