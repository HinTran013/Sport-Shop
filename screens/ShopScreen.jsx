import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import ProductTag from "../src/components/ProductTag/ProductTag";
import HorizontalProduct from "../src/components/Horizontal Product/HorizontalProduct";
import ProductItem from "../src/components/Product Item/ProductItem";

import FilterImg from "../assets/filter.png";
import UpdownImg from "../assets/updown.png";
import ListImg from "../assets/list.png";
import GridImg from "../assets/grid.png";
import SearchImg from "../assets/search.png";
//import FiltersScreen from "./FiltersScreen";
import BottomSortModal, { sortItems } from "../src/components/BottomModals/BottomSortModal";

//Get the getProduct APIs from the Utils
import { getAllProducts } from "../src/utils/Product Utils/product";
import { filterByAll, orderByPrice, orderByRating } from "../src/utils/Product Utils/FilterQueries";

import { setKeywordFilter } from "../src/redux/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import { tags } from "./CategoriesScreen";
import { Button } from "react-native-paper";
//import { resetKeywordFilter, setAllFilter } from "../src/redux/filterSlice";

const tagsData = [
  "All",
  ...tags
];

export default function ShopScreen({ navigation, route }) {

  const filters = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    if (route.params) {
      filterByAll(handleSetAllProducts, filters)
    }
  }, [route.params, filters])

  //create an array of products with useState
  const [allProducts, setAllProducts] = useState([]);
  const handleSetAllProducts = (data) => {
    setAllProducts(data);
  };

  //get all the products once after the first mounting
  useEffect(() => {
    getAllProducts(handleSetAllProducts);
  }, []);

  // useEffect(() => {
  //   if (filters) {
  //     filterByAll(handleSetAllProducts, filters)
  //   }
  // }, [filters])

  const [flipView, setFlipView] = useState(false);
  const onPressFlipViewHandler = () => {
    setFlipView(!flipView);
  };

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  //const toggleFilterModal = () => { setIsFilterVisible(!isFilterVisible) };

  //this is for the SORT modal
  const [isSortVisible, setIsSortVisible] = useState(false);
  const toggleSortModal = () => setIsSortVisible(!isSortVisible);
  const [selectedSort, setSelectedSort] = useState(0)

  useEffect(() => {
    switch (selectedSort) {
      case 0:
        getAllProducts(handleSetAllProducts)
        break
      case 1:
        orderByRating(handleSetAllProducts, "increase")
        break
      case 2:
        orderByRating(handleSetAllProducts, "decrease")
        break
      case 3:
        orderByPrice(handleSetAllProducts, "increase")
        break
      case 4:
        orderByPrice(handleSetAllProducts, "decrease")
        break
    }
  }, [selectedSort])



  const [tags, setTags] = useState(0);
  const handleTagSelect = (num) => {
    setTags(num)
    let word = tagsData[num] == "All" ? "" : tagsData[num]
    dispatch(setKeywordFilter(word))
  };

  useEffect(() => {
    filterByAll(handleSetAllProducts, filters)
  }, [tags])


  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <Button onPress={() => { console.log(filters) }}
        title={"test"}>
      </Button> */}
      <View style={styles.viewHeadLine}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingHorizontal: 7,
            paddingVertical: 5,
          }}
        >
          <Text style={styles.headLine}>Sport Shirt</Text>
          <TouchableOpacity
            style={styles.viewSearchIcon}
            onPress={() => {
              navigation.navigate("Category");
            }}
          >
            <Image style={{ tintColor: "#000" }} source={SearchImg} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewTags}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tagsData.map((x, index) => (
              <ProductTag
                name={x}
                selected={tags == index ? true : false}
                onPress={() => {
                  handleTagSelect(index);
                }}
                key={x}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.viewSearch}>
          <TouchableOpacity
            style={styles.divFilter}
            onPress={() => {
              navigation.navigate("Filters", { visible: isFilterVisible });
            }}
          >
            {/* <Button
              icon={FilterImg}
              color="black"
              uppercase={false}
              labelStyle={labelStyle.label}> */}
            <Image source={FilterImg} style={styles.imageSize} />
            <Text style={styles.viewSearchText}>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.divFilter} onPress={toggleSortModal}>
            <Image source={UpdownImg} style={styles.imageSize} />
            <Text style={styles.viewSearchText}>{sortItems[selectedSort].title}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.divFilter}
            onPress={onPressFlipViewHandler}
          >
            <Image
              source={flipView ? ListImg : GridImg}
              style={styles.imageSize}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={flipView ? scrollStyle.view : {}}
        contentContainerStyle={flipView ? scrollStyle.content : {}}
      >
        {allProducts.map((product, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
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
                });
              }}
            >
              {flipView ? (
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
                  marginBottom ={20}
                />
              ) : (
                <HorizontalProduct
                  imgURL={product.images[0]}
                  badgeType=""
                  badgeContent=""
                  brand={product.brand}
                  price={product.price}
                  name={product.name}
                  numberOfReviews={product.numberOfReviews}
                  totalRating={product.totalRating}
                />
              )}
            </TouchableOpacity>
          );
        })}

        <View style={{ paddingTop: 70 }}></View>
      </ScrollView>

      {/* This is a Sort Modal  */}
      <BottomSortModal
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        visible={isSortVisible}
        toggleModal={toggleSortModal}
      />
    </View>
  );
}

const scrollStyle = StyleSheet.create({
  view: {
    paddingHorizontal: 0,
  },
  content: {
    flexGrow: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",

    paddingBottom: 70,
  },
});

const styles = StyleSheet.create({
  viewHeadLine: {
    backgroundColor: "white",
    marginBottom: 15,
    //shadow - working on IOS
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    //shadow - working on android
    elevation: 8,
  },
  headLine: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  viewSearchIcon: {
    backgroundColor: "#F9F9F9",
    borderColor: "#CECECE",
    borderWidth: 1,
    borderRadius: 90,
    padding: 6,
  },
  viewTags: {
    paddingLeft: 4,
    marginTop: 5,
    marginBottom: 5,
  },
  viewSearch: {
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  divFilter: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageSize: {
    width: 18,
    height: 18,
    marginRight: 7,
  },
  viewSearchText: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
  },

  scrollViewStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 15,

    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
