import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BElement} from '../lib/interfaces/BandoBastInterface';
import {useAppContext} from '../lib/Context';
import CustButton from './CustButton';

const BandoBastCard = (props: BElement) => {
  const context = useAppContext();
  return (
    <View
      style={{
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'white',
        padding: 8,
      }}>
      <Text>Bandobast id :{props.id}</Text>
      <Text>Created by : {props.created_by}</Text>
      <Text>{props.name}</Text>
      <Text>{new Date(props.start_time).toLocaleString()}</Text>
      <Text>{new Date(props.end_time).toLocaleString()}</Text>
      <CustButton
        text="View Bandobast"
        onButtonPress={() => context?.getAndSetBandobast()}
      />
    </View>
  );
};

export default BandoBastCard;

const styles = StyleSheet.create({});
