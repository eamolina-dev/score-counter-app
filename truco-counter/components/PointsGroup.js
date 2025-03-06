import React from 'react';
import { View, StyleSheet } from 'react-native';
import Match from '../assets/svg/match.svg';

const PointsGroup = ({ points, height, width }) => {
  return (
    <View style={[styles.pointsGroup, { height, width }]}>
      { points >= 1 && <Match 
          height={64} 
          width={64} 
          style={styles.match1}
          transform={[
            { rotate: '0deg' }
          ]}
        />
      }
      { points >= 2 && <Match 
          height={64} 
          width={64} 
          style={styles.match2}
          transform={[
            { rotate: '90deg' }
          ]}
        />
      }
      { points >= 3 && <Match 
          height={64} 
          width={64} 
          style={styles.match3}
          transform={[
            { rotate: '180deg' }
          ]}
        />
      }
      { points >= 4 && <Match 
          height={64} 
          width={64} 
          style={styles.match4}
          transform={[
            { rotate: '270deg' }
          ]}
        />
      }
      { points >= 5 && <Match 
          height={64} 
          width={64} 
          style={styles.match5}
          transform={[
            { rotate: '45deg' }
          ]}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  pointsGroup: {
    position: 'relative',
  },  
  match1: {
    position: 'absolute',
    top: 10,
    left: -11,
  },
  match2: {
    position: 'absolute',
    top: -19,
    left: 23,
  },
  match3: {
    position: 'absolute',
    top: 20,
    left: 48,
  },
  match4: {
    position: 'absolute',
    top: 51,
    left: 14,
  },
  match5: {
    position: 'absolute',
    top: 13,
    left: 22,
  },
});

export default PointsGroup;
