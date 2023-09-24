import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SafeArea from '../components/SafeArea';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';

const NfcScreen = (prop: {
  ScanComplete: boolean | undefined;
  setScanComplete: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}) => {
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      prop.setScanComplete(false);
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      if (tag?.ndefMessage[0].payload)
        console.warn(
          'Tag found',
          // @ts-ignore
          Ndef.text.decodePayload(tag?.ndefMessage[0].payload),
        );
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  const writeNFC = async () => {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.textRecord('kavach')]);

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

  return (
    <>
      <TouchableOpacity
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
      </TouchableOpacity>
    </>
  );
};

export default NfcScreen;

const styles = StyleSheet.create({});
