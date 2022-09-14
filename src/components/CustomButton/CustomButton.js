import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
const CustomButton = ({ onPress, text, type }) => {
  let [fontsLoaded] = useFonts({
    light: require("../../assets/fonts/Montserrat-Light.ttf"),
    medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
    bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Pressable onPress={onPress} style={style[`container_${type}`]}>
      <Text style={style[`text_${type}`]}> {text}</Text>
    </Pressable>
  );
};
const style = StyleSheet.create({
  //   container: {
  //     width: "90%",
  //     paddingVertical: 16,
  //     marginVertical: 5,
  //     alignItems: "center",
  //     borderRadius: 10,
  //   },
  container_primiary: {
    backgroundColor: "#35D7A1",
    width: "90%",
    paddingVertical: 16,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 10,
  },
  container_TERTIARY: {
    borderColor: "#35D7A1",
    borderWidth: 1,
    width: "90%",
    paddingVertical: 16,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 10,
  },
  container_small: {
    flex: 1,
    borderColor: "#35D7A1",
    borderWidth: 1,
    width: "90%",
    paddingVertical: 6,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 10,
  },
  text_primiary: {
    fontWeight: "500",
    color: "white",
    alignSelf: "center",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },

  text_TERTIARY: {
    color: "#35D7A1",
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
  },
  text_small: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    fontFamily: "bold",
  },
  text_underline: {
    fontFamily: "bold",
    color: "#16275A",
    textDecorationLine: "underline",
  },
});
export default CustomButton;
