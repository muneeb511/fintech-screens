import React, { Component, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useFonts } from "expo-font";
//import AppLoading from "expo-app-loading";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { FontAwesome } from "@expo/vector-icons";
import { OnboardingSlides } from "../../dataset/OnBoardingList";

const OnboardingScreen = ({ navigation }) => {
  const handleLogin = () => {};
  let [fontsLoaded] = useFonts({
    light: require("../../assets/fonts/Montserrat-Light.ttf"),
    medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
    bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
  const buttonlabel = (label) => {
    return (
      <View style={style.button}>
        <Text style={{ fontWeight: "600", fontSize: 15 }}>{label}</Text>
      </View>
    );
  };
  const buttonlabel1 = (label) => {
    return (
      <View style={style.nextbutton}>
        <Text style={style.nexttext}>{label}</Text>
      </View>
    );
  };
const renderItem=({item})=>{
return (
  <View style={style.container}>
  {/* <Text style={style.title}>{item.title}</Text> */}
  <Image
    style={style.image}
    source={item.imageUrl}
    resizeMode="contain"
  />
  <Text style={style.subtitle}>{item.subtitle}</Text>
  <Text style={style.text}>{item.text}</Text>
</View>
)
}
  return (
    <>
      <Text style={style.title}>WELCOME TO THE FINTECH SAUDI</Text>
      <AppIntroSlider
        data={OnboardingSlides}
        renderItem={renderItem}
        activeDotStyle={{
          backgroundColor: "#494949",
        }}
        showSkipButton
        bottomButton
        renderNextButton={() => buttonlabel1("Next")}
        renderSkipButton={() => buttonlabel("Skip")}
        renderDoneButton={() => buttonlabel1("Done")}
      />
    </>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  image: {
    position: "absolute",
    width: "40%",
    height: 150,
    top: 240,
    textAlign: "center",
  },
  title: {
    //flex:1,
    color: "#172659",
    fontSize: 18,

    textAlign: "center",
    top: 112,
    fontFamily: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "bold",
    paddingTop: 440,
  },
  button: {
    alignItems: "center",
  },
  text: {
    paddingTop: 15,
    fontFamily: "light",
  },
  nextbutton: {
    backgroundColor: "#35D7A1",
    width: "90%",
    paddingVertical: 16,
    marginVertical: 5,
    alignSelf: "center",
    borderRadius: 10,
  },
  nexttext: {
    fontWeight: "500",
    color: "white",
    alignSelf: "center",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
});
export default OnboardingScreen;
