import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const PointsGroup = ({ points }) => {
  return (
    <View style={styles.pointsGroup}>
      {Array.from({ length: points }).map((_, i) => (
        <FontAwesome key={i} name='minus' size={24} color='black' style={styles.point} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pointsGroup: {
    borderColor: 'black',
    borderWidth: 1,
    height: 92,
    width: 92,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },  
  point: {
    transform: [{ rotate: "90deg" }],
    margin: 0,
    padding: 0,
  },
});

export default PointsGroup;