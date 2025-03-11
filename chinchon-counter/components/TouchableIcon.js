import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function TouchableIcon({ icon, size, color, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.settingsButton}>
      <FontAwesome name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

});

export default TouchableIcon;
