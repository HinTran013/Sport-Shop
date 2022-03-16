import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const ProductTag = (props) => {
    return (
        <View style={styles.divBackground}>
            <TouchableOpacity>
                <Text style={{color: "white"}}>{ props.name }</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    divBackground: {
        backgroundColor: "black",
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 20,
        marginRight: 10
    },
});

export default ProductTag;