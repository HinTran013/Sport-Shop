import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Image } from "react-native";
import SimpleScreenHeader from "../components/Simple Screen Header/SimpleScreenHeader";
import ProductRating from "../components/Product Rating/ProductRating";
import ReviewCard from "../components/Product Rating/ReviewCard";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import RatingBottomSheet from "../components/Product Rating/RatingBottomSheet";
import {
  deleteReview,
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
  const [showEditingSheet, setShowEditingSheet] = useState(false);

  // comment and rating to edit
  const [commentToEdit, setCommentToEdit] = useState("");
  const [ratingToEdit, setRatingToEdit] = useState(null);
  const [reviewIdToEdit, setReviewIdToEdit] = useState("");

  // deleting comment
  const [reviewIdToDelete, setReviewIdToDelete] = useState("");
  const [ratingToDelete, setRatingToDelete] = useState(null);

  // method
  const closeReviewBottom = () => {
    setShowReviewSheet(false);
  };

  const closeEditingSheet = () => {
    setShowEditingSheet(false);
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

  // edit methods
  const handleEditPress = () => {
    Alert.alert("Notification", "Do you want to edit your review?", [
      {
        text: "cancel",
        style: "cancel",
      },
      {
        text: "edit",
        onPress: () => handleEdit(),
      },
    ]);
  };

  const handleEdit = () => {
    setShowEditingSheet(!showEditingSheet);
  };

  // delete methods
  const handleDeletePress = (reviewId, rating) => {
    Alert.alert("Notification", "Do you want to delete your review?", [
      {
        text: "cancel",
        style: "cancel",
      },
      {
        text: "delete",
        onPress: () => handleDelete(reviewId, rating),
      },
    ]);
  };

  const handleDelete = (reviewId, rating) => {
    deleteReview(id, reviewId, userId, rating).then(() => {
      Alert.alert("Notification", "Your review has been deleted");
    });
  };

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
              productReviews.length > 0 &&
              productReviews.map((item, index) => {
                return (
                  <ReviewCard
                    containerStyle={{ marginTop: 25 }}
                    key={index}
                    name={item.user}
                    rating={item.rating}
                    date={item.date}
                    comment={item.comment}
                    uid={item.userId}
                    reviewId={item.reviewId}
                    onEditPress={handleEditPress}
                    onDeletePress={handleDeletePress}
                    setEditComment={setCommentToEdit}
                    setEditRating={setRatingToEdit}
                    setEditReviewId={setReviewIdToEdit}
                    setDeleteReviewId={setReviewIdToDelete}
                    setDeleteRatingId={setRatingToDelete}
                  />
                );
              })}
          </View>
        </View>
      </ScrollView>

      {productReviews && productReviews.length === 0 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>
            Be the one who has the first review.
          </Text>
          <Image
            source={require("../assets/review_vector.png")}
            style={{ height: 150 }}
            resizeMode="contain"
          />
        </View>
      )}

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
        type={"addNew"}
      />

      <RatingBottomSheet
        isVisible={showEditingSheet}
        closeSheet={closeEditingSheet}
        productId={id}
        productName={productName}
        type={"edit"}
        existingComment={commentToEdit}
        existingRating={ratingToEdit}
        reviewId={reviewIdToEdit}
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
