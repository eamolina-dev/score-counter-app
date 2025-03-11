import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator'; // Stack para Home
import SettingsScreen from '../screens/SettingsScreen';
import { Colors } from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="HomeTab" 
        component={StackNavigator} 
        options={{ 
          title: 'Inicio', 
          headerShown: false,
          tabBarIcon: () => (
            <Icon name="home-outline" size={24} color={Colors.black} />
          ),
        }} 
      />
      
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: 'Ajustes', 
          headerShown: false,
          tabBarIcon: () => (
            <Icon name="settings-outline" size={24} color={Colors.black} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
