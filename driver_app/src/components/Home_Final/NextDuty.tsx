import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeArea from '../SafeArea';
import {useAppContext} from '../../lib/Context';
import NextDutyCard from './NextDutyCard';

const NextDuty = () => {
  const context = useAppContext();
  return (
    <SafeArea>
      <FlatList data={context?.OfficerData} renderItem={(val) => <NextDutyCard {...val.item}></NextDutyCard>} />
    </SafeArea>
  );
};

export default NextDuty;

const styles = StyleSheet.create({});
