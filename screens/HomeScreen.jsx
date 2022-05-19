import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BigBanner from "../src/components/Big Banner/BigBanner";
import ProductSectionHeader from "../src/components/Product Section Header/ProductSectionHeader";
import ProductItem from "../src/components/Product Item/ProductItem";

import {
  getRecentProductNodes,
  getHotProducts,
  getSaleProducts,
} from "../src/utils/Product Utils/product";

const backgroundImg =
  "https://firebasestorage.googleapis.com/v0/b/sport-shop-60073.appspot.com/o/products%2Fsneakers%2Ferik-mclean-e_qqXYMDyfM-unsplash.jpg?alt=media&token=4b323763-4d28-4b73-9f21-c896de8e318e";

export default function HomeScreen({ navigation, route }) {
  const [newProducts, setNewProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    getRecentProductNodes(5, handleSetNewProducts);
    getHotProducts(4, handleSetHotProducts);
    getSaleProducts(4, handleSetSaleProducts);
  }, []);

  const handleSetNewProducts = (data) => {
    setNewProducts(data);
  };

  const handleSetHotProducts = (data) => {
    setHotProducts(data);
  };

  const handleSetSaleProducts = (data) => {
    setSaleProducts(data);
  };

  return (
    <ScrollView style={styles.container}>
      <BigBanner
        backgroundImage={backgroundImg}
        text="Be Yourself"
        buttonText={"Check"}
      />
      <View style={styles.mainContentContainer}>
        <ProductSectionHeader
          header="New"
          subHeader="You've never seen it before"
          marginTop={10}
        />

        <ScrollView
          style={styles.productsContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {newProducts.length !== 0 &&
            newProducts.map((newProduct, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductDetails", {
                      images: newProduct.images,
                      brand: newProduct.brand,
                      name: newProduct.name,
                      price: newProduct.price,
                      rating: newProduct.totalRating,
                      details: newProduct.detailedDesc,
                      shortDescription: newProduct.shortDesc,
                      shippingInfo: newProduct.shippingInfo,
                      supportInfo: newProduct.supportInfo,
                      category: newProduct.category,
                      colors: newProduct.colors,
                      sizes: newProduct.sizes,
                      numberOfReviews: newProduct.numberOfReviews,
                      id: newProduct.id,
                      isFavorite: newProduct.isFavorite,
                    })
                  }
                  key={index}
                >
                  <ProductItem
                    imgURL={newProduct.images[0]}
                    marginRight={20}
                    badgeType="sale"
                    badgeContent="NEW"
                    brand={newProduct.brand}
                    price={newProduct.price}
                    name={newProduct.name}
                    numberOfReviews={newProduct.numberOfReviews}
                  />
                </TouchableOpacity>
              );
            })}
        </ScrollView>

        <ProductSectionHeader
          header="Best Seller"
          subHeader="You'll like it!"
          marginTop={40}
        />

        <ScrollView
          style={styles.productsContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {hotProducts.length !== 0 &&
            hotProducts.map((hotProducts, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductDetails", {
                      images: hotProducts.images,
                      brand: hotProducts.brand,
                      name: hotProducts.name,
                      price: hotProducts.price,
                      rating: hotProducts.totalRating,
                      details: hotProducts.detailedDesc,
                      shortDescription: hotProducts.shortDesc,
                      shippingInfo: hotProducts.shippingInfo,
                      supportInfo: hotProducts.supportInfo,
                      category: hotProducts.category,
                      colors: hotProducts.colors,
                      sizes: hotProducts.sizes,
                      numberOfReviews: hotProducts.numberOfReviews,
                      id: hotProducts.id,
                      isFavorite: hotProducts.isFavorite,
                    })
                  }
                  key={index}
                >
                  <ProductItem
                    imgURL={hotProducts.images[0]}
                    marginRight={20}
                    badgeType="hot"
                    badgeContent="HOT"
                    brand={hotProducts.brand}
                    price={hotProducts.price}
                    name={hotProducts.name}
                    numberOfReviews={hotProducts.numberOfReviews}
                  />
                </TouchableOpacity>
              );
            })}
        </ScrollView>

        <ProductSectionHeader
          header="Sale"
          subHeader="Better price for you!"
          marginTop={40}
        />

        <ScrollView
          style={styles.productsContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {saleProducts.length !== 0 &&
            saleProducts.map((saleProducts, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductDetails", {
                      images: saleProducts.images,
                      brand: saleProducts.brand,
                      name: saleProducts.name,
                      price: saleProducts.price,
                      rating: saleProducts.totalRating,
                      details: saleProducts.detailedDesc,
                      shortDescription: saleProducts.shortDesc,
                      shippingInfo: saleProducts.shippingInfo,
                      supportInfo: saleProducts.supportInfo,
                      category: saleProducts.category,
                      colors: saleProducts.colors,
                      sizes: saleProducts.sizes,
                      numberOfReviews: saleProducts.numberOfReviews,
                      id: saleProducts.id,
                      isFavorite: saleProducts.isFavorite,
                    })
                  }
                  key={index}
                >
                  <ProductItem
                    imgURL={saleProducts.images[0]}
                    marginRight={20}
                    badgeType="hot"
                    badgeContent="SALE"
                    brand={saleProducts.brand}
                    price={saleProducts.price}
                    name={saleProducts.name}
                    numberOfReviews={saleProducts.numberOfReviews}
                  />
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
      <View style={{ paddingBottom: 75 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContentContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 20,
  },
  productsContainer: {
    paddingTop: 20,
  },
});
