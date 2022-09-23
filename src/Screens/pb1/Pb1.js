import React, { Component } from "react";
import { useState, useCallback } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import { useRef } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import {
  GestureHandlerRootView,
  ScrollView,
  FlatList,
} from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

import CustomButton from "../../components/CustomButton/CustomButton";
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  //   BottomSheetView,
  //   BottomSheetScrollView,
  BottomSheetFlatList,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";

const Pb1 = () => {
  const months = [
    {
      title: "TOUR",
    },
    {
      title: "PASS",
    },
    {
      title: "ME",
    },
    {
      title: "MEM",
    },
    {
      title: "MEMBEr",
    },
    {
      title: "MEMBERSHIP",
    },
  ];
  const view = () => {};
  const [enterMonth, setEnterMonth] = useState();
  const [Items, setItems] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const bottomSheetRef = useRef(null);

  const snapPoints = React.useMemo(() => ["25%", "25%"], []);
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
  const handle = () => {
    console.log("hello");
  };
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });
  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    console.log("Visible items are", viewableItems[0].item.title);
    console.log("Changed in this iteration", changed);

    // scrollItem = viewableItems[0].item.title;

    setItems(viewableItems[0].item.title);
  }, []);
  const handleConfirm = () => {
    console.log("---I am button---");
    setSelectedItem(Items);
  };
  return (
    <GestureHandlerRootView style={style.gestureContainer}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={style.forgotContainer}
          onPress={(i) => bottomSheetRef.current?.snapToIndex(0)}
        >
          <FontAwesome name="calendar" size={25} color="#16275A" />
        </TouchableOpacity>
        <View style={style.step2container}>
          {Items && (
            <View>
              <Text>{selectedItem}</Text>
            </View>
          )}
        </View>

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
          <View style={style.step2container}>
            <FlatList
              onLayout={handleContentLayout}
              data={months}
              // keyExtractor={(i) => i}

              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig.current}
              renderItem={({ item }) => {
                // const viewed = '' + Items.includes(index);
                return (
                  <View style={{ margin: 20 }}>
                    <Text>{item.title}</Text>
                  </View>
                );
              }}
            />
          </View>
          <CustomButton
            text="Confirm"
            onPress={handleConfirm}
            type="primiary"
          />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};
const style = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: "#fff",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  forgotContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  forgotTxt: {
    color: "grey",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  gestureContainer: {
    // height: ("100%"),
    flex: 1,
  },
  step2container: {
    backgroundColor: "rgba(245, 245, 245, 1)",
    width: "100%",
    // marginLeft: 16,
    // marginRight: 16,
    height: 61,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Pb1;
