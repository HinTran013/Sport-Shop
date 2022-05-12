import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SimpleScreenHeader from "../src/components/Simple Screen Header/SimpleScreenHeader";
import ProductRating from "../src/components/Product Rating/ProductRating";
import ReviewCard from "../src/components/Product Rating/ReviewCard";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import RatingBottomSheet from "../src/components/Product Rating/RatingBottomSheet";
import { getProductInfo } from "../src/utils/Product Utils/product";

const CustomerRatingScreen = ({ route, navigation }) => {
  const { id } = route.params;

  // product data use state
  const [productData, setProductData] = useState(null);

  // is show review sheet
  const [showReviewSheet, setShowReviewSheet] = useState(false);

  // method
  const closeReviewBottom = () => {
    setShowReviewSheet(false);
  };

  const handleGetProductData = (data) => {
    setProductData(data);
  };

  useEffect(() => {
    getProductInfo(id, handleGetProductData);
  }, []);

  console.log("data: ", productData);

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
              numberOfReviews={productData && productData.numberOfReviews}
              totalRating={productData && productData.totalRating}
            />
          </View>

          <View>
            {productData &&
              productData.reviews.map((item, index) => {
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
