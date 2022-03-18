import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BigBanner from "../src/components/Big Banner/BigBanner";
import ProductSectionHeader from "../src/components/Product Section Header/ProductSectionHeader";
import ProductItem from "../src/components/Product Item/ProductItem";

const backgroundImg = require("../assets/twoFashionGirls.png");
const productImg = require("../assets/fashionWoman.png");

export default function HomeScreen({ navigation, route }) {
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
          marginTop={10}
        />

        <ScrollView
          style={styles.productsContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.push("ProductDetails")}
          >
            <ProductItem
              img={productImg}
              marginRight={20}
              badgeContent="NEW"
              badgeType="sale"
            />
          </TouchableOpacity>
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="NEW"
            badgeType="sale"
          />
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="NEW"
            badgeType="sale"
          />
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="NEW"
            badgeType="sale"
          />
        </ScrollView>

        <ProductSectionHeader
          header="Best Seller"
          subHeader="You'll like it!"
          marginTop={40}
        />

        <ScrollView
          style={styles.productsContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="hot!"
            badgeType="hot"
          />
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="hot!"
            badgeType="hot"
          />
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="hot!"
            badgeType="hot"
          />
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="hot!"
            badgeType="hot"
          />
        </ScrollView>

        <ProductSectionHeader
          header="Sale"
          subHeader="Better price for you!"
          marginTop={40}
        />

        <ScrollView
          style={styles.productsContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="-20%"
            badgeType="hot"
          />
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="-15%"
            badgeType="hot"
          />
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="-5%"
            badgeType="hot"
          />
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="-2%"
            badgeType="hot"
          />
        </ScrollView>
      </View>
      <View style={{ paddingBottom: 75 }}></View>
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
  productsContainer: {
    paddingTop: 20,
  },
});
