import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Svg, { Line } from "react-native-svg";
import { Colors } from '../constants/colors';

const PointsGroup = ({ points }) => {
  return (
    <View style={styles.pointsGroup}>
      {/*{Array.from({ length: points }).map((_, i) => (
        <FontAwesome key={i} name='minus' size={24} color='black' style={styles.point} />
      ))}*/}

      <Svg height="100" width="100">
        {points >= 1 && <Line x1="20" y1="80" x2="20" y2="20" stroke={Colors.darkgrey} strokeWidth="4" strokeLinecap="round" />}
        {points >= 2 && <Line x1="20" y1="20" x2="80" y2="20" stroke={Colors.darkgrey} strokeWidth="4" strokeLinecap="round" />}
        {points >= 3 && <Line x1="80" y1="20" x2="80" y2="80" stroke={Colors.darkgrey} strokeWidth="4" strokeLinecap="round" />}
        {points >= 4 && <Line x1="80" y1="80" x2="20" y2="80" stroke={Colors.darkgrey} strokeWidth="4" strokeLinecap="round" />}
        {points >= 5 && <Line x1="20" y1="80" x2="80" y2="20" stroke={Colors.darkgrey} strokeWidth="4" strokeLinecap="round" />}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  pointsGroup: {
    // borderColor: 'black',
    // borderWidth: 1,
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
