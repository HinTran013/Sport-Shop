import React from "react";
import { View, Text, Platform, StatusBar, StyleSheet } from "react-native";
import BigBanner from "../src/components/Big Banner/BigBanner";

var backgroundImg = require("../assets/twoFashionGirls.png");

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <BigBanner
        backgroundImage={backgroundImg}
        text="Fashion Sale"
        buttonText={"Check"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
