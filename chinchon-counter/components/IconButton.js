import React from 'react';
import { View } from 'react-native';
import TapArea from './TapArea';
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

const IconButton = ({ onPress, style, iconName, iconSize, iconColor }) => {
  return (
    <TapArea onPress={onPress}>
      <View style={style}>
        {/* <FontAwesome6 name={iconName} size={iconSize} color={iconColor} /> */}
        <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />
      </View>
    </TapArea>
  );
};

export default IconButton;
