import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NearbySosData} from '../lib/interfaces/SosApiInterface';
import GetLocation, {Location} from 'react-native-get-location';
import axios from 'axios';
import CustButton from './CustButton';

const ITEM_WIDTH = 250;

const SosCard = ({NearbyApiRes}: {NearbyApiRes: NearbySosData[]}) => {
  //   const [NearbyApiRes, setNearbyApiRes] = useState<NearbySosData[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange: (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => void = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(offsetX / ITEM_WIDTH);
    setCurrentPage(newIndex);
  };
  // useEffect(() => {
  //   AsyncStorage.getItem('sos').then(value => {
  //     if (value) {
  //       setNearbyApiRes(JSON.parse(value));
  //     }
  //   });
  // }, []);
  return (
    <View style={{height: 350}}>
      <FlatList
        data={NearbyApiRes}
        ListEmptyComponent={<ActivityIndicator animating size={35} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={{fontFamily: 'rm', fontSize: 18, color: '#5d545d'}}>
              {item.properties.name}
            </Text>
            {/* <Text style={styles.itemText}>{item.properties.address_line1}</Text> */}
            <Text style={{color: 'green', fontFamily: 'rb', fontSize: 14}}>
              {item.properties.distance} mtrs away
            </Text>
            <Text style={{color: '#8d848d', fontFamily: 'rli', marginTop: 4}}>
              {item.properties.formatted}
            </Text>
            <CustButton
              container_style={{
                // width: 'auto',
                alignSelf: 'center',
                borderRadius: 4,
                marginTop: 8,
                borderColor: '#996dff',
                borderWidth: 1.6,
                backgroundColor: 'transparent',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              text="LOCATE"
              text_style={{fontFamily: 'rm', color: '#8e848e'}}
              onButtonPress={() => {
                Linking.openURL(
                  `https://maps.google.com/maps?q=${item?.properties.lat}%2C${item?.properties.lon}&z=17&hl=en`,
                );
              }}
            />
          </View>
        )}
        // onScroll={handlePageChange}
      />
    </View>
  );
};

export default SosCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    borderWidth: 0.48,
    borderRadius: 8,
    borderColor: '#5d545d',
    marginBottom: 8,
    padding: 8,
  },
  itemText: {
    fontSize: 20,
    color: 'black',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#aaa',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#007bff',
  },
});
