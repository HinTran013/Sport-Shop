import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BigBanner from "../src/components/Big Banner/BigBanner";
import ProductSectionHeader from "../src/components/Product Section Header/ProductSectionHeader";
import ProductItem from "../src/components/Product Item/ProductItem";

const backgroundImg = require("../assets/twoFashionGirls.png");
const productImg = require("../assets/pinkDressGirl.png");

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <BigBanner
        backgroundImage={backgroundImg}
        text="Fashion Sale"
        buttonText={"Check"}
      />
      <View style={styles.mainContentContainer}>
        <ProductSectionHeader
          header="New"
          subHeader="You've never seen it before"
        />
      </View>

      <ScrollView style={styles.productsContainer}>
        <ProductItem img={productImg} />
      </ScrollView>

      <View style={{ paddingBottom: 1000 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContentContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 20,
  },
  productsContainer: {},
});
