import React, {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
//import normalize from "react-native-normalize";
import { useRef } from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  TextInput,
} from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useFonts } from "expo-font";
import CustomInput from "../../components/CustomInput/CustomInput";
import { Alert } from "react-native";
const { width, height } = Dimensions.get("screen");

const Tab = forwardRef(({ item, onItemPress }, ref) => {
  const [stepNumber, setStepNumber] = useState(1);
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
        // //  width: IndicatorWidth,
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
const Tabs = ({ data, scrollX, onItemPress, setMyPlan }) => {
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
                setMyPlan(item.heading);
                console.log("-----Tab items ----", item.heading);
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

const headings = { Monthly: "MONTHLY", Yearly: "YEARLY" };
const subtitle = { Monthly: "SAR2000", Yearly: "SAR24000" };
const input = { Monthly: "SAR2000", Yearly: "SAR24000" };
const data = Object.keys(headings).map((i) => ({
  key: i,
  title: i,
  heading: headings[i],
  subtitle: subtitle[i],
  ref: createRef(),
}));
console.log("data", data);
const ProgressBar = () => {
  const bottomSheetRef = useRef(null);

  const snapPoints = React.useMemo(() => ["25%", "40%"], []);
  const renderBackdropBottomSheet = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        BackdropPressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();

  const [myPlan, setMyPlan] = useState("MONTHLY");
  const [enterMonth, setEnterMonth] = useState();
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
  const handleLogin = () => {
    console.log("month", enterMonth);
  };
  const calendarOpen = () => {};
  const onNext = () => {};

  const step2 = () => {
    if (myPlan === "MONTHLY") {
      return (
        <View>
          <Text style={style.titlestep2}>SELECT DURATION & TEAM </Text>

          <View style={{ top: 12 }}>
            {/* <CustomInput name="Start Date" /> */}
            <Text style={style.step2text}>Start Date</Text>
            {/* <FontAwesome name="calendar" size={25} color="#30B991"></FontAwesome>
          
            <Icon name="calendar" color="#ccc" size={25} /> */}

            {/* <View style={{justifyContent:"space-evenly",flexDirection:"row"}}> */}
            <View style={style.step2container}>
              <TouchableOpacity
                style={style.forgotContainer}
                onPress={(i) => bottomSheetRef.current?.snapToIndex(0)}
              >
                <FontAwesome name="calendar" size={25} color="#16275A" />
              </TouchableOpacity>
            </View>

            {/* </View> */}
            {/* <Image source={ require("../../assets/calendar_month.png")}/> */}

            <CustomInput
              name="Number of months"
              placeholder="Select Number of months"
              value={enterMonth}
              setValue={setEnterMonth}
            />
            <CustomButton text="Login" onPress={handleLogin} type="primiary" />
            {enterMonth && (
              <View>
                <Text>Expected End Date</Text>
                <Text> June 01,2022</Text>
              </View>
            )}

            <CustomInput
              name="Team members"
              placeholder="Select Team Members"
            />
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={style.titlestep2}>SELECT DURATION & TEAM</Text>
          <View style={{ top: 12 }}>
            <CustomInput name="Start Date" />
            <CustomInput
              name="Team members"
              placeholder="Select Team Members"
            />
          </View>
        </View>
      );
    }
  };
  return (
    <GestureHandlerRootView style={style.gestureContainer}>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={animatedSnapPoints}
        enablePanDownToClose={true}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        backdropComponent={renderBackdropBottomSheet}
        shouldMeasureContentHeight={true}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          <View style={style.a}>
            <Text>hhhhhhhhhhhhh</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>

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
            onNext={onNext}
            //scrollable={false}
          >
            {/* <CustomInput/> */}
            <View
            //style={{ alignItems: "center",backgroundColor:"red" }}
            >
              <View style={{ paddingTop: 10 }}>
                <Text style={style.title}>SELECT PAYMENT PLAN</Text>

                <Animated.FlatList
                  data={data}
                  ref={ref}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                  )}
                  horizontal
                  pagingEnabled
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem}
                />
              </View>
              <Tabs
                scrollX={scrollX}
                data={data}
                onItemPress={onItemPress}
                setMyPlan={(plan) => setMyPlan(plan)}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            nextBtnTextStyle={style.nextbuttontextstytle}
            nextBtnText={"proceed"}
            nextBtnStyle={style.nextBtnStyle}
            scrollable={false}
          >
            {step2()}
          </ProgressStep>

          <ProgressStep
            nextBtnTextStyle={style.nextbuttontextstytle}
            finishBtnText={"proceed"}
            nextBtnStyle={style.nextBtnStyle}
            scrollable={false}
          >
            <View style={{ alignItems: "center" }}>
              <Text>3rd step</Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
        {/* <Text>ijliioeldiid</Text> */}
      </View>
    </GestureHandlerRootView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
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

    width: "330%",
    paddingVertical: 16,
    // marginVertical: 92,
    right: 184,
    borderRadius: 10,
    top: 200,
  },
  firstnextBtnStyle: {
    backgroundColor: "#35D7A1",

    width: "330%",
    paddingVertical: 16,
    marginVertical: 52,
    right: 184,

    borderRadius: 10,
    bottom: 100,
  },
  title: {
    fontFamily: "bold",
    color: "#172659",
    fontSize: 20,
    left: 16,
  },
  title2: {
    fontFamily: "bold",
    color: "#172659",
    fontSize: 20,
  },
  titlestep2: {
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
  step2container: {
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
    alignItems: "flex-end",
    justifyContent: "center",
  },
  step2text: {
    fontSize: 16,
    fontFamily: "bold",
    marginLeft: 16,
  },
  bottomSheetHeader: {
    height: 4,
    width: 36,
    backgroundColor: "rgba(217, 217, 217, 0.4)",
    alignSelf: "center",
  },
  forgotContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  gestureContainer: {
    height: "10%",
    flex: 1,
  },
  a: {
    zIndex: 1,
  },
});

export default ProgressBar;
