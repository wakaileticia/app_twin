import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Home from '../screens/Home';
import SensorDetail from '../screens/SensorDetail';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="SensorDetail" component={SensorDetail} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
