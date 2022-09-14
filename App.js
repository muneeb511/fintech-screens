import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./src/Screens/Screen/Screen";
import Screen2 from "./src/Screens/Screen2/Screen2";
import Screen3 from "./src/Screens/Screen3/Screen3";
import Screen4 from "./src/Screens/Screen4/Screen4";
import Navigation from "./src/Navigation/Navigation";
import Home from "./src/Screens/Home/Home";
import Onboarding from "./src/Screens/Onboarding/OnboardingScreen";
export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
      {/* <Screen4/> */}
      {/* <Screen3/> */}
      {/* <Home/> */}
      {/* <Onboarding/> */}
      {/* <Screen2/> */}
      {/* <Screen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
