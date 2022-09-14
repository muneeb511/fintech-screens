import React, { useCallback, useMemo, useRef } from "react";
import { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { BottomSheet, Button, ListItem } from "@rneui/themed";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const Screen3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    console.log("username:", username);
    console.log("password:", password);
    navigation.navigate("home", { name: username, pass: password });
    // setIsVisible(true)
  };
  const forgotPassword = () => {};
  let [fontsLoaded] = useFonts({
    light: require("../../assets/fonts/Montserrat-Light.ttf"),
    medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
    bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={style.container}>
        <Image
          style={style.image}
          source={require("../../assets/Group335842.png")}
        />

        <Text style={style.title}> LOGIN TO YOUR ACCOUNT</Text>
        <Text style={style.content}>
          {" "}
          Please check your email, we have sent your credentials
        </Text>
        <View style={style.input}>
          <CustomInput
            name="Username"
            value={username}
            setValue={setUsername}
          />
          <CustomInput
            name="Password"
            secureTextEntry={true}
            value={password}
            setValue={setPassword}
          />
        </View>
        <View style={style.button1}>
          <CustomButton text="Login" onPress={handleLogin} type="primiary" />
        </View>
        <View style={style.button2}>
          <CustomButton
            text="Forgot Password?"
            onPress={forgotPassword}
            type="underline"
          />
        </View>

        {/* <BottomSheet modalProps={{}} isVisible={isVisible}>
      <Text>hello</Text>
    </BottomSheet> */}
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
    width: "40%",
    height: 160,
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
  content: {
    color: "#333333",
    fontWeight: "400",
    fontSize: 16,
    paddingTop: 16,
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

export default Screen3;
