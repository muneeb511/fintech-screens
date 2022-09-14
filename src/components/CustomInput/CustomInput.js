import { Text, View, TextInput, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
const CustomInput = ({ name, secureTextEntry, value, setValue }) => {
  let [fontsLoaded] = useFonts({
    light: require("../../assets/fonts/Montserrat-Light.ttf"),
    medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
    bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View>
      <Text style={style.text}>{name}</Text>
      <TextInput
        style={style.container}
        // onBlur={onBlur}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={setValue}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: '#CACACA'
    ,
    //width: "100%",
    marginLeft: 16,
    marginRight: 16,
    height: 65,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "bold",
    marginLeft: 16,
  },
});
export default CustomInput;
