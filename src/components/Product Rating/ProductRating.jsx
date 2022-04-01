import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-ratings";
const ProductRating = () => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "#3f3f3f" }}>
          There were 23 Ratings
        </Text>
      </View>
      <AirbnbRating showRating isDisabled={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 15,
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
  },
});

export default ProductRating;
