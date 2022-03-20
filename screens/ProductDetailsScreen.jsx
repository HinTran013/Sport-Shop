import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SimpleScreenHeader from "../src/components/Simple Screen Header/SimpleScreenHeader";
import { SliderBox } from "react-native-image-slider-box";
// import DropDownPicker from "react-native-dropdown-picker";
import { IconButton } from "react-native-paper";
import { Button } from "react-native-elements";
import StarRating from "react-native-star-rating";
import ProductContentItem from "../src/components/Product Detail Content Item/ProductContentItem";
import ProductItem from "../src/components/Product Item/ProductItem";

const productImg = require("../assets/fashionWoman.png");

const imgSource = [
  require("../assets/slider1.png"),
  require("../assets/slider2.png"),
  require("../assets/slider3.png"),
  require("../assets/slider4.png"),
];

const ProductDetailsScreen = ({ navigation }) => {
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
    <ScrollView style={styles().container}>
      <SimpleScreenHeader
        headerTitle={"Short dress"}
        onBackPress={() => navigation.pop()}
        isShared={true}
      />
      <SliderBox
        images={imgSource}
        sliderBoxHeight={400}
        dotColor="#DB3022"
        circleLoop={true}
      />
      <View style={styles().dropFavContainer}>
        <Button
          title={"Size"}
          titleStyle={{ color: "black" }}
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
          title={"Color"}
          titleStyle={{ color: "black" }}
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

        <IconButton
          icon={favIcon.name}
          color={favIcon.color}
          style={styles().favIcon}
          onPress={handleOnPressFavIcon}
        />
      </View>
      <View style={styles().basicProductInfoContainer}>
        <View>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>H&M</Text>
          <Text style={{ color: "#9B9B9B" }}>Short black dress</Text>
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
        </View>

        <View>
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>$19.99</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ textAlign: "justify", fontSize: 16 }}>
          Short dress in soft cotton jersey with decorative buttons down the
          front and a wide, frill-trimmed square neckline with concealed.
          Elasticated seam under the bust and short puff sleeves with a small
          frill trim.
        </Text>
      </View>
      <ProductContentItem
        headerTitle={"Item details"}
        mainContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nulla magna, faucibus sed risus sit amet, malesuada consequat leo. Donec sit amet tincidunt magna. Morbi varius purus at erat cursus, vitae iaculis risus mattis."
      />
      <ProductContentItem
        headerTitle={"Shipping information"}
        mainContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nulla magna, faucibus sed risus sit amet, malesuada consequat leo. Donec sit amet tincidunt magna. Morbi varius purus at erat cursus, vitae iaculis risus mattis."
        containerStyle={{ marginTop: -1 }}
      />
      <ProductContentItem
        headerTitle={"Support"}
        mainContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nulla magna, faucibus sed risus sit amet, malesuada consequat leo. Donec sit amet tincidunt magna. Morbi varius purus at erat cursus, vitae iaculis risus mattis."
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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="hot!"
            badgeType="hot"
          />
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="hot!"
            badgeType="hot"
          />
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="hot!"
            badgeType="hot"
          />
          <ProductItem
            img={productImg}
            marginRight={20}
            badgeContent="hot!"
            badgeType="hot"
          />
        </ScrollView>
      </View>

      <View style={{ paddingBottom: 70 }}></View>
    </ScrollView>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
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
      //shadow - working on IOS
      backgroundColor: "white",
      shadowColor: "black",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      //shadow - working on android
      elevation: 5,
      marginLeft: 20,
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
  });

export default ProductDetailsScreen;
