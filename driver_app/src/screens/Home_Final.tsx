import {
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Mapbox, {UserLocation} from '@rnmapbox/maps';
import SafeArea from '../components/SafeArea';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import GetLocation, {Location} from 'react-native-get-location';
import {BottomSheet} from '../components/BottomSheet';
import NfcComponent from '../components/NfcComponent';
import {useAppContext} from '../lib/Context';
import useInterval from '../lib/useInterval';
import {Gyroscope, Accelerometer, DeviceMotion} from 'expo-sensors';
import BaseUrl from '../lib/api/BaseUrl';
import {isServerTimestampWithinEvent} from '../lib/api/Functions';
import CustButton from '../components/CustButton';
import {dangerBg, dangerText, primary} from '../lib/Theme';
import {useLocationContext} from '../lib/LocationContext';
import {Camera} from 'expo-camera';
import AlertModal from '../components/AlertModal';

const Home_Final = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const cameraRef: React.LegacyRef<Camera> | undefined = useRef(null);
  const [ModalVisible, setModalVisible] = useState(false);
  const [cameraType, setCameraType] = useState('back');
  const navigate = useNavigation();
  const context = useAppContext();

  useEffect(() => {
    // Request location permission
    (async () => {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      console.log(granted);
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          setCurrentLocation(location);
          console.log(location);
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    })();
  }, []);

  // const [location, setLocation] = React.useState('');
  const locationContext = useLocationContext();
  useEffect(() => {
    if (locationContext && locationContext.BusRouteLine)
      console.log(JSON.stringify(locationContext.BusRouteLine));
  }, [locationContext && locationContext.BusRouteLine]);

  useInterval(async () => {
    if (cameraRef && cameraRef.current) {
      if (cameraType == 'back') {
        setCameraType('front');
        // const photo = await cameraRef.current.takePictureAsync({base64: true});
        // console.log(photo.uri);
      } else {
        setCameraType('back');
        // const photo = await cameraRef.current.takePictureAsync({base64: true});
        // console.log(photo.uri);
      }
      // console.log('hello')
    }
  }, 10500);

  return (
    <>
      <Camera
        style={{
          flex: 1,
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          position: 'absolute',
          zIndex: -5,
        }}
        type={cameraType}
        ref={cameraRef}
      />
      <AlertModal
        visible={ModalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />
      <Mapbox.MapView
        style={styles.map}
        region={{
          latitude: 19.073652112022504,
          longitude: 72.90789325747129,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {currentLocation && (
          <Mapbox.Camera
            zoomLevel={12} // Adjust the initial zoom level as desired
            centerCoordinate={[72.89860546318086, 19.075138578444825]}
            animationMode="flyTo"
            animationDuration={1000}
          />
        )}
        {/* {currentLocation && (
          <UserLocation
            visible={true}
            animated={true}
            showsUserHeadingIndicator
            onUpdate={userLocation => console.log(userLocation)}
          />
        )} */}
        {locationContext &&
          locationContext.currBusStops &&
          locationContext.currBusStops.length > 0 && (
            <Mapbox.ShapeSource
              id="circleSource"
              shape={{
                type: 'FeatureCollection',
                features: locationContext?.currBusStops?.map(val => {
                  return {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [val[0], val[1]],
                    },
                    properties: {},
                  };
                }),
              }}>
              <Mapbox.CircleLayer
                id="circleLayer"
                style={{circleRadius: 25, circleColor: 'rgba(255,255,0,0.8)'}}
              />
            </Mapbox.ShapeSource>
          )}
        {/* {locationContext &&
          locationContext.currBusStops &&
          locationContext.currBusStops.length > 0 &&
          locationContext.currBusStops.map(val => ( */}
        {locationContext && locationContext.currlocation && (
          <Mapbox.MarkerView
            id={'map-bus-ride'}
            coordinate={[locationContext.currlocation.coords.longitude, locationContext.currlocation.coords.latitude]}
            key={'map-bus-ride'}
            anchor={{x: 0.5, y: 1}}>
            <Image
              source={require('../assets/images/bus-ride.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          </Mapbox.MarkerView>
        )}
        {locationContext &&
          locationContext.currBusStops &&
          locationContext.currBusStops.length > 0 &&
          locationContext.currBusStops.map((val, index) => (
            <Mapbox.MarkerView
              id={index.toString()}
              coordinate={val}
              key={index.toString()}
              anchor={{x: 0.5, y: 1}}>
              <Image
                source={require('../assets/images/bus-stop.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            </Mapbox.MarkerView>
          ))}
        {locationContext &&
          locationContext.BusRouteLine &&
          locationContext.BusRouteLine.geometry && (
            <Mapbox.ShapeSource
              id="routeSource"
              shape={locationContext.BusRouteLine.geometry}>
              <Mapbox.LineLayer
                id="routeLayer"
                style={{
                  lineColor: '#FF0000', // Line color (red)
                  lineWidth: 3,
                }}
              />
            </Mapbox.ShapeSource>
          )}
      </Mapbox.MapView>
      <View
        style={{
          position: 'absolute',
          bottom: 15,
          flexDirection: 'row',
          zIndex: 10,
          justifyContent: 'space-between',
          width: '100%',
          padding: 15,
        }}>
        <CustButton
          text="SOS"
          onButtonPress={() => {
            setModalVisible(true);
          }}
          container_style={{flex: 0.4, backgroundColor: dangerText}}
          text_style={{textAlign: 'center', color: 'white'}}></CustButton>
        <CustButton
          text="End Trip"
          onButtonPress={() => {
            Alert.alert(
              'End Trip',
              'Are you sure you want to end trip ?',
              [
                {
                  text: 'Proceed',
                  onPress: () => {
                    navigate.navigate('EndTrip');
                  },
                },
                {
                  text: 'Cancel',
                },
              ].reverse(),
            );
          }}
          container_style={{flex: 0.4, backgroundColor: primary}}
          text_style={{textAlign: 'center', color: 'white'}}></CustButton>
      </View>
    </>
  );
};

export default Home_Final;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
