import {StyleSheet} from 'react-native';
import React from 'react';
import NfcScreen from '../screens/NfcScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WS from '../screens/WS';
import Home_Final from '../screens/Home_Final';
import Messages from '../screens/Messages';
import Profile from '../screens/Profile';
import QrScanner from '../screens/QrScanner';
import EndTrip from '../screens/EndTrip';
import BusPhotoScreen from '../screens/BusPhotoScreen';

const UserStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="QrScanner" component={QrScanner} />
      <Stack.Screen name="Home_Final" component={Home_Final} />
      <Stack.Screen name="EndTrip" component={EndTrip} />
      <Stack.Screen name="BusPhotoScreen" component={BusPhotoScreen} />
      {/* <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Profile" component={Profile} /> */}
      {/* <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="WS" component={WS} /> */}
    </Stack.Navigator>
  );
};


export default UserStack;

const styles = StyleSheet.create({});
