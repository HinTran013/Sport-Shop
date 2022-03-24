import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

// This is a normal View of buttons 
const BottomButtonsModal = ({ closeModalFunc }) => {

    return (
        <View style={styles.container}>
            <View>
                <Button
                    title="Discard"
                    type="outline"
                    titleStyle={discardStyles.title}
                    buttonStyle={discardStyles.button}
                    containerStyle={discardStyles.container}

                    onPress={closeModalFunc} />
            </View>
            <View>
                <Button
                    title="Apply"
                    type="solid"
                    titleStyle={applyStyles.title}
                    buttonStyle={applyStyles.button}
                    containerStyle={applyStyles.container} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",

        backgroundColor: "white",
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
        width: "100%",

        paddingVertical: 10,
        //shadow - working on IOS
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        //shadow - working on android
        elevation: 10,
    },
})

const applyStyles = StyleSheet.create({
    title: {
        color: "white"
    },
    button: {
        backgroundColor: "#DB3022",
        borderRadius: 25,
    },
    container: {
        width: 180,
        borderRadius: 25,

        //shadow - working on IOS
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        //shadow - working on android
        elevation: 4,
    }
})

const discardStyles = StyleSheet.create({
    title: {
        color: "black"
    },
    button: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 25,
    },
    container: {
        width: 180,
        borderRadius: 25,
    }
})

export default BottomButtonsModal