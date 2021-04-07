import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CreatePlan from '../screens/CreatePlan';
import Profile from '../screens/Profile';
import MainRoutes from './MainRoutes';
import Dashboard from '../screens/Dashboard';
import Plan from '../screens/Plan';
const Stack = createStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="profile">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="CreatePlan" component={CreatePlan} />
        {/* <Stack.Screen name="MainRoutes" component={MainRoutes} options={{headerShown:false}}/> */}
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="plan" component={Plan}/>
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
