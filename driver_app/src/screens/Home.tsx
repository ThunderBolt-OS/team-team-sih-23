// import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import SafeArea from '../components/SafeArea';
// import {useAppContext} from '../lib/Context';
// import BandoBastCard from '../components/BandoBastCard';
// import BackgroundGeolocation, {
//   Subscription,
// } from 'react-native-background-geolocation';
// import BaseUrl from '../lib/api/BaseUrl';
// import {isServerTimestampWithinEvent} from '../lib/api/Functions';
// import {BottomSheet} from '../components/BottomSheet';
// import NfcScreen from './NfcScreen';
// import NfcComponent from '../components/NfcComponent';

// const Home = () => {
//   const context = useAppContext();
//   const [location, setLocation] = React.useState('');
//   useEffect(() => {
//     /// 1.  Subscribe to events.
//     const onLocation: Subscription = BackgroundGeolocation.onLocation(
//       location => {
//         console.log('[onLocation]', location);
//         setLocation(JSON.stringify(location, null, 2));
//       },
//     );

//     const onMotionChange: Subscription = BackgroundGeolocation.onMotionChange(
//       event => {
//         console.log('[onMotionChange]', event);
//       },
//     );

//     const onActivityChange: Subscription =
//       BackgroundGeolocation.onActivityChange(event => {
//         console.log('[onActivityChange]', event);
//       });

//     const onProviderChange: Subscription =
//       BackgroundGeolocation.onProviderChange(event => {
//         console.log('[onProviderChange]', event);
//       });

//     /// 2. ready the plugin.
//     if (
//       context?.Token?.access &&
//       context.BandoBastData &&
//       isServerTimestampWithinEvent(context.BandoBastData)
//     ) {
//       BackgroundGeolocation.ready({
//         // Geolocation Config
//         desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
//         distanceFilter: 10,
//         // Activity Recognition
//         stopTimeout: 5,
//         // Application config
//         debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
//         logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
//         stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
//         startOnBoot: true, // <-- Auto start tracking when device is powered-up.

//         // HTTP / SQLite config
//         url: BaseUrl + '/gl-webhook/',
//         batchSync: true, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
//         autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
//         headers: {
//           authorization: 'JWT ' + context?.Token?.access,
//         },
//         params: {
//           bandobast_id: '',
//         },
//       }).then(state => {
//         //   setEnabled(state.enabled);
//         console.log(
//           '- BackgroundGeolocation is configured and ready: ',
//           state.enabled,
//         );
//         try {
//           BackgroundGeolocation.start();
//         } catch (error) {
//           console.warn(error);
//         }
//       });
//     }
//     return () => {
//       // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
//       // during development live-reload.  Without this, event-listeners will accumulate with
//       // each refresh during live-reload.
//       onLocation.remove();
//       onMotionChange.remove();
//       onActivityChange.remove();
//       onProviderChange.remove();
//     };
//   }, [, context?.Token, context?.BandoBastData]);
//   if (
//     context?.Token?.access &&
//     context.BandoBastData &&
//     isServerTimestampWithinEvent(context.BandoBastData)
//   ) {
//     // Insiade a bandobast (on duty)
//     return (
//       <>
//         <SafeArea>
//           <>
//             <Text style={{fontFamily: 'monospace', fontSize: 12}}>
//               {location}
//             </Text>
//             <Button title="logout" onPress={() => context?.logout()}></Button>
//             <Text>Home</Text>
//           </>
//         </SafeArea>
//         <BottomSheet show={context.PendingScanReqs[0] ? true : false}>
//           <NfcComponent startScan={context.PendingScanReqs[0] ? true : false} />
//         </BottomSheet>
//       </>
//     );
//   }
  
//   // If bandobast not start
//   return (
//     <>
//       <SafeArea>
//         <>
//           <FlatList
//             data={context?.BandoBastData?.data}
//             renderItem={element => <BandoBastCard {...element.item} />}
//           />
//           <Button title="logout" onPress={() => context?.logout()}></Button>
//           <Text>Home</Text>
//         </>
//       </SafeArea>
//       <BottomSheet show={context && context.PendingScanReqs[0] ? true : false}>
//         <NfcComponent
//           startScan={context && context.PendingScanReqs[0] ? true : false}
//         />
//       </BottomSheet>
//     </>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({});

export {}