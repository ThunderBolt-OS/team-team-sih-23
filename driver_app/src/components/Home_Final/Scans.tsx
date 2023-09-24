import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeArea from '../SafeArea';
import {useAppContext} from '../../lib/Context';
import BandoBastCard from '../BandoBastCard';
import PendingScanReqCard from '../PendingScanReqCard';

const Scans = () => {
  const context = useAppContext();
  return (
    <SafeArea>
      <FlatList
        data={context?.PendingScanReqs}
        renderItem={element => <PendingScanReqCard key={element.index.toString()} {...element.item} />}
      />
    </SafeArea>
  );
};

export default Scans;

const styles = StyleSheet.create({});
