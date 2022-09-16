import { useState } from "react";
import { useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";

import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
SplashScreen.preventAutoHideAsync();
const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;
const Screen3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isBs, setIsBs] = useState(false);

  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("username:", username);
    console.log("password:", password);
    // navigation.navigate("home", { name: username, pass: password });
    setIsVisible(true);
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

        <Modal
          animationType="slide"
          visible={isVisible}
          transparent={true}
          onRequestClose={() => setIsVisible(false)}
        >
          <View style={style.modalBg}>
            <View style={style.modal}>
              <Text style={style.modalTitle}>Save Password!</Text>
              <Text style={style.modalText}>
                Do you want to save password for this device?
              </Text>
              <View style={style.buttonflex}>
                <CustomButton
                  text="Not Now"
                  onPress={() => setIsVisible(false)}
                  type="greysmall"
                />
                <CustomButton
                  text="Save"
                  onPress={() => setIsVisible(false)}
                  type="greensmall"
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    flex: 1,
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
    marginBottom: 30,
  },
  input: {
    marginTop: 24,
  },

  modal: {
    width: "100%",
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: 510,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
    margin: 20,
  },
  buttonClose: {
    backgroundColor: "blue",
    alignItems: "center",
    width: 60,
    height: 200,
    justifyContent: "center",
  },
  buttonflex: {
    flexDirection: "row",
    top: 30,
  },
  modalTitle: {
    color: "#172659",
    fontFamily: "medium",
    fontSize: 20,
    top: -15,
  },
  modalText: {
    color: "#333333",
    fontFamily: "light",
    fontSize: 14,
  },
  modalBg: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default Screen3;
