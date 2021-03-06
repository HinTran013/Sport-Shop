import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { BottomSheet } from "react-native-elements";
import { Button, Icon } from "react-native-elements";
import {
  editReview,
  writeReview,
} from "../../utils/Product Utils/commentAndRating";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const RatingBottomSheet = ({
  isVisible = false,
  closeSheet,
  productId,
  productName = "",
  existingComment = "",
  existingRating = 3,
  type,
  reviewId = "",
}) => {
  const [currentDate, setCurrentDate] = useState("");
  const [ratingNumber, setRatingNumber] = useState(existingRating);
  const [comment, setComment] = useState(existingComment);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const auth = getAuth();

  const handleRatingNumber = (rating) => {
    setRatingNumber(rating);
  };

  const handleInputText = (text) => {
    setComment(text);
  };

  const handleSendReview = async () => {
    if (comment === "") {
      Alert.alert("Notification", "Don't let your review empty!");
      return;
    }

    if (type === "addNew") {
      await setLoading(true);

      await writeReview(
        comment,
        currentDate,
        ratingNumber,
        userEmail,
        userId,
        productId,
        productName
      )
        .then(() => {
          setLoading(false);
          closeSheet();
        })
        .then(() => {
          Alert.alert("Notification", "Your review has been saved");
        });
    } else {
      await setLoading(true);
      await editReview(
        comment,
        currentDate,
        ratingNumber,
        userEmail,
        userId,
        productId,
        productName,
        reviewId,
        existingRating
      )
        .then(() => {
          setLoading(false);
          closeSheet();
        })
        .then(() => {
          Alert.alert("Notification", "Your editing has been saved");
        });
    }
  };

  useEffect(() => {
    // get current date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    setCurrentDate(today);

    // get userId and userEmail
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email);
      }
    });
  }, []);

  return (
    <BottomSheet isVisible={isVisible} containerStyle={styles.container}>
      <ScrollView style={styles.mainContentContainer}>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity onPress={closeSheet}>
            <Icon
              type="material"
              name="close"
              iconStyle={{
                fontSize: 30,
                paddingTop: 25,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              What is your rate?
            </Text>
          </View>

          <AirbnbRating
            defaultRating={existingRating}
            onFinishRating={(rating) => handleRatingNumber(rating)}
          />
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                width: "70%",
                marginTop: 25,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Please share your opinion about the product
            </Text>
          </View>

          <TextInput
            style={{
              height: 200,
              borderColor: "#ccc",
              borderWidth: 1,
              width: "100%",
              marginTop: 25,
              textAlign: "left",
              textAlignVertical: "top",
              padding: 15,
              fontSize: 18,
            }}
            placeholder="Write your review"
            multiline={true}
            onChangeText={(text) => handleInputText(text)}
            defaultValue={existingComment}
          />

          <Button
            onPress={handleSendReview}
            title={type === "addNew" ? "SEND REVIEW" : "EDIT"}
            containerStyle={{ marginTop: 25 }}
            buttonStyle={{
              width: "100%",
              borderRadius: 999,
              paddingTop: 12,
              paddingBottom: 12,
              backgroundColor: "#DB3022",
            }}
            loading={isLoading}
          />
        </View>
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    flex: 1,
  },
  mainContentContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
  },
});

export default RatingBottomSheet;
