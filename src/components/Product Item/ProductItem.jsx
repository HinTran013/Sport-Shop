import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const ProductItem = ({ img }) => {
  return (
    <View style={styles().container}>
      <Image style={styles().img} source={img} resizeMode="cover" />
      <View style={styles().contentContainer}>
        <View></View>
      </View>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    img: {
      width: 200,
      height: 200,
    },
  });

export default ProductItem;
