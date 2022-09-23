import { Text, View, TextInput, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const CustomInput = ({
  name,
  secureTextEntry,
  value,
  setValue,
  placeholder,
}) => {
  let [fontsLoaded] = useFonts({
    light: require("../../assets/fonts/Montserrat-Light.ttf"),
    medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
    bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });

  return (
    <View >
      <Text style={styles.text}>{name}</Text>
      <TextInput
        style={styles.container}
        // onBlur={onBlur}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={setValue}
        placeholder={placeholder}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(245, 245, 245, 1)",
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
