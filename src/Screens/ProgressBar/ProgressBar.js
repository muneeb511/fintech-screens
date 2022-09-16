import React, {
  Component,
  createRef,
  forwardRef,
  useCallback,
  useEffect,
} from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { useRef } from "react";
import {
  findNodeHandle,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useFonts } from "expo-font";
import { measure } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const Tab = forwardRef(({ item, onItemPress }, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text style={style.tabViewHeadings}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
});
const Divider = ({ measures, scrollX }) => {
  return (
    <View
      style={{
        position: "absolute",
        height: 0.7,
        width: width,

        backgroundColor: "#CACACA",

        bottom: -12,
      }}
    ></View>
  );
};
const Indicator = ({ measures, scrollX }) => {
  const inputRange = data.map((_, i) => i * width + 80);
  // const IndicatorWidth = scrollX.interpolate({
  //   inputRange,
  //   outputRange: measures.map((measure) => measure.width),
  // });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: "relative",
        height: 9,
        zIndex: 1,
        //  width: IndicatorWidth,
        width: 140,
        backgroundColor: "#30B991",

        borderRadius: 16,
        bottom: -16,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};
const Tabs = ({ data, scrollX, onItemPress }) => {
  const [measures, setMeasures] = useState([]);
  const containerRef = useRef();
  useEffect(() => {
    let m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === data.length) {
            setMeasures(m);
          }
        }
      );
    });
  }, [measures[0]?.height == 0]);
  console.log(measures);
  return (
    <View style={{ position: "absolute", top: 100, width }}>
      <View ref={containerRef} style={style.indicatorStyling}>
        {data.map((item, index) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onItemPress={() => {
                onItemPress(index);
              }}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
      <Divider measures={measures} />
    </View>
  );
};

// const FirstRoute = () => (
//   <View style={{ flex: 1, backgroundColor: "#ff4081" }}>
//     <Text>
//       <Text>kwelfwefkwflw</Text>
//     </Text>
//   </View>
// );

// const SecondRoute = () => (
//   <View style={{ flex: 1, backgroundColor: "#673ab7" }}></View>
// );

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });

