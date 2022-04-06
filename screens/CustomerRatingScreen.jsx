import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SimpleScreenHeader from "../src/components/Simple Screen Header/SimpleScreenHeader";
import ProductRating from "../src/components/Product Rating/ProductRating";
import ReviewCard from "../src/components/Product Rating/ReviewCard";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import RatingBottomSheet from "../src/components/Product Rating/RatingBottomSheet";

const CustomerRatingScreen = ({ navigation }) => {
  const [showReviewSheet, setShowReviewSheet] = useState(false);

  const closeReviewBottom = () => {
    setShowReviewSheet(false);
  };

  return (
    <View style={{ position: "relative", flex: 1 }}>
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

          <View>
            <ReviewCard containerStyle={{ marginTop: 25 }} />
            <ReviewCard containerStyle={{ marginTop: 25 }} />
            <ReviewCard containerStyle={{ marginTop: 25 }} />
            <ReviewCard containerStyle={{ marginTop: 25 }} />
          </View>
        </View>

        <View style={{ paddingBottom: 80 }}></View>
      </ScrollView>
      <Button
        onPress={() => setShowReviewSheet(!showReviewSheet)}
        iconPosition="left"
        icon={
          <Icon
            name="create"
            size={15}
            color="white"
            style={{ marginRight: 5 }}
          />
        }
        title={"Write a review"}
        containerStyle={{
          position: "absolute",
          right: 12,
          bottom: 70,
          elevation: 10,
          borderRadius: 999,
        }}
        buttonStyle={{
          borderRadius: 999,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#DB3022",
        }}
      />

      <RatingBottomSheet
        isVisible={showReviewSheet}
        closeSheet={closeReviewBottom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContentContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
  },
});

export default CustomerRatingScreen;
