import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';
import SensorDetail from '../screens/SensorDetail';
import Settings from '../screens/Settings';
import AddSensor from '../screens/AddSensor';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SensorDetail: { id: string };
  Settings: undefined;
  AddSensor: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
