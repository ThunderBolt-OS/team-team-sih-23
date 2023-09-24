import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {Animated, View, TouchableOpacity} from 'react-native';
import React from 'react';

function TabBarComponent({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) {
  return (
    <View style={{flexDirection: 'row', marginBottom: 12}} key={state.key + Math.random().toString()}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            // @ts-ignore
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 1)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              {flex: 1, padding: 8},
              isFocused
                ? {borderBottomColor: 'blue', borderBottomWidth: 1}
                : {borderBottomColor: 'transparent'},
            ]}>
            <Animated.Text style={{opacity, fontSize: 18, textAlign: 'center'}}>
              {/*  @ts-ignore   */}
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
export default TabBarComponent;
