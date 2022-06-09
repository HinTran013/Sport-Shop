import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
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
import { auth } from "../firebase-config";

const CustomerRatingScreen = ({ route, navigation }) => {
  const { id, productName } = route.params;

  // user id
  const userId = auth.currentUser?.uid;

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
      <SimpleScreenHeader
        headerTitle="Rating and Review"
        onBackPress={() => navigation.pop()}
      />
      <ScrollView style={styles.container}>
        <View style={styles.mainContentContainer}>
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <ProductRating
              numberOfReviews={numberOfReviews}
              totalRating={
                numberOfReviews === 0 ? 0 : totalRating / numberOfReviews
              }
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
      </ScrollView>
      <Button
        onPress={() => {
          if (!userId) {
            Alert.alert(
              "Notification",
              "You need to log in to use this feature"
            );
            return;
          }

          setShowReviewSheet(!showReviewSheet);
        }}
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
          bottom: 15,
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
        productName={productName}
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
    paddingBottom: 25,
    flex: 1,
  },
});

export default CustomerRatingScreen;
