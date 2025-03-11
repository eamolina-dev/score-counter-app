import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

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
        {children}
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
});

export default CustomModal;
