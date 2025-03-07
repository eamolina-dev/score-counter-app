import React from 'react';
import { View, StyleSheet } from 'react-native';
import PointsGroup from './PointsGroup';

const Points = ({ fullGroups, rest, points }) => {

  return (
    <View style={styles.container}>
      {Array.from({ length: fullGroups }).map((_, index) => (
        <PointsGroup key={index} points={5} height={100} width={100} />
      ))}
      <PointsGroup points={rest} height={100} width={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    // justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 2
  },
});

export default Points;
