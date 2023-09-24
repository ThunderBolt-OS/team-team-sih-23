import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import UserStack from './UserStack';
import {useAppContext} from '../lib/Context';
import AuthStack from './AuthStack';

const index = () => {
  const context = useAppContext();
  return <>{context?.IsLoggedIn ? <UserStack /> : <AuthStack />}</>;
};

export default index;

const styles = StyleSheet.create({});
