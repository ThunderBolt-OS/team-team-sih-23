import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    TextStyle,
  } from "react-native";
  import React from "react";
  interface ButtonInterface {
    onButtonPress: () => void;
    container_style?: StyleProp<ViewStyle>;
    text_style?: StyleProp<TextStyle>;
    text: string;
  }
  const CustButton = ({
    onButtonPress,
    container_style,
    text_style,
    text,
  }: ButtonInterface) => {
    return (
      <TouchableOpacity
        style={container_style ? [styles.button, container_style] : styles.button}
        onPress={onButtonPress}
      >
        <Text style={text_style}>{text}</Text>
      </TouchableOpacity>
    );
  };
  
  export default CustButton;
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: "#D3D3D3",
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      alignSelf: "flex-start",
    },
  });