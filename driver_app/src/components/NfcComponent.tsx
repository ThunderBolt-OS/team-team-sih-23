import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeArea from '../components/SafeArea';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import Lottie from 'lottie-react-native';
import {useAppContext} from '../lib/Context';
import {registerScan} from '../lib/api/Functions';

const NfcComponent = (prop: {startScan: boolean | undefined}) => {
  const context = useAppContext();
  useEffect(() => {
    if (prop.startScan) {
      readNdef();
      console.log('Local Auth Sucess');
      // Since Auth Success
    } else {
      NfcManager.cancelTechnologyRequest();
    }
  }, [, prop.startScan]);
  const [IsScanComplete, setIsScanComplete] = useState(false);
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      if (
        tag?.ndefMessage[0].payload &&
        context?.BandoBastData?.data &&
        context?.BandoBastData?.data.length > 0 &&
        context.Token
      ) {
        const res = await registerScan(
          //@ts-ignore
          Ndef.text.decodePayload(tag?.ndefMessage[0].payload),
          //@ts-ignore
          context?.BandoBastData?.data[0].id,
          context.Token.access,
        );
        if (res.data.success) setIsScanComplete(true);
        else Alert.alert(res.data.detail);
        console.warn(
          'Tag found',
          // @ts-ignore
          Ndef.text.decodePayload(tag?.ndefMessage[0].payload),
        );
        context?.setisAuthForScan(undefined);
      }
    } catch (ex) {
      console.warn('Oops!', ex);
      context?.setisAuthForScan(undefined);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  const writeNFC = async () => {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.textRecord('123')]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        result = true;
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  };

  if (!IsScanComplete)
    return (
      <>
        {/* <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: 'blue',
            alignSelf: 'center',
            marginTop: 40,
          }}
          onPress={readNdef}>
          <Text>Scan a Tag</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: 'blue',
            alignSelf: 'center',
            marginTop: 40,
          }}
          onPress={writeNFC}>
          <Text>Write Tag</Text>
        </TouchableOpacity> */}
        <Lottie
          source={require('../assets/animation/scan.json')}
          autoPlay></Lottie>
      </>
    );
  return (
    <>
      <Lottie
        source={require('../assets/animation/scan_success.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          context?.getAndSetPendingScanReq().then(() => {
            setIsScanComplete(false);
          });
        }}></Lottie>
    </>
  );
};

export default NfcComponent;

const styles = StyleSheet.create({});
