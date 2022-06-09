import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import StarRating from "react-native-star-rating";
import ProductBadge from "../Product Badge/ProductBadge";
import { Icon } from "react-native-elements";

// Please pass the "badgeType" prop ("sale" or whatever)
// "sale" prop: displays red badge
// whatever: displays black badge
// if you don't pass the "badgeType" prop, the badge won't be shown

const ProductItem = ({
  imgURL,
  marginRight = 0,
  badgeType = "",
  badgeContent = "",
  isSale = false,
  name = "",
  brand = "",
  price = -1,
  numberOfReviews = 0,
  totalRating = 0,
  marginBottom = 0,
  isFavoriteItem = false,
  isHideReviews = false,
  contentMarginTop = 0,
  removeFromFavorite = () => {},
}) => {
  // variables of favorite icon
  const [favIcon, setFavIcon] = useState({
    isFavorite: false,
    name: "heart-outline",
    color: "#9B9B9B",
  });

  const handleOnPressFavIcon = () => {
    return favIcon.isFavorite
      ? setFavIcon({
          isFavorite: false,
          name: "heart-outline",
          color: "#9B9B9B",
        })
      : setFavIcon({
          isFavorite: true,
          name: "heart",
          color: "#DB3022",
        });
  };

  return (
    <View style={styles(marginRight, marginBottom).container}>
      {/* Image section: also contains fav icon and product badge */}
      <View>
        <Image
          style={styles().img}
          source={{ uri: imgURL }}
          resizeMode="cover"
        />
        {/* <IconButton
          icon={favIcon.name}
          color={favIcon.color}
          style={styles().favIcon}
          onPress={handleOnPressFavIcon}
        /> */}
        <View style={styles().badgeContainer}>
          <ProductBadge type={badgeType} content={badgeContent} />
        </View>
      </View>
      {/* Main content container */}
      <View style={styles().contentContainer}>
        {/* Star Section */}
        {!isHideReviews && (
          <View style={styles().starSection}>
            <StarRating
              containerStyle={styles().starContainer}
              buttonStyle={{
                marginRight: 5,
              }}
              maxStars={5}
              rating={numberOfReviews === 0 ? 0 : totalRating / numberOfReviews}
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
          </View>
        )}

        {/* Product basic information */}
        <Text style={[styles().productBrand, { marginTop: contentMarginTop }]}>
          {brand}
        </Text>
        <Text style={styles().productName}>{name}</Text>
        <Text style={styles().productPrice}>${price}</Text>
      </View>

      {isFavoriteItem && (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 10,
            top: 10,
          }}
          onPress={() => removeFromFavorite()}
        >
          <Icon
            type="material"
            name="close"
            iconStyle={{
              color: "#ccc",
              backgroundColor: "black",
              borderRadius: 100,
              padding: 2,
            }}
            size={18}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = (marginRight, marginBottom = 0) =>
  StyleSheet.create({
    container: {
      width: 150,
      marginRight: marginRight,
      marginBottom: marginBottom,
      position: "relative",
    },
    img: {
      width: "100%",
      height: 184,
      borderRadius: 8,
    },
    favIcon: {
      position: "absolute",
      right: -15,
      bottom: -15,
      //shadow - working on IOS
      backgroundColor: "white",
      shadowColor: "black",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      //shadow - working on android
      elevation: 0,
      zIndex: 999,
    },
    badgeContainer: {
      position: "absolute",
      top: 10,
      left: 10,
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
    productBrand: {
      color: "#9B9B9B",
      fontSize: 12,
      textTransform: "capitalize",
    },
    productName: {
      fontSize: 16,
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    productPrice: {
      fontSize: 16,
    },
  });

export default ProductItem;
