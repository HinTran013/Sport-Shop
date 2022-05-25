import React, { useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { IconButton } from "react-native-paper";
import BottomButtonsModal from "../src/components/BottomModals/BottomButtonsModal"

import { useSelector, useDispatch } from "react-redux";

import ArrowBackImg from "../assets/arrow.png"
import {
    resetAllFilter,
    setAllFilter,
    setCategoryFilter,
    setColorFilter,
    setPriceFilter,
    setSizesFilter
} from "../src/redux/filterSlice";


const arrColors = ["white", "black", "red", "gray", "yellow", "blue"]
const arrSizes = ["All", "S", "XS", "M", "L", "XL", "XXL"];
const arrCategories = ["All", "women", "men", " boys", "girls"]


const ColorFilterItem = ({ backgroundColor, filter, setFilter }) => {
    let isColorSelected = backgroundColor === filter ? true : false;
    const handlerColorSelected = () => setFilter(setColorFilter(backgroundColor))

    return (
        <TouchableOpacity
            onPress={handlerColorSelected}>
            <View style={colorStyle(isColorSelected).selected}>
                <View style={[{ backgroundColor: backgroundColor }, colorStyle().colorFill]}></View>
            </View>
        </TouchableOpacity>
    )
}

const SizeFilterItem = ({ size, filter, setFilter }) => {
    let isSizeSelected = size === filter ? true : false
    const handlerSizeSelected = () => setFilter(setSizesFilter(size)) 

    return (
        <TouchableOpacity
            style={rectStyle(isSizeSelected).rect}
            onPress={handlerSizeSelected}>
            <Text style={{ color: isSizeSelected ? "white" : "black" }}>{size}</Text>
        </TouchableOpacity>
    )
}

const CategoryFilterItem = ({ category, filter, setFilter }) => {
    let isCategorySelected = category === filter ? true : false
    const handlerCategorySelected = () => setFilter(setCategoryFilter(category))

    return (
        <TouchableOpacity
            style={rectStyle(isCategorySelected).rect}
            onPress={handlerCategorySelected}>
            <Text style={{ color: isCategorySelected ? "white" : "black", textTransform: "capitalize" }}>{category}</Text>
        </TouchableOpacity>
    )
}


// This is actually a filter modal
const FiltersScreen = ({ visible, navigation }) => {
    const filters = useSelector((state) => state.filter)
    const dispatch = useDispatch()

    //const [isModalVisible, setIsModalVisible] = useState(visible)
    //const toggleFilterModal = () => setIsModalVisible(!isModalVisible)

    const goBackFunc = () => {
        dispatch(resetAllFilter())
        navigation.goBack();
    }

    const applyFilterFunc = () => {
        navigation.navigate("Shop Stack", { ...filters })
        //navigation.goBack()
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            style={{ position: "relative" }}>
            
            <View style={styles.headerView}>
                {/* <Image
                    source={ArrowBackImg}
                    style={{ width: 21, height: 21 }}
                    /> */}
                <IconButton
                    icon={ArrowBackImg}
                    onPress={goBackFunc} />
                <Text style={styles.headerText}>Filters</Text>
            </View>

            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.categoryView}>
                        <Text style={styles.categoryText}>Price range</Text>
                        <View style={styles.whiteBox}>
                            <View style={styles.labelView}>
                                <Text>${filters.price[0]}</Text>
                                <Text>${filters.price[1]}</Text>
                            </View>
                            <MultiSlider
                                values={filters.price}
                                onValuesChangeFinish={(values) => dispatch(setPriceFilter(values))}
                                min={0}
                                max={500}
                                sliderLength={350}
                                containerStyle={sliderStyle.container}
                                trackStyle={sliderStyle.track}
                                markerStyle={sliderStyle.marker}
                                selectedStyle={sliderStyle.selected}
                                allowOverlap={false}
                            />
                        </View>
                    </View>

                    <View style={styles.categoryView}>
                        <Text style={styles.categoryText}>Colors</Text>
                        <View
                            style={[styles.whiteBox, styles.whiteBoxFlexStart]}>
                            {arrColors.map((item, index) =>
                                <ColorFilterItem
                                    filter={filters.color}
                                    setFilter={dispatch}
                                    backgroundColor={item}
                                    key={index}
                                />)
                            }
                        </View>
                    </View>

                    <View style={styles.categoryView}>
                        <Text style={styles.categoryText}>Sizes</Text>
                        <View style={[styles.whiteBox, styles.whiteBoxFlexStart]}>
                            {arrSizes.map((item, index) =>
                                <SizeFilterItem
                                    filter={filters.sizes}
                                    setFilter={dispatch}
                                    size={item}
                                    key={index}
                                />)}
                        </View>
                    </View>

                    <View style={styles.categoryView}>
                        <Text style={styles.categoryText}>Category</Text>
                        <View style={[styles.whiteBox, styles.whiteBoxFlexStart]}>
                            {arrCategories.map((item, index) =>
                                <CategoryFilterItem
                                    filter={filters.category}
                                    setFilter={dispatch}
                                    category={item}
                                    key={index}
                                />)}
                        </View>
                    </View>
                </View>

            </ScrollView>

            <BottomButtonsModal
                closeModalFunc={goBackFunc}
                applyFilter={applyFilterFunc}
            />
        </Modal>
    )
}

const rectStyle = (isSelected) => StyleSheet.create({
    rect: {
        borderColor: isSelected ? "#DB3022" : "#9B9B9B",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,

        backgroundColor: isSelected ? "#DB3022" : "transparent",
        marginRight: 10,
        marginBottom: 10,
    },
})

const colorStyle = (isSelected) => StyleSheet.create({
    colorFill: {
        width: 36,
        height: 36,
        borderRadius: 90,
    },
    selected: {
        justifyContent: "center",
        alignItems: "center",
        width: 43,
        height: 43,
        backgroundColor: "transparent",
        borderRadius: 90,
        borderColor: isSelected ? "#DB3022" : "white",
        borderWidth: 1,

        marginRight: 10,
    },
})

const sliderStyle = StyleSheet.create({
    container: {
        height: 20,
    },
    track: {
        height: 4,
        backgroundColor: "#9B9B9B",
    },
    marker: {
        top: 2,
        backgroundColor: "#DB3022"
    },
    selected: {
        backgroundColor: "#DB3022"
    }
})

const styles = StyleSheet.create({
    container: {
        paddingBottom: 70,
        backgroundColor: "#f9f9f9",
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
    categoryView: {
        marginBottom: 10,
    },
    categoryText: {
        fontSize: 15,
        fontWeight: "700",
        letterSpacing: 0.4,
        marginVertical: 12,
        marginLeft: 15,
    },
    whiteBox: {
        backgroundColor: "#f9f9f9",
        paddingTop: 15,
        paddingBottom: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        //shadow - working on IOS
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        //shadow - working on android
        elevation: 3,
    },
    labelView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: 360,

        marginBottom: 7,
    },

    whiteBoxFlexStart: {
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        paddingHorizontal: 15,
    }
})

export default FiltersScreen;