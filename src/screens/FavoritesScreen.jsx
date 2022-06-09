import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import ListImg from "../assets/list.png";
import GridImg from "../assets/grid.png";
import {
  getAllProducts,
  getFavoriteProducts,
} from "../utils/Product Utils/product";
import ProductItem from "../components/Product Item/ProductItem";
import HorizontalProduct from "../components/Horizontal Product/HorizontalProduct";
import { auth } from "../firebase-config";
import { deleteAFavoriteProduct } from "../utils/Product Utils/product";

export default function FavoritesScreen({ navigation }) {
  const [flipView, setFlipView] = useState(false);
  const [products, setProducts] = useState(null);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    // getAllProducts(setProducts);
    getFavoriteProducts(userId, setProducts);
  }, []);

  const changeProductView = () => {
    setFlipView(!flipView);
  };

  // remove a product from favorites
  const removeAFavoriteProduct = (productId) => {
    Alert.alert(
      "Notification",
      "Are you sure to remove this product from favorites?",
      [
        {
          text: "cancel",
          style: "cancel",
        },
        {
          text: "ok",
          onPress: () => {
            deleteAFavoriteProduct(productId, userId).then(() => {
              Alert.alert("Notification", "Remove successfully!");
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Favorite products
        </Text>

        <TouchableOpacity onPress={changeProductView}>
          <Image
            source={flipView ? ListImg : GridImg}
            style={styles.imageSize}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={
          !flipView
            ? styles.productItemContainer
            : styles.horizontalProductContainer
        }
      >
        {!flipView &&
          products &&
          products.map((product, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("ProductDetails", {
                    images: product.images,
                    brand: product.brand,
                    name: product.name,
                    price: product.price,
                    rating: product.totalRating,
                    details: product.detailedDesc,
                    shortDescription: product.shortDesc,
                    shippingInfo: product.shippingInfo,
                    supportInfo: product.supportInfo,
                    category: product.category,
                    colors: product.colors,
                    sizes: product.sizes,
                    numberOfReviews: product.numberOfReviews,
                    totalRating: product.totalRating,
                    id: product.id,
                  })
                }
              >
                <ProductItem
                  imgURL={product.images[0]}
                  marginRight={0}
                  badgeType=""
                  badgeContent=""
                  brand={product.brand}
                  price={product.price}
                  name={product.name}
                  numberOfReviews={product.numberOfReviews}
                  totalRating={product.totalRating}
                  marginBottom={20}
                  isFavoriteItem={true}
                  removeFromFavorite={() => removeAFavoriteProduct(product.id)}
                  isHideReviews={true}
                  contentMarginTop={10}
                />
              </TouchableOpacity>
            );
          })}

        {flipView &&
          products &&
          products.map((product, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("ProductDetails", {
                    images: product.images,
                    brand: product.brand,
                    name: product.name,
                    price: product.price,
                    rating: product.totalRating,
                    details: product.detailedDesc,
                    shortDescription: product.shortDesc,
                    shippingInfo: product.shippingInfo,
                    supportInfo: product.supportInfo,
                    category: product.category,
                    colors: product.colors,
                    sizes: product.sizes,
                    numberOfReviews: product.numberOfReviews,
                    totalRating: product.totalRating,
                    id: product.id,
                  })
                }
              >
                <HorizontalProduct
                  imgURL={product.images[0]}
                  marginRight={0}
                  badgeType=""
                  badgeContent=""
                  brand={product.brand}
                  price={product.price}
                  name={product.name}
                  numberOfReviews={product.numberOfReviews}
                  totalRating={product.totalRating}
                  marginBottom={20}
                  isFavoriteItem={true}
                  removeFromFavorite={() => removeAFavoriteProduct(product.id)}
                  isHideReviews={true}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    elevation: 5,
  },
  imageSize: {
    width: 18,
    height: 18,
  },
  productItemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 20,
    paddingBottom: 50,
  },
  horizontalProductContainer: {
    paddingTop: 20,
    paddingBottom: 50,
  },
});
