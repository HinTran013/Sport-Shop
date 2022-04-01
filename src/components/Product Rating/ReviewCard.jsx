import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ReviewCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.customerName}>Helene Moore</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View></View>
        <View>
          <Text>June 5, 2022</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 15,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReviewCard;
