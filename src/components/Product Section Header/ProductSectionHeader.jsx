import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductSectionHeader = ({
  marginTopBot = 0,
  header = "",
  subHeader = "",
}) => {
  return (
    <View style={styles(marginTopBot).container}>
      <View>
        <Text style={styles().header}>{header}</Text>
        <Text style={styles().subHeader}>{subHeader}</Text>
      </View>

      <Text style={styles().viewAll}>View all</Text>
    </View>
  );
};

const styles = (margin) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: margin,
      marginBottom: margin,
    },
    header: {
      fontSize: 26,
      fontWeight: "bold",
    },
    subHeader: {
      color: "#9B9B9B",
      fontSize: 12,
    },
    viewAll: {
      fontSize: 12,
    },
  });

export default ProductSectionHeader;
