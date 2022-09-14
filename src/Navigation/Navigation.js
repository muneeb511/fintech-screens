import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen from "../Screens/Screen/Screen";
import Screen2 from "../Screens/Screen2/Screen2";
import Home from "../Screens/Home/Home";
import Screen3 from "../Screens/Screen3/Screen3";
import OnboardingScreen from "../Screens/Onboarding/OnboardingScreen";
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="mainScreen" component={Screen} />
        <Stack.Screen name="explore" component={Screen2} />
        <Stack.Screen name="onboarding" component={OnboardingScreen} />
        <Stack.Screen name="login" component={Screen3} />
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
