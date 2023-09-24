import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


interface navBar {
  title: string;
  iconComponent?: JSX.Element;
  home?: boolean;
  backButton?: boolean;
}
const Navbar = ({ title, iconComponent, home, backButton }: navBar) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 8,
        marginBottom: 4,
        borderBottomColor: "#aea0ae",
        borderBottomWidth: 0.4,
        paddingHorizontal: 4,
      }}
    >
      {backButton ? (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-sharp"
          size={24}
          color="white"
        />
      ) : (
        <View style={{ height: 24, width: 24 }}></View>
      )}
      <Text
        style={{
          fontWeight: "400",
          fontSize: 22,
          color: "#dedede",
          letterSpacing: 0.8,
          fontFamily: 'mm',
        }}
      >
        {title}
      </Text>
      <View style={{ flexDirection: "row" }}>
        {iconComponent ? (
          iconComponent
        ) : (
          <View style={{ width: 24, height: 24 }}></View>
        )}
        {home && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 4,
              paddingTop: 8,
              marginBottom: 4,
              borderBottomColor: "#aea0ae",
              paddingHorizontal: 4,
            }}
          >
            <MaterialCommunityIcons
              style={{ marginLeft: 8 }}
              //@ts-ignore
              onPress={() => navigation.navigate("SosCall")}
              name="alert-box-outline"
              size={24}
              color="#FF2F3B"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({});