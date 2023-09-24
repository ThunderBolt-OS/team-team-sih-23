import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Camera} from 'expo-camera';

const BusPhotoScreen = ({navigation}: any) => {
  const cameraRef: React.LegacyRef<Camera> | undefined = useRef(null);
  const [cameraType, setCameraType] = useState('back');
  return (
    <>
      <Camera
        style={{
          flex: 1,
        }}
        type={cameraType}
        ref={cameraRef}
      />
      <TouchableOpacity
        style={styles.captureButton}
        onPress={async () => {
          if (cameraRef && cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({
              base64: true,
            });
            console.log(photo.uri);
            navigation.navigate('EndTrip',{imageLink : photo.uri});
          }
        }}>
        <View style={styles.shutterButton} />
      </TouchableOpacity>
    </>
  );
};

export default BusPhotoScreen;

const styles = StyleSheet.create({
  captureButton: {
    alignSelf: 'center',
    marginBottom: 20,
    bottom: 20,
    position: 'absolute',
  },
  shutterButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
  },
});
