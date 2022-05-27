import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import SimpleScreenHeader from "../components/Simple Screen Header/SimpleScreenHeader";
import { SliderBox } from "react-native-image-slider-box";
import { IconButton } from "react-native-paper";
import { Button } from "react-native-elements";
import StarRating from "react-native-star-rating";
import ProductContentItem from "../components/Product Detail Content Item/ProductContentItem";
import ProductItem from "../components/Product Item/ProductItem";
import GridBottomModal from "../components/Simple Grid Bottom Modal/GridBottomModal";
import { getRelativeProducts } from "../utils/Product Utils/product";
import { updateFavoriteProduct } from "../utils/Product Utils/product";
import { useDispatch } from "react-redux";
import { addAProductToCart } from "../redux/cartSlice";

const productImg = require("../assets/fashionWoman.png");

const ProductDetailsScreen = ({ route, navigation }) => {
  // dispatch
  const dispatch = useDispatch();

  // product params passed
  const {
    images,
    brand,
    name,
    price,
    rating,
    details,
    shortDescription,
    shippingInfo,
    supportInfo,
    category,
    colors,
    sizes,
    numberOfReviews,
    id,
    isFavorite,
  } = route.params;

  // favorite useState
  const [favor, setFavor] = useState(isFavorite);
  const [favorLoading, setFavorLoading] = useState(false);

  //modal useState
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  // product Images
  const [productImages, setProductImages] = useState(null);

  // size and color use state
  const [productSize, setProductSize] = useState("Size");
  const [productColor, setProductColor] = useState("Color");

  // relative products use state
  const [relativeProducts, setRelativeProducts] = useState(null);

  useEffect(() => {
    // set product images
    setProductImages(images);

    // set relative products
    getRelativeProducts(5, category, setRelativeProducts);
  }, []);

  // handle size and color
  function handleProductSize(data) {
    setProductSize(data);
  }

  function handleProductColor(data) {
    setProductColor(data);
  }

  // handle favorite
  function handleOnPressFavIcon() {
    setFavorLoading(true);
    if (favor) {
      updateFavoriteProduct(id, false).then(() => {
        setFavorLoading(false);
        setFavor(false);
      });
    } else {
      updateFavoriteProduct(id, true).then(() => {
        setFavorLoading(false);
        setFavor(true);
      });
    }
  }

  //close modal
  function closeSizeModal() {
    setIsSizeModalOpen(false);
  }

  function closeColorModal() {
    setIsColorModalOpen(false);
  }

  // add to cart method
  function addToCart() {
    dispatch(addAProductToCart({ id: id }));
  }

  return (
    <View style={styles().container}>
      <SimpleScreenHeader
        headerTitle={name}
        onBackPress={() => navigation.pop()}
        isShared={false}
      />
      {productImages && relativeProducts ? (
        <ScrollView>
          <SliderBox
            images={productImages}
            sliderBoxHeight={400}
            dotColor="#DB3022"
            circleLoop={true}
          />
          <View style={styles().dropFavContainer}>
            <Button
              onPress={() => setIsSizeModalOpen(true)}
              title={productSize}
              titleStyle={{ color: "black", textTransform: "capitalize" }}
              containerStyle={{
                flex: 1,
                marginLeft: 20,
              }}
              buttonStyle={{
                backgroundColor: "white",
                borderRadius: 10,
                borderColor: "#ccc",
                borderWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              icon={{
                name: "chevron-down",
                type: "font-awesome",
                size: 12,
              }}
              iconPosition="right"
              iconContainerStyle={{
                flex: 1,
                alignItems: "flex-end",
              }}
            />
            <Button
              title={productColor}
              titleStyle={{ color: "black", textTransform: "capitalize" }}
              containerStyle={{
                flex: 1,
                marginLeft: 20,
              }}
              buttonStyle={{
                backgroundColor: "white",
                borderRadius: 10,
                borderColor: "#ccc",
                borderWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              icon={{
                name: "chevron-down",
                type: "font-awesome",
                size: 12,
              }}
              iconPosition="right"
              iconContainerStyle={{
                flex: 1,
                alignItems: "flex-end",
              }}
              onPress={() => setIsColorModalOpen(true)}
            />

            <Button
              buttonStyle={styles().favIcon}
              icon={{
                type: "material",
                name: "favorite",
                color: favor ? "red" : "#ccc",
              }}
              containerStyle={{
                marginLeft: 20,
                borderRadius: 100,
              }}
              raised
              onPress={handleOnPressFavIcon}
              loading={favorLoading}
              loadingProps={{ color: "red" }}
            />
          </View>
          <View style={styles().basicProductInfoContainer}>
            <View>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {brand}
              </Text>
              <Text style={{ color: "#9B9B9B" }}>{name}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.push("Review", {
                    id: id,
                  })
                }
                style={styles().starSection}
              >
                <StarRating
                  containerStyle={styles().starContainer}
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

                <Text
                  style={{
                    marginTop: 6,
                    color: "#9B9B9B",
                    fontSize: 14,
                  }}
                >
                  ({numberOfReviews})
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{ fontWeight: "bold", fontSize: 26 }}>${price}</Text>
            </View>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 16 }}>{shortDescription}</Text>
          </View>

          {/* add to cart btn */}
          <View
            style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}
          >
            <Button
              buttonStyle={{
                backgroundColor: "#DB3022",
                paddingTop: 12,
                paddingBottom: 12,
              }}
              title={"Add to cart"}
              onPress={addToCart}
            />
          </View>

          <ProductContentItem
            headerTitle={"Item details"}
            mainContent={details}
          />
          <ProductContentItem
            headerTitle={"Shipping information"}
            mainContent={shippingInfo}
            containerStyle={{ marginTop: -1 }}
          />
          <ProductContentItem
            headerTitle={"Support"}
            mainContent={supportInfo}
            containerStyle={{ marginTop: -1 }}
          />
          {/* recommend products */}
          <View
            style={{
              flexDirection: "row",
              padding: 20,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              You can also like
            </Text>
            <Text style={{ color: "#9B9B9B" }}>12 items</Text>
          </View>
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {relativeProducts.length !== 0 &&
                relativeProducts.map((relativeProducts, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.push("ProductDetails", {
                          images: relativeProducts.images,
                          brand: relativeProducts.brand,
                          name: relativeProducts.name,
                          price: relativeProducts.price,
                          rating: relativeProducts.totalRating,
                          details: relativeProducts.detailedDesc,
                          shortDescription: relativeProducts.shortDesc,
                          shippingInfo: relativeProducts.shippingInfo,
                          supportInfo: relativeProducts.supportInfo,
                          category: relativeProducts.category,
                          colors: relativeProducts.colors,
                          sizes: relativeProducts.sizes,
                          numberOfReviews: relativeProducts.numberOfReviews,
                        })
                      }
                      key={index}
                    >
                      <ProductItem
                        imgURL={relativeProducts.images[0]}
                        marginRight={20}
                        badgeType="hot"
                        badgeContent="SALE"
                        brand={relativeProducts.brand}
                        price={relativeProducts.price}
                        name={relativeProducts.name}
                      />
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>

          <GridBottomModal
            visible={isSizeModalOpen}
            header="Select size"
            gridContent={sizes}
            closeModalFunc={closeSizeModal}
            setDataFunc={handleProductSize}
          />

          <GridBottomModal
            visible={isColorModalOpen}
            header="Select color"
            gridContent={colors}
            closeModalFunc={closeColorModal}
            setData={handleProductColor}
          />

          <View style={{ paddingBottom: 70 }}></View>
        </ScrollView>
      ) : (
        <View style={styles().loadingScreen}>
          <ActivityIndicator size="large" color="#DB3022" />
        </View>
      )}
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    dropFavContainer: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingRight: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    favIcon: {
      borderRadius: 100,
      height: 50,
      width: 50,
      backgroundColor: "white",
    },
    basicProductInfoContainer: {
      paddingRight: 20,
      paddingLeft: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    starSection: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    starContainer: {
      justifyContent: "flex-start",
      marginTop: 8,
    },
    loadingScreen: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
  });

export default ProductDetailsScreen;