import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import ProductTag from "../src/components/ProductTag/ProductTag";

import FilterImg from "../assets/filter.png"
import UpdownImg from "../assets/updown.png"
import ListImg from "../assets/list.png"
import GridImg from "../assets/grid.png"

export default function ShopScreen() {
  const [flipView, setFlipView] = useState(false);
  const onPressFlipViewHandler = () => { setFlipView(!flipView) }

  const dummyData = ["T-shirts", "Crop tops", "Sleeveless", "Shirts"];

  return (
    <View style={{ justifyContent: "center", backgroundColor: "#F9F9F9" }}>
      <View style={styles.viewHeadLine}>
        <Text style={styles.headLine}>Sport Shirt</Text>
        <View style={styles.viewTags}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dummyData.map( (x) => <ProductTag name={x} />)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  viewHeadLine: {
    paddingLeft: 10,
    paddingBottom: 5,
    backgroundColor: "white",
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
