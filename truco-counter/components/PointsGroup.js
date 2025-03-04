import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Svg, { Line } from "react-native-svg";
import { Colors } from '../constants/colors';
import Match from '../assets/svg/match.svg';

const matchPositions = [
  { x: 20, y: 80, rotate: "0deg" },    // Fósforo 1 (vertical izquierda)
  { x: 20, y: 20, rotate: "90deg" },   // Fósforo 2 (horizontal arriba)
  { x: 80, y: 20, rotate: "180deg" },  // Fósforo 3 (vertical derecha)
  { x: 80, y: 80, rotate: "270deg" },  // Fósforo 4 (horizontal abajo)
  { x: 20, y: 80, rotate: "45deg" },   // Fósforo 5 (diagonal)
];

const PointsGroup = ({ points }) => {
  return (
    <View style={styles.pointsGroup}>
      {/*{Array.from({ length: points }).map((_, i) => (
        <FontAwesome key={i} name='minus' size={24} color='black' style={styles.point} />
      ))}*/}
      {/* <Match width={64} height={64} />

      <Svg height="100" width="100">
        {points >= 1 && <Line x1="20" y1="80" x2="20" y2="20" stroke={Colors.darkgrey} strokeWidth="4" strokeLinecap="round" />}
        {points >= 2 && <Line x1="20" y1="20" x2="80" y2="20" stroke={Colors.darkgrey} strokeWidth="4" strokeLinecap="round" />}
        {points >= 3 && <Line x1="80" y1="20" x2="80" y2="80" stroke={Colors.darkgrey} strokeWidth="4" strokeLinecap="round" />}
        {points >= 4 && <Line x1="80" y1="80" x2="20" y2="80" stroke={Colors.darkgrey} strokeWidth="4" strokeLinecap="round" />}
        {points >= 5 && <Line x1="20" y1="80" x2="80" y2="20" stroke={Colors.darkgrey} strokeWidth="4" strokeLinecap="round" />}
      </Svg> */}

          <Match 
            // key={i} 
            width={64} 
            height={64} 
            style={styles.match}
            transform={[
              { translateX: -30 },
              { translateY: 120 },
              { rotate: '0deg' }
            ]}
          />

          <Match 
            // key={i} 
            width={64} 
            height={64} 
            transform={[
              { translateX: 0 },
              { translateY: 30 },
              { rotate: '90deg' }
            ]}
          />

          <Match 
            // key={i} 
            width={64} 
            height={64} 
            transform={[
              { translateX: 20 },
              { translateY: 0 },
              { rotate: '180deg' }
            ]}
          />

          <Match 
            // key={i} 
            width={64} 
            height={64} 
            transform={[
              { translateX: -10 },
              { translateY: -40 },
              { rotate: '270deg' }
            ]}
          />

          <Match 
            // key={i} 
            width={64} 
            height={64} 
            transform={[
              { translateX: 0 },
              { translateY: -140 },
              { rotate: '45deg' }
            ]}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  pointsGroup: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderColor: 'black',
    borderWidth: 1,
  },  
  match: {
    margin: 0,
    padding: 0,
  },
});

export default PointsGroup;
