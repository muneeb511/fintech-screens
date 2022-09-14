import React, { Component } from "react";
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
const Screen4 = () => {
  const handleLogin = () => {};
  const forgotPassword = () => {};
  let [fontsLoaded] = useFonts({
    light: require("../../assets/fonts/Montserrat-Light.ttf"),
    medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
    bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={style.container}>
        <Image
          style={style.image}
          source={require("../../assets/forgotScreen.png")}
        />

        <Text style={style.title}> SETUP A NEW PASSWORD</Text>
        <Text style={style.content}>
          {" "}
          To keep your account safe, please update your password
        </Text>
        <Text style={style.subtitle}> Please follow these Guidelines</Text>
        <FontAwesome name="circle" size={25}></FontAwesome>
        <Text style={style.subcontent}>
          {" "}
          Must be a minimum of 8 characters long
        </Text>
        <Text style={style.subcontent}>Must contain an uppercase letter</Text>
        <Text style={style.subcontent}> Must contain a number</Text>

        <View style={style.input}>
          <CustomInput name="New Password" />
          <CustomInput name="Confrim New Password" />
        </View>
        <View style={style.button1}>
          <CustomButton
            text="Set New Password"
            onPress={handleLogin}
            type="primiary"
          />
        </View>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: "absolute",
    marginLeft: 136,

    // top: 90,
    width: "30%",
    height: 170,
    top: 100,
  },
  title: {
    //flex:1,
    color: "#172659",
    fontWeight: "600",
    fontSize: 22,
    paddingTop: 290,
    paddingLeft: 10,
    fontFamily: "bold",
  },
  subtitle: {
    //flex:1,
    color: "#333333",
    // fontWeight:"600",
    fontSize: 14,
    paddingTop: 16,
    paddingLeft: 10,
    fontFamily: "bold",
  },
  content: {
    color: "#333333",
    fontWeight: "400",
    fontSize: 16,
    paddingTop: 16,
    paddingLeft: 10,
    fontFamily: "light",
  },
  subcontent: {
    color: "#333333",
    fontWeight: "400",
    fontSize: 14,
    paddingTop: 4,
    paddingLeft: 10,
    fontFamily: "light",
  },
  button1: {
    alignItems: "center",
    marginTop: 14,
  },
  button2: {
    alignItems: "center",
    marginTop: 8,
  },
  input: {
    marginTop: 24,
  },
});

export default Screen4;
