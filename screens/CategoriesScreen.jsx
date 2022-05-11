import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { SearchBar } from "react-native-elements";

const CategoriesScreen = () => {
    const dummyData = ["Tracksuits", "T-shirts", "Polo shirts", "Sneakers", "Football boots", "Ice skates", "Helmets"]

    const [search, setSearch] = useState("")
    const updateSearch = (text) => {
        setSearch(text)
    }

    return (
        <View style={styles.viewScreen}>
            <View>
                <SearchBar
                    value={search}
                    onChangeText={updateSearch}
                    placeholder="Search"
                    round={true}
                    showCancel={true}
                    lightTheme
                    containerStyle={searchStyle.container}
                    inputContainerStyle={searchStyle.inputContainer} />
            </View>

            <View>
                <View style={styles.viewChooseCategory}>
                    <Text style={styles.textChooseCategory}>Some popular categories</Text>
                </View>

                <View style={styles.viewContainCategory}>
                    <ScrollView>
                        {dummyData.map((x) =>
                            <TouchableOpacity style={styles.viewCategory} key={x}>
                                <View>
                                    <Text style={styles.textCategory}>{x}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
            </View>


            <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.textButton}>VIEW ALL PRODUCTS</Text>
            </TouchableOpacity>
        </View>
    );
}

const searchStyle = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
    },
    inputContainer: {
        backgroundColor: "white",
        borderRadius: 90,
    },
    input: {
    }
})

const styles = StyleSheet.create({
    viewScreen: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0f0f0",
        paddingBottom: 50,
    },
    viewButton: {
        marginTop: 15,
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
})

export default CategoriesScreen;
