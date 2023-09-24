import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const WS = () => {
  useEffect(() => {
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS['android.permission.ACCESS_FINE_LOCATION'])
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
    ]).then(() => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      ).then(async () => {
      });
    });
  }, []);
  return (
    <View>
      <Text>WS</Text>
    </View>
  );
};

export default WS;

const styles = StyleSheet.create({});
