import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreatePlan from '../screens/CreatePlan';
import Dashboard from '../screens/Dashboard'
const Stack = createStackNavigator();
export default function MainRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard}/>
      <Stack.Screen name="CreatePlan" component={CreatePlan} />
    </Stack.Navigator>
  );
}
