import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import ReviewCard from "../src/components/Product Rating/ReviewCard";

export default function MyReviewsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image source={require("../assets/arrow-left.png")} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          My Reviews
        </Text>
      </View>
      <ScrollView style={{ marginTop: 30 }}>
        <ProductReview nameProduct="Nike Air Force 1" />
        <ProductReview nameProduct="Nike Air Force 2" />
      </ScrollView>
    </View>
  );
}

const ProductReview = (props) => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text>Review for </Text>
        <TouchableOpacity>
          <Text style={{ fontWeight: "bold" }}>{props.nameProduct} :</Text>
        </TouchableOpacity>
      </View>
      <ReviewCard
        name="Trần Thanh Hiền"
        rating={3}
        date="12/05/2022"
        comment="Như quần què"
        containerStyle={{ marginHorizontal: 20, marginVertical: 20 }}
      />
      <ReviewCard
        name="Trần Thanh Hiền"
        rating={3}
        date="13/05/2022"
        comment="Như quần què"
        containerStyle={{ marginHorizontal: 20, marginVertical: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 14,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: -14,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
