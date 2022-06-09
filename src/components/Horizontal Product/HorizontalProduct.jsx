import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";
import { IconButton } from "react-native-paper";
import ProductBadge from "../Product Badge/ProductBadge";
import { Icon } from "react-native-elements";

const HorizontalProduct = ({
  imgURL,
  badgeType = "",
  badgeContent = "",
  isSale = false,
  name = "",
  brand = "",
  price = -1,
  numberOfReviews = 0,
  totalRating = 0,
  isFavoriteItem = false,
  removeFromFavorite = () => {},
  isHideReviews = false,
}) => {
  //const [starRate, setStarRate] = useState(totalRating);
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
    <>
      <View style={styles.containerTouch}>
        <View style={styles.viewProduct}>
          <View style={styles.viewImg}>
            <Image
              style={styles.styleImg}
              source={{ uri: imgURL }}
              resizeMode="cover"
            />
          </View>

          <View style={styles.viewInfomation}>
            <Text style={textStyles(22, "bold", "#222").textStyle}>{name}</Text>
            <Text style={textStyles(14, "300", "#9B9B9B").textStyle}>
              {brand}
            </Text>
            {!isHideReviews && (
              <View style={styles.viewStar}>
                <StarRating
                  containerStyle={{
                    justifyContent: "flex-start",
                    marginVertical: 3,
                  }}
                  buttonStyle={{ marginRight: 5 }}
                  disabled={true}
                  maxStars={5}
                  rating={
                    numberOfReviews === 0 ? 0 : totalRating / numberOfReviews
                  }
                  starSize={15}
                  fullStarColor="#FFBA49"
                  halfStarColor="#FFBA49"
                  emptyStarColor="#FFBA49"
                />
                <Text style={styles.textStarRate}>
                  ({numberOfReviews}) Reviews
                </Text>
              </View>
            )}
            <Text style={textStyles(16, "600").textStyle}>${price}</Text>
            {/* <IconButton
                            icon={favIcon.name}
                            color={favIcon.color}
                            style={styles.favIcon}
                            onPress={handleOnPressFavIcon} /> */}
            <View style={styles.viewBadge}>
              <ProductBadge type={badgeType} content={badgeContent} />
            </View>
          </View>
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
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                borderRadius: 150,
                padding: 1,
              }}
              size={18}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const textStyles = (fontsize = 10, fontweight = "bold", fontcolor = "black") =>
  StyleSheet.create({
    textStyle: {
      fontSize: fontsize,
      fontWeight: fontweight,
      color: fontcolor,
      textTransform: "capitalize",
    },
  });

const styles = StyleSheet.create({
  containerTouch: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  viewProduct: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    //hide the oversize of borderRadius
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    //shadow - working on IOS
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    //shadow - working on android
    elevation: 3,
  },

  viewImg: {
    flex: 1,
    height: 110,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
  },
  styleImg: {
    height: "100%",
  },

  viewInfomation: {
    flex: 3,
    marginLeft: 20,
  },
  viewStar: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStarRate: {
    color: "#9B9B9B",
    fontSize: 14,
  },
  viewBadge: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  favIcon: {
    position: "absolute",
    right: -15,
    bottom: -15,
    backgroundColor: "white",
    //shadow - working on IOS
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    //shadow - working on Android
    elevation: 0.5,
  },
});

export default HorizontalProduct;
