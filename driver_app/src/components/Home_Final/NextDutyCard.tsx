import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {OfficerData} from '../../lib/interfaces/OfficerInterface';

const NextDutyCard = (officer_data: OfficerData) => {
  return (
    <View>
      <Text>Latitude : {officer_data.nfc_data?.latitude}</Text>
      <Text>Longitude : {officer_data.nfc_data?.longitude}</Text>
      <Text>Altitude : {officer_data.nfc_data?.altitude}</Text>
    </View>
  );
};

export default NextDutyCard;

const styles = StyleSheet.create({});
