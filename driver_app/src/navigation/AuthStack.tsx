import React from 'react';
import Login from '../screens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../screens/Signup';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="PhoneAuth" component={PhoneAuth} /> */}
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Signup" component={Signup} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;