const headings = { Monthly: "MONTHLY", Yearly: "YEARLY" };
const subtitle = { Monthly: "SAR2000", Yearly: "SAR24000" };
const data = Object.keys(headings).map((i) => ({
  key: i,
  title: i,
  heading: headings[i],
  subtitle: subtitle[i],
  ref: createRef(),
}));
const ProgressBar = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();
  const onItemPress = useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });
  let [fontsLoaded] = useFonts({
    light: require("../../assets/fonts/Montserrat-Light.ttf"),
    medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
    bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, height: 400, width, padding: 20 }}>
        <View style={{ marginTop: 120 }}>
          <Text style={style.tabViewTitle}>{item.heading}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={style.tabViewSubTitle}>{item.subtitle}</Text>
            <Text style={style.tabViewSubTitleMini}>/desk</Text>
          </View>
          <View style={{ flexDirection: "row", top: 10 }}>
            <FontAwesome name="check" size={12} color="#30B991"></FontAwesome>
            <Text style={style.tabViewText}>Access to book meeting rooms</Text>
          </View>
          <View style={{ flexDirection: "row", top: 12 }}>
            <FontAwesome name="check" size={12} color="#30B991"></FontAwesome>
            <Text style={style.tabViewText}>Printing Credits</Text>
          </View>
          <View style={{ flexDirection: "row", top: 14 }}>
            <FontAwesome name="check" size={12} color="#30B991"></FontAwesome>
            <Text style={style.tabViewText}>Hub events</Text>
          </View>

          <Text style={style.tabViewLowerText}>
            The minimum commitment for this plan is of 3 months. Cancellation
            request must be submitted with a 30 day notice period
          </Text>
        </View>
        <View style={[StyleSheet.absoluteFillObject, style.listbg]} />
      </View>
    );
  };
  // const layout = useWindowDimensions();

  //   const [index, setIndex] = useState(0);
  //   const [routes] = useState([
  //     { key: "first", title: "First" },
  //     { key: "second", title: "Second" },
  //   ]);
  //   const renderTabBar = (props) => (
  //     <TabBar
  //       {...props}
  //       indicatorStyle={{ backgroundColor: "#30B991" }}
  //       style={{ backgroundColor: "white" }}
  //       renderLabel={({ route, focused, color }) => (
  //         <Text style={{ color: "#172659", margin: 8, fontSize: 16,fontFamily: "bold", }}>
  //           {route.title}
  //         </Text>
  //       )}
  //     />
  //   );
  return (
    <View style={style.container}>
      <ProgressSteps
        topOffset={60}
        borderWidth={2}
        activeStepNumColor="white"
        activeStepIconBorderColor="transparent"
        completedCheckColor="white"
        activeStepIconColor="#172659"
        completedStepIconColor="#35D7A1"
        completedProgressBarColor="#CACACA"
        //  completedCheckColor= "transparent"
        completedStepNumColor="white"

        // label= "hora"
      >
        <ProgressStep
          nextBtnTextStyle={style.nextbuttontextstytle}
          nextBtnText={"proceed"}
          nextBtnStyle={style.firstnextBtnStyle}
        >
          <View
          // style={{ alignItems: "center",backgroundColor:"red" }}
          >
            <View style={{ paddingTop: 10 }}>
              <Text style={style.title}>SELECT PAYMENT PLAN</Text>
              {/* <TabView
                indicatorStyle={{ backgroundColor: "white" }}
                navigationState={{ index, routes }}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: "50%" }}
              /> */}

              <Animated.FlatList
                data={data}
                ref={ref}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
                horizontal
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
              />
            </View>
            <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
          </View>
        </ProgressStep>
        <ProgressStep
          nextBtnTextStyle={style.nextbuttontextstytle}
          nextBtnText={"proceed"}
          nextBtnStyle={style.nextBtnStyle}
        >
          <View style={{ alignItems: "center" }}>
            <Text>Educación</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          nextBtnTextStyle={style.nextbuttontextstytle}
          finishBtnText={"proceed"}
          nextBtnStyle={style.nextBtnStyle}
        >
          <View style={{ alignItems: "center" }}>
            <Text>Ubicación</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
      {/* <Text>ijliioeldiid</Text> */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  },
  progressStepsStyle: {
    activeStepIconBorderColor: "#3584c5",
    activeStepNumColor: "transparent",
    activeStepIconColor: "#3584c5",
    completedStepIconColor: "#3584c5",
    completedProgressBarColor: "#3584c5",
    completedCheckColor: "transparent",
    label: "hora",
    labelColor: "#3584c5",
  },

  nextbuttontextstytle: {
    //fontWeight: "500",
    color: "white",
    alignSelf: "center",
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "medium",
  },
  nextBtnStyle: {
    backgroundColor: "#35D7A1",

    width: "355%",
    paddingVertical: 16,
    marginVertical: 90,
    right: 166,
    borderRadius: 10,
  },
  firstnextBtnStyle: {
    backgroundColor: "#35D7A1",

    width: "330%",
    paddingVertical: 16,
    marginVertical: 92,
    right: 184,

    borderRadius: 10,
    bottom: 60,
  },
  title: {
    fontFamily: "bold",
    color: "#172659",
    fontSize: 20,
    left: 16,
  },
  tabViewTitle: {
    fontFamily: "medium",
    fontSize: 16,
    color: "#172659",
  },
  tabViewSubTitle: {
    fontFamily: "medium",
    fontSize: 24,
    color: "#333333",
  },
  tabViewSubTitleMini: {
    fontFamily: "light",
    //fontSize:24,
    top: 10,
    color: "#081F32",
  },
  tabViewText: {
    fontFamily: "light",
    fontSize: 14,
    color: "#333333",
    // top: 10,
    left: 6,
  },
  tabViewLowerText: {
    fontFamily: "light",
    fontSize: 14,
    color: "#333333",
    top: 20,
  },
  tabViewHeadings: {
    color: "#172659",
    fontSize: 16,
    fontFamily: "bold",
  },
  listbg: {
    backgroundColor: "rgba(202, 202, 202, 0.1)",
    top: 120,
    left: 16,
    right: 16,
    borderRadius: 10,
  },
  indicatorStyling: {
    justifyContent: "space-evenly",
    // marginHorizontal:10,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
});
export default ProgressBar;
