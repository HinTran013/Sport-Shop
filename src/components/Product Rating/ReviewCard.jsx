import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import StarRating from "react-native-star-rating";

const ReviewCard = ({ containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.customerName}>Helene Moore</Text>
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
            rating={4.5}
            starSize={15}
            fullStarColor="#FFBA49"
            halfStarColor="#FFBA49"
            emptyStarColor="#FFBA49"
            disabled={true}
          />
        </View>
        <View>
          <Text style={{ color: "#9B9B9B" }}>June 5, 2022</Text>
        </View>
      </View>

      <View>
        <Text style={styles.description}>
          The dress is great! Very classy and comfortable. It fit perfectly! I'm
          5'7" and 130 pounds. I am a 34B chest. This dress would be too long
          for those who are shorter but could be hemmed. I wouldn't recommend it
          for those big chested as I am smaller chested and it fit me perfectly.
          The underarms were not too wide and the dress was made well.
        </Text>
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
