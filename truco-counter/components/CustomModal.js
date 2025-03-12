import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const CustomModal = ({ children, isVisible, onBackdropPress }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      presentationStyle="overFullScreen"
    >
      <View style={styles.modalContainer}>
      <LinearGradient
        colors={[Colors.white, Colors.white]} 
        style={styles.gradient}
      >

          <View style={styles.modalContent}>{children}</View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: 100,
    width: 360,
    alignSelf: "center",
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: 'white'
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomModal;
