import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductSectionHeader = ({
  marginTop = 0,
  marginBot = 0,
  header = "",
  subHeader = "",
}) => {
  return (
    <View style={styles(marginTop, marginBot).container}>
      <View>
        <Text style={styles().header}>{header}</Text>
        <Text style={styles().subHeader}>{subHeader}</Text>
      </View>

      <Text style={styles().viewAll}>View all</Text>
    </View>
  );
};

const styles = (marginTop, marginBot) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: marginTop,
      marginBottom: marginBot,
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
