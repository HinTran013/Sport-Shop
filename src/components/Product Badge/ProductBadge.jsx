import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductBadge = ({ type = "", content = "" }) => {
  return (
    <View style={styles(type).container}>
      <Text style={styles(type).content}>{content}</Text>
    </View>
  );
};

const styles = (type) =>
  StyleSheet.create({
    container: {
      display: type === "" ? "none" : "flex",
      backgroundColor: type === "sale" ? "black" : "#DB3022",
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 999,
    },
    content: {
      color: "white",
      textTransform: "uppercase",
      fontWeight: "bold",
    },
  });

export default ProductBadge;
