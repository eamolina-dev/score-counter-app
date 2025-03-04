import React from 'react';
import { View, StyleSheet } from 'react-native';
import PointsGroup from './PointsGroup';

const Points = ({ points }) => {
  const groups = Math.floor(points / 5);
  const remainingPoints = points % 5;

  return (
    <View style={styles.container}>
      {Array.from({ length: groups }).map((_, i) => (
        <PointsGroup key={`group-${i}`} points={5} />
      ))}
      {remainingPoints > 0 && <PointsGroup points={remainingPoints} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Points;
