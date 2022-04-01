import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SimpleScreenHeader from "../src/components/Simple Screen Header/SimpleScreenHeader";
import ProductRating from "../src/components/Product Rating/ProductRating";
import ReviewCard from "../src/components/Product Rating/ReviewCard";

const CustomerRatingScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <SimpleScreenHeader
        headerTitle="Rating and Review"
        onBackPress={() => navigation.pop()}
      />
      <View style={styles.mainContentContainer}>
        <View style={{ alignItems: "center", marginTop: 15 }}>
          <ProductRating />
        </View>

        <View>
          <Text style={{ fontWeight: "bold", fontSize: 24, marginTop: 15 }}>
            8 Reviews
          </Text>
        </View>

        <View style={{ marginTop: 15 }}>
          <ReviewCard />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
});

export default CustomerRatingScreen;
