import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import StarRating from "react-native-star-rating";

const ReviewCard = ({ containerStyle, name, rating, date, comment }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.customerName}>{name}</Text>
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
          source={{
            uri: "https://github.com/khaihoan2306/My-Wallet/blob/main/app/src/main/res/drawable/hien_bede.jpg?raw=true",
          }}
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
