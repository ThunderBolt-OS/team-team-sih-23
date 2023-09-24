import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

const FormInput = (props: {
  textProps?: TextInputProps;
  containerStyle?: StyleProp<ViewStyle>;
  innerContainerStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <View
      style={[props.containerStyle ? props.containerStyle : styles.container]}>
      <View
        style={[
          props.innerContainerStyle
            ? props.innerContainerStyle
            : styles.searchBar,
        ]}>
        <TextInput style={styles.input} {...props.textProps} />
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  searchBar: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    width: '99%',
    borderWidth: 1,
    borderColor: '#aea0ae',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 8,
  },
  input: {
    fontSize: 16,
    marginLeft: 8,
    width: '100%',
    color: '#fefefe',
    fontFamily: 'm',
  },
});
