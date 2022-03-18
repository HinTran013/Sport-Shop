import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SimpleScreenHeader from "../src/components/Simple Screen Header/SimpleScreenHeader";
import { SliderBox } from "react-native-image-slider-box";

const imgSource = [
  require("../assets/slider1.png"),
  require("../assets/slider2.png"),
  require("../assets/slider3.png"),
  require("../assets/slider4.png"),
];

const ProductDetailsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <SimpleScreenHeader
        headerTitle={"Short dress"}
        onBackPress={() => navigation.pop()}
        isShared={true}
      />
      <SliderBox
        images={imgSource}
        sliderBoxHeight={400}
        dotColor="#DB3022"
        circleLoop={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProductDetailsScreen;
