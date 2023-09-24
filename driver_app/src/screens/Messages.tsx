import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeArea from '../components/SafeArea';

const Messages = () => {
  const data = [
    {
      message: 'Hi',
    },
    {
      message: 'Hello',
    },
  ];
  return (
    <SafeArea>
      <Text>Messages</Text>
    </SafeArea>
  );
};

export default Messages;

const styles = StyleSheet.create({});
