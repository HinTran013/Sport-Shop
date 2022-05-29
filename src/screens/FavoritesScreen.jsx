import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ListImg from "../assets/list.png";
import GridImg from "../assets/grid.png";
import { getAllProducts } from "../utils/Product Utils/product";
import ProductItem from "../components/Product Item/ProductItem";
import HorizontalProduct from "../components/Horizontal Product/HorizontalProduct";

export default function FavoritesScreen() {
  const [flipView, setFlipView] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getAllProducts(setProducts);
  }, []);

  const changeProductView = () => {
    setFlipView(!flipView);
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

      <ScrollView contentContainerStyle={styles.productContainer}>
        {!flipView &&
          products &&
          products.map((product, index) => {
            return (
              <TouchableOpacity key={index}>
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
    paddingLeft: 28,
    paddingRight: 28,
    elevation: 5,
  },
  imageSize: {
    width: 18,
    height: 18,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 20,
  },
});
