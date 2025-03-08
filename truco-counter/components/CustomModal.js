import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const CustomModal = ({ children, isVisible, setIsVisible }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={["#070B14", "white"]}
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
    height: 220,
    width: 360,
    alignSelf: "center",
    borderRadius: 28,
    overflow: "hidden",
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
