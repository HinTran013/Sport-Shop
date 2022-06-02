import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { IconButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import { setKeywordFilter, setTagFilter } from "../redux/filterSlice";
import ArrowBackImg from "../assets/arrow.png";

export const tags = [
  "Sneaker",
  "Jordan",
  "Soccer ball",
  "T-shirts",
  "Polo shirts",
  "Football boots",
  "Ice skates",
  "Helmets",
];

const CategoriesScreen = ({ visible, navigation }) => {
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [search, setSearch] = useState(filters.keyword);
  const updateSearch = (text) => {
    setSearch(text);
  };

  useEffect(() => {
    dispatch(setKeywordFilter(search));
  }, [search]);

  const handleSearch = () => {
    if (search != "") {
      navigation.navigate("Shop Stack", { ...filters });
    } else return;
  };

  const handleTagSelect = (text) => {
    dispatch(setTagFilter(text))
  }

  const goBackFunc = () => {
    navigation.goBack()
  }

  // const handleViewAllBtn = () => {
  //   navigation.navigate("Shop Stack", { ...filters });
  // };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      style={{ position: "relative" }}
    >
      <View style={styles.headerView}>
        <IconButton icon={ArrowBackImg} onPress={goBackFunc} />
        <Text style={styles.headerText}>Filters</Text>
      </View>
      <View style={styles.viewScreen}>
        <View>
          <SearchBar
            blurOnSubmit={true}
            onSubmitEditing={handleSearch}
            value={search}
            onChangeText={updateSearch}
            placeholder="Search"
            round={true}
            showCancel={true}
            lightTheme
            containerStyle={searchStyle.container}
            inputContainerStyle={searchStyle.inputContainer}
          />
        </View>

        <View>
          <View style={styles.viewChooseCategory}>
            <Text style={styles.textChooseCategory}>Some popular tags</Text>
          </View>

          <View style={styles.viewContainCategory}>
            <ScrollView>
              {tags.map((x) => (
                <TouchableOpacity
                  style={styles.viewCategory}
                  key={x}
                  onPress={() => {
                    handleTagSelect(x)
                    navigation.navigate("Shop Stack")
                  }}>
                  <View>
                    <Text style={styles.textCategory}>{x}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => {
            handleTagSelect("All")
            dispatch(setKeywordFilter(""))
            navigation.navigate("Shop Stack")
          }}
        >
          <Text style={styles.textButton}>VIEW ALL PRODUCTS</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const searchStyle = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 90,
  },
  input: {},
});

const styles = StyleSheet.create({
  viewScreen: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f0f0f0",
    paddingBottom: 50,
  },
  headerView: {
    height: 55,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    paddingLeft: 10,

    //shadow - working on IOS
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    //shadow - working on android
    elevation: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,

    marginLeft: 25,
  },
  viewButton: {
    marginTop: 20,
    backgroundColor: "#DB3022",
    paddingVertical: 12,
    paddingHorizontal: 125,
    borderRadius: 45,
    alignSelf: "center",
    //shadow - working on IOS
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    //shadow - working on android
    elevation: 5,
  },
  textButton: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  viewChooseCategory: {
    marginTop: 20,
    marginLeft: 15,
  },
  textChooseCategory: {
    fontSize: 13,
    color: "#9B9B9B",
  },

  viewContainCategory: {
    marginTop: 0,
  },
  viewCategory: {
    marginTop: 15,
    paddingBottom: 15,
    borderBottomColor: "#9B9B9B",
    borderBottomWidth: 0.6,
  },
  textCategory: {
    fontSize: 15,
    fontWeight: "400",
    paddingLeft: 25,
  },
});

export default CategoriesScreen;
