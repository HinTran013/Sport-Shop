import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const ProductTag = ({selected = false, name, onPress}) => {

    return (
        <TouchableOpacity
            style={styles(selected).divBackground}
            onPress={onPress}>
            <View>
                <Text style={styles(selected).title}>{ name }</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = (selected) => StyleSheet.create({
    divBackground: {
        backgroundColor: selected ? "white" : "black",
        borderWidth: 1,
        borderColor: selected ? "#919191" : "white",
        borderRadius: 90,
        paddingVertical: 7,
        paddingHorizontal: 20,
        marginRight: 5
    },
    title: {
        color: selected ? "black" : "white",
        fontWeight: selected ?  "bold" : "normal",
    }
});

export default ProductTag;