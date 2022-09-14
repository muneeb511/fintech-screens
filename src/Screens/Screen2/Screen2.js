import React, { Component } from "react";

import { useFonts } from "expo-font";

import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton/CustomButton";

const Screen2 = () => {
  let [fontsLoaded] = useFonts({
    light: require("../../assets/fonts/Montserrat-Light.ttf"),
    medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
    bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });

  const cards = [
    {
      title: "TOUR",
      text: "Apply for a tour and get a chance to explore the fintech hub space ",
      imageUrl: require("../../assets/Rectangle2587.png"),
    },
    {
      title: "PASS",
      text: "Work on any day as required, without any long term commitment ",
      imageUrl: require("../../assets/Rectangle25871.png"),
    },
    {
      title: "MEMBERSHIP",
      text: "Build your next idea at the hub, enjoy dedicated space for your team.",
      imageUrl: require("../../assets/Rectangle25872.png"),
    },
  ];
  const handleApplyNow = () => {};

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={style.container}>
        <View>
          <Text style={style.maintitle}> EXPLORE FINTECH SAUDI </Text>
        </View>

        <FlatList
          data={cards}
          renderItem={({ item }) => (
            <View>
              <Card style={style.card}>
                <View style={style.container1}>
                  <View style={{ flex: 1 }}>
                    <Text style={style.title}>{item.title}</Text>
                    <Text style={style.text}>{item.text}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Image style={style.Image} source={item.imageUrl} />
                    <CustomButton
                      text="Apply Now"
                      onPress={handleApplyNow}
                      type="small"
                    />
                  </View>
                </View>
              </Card>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  card: {
    marginTop: 24,
    margin: 15,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    elevation: 3,
    shadowOpacity: 1,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: " #FFFFFF",
  },
  container1: {
    // flex: 1,
    marginTop: 5,
    flexDirection: "row",
  },
  title: {
    color: "#172659",
    fontWeight: "600",
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 20,
    //fontFamily:'bold'
  },
  maintitle: {
    color: "#172659",
    fontWeight: "500",
    fontSize: 24,
    top: 49,
    // marginTop:49,
    marginBottom: 65,
    left: 30,
  },
  text: {
    color: "#333333",
    // fontWeight: "400",
    fontSize: 14,
    marginTop: 10,
    padding: 10,
    fontFamily: "light",
  },
  header: {
    color: "#172659",
    fontWeight: "600",
    fontSize: 24,
    left: 41,
  },
  content: {
    marginTop: 54,
  },
  Image: {
    width: "95%",
    height: 155,
  },
});
export default Screen2;
