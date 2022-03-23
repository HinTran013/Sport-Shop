import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

import ProductTag from "../src/components/ProductTag/ProductTag";
import HorizontalProduct from "../src/components/Horizontal Product/HorizontalProduct";
import ProductItem from "../src/components/Product Item/ProductItem";


import FilterImg from "../assets/filter.png"
import UpdownImg from "../assets/updown.png"
import ListImg from "../assets/list.png"
import GridImg from "../assets/grid.png"

const pulloverImg = require("../assets/pullover.png");
const productImg = require("../assets/fashionWoman.png");

export default function ShopScreen({ navigation }) {
  const [flipView, setFlipView] = useState(false);
  const onPressFlipViewHandler = () => { setFlipView(!flipView) }

  const dummyData = ["T-shirts", "Crop tops", "Sleeveless", "Shirts"];

  return (
    <View>
      <View style={styles.viewHeadLine}>
        <Text style={styles.headLine}>Sport Shirt</Text>
        <View style={styles.viewTags}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dummyData.map((x) => <ProductTag name={x} key={x} />)}
            <ProductTag name={`...`} onPress={() => { navigation.navigate('Category') }} />
          </ScrollView>
        </View>

        <View style={styles.viewSearch}>
          <TouchableOpacity
            style={styles.divFilter}
            onPress={() => { navigation.navigate("Filters")}}>
            {/* <Button
              icon={FilterImg}
              color="black"
              uppercase={false}
              labelStyle={labelStyle.label}> */}
            <Image
              source={FilterImg}
              style={styles.imageSize}
            />
            <Text style={styles.viewSearchText}>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.divFilter}>
            <Image
              source={UpdownImg}
              style={styles.imageSize}
            />
            <Text style={styles.viewSearchText}>Price: Lowest to Highest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.divFilter}
            onPress={onPressFlipViewHandler}>
            <Image
              source={flipView ? ListImg : GridImg}
              style={styles.imageSize}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={flipView ? styles.scrollViewStyle : {}}>

          {flipView ?
            [
              <ProductItem key={"0"} img={productImg} badgeContent="hot!" badgeType="hot" />,
              <ProductItem key={"1"} img={productImg} badgeContent="hot!" badgeType="hot" />,
              <ProductItem key={"2"} img={productImg} badgeContent="hot!" badgeType="hot" />,
              <ProductItem key={"3"} img={productImg} badgeContent="hot!" badgeType="hot" />,
              <ProductItem key={"4"} img={productImg} badgeContent="hot!" badgeType="hot" />
            ]
            :
            [
              <HorizontalProduct key={"5"} img={pulloverImg} badgeContent="hot!" badgeType="hot" />,
              <HorizontalProduct key={"6"} img={pulloverImg} badgeContent="hot!" badgeType="hot" />,
              <HorizontalProduct key={"7"} img={pulloverImg} />,
              <HorizontalProduct key={"8"} img={pulloverImg} />,
              <HorizontalProduct key={"9"} img={pulloverImg} badgeContent="hot!" badgeType="hot" />
            ]
          }
        </View>
      </ScrollView>

    </View>
  );
}

// const labelStyle = StyleSheet.create({
//   label: {
//     fontSize: 15,
//     fontWeight: "normal",
//     letterSpacing: 0.5,
//   }
// })

const styles = StyleSheet.create({
  viewHeadLine: {
    paddingLeft: 7,
    paddingBottom: 5,
    backgroundColor: "white",
    marginBottom: 15,
    //shadow - working on IOS
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    //shadow - working on android
    elevation: 8,
  },
  headLine: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 5,
    marginBottom: 5,
  },
  viewTags: {
    marginTop: 5,
    marginBottom: 5,
  },
  viewSearch: {
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  divFilter: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageSize: {
    width: 18,
    height: 18,
    marginRight: 7,
  },
  viewSearchText: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
  },

  scrollViewStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginHorizontal: 15,
    marginBottom: 150,
  }
});
