import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReviewCard from "../components/Product Rating/ReviewCard";
import { useSelector } from "react-redux";
import { getProductInfo } from "../utils/Product Utils/product";

export default function MyReviewsScreen({ navigation }) {
  const list = useSelector((state) => state.review.list);
  const user = useSelector((state) => state.user);
  useEffect(() => {}, [list]);

  const handleClick = (id) => {
    const setData = () => {};
    const productInfo = getProductInfo(id, setData);

    navigation.navigate("ProductDetails", {
      images: productInfo.images,
      brand: productInfo.brand,
      name: productInfo.name,
      price: productInfo.price,
      details: productInfo.detailedDesc,
      shortDescription: productInfo.shortDesc,
      shippingInfo: productInfo.shippingInfo,
      supportInfo: productInfo.supportInfo,
      category: productInfo.category,
      colors: productInfo.colors,
      sizes: productInfo.sizes,
      numberOfReviews: productInfo.numberOfReviews,
      totalRating: productInfo.totalRating,
      id: productInfo.id,
    });
  };
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
        {list.map((item) => {
          return (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>Review for: </Text>
                <TouchableOpacity onPress={() => handleClick(item.productId)}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.productName}
                  </Text>
                </TouchableOpacity>
              </View>
              <ReviewCard
                name={user.name}
                rating={item.rating}
                date={item.date}
                comment={item.comment}
                containerStyle={{ marginHorizontal: 20, marginVertical: 20 }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

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
