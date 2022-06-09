import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Button, Icon } from "react-native-elements";
import { auth } from "../../firebase-config";

const avatar = require("../../assets/avatar-empty.jpg");
const ReviewCard = ({
  containerStyle,
  name,
  rating,
  date,
  comment,
  uid = "",
  reviewId,
  onEditPress = () => {},
  onDeletePress = () => {},
  setEditComment = () => {},
  setEditRating = () => {},
  setEditReviewId = () => {},
  setDeleteReviewId = () => {},
  setDeleteRatingId = () => {},
}) => {
  const userId = auth.currentUser?.uid;

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.customerName}>{name}</Text>

        {userId === uid && (
          <View style={{ flexDirection: "row" }}>
            <Button
              icon={{
                name: "edit",
                type: "material",
              }}
              buttonStyle={{ padding: 5, backgroundColor: "white" }}
              onPress={() => {
                setEditComment(comment);
                setEditRating(rating);
                setEditReviewId(reviewId);
                onEditPress();
              }}
            />
            <Button
              icon={{
                name: "delete",
                type: "material",
              }}
              buttonStyle={{ padding: 5, backgroundColor: "white" }}
              onPress={() => {
                // setDeleteReviewId(reviewId);
                // setDeleteRatingId(rating);
                onDeletePress(reviewId, rating);
              }}
            />
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <View>
          <StarRating
            buttonStyle={{
              marginRight: 5,
            }}
            maxStars={5}
            rating={rating}
            starSize={15}
            fullStarColor="#FFBA49"
            halfStarColor="#FFBA49"
            emptyStarColor="#FFBA49"
            disabled={true}
          />
        </View>
        <View>
          <Text style={{ color: "#9B9B9B" }}>{date}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.description}>{comment}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={avatar}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    paddingTop: 25,
    paddingRight: 25,
    paddingLeft: 25,
    paddingBottom: 35,
    position: "relative",
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    textAlign: "justify",
    marginTop: 7,
    fontSize: 15,
  },
  imageContainer: {
    position: "absolute",
    top: -12,
    left: -15,
  },
});

export default ReviewCard;
