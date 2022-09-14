import React, { useCallback, useMemo, useRef } from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Animated,
  Modal,
} from "react-native";
import { useFonts } from "expo-font";
// import { BottomSheet, Button, ListItem } from "@rneui/themed";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
// import Animated from "react-native-reanimated";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const Screen3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  // const [modalY, setModalY] = useState(new Animated.Value(-deviceHeight));
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState("false");
  const openModal = () => {
    Animated.timing(modalY, {
      duration: 500,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  const closeModal = () => {
    Animated.timing(modalY, {
      duration: 500,
      toValue: -deviceHeight,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = () => {
    console.log("username:", username);
    console.log("password:", password);
    // navigation.navigate("home", { name: username, pass: password });
    setIsVisible(true);
    // sheetRef.current.snapTo(0);
    // openModal();
  };
  // const list = [
  //   { title: "SAVE PASSWORD!" ,},
  //   { title: "Do you want to save password for this device?" },
  //   {
  //     title: 'Not Now',
  //     containerStyle: { backgroundColor: 'red'},
  //     titleStyle: { color: 'white' },
  //     onPress: () => setIsVisible(false),
  //   },
  //   {

  //   }

  // ];
  const forgotPassword = () => {};
  let [fontsLoaded] = useFonts({
    light: require("../../assets/fonts/Montserrat-Light.ttf"),
    medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
    bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  // const renderContent = () => (
  //   <View
  //     style={{
  //       backgroundColor: "white",
  //       padding: 16,
  //       height: 450,
  //     }}
  //   >
  //     <Text>Swipe down to close</Text>

  //   </View>
  // );
  // const renderHeader = () => (
  //   <View style={style.header}>
  //     <View style={style.panelHeader}>
  //       <View style={style.panelHandle} />
  //     </View>
  //   </View>
  // );

  // const sheetRef = React.useRef(null);
  // const fall = new Animated.Value(1);
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
        {/* 
        <BottomSheet modalProps={{}} isVisible={isVisible} >
          {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                
              </ListItem.Content>
              
            </ListItem>
            
          )
          )
         
          }
       
        
        </BottomSheet> */}
        {/* <BottomSheet
          ref={sheetRef}
          isVisible={isVisible}
          snapPoints={[300, 0]}
          initialSnap={1}
          borderRadius={10}
          renderContent={renderContent}
          renderHeader={renderHeader}
          callbackNode={fall}
          enabledGestureInteraction
        /> */}
        {/* <Animated.View style={[style.modal,{transform:[{translateY:modalY}]}]}>
          <Text style={style.text}>
            this is modal
          </Text>
<TouchableHighlight style={style.buttonClose} underlayColor='blue' onPress={closeModal}>
<Text>Close</Text>
</TouchableHighlight>
        </Animated.View> */}
        <Modal
          animationType="slide"
          visible={isVisible}
          transparent={true}
          onRequestClose={() => setIsVisible(false)}
        ><View style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
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
  modalBg:{
    
  }
});

export default Screen3;
