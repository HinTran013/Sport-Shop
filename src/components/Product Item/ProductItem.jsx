import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";
import StarRating from "react-native-star-rating";
import ProductBadge from "../Product Badge/ProductBadge";

// Please pass the "badgeType" prop ("sale" or whatever)
// "sale" prop: displays red badge
// whatever: displays black badge
// if you don't pass the "badgeType" prop, the badge won't be shown

const ProductItem = ({
  img,
  marginRight = 0,
  badgeType = "",
  badgeContent = "",
  isSale = false,
  oldPrice = "0",
  newPrice = "0",
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
    <View style={styles(marginRight).container}>
      {/* Image section: also contains fav icon and product badge */}
      <View>
        <Image style={styles().img} source={img} resizeMode="cover" />
        <IconButton
          icon={favIcon.name}
          color={favIcon.color}
          style={styles().favIcon}
          onPress={handleOnPressFavIcon}
        />
        <View style={styles().badgeContainer}>
          <ProductBadge type={badgeType} content={badgeContent} />
        </View>
      </View>
      {/* Main content container */}
      <View style={styles().contentContainer}>
        {/* Star Section */}
        <View style={styles().starSection}>
          <StarRating
            containerStyle={styles().starContainer}
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

          <Text
            style={{
              marginTop: 6,
              color: "#9B9B9B",
              fontSize: 14,
            }}
          >
            (10)
          </Text>
        </View>

        {/* Product basic information */}
        <Text style={styles().productBrand}>Dorothy Perkins</Text>
        <Text style={styles().productName}>T-shirt SPANISH</Text>
        <Text style={styles().productPrice}>$9</Text>
      </View>
    </View>
  );
};

const styles = (marginRight) =>
  StyleSheet.create({
    container: {
      width: 148,
      marginRight: marginRight,
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
      elevation: 5,
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
    },
    productName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    productPrice: {
      fontSize: 16,
    },
  });

export default ProductItem;
