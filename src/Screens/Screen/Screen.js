import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
//import './assets'
const Screen = () => {
  const handleLogin = () => {
    navigation.navigate("login");
  };
  const handleExplore = () => {
    navigation.navigate("explore");
  };
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <Image style={style.Frame} source={require("../../assets/Frame.png")} />

      <CustomButton text="Login" onPress={handleLogin} type="primiary" />

      <CustomButton text="Explore" onPress={handleExplore} type="TERTIARY" />
      {/* <View */}
      <Image
        style={style.image2}
        source={require("../../assets/Group336166.png")}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16275A",
    alignItems: "center",
    justifyContent: "center",
  },
  Frame: {
    flex: 1,
    position: "absolute",
    left: 100,
    top: 90,
    width: "47%",
    height: 122,
  },
  image2: {
    flex: 1,
    position: "absolute",
    width: "135%",
    height: 320,
    bottom: -115,
  },
});

export default Screen;
