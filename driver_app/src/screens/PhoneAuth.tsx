// import {Alert, StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import * as LocalAuthentication from 'expo-local-authentication';
// import SafeArea from '../components/SafeArea';
// import {useNavigation} from '@react-navigation/native';

// const PhoneAuth = () => {
//   const navigation = useNavigation();
//   useEffect(() => {
//     (async () => {
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       if (compatible) handleBiometricAuth();
//     })();
//   });

//   // const handleBiometricAuth = async () => {
//   //   const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
//   //   if (!savedBiometrics)
//   //     return Alert.alert(
//   //       'Biometric record not found',
//   //       'Please verify your identity with your password',
//   //     );
//   //   const biometricAuth = await LocalAuthentication.authenticateAsync({
//   //     promptMessage: 'Please authenticate',
//   //     disableDeviceFallback: true,
//   //     cancelLabel: 'Cancel',
//   //   });
//   //   if (biometricAuth.success) {
//   //     try {
//   //       //@ts-ignore
//   //       // navigation.navigate('Login');
//   //     } catch (error) {}
//   //   } else {
//   //     Alert.alert('Auth Invalid');
//   //   }
//   // };
//   return (
//     <SafeArea>
//       <></>
//     </SafeArea>
//   );
// };

// export default PhoneAuth;

// const styles = StyleSheet.create({});

export {}