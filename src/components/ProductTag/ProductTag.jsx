import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const ProductTag = (props) => {
    return (
        <TouchableOpacity
            style={styles.divBackground}
            onPress={props.onPress}>
            <View>
                <Text style={{color: "white"}}>{ props.name }</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    divBackground: {
        backgroundColor: "black",
        borderRadius: 25,
        paddingVertical: 7,
        paddingHorizontal: 20,
        marginRight: 5
    },
});

export default ProductTag;