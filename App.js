import React from 'react';
import {View, Text} from 'react-native';
import Login from './src/screens/LoginScreen';
import SignUp from './src/screens/SignUpScreen';
import Routes from './src/routes/routes';
import {Context} from './src/context/context';
export default function App() {
  return (
    <Context>
      <Routes />
    </Context>
  );
}
