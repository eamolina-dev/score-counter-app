import React from 'react';
import { View, StyleSheet } from 'react-native';
import PointsGroup from './PointsGroup';

const Points = ({ points }) => {
  const fullGroups = Math.floor(points / 5);
  const remPoints = points % 5;

  return (
    <View style={styles.container}>
      {Array.from({ length: fullGroups }).map((_, index) => (
        <PointsGroup key={index} points={5} height={100} width={100} />
      ))}
      
      {remPoints > 0 && (
        <PointsGroup key="remPoints" points={remPoints} height={100} width={100} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: 'white',
    // borderWidth: 1,
    paddingTop: 36,
  },
});

export default Points;
