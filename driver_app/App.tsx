import {ContextProvider} from './src/lib/Context';
import RootNavigation from './src/navigation/index';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import React from 'react';
import Mapbox  from '@rnmapbox/maps';
import {LocationContext} from './src/lib/LocationContext';

export default function App() {
  Mapbox.setWellKnownTileServer('Mapbox');
  Mapbox.setAccessToken(
    'pk.eyJ1IjoibWJtcGgiLCJhIjoiY2tya2F0OTJvMGk1YjJwbGZ1bDJ1eGU0dCJ9.fLJp01SsIpdhGmWdBzaSnQ',
  );
  return (
    <ContextProvider>
      <LocationContext>
        <NavigationContainer>
          <StatusBar backgroundColor="#121213" />
          <RootNavigation />
        </NavigationContainer>
      </LocationContext>
    </ContextProvider>
  );
}
