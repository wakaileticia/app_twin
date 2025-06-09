import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';
import SensorDetail from '../screens/SensorDetail';
import Settings from '../screens/Settings';
import AddSensor from '../screens/AddSensor'; // Novo

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SensorDetail" component={SensorDetail} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="AddSensor" component={AddSensor} options={{ title: 'Novo Sensor' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
