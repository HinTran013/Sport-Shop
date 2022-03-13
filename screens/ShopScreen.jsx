import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function ShopScreen() {
  return (
    <View style={{justifyContent: "center", backgroundColor: "#F9F9F9",}}>
      <View style={ styles.viewHeadLine}>
        <Text style={styles.headLine}>Sport Shirt</Text>
        <View style={styles.viewTags}>Tags</View>
        <View style={styles.viewSearch}>
          <TouchableOpacity style={styles.divFilter}>
            <Image source={require("../assets/filter.png")} style={ styles.imageSize}/>
            <Text style={ styles.viewSearchText}>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.divFilter}>
            <Image source={require("../assets/updown.png")} style={ styles.imageSize}/>
            <Text style={ styles.viewSearchText}>Price: Lowest to Highest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.divFilter}>
            <Image source={require("../assets/grid.png")} style={ styles.imageSize}/>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  viewHeadLine: {
    paddingLeft: 20,
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
    backgroundColor: "red",
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
    alignItems: "center"
  },
  imageSize: {
    width: 18,
    height: 18,
    marginRight: 7,
  },
  viewSearchText: {
    fontSize: 14,
    fontWeight: 400,
  }

})
