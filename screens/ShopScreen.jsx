import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import ProductTag from "../src/components/ProductTag/ProductTag";
import HorizontalProduct from "../src/components/Horizontal Product/HorizontalProduct";

import FilterImg from "../assets/filter.png"
import UpdownImg from "../assets/updown.png"
import ListImg from "../assets/list.png"
import GridImg from "../assets/grid.png"

const pulloverImg = require("../assets/pullover.png");

export default function ShopScreen() {
  const [flipView, setFlipView] = useState(false);
  const onPressFlipViewHandler = () => { setFlipView(!flipView) }

  const dummyData = ["T-shirts", "Crop tops", "Sleeveless", "Shirts"];

  return (
    <View style={{ justifyContent: "center"}}>
      <View style={styles.viewHeadLine}>
        <Text style={styles.headLine}>Sport Shirt</Text>
        <View style={styles.viewTags}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dummyData.map( (x) => <ProductTag name={x} key={x} />)}
          </ScrollView>
        </View>

        <View style={styles.viewSearch}>
          <TouchableOpacity style={styles.divFilter}>
            <Image
              source={FilterImg}
              style={styles.imageSize}
            />
            <Text style={styles.viewSearchText}>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.divFilter}>
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
        <HorizontalProduct img={pulloverImg} />
        <HorizontalProduct img={pulloverImg} />
        <HorizontalProduct img={pulloverImg} />
        <HorizontalProduct img={pulloverImg} />
        <HorizontalProduct img={pulloverImg} />
        <HorizontalProduct img={pulloverImg} />
      </ScrollView>
     
    </View>
  );
}

const styles = StyleSheet.create({
  viewHeadLine: {
    paddingLeft: 10,
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
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
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
  },
});
