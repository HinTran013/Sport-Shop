import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SimpleScreenHeader from "../components/Simple Screen Header/SimpleScreenHeader";
import ProductRating from "../components/Product Rating/ProductRating";
import ReviewCard from "../components/Product Rating/ReviewCard";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import RatingBottomSheet from "../components/Product Rating/RatingBottomSheet";
import { getProductInfo } from "../utils/Product Utils/product";
import {
  getAllProductReviews,
  getProductNumberOfRatings,
  getProductTotalRating,
} from "../utils/Product Utils/commentAndRating";

const CustomerRatingScreen = ({ route, navigation }) => {
  const { id } = route.params;
  // product data use state
  const [productReviews, setProductReviews] = useState(null);
  const [totalRating, setTotalRating] = useState(0);
  const [numberOfReviews, setNumberOfReviews] = useState(0);

  // is show review sheet
  const [showReviewSheet, setShowReviewSheet] = useState(false);

  // method
  const closeReviewBottom = () => {
    setShowReviewSheet(false);
  };

  const handleGetProductReviews = (data) => {
    setProductReviews(data);
  };

  const handleGetTotalRating = (data) => {
    setTotalRating(data);
  };

  const handleGetNumberOfReviews = (data) => {
    setNumberOfReviews(data);
  };

  useEffect(() => {
    getAllProductReviews(id, handleGetProductReviews);
    getProductNumberOfRatings(id, handleGetNumberOfReviews);
    getProductTotalRating(id, handleGetTotalRating);
  }, []);

  console.log("test rerender");

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <ScrollView style={styles.container}>
        <SimpleScreenHeader
          headerTitle="Rating and Review"
          onBackPress={() => navigation.pop()}
        />
        <View style={styles.mainContentContainer}>
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <ProductRating
              numberOfReviews={numberOfReviews}
              totalRating={totalRating}
            />
          </View>

          <View>
            {productReviews &&
              productReviews.map((item, index) => {
                return (
                  <ReviewCard
                    containerStyle={{ marginTop: 25 }}
                    key={index}
                    name={item.user}
                    rating={item.rating}
                    date={item.date}
                    comment={item.comment}
                  />
                );
              })}
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
        productId={id}
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