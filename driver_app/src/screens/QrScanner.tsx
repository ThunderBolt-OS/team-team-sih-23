import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import * as React from 'react';
import {Svg, Defs, Mask, Rect} from 'react-native-svg';
import React, {useCallback, useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomText from '../components/CustomText';
import {Camera, CameraType} from 'expo-camera';
import {
  BarCodeEvent,
  BarCodeScannedCallback,
  BarCodeScanner,
} from 'expo-barcode-scanner';
const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const QrCodeScanner = ({navigation}: any) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(CameraType.back);
  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then(val => {
      setHasPermission(val.status == 'granted');
    });
  }, []);
  const handleBarCodeScanned = (val: any) => {
    if (val.data == 411) {
      navigation.navigate('Home_Final');
    } else {
      Alert.alert('Error in QR');
    }
  };
  if (hasPermission === null) {
    return <CustomText>Requesting for camera permission</CustomText>;
  }
  if (hasPermission === false) {
    return <CustomText>No access to camera</CustomText>;
  }
  return (
    <>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
      />
      {/* <Camera
        style={StyleSheet.absoluteFill}
        type={type}
        barCodeScannerSettings={{
          barCodeTypes: ["qr"],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ></Camera> */}
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      <View
        style={{
          position: 'absolute',
          top: '5%',
          left: '2%',
          zIndex: 2,
          alignSelf: 'center',
        }}>
        {/* <Entypo
          name="cross"
          size={32}
          color="white"
          onPress={() => navigation.popToTop()}
        /> */}
      </View>
      <View
        style={{
          position: 'absolute',
          top: '12%',
          zIndex: 2,
          alignSelf: 'center',
        }}>
        <CustomText style={[styles.text, {color: 'white'}]}>
          Scan the QR code when you get to the bus
        </CustomText>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Mymask></Mymask>
      </View>
      {/* </View> */}
    </>
  );
};
const Mymask = () => {
  return (
    <Svg height={'100%'} width={'100%'}>
      <Defs>
        <Mask id="mask" x={'0'} y={'0'} height="100%" width={'100%'}>
          <Rect height={'100%'} width={'100%'} fill="#fff"></Rect>
          <Rect x={'18%'} y="30%" width={250} height={250} fill="black"></Rect>
        </Mask>
      </Defs>
      <Rect
        width={'100%'}
        height="100%"
        // fill={'rgba(0,0,0,0.85)'}
        fill={'black'}
        mask="url(#mask)"></Rect>
      <Rect
        width={250}
        height={250}
        x="18%"
        y={'30%'}
        strokeWidth={5}
        fill={'transparent'}
        stroke="white"></Rect>
    </Svg>
  );
};
export default QrCodeScanner;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  camera: {
    marginVertical: 24,
    height: '40%',
    width: '70%',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 35,
    marginTop: 20,
    fontSize: 20,
  },
  outerOverlay: {
    position: 'absolute',
    width: ScreenWidth,
    height: ScreenHeight,
    zIndex: 1,
    backgroundColor: 'pink',
    opacity: 0.3,
  },
  leftTop: {
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: 'white',
  },
  leftBottom: {
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'white',
  },
  rightTop: {
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: 'white',
  },
  rightBottom: {
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'white',
  },
});
