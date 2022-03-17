import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const CategoriesScreen = () => {
    const dummyData = ["Tops", "Shirts and Blouses", "Cardigan & Sweaters", "Knitwear", "Blazers", "Outerwear", "Pants", "Jeans"]

    return (
        <View style={styles.viewScreen}>
            <TouchableOpacity style={styles.viewButton}>
                <View>
                    <Text style={styles.textButton}>VIEW ALL PRODUCTS</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.viewChooseCategory}>
                <Text style={styles.textChooseCategory}>Choose category</Text>
            </View>

            <View>
                <ScrollView>
                    {dummyData.map((x) =>
                        <TouchableOpacity style={styles.viewCategory}>
                            <View>
                                <Text style={styles.textCategory}>{x}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewScreen: {
        backgroundColor: "#f0f0f0",
    },
    viewButton: {
        backgroundColor: "#DB3022",
        paddingVertical: 12,
        paddingHorizontal: 125,
        marginTop: 15,
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
        marginVertical: 10,
        marginLeft: 15,
    },
    textChooseCategory: {
        fontSize: 12,
        color: "#9B9B9B",
    },

    viewContainCategory: {
        marginTop: 10,
        marginHorizontal: 10,
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
