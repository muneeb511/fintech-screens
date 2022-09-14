import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Screen3 from "../Screen3/Screen3";
const Home = ({ route }) => {
  return (
    <View style={style.container}>
      <Text> name: {route.params.name}</Text>
      <Text> password: {route.params.pass}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;
