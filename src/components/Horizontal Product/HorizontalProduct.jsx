import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";
import { IconButton } from "react-native-paper";
import ProductBadge from "../Product Badge/ProductBadge";

const HorizontalProduct = ({ img, badgeType = "", badgeContent = "", isSale = false }) => {
    const [starRate, setStarRate] = useState(4.5);
    const [favIcon, setFavIcon] = useState({
        isFavorite: false,
        name: "heart-outline",
        color: "#9B9B9B",
    })

    const handleOnPressFavIcon = () => {
        return favIcon.isFavorite ?
            setFavIcon({
                isFavorite: false,
                name: "heart-outline",
                color: "#9B9B9B",
            }) :
            setFavIcon({
                isFavorite: true,
                name: "heart",
                color: "#DB3022",
            })
    }

    return (
        <>
            <View style={styles.containerTouch}>
                <TouchableOpacity style={styles.viewProduct}>
                    <View style={styles.viewImg}>
                        <Image style={styles.styleImg} source={img} resizeMode="stretch" />
                    </View>

                    <View style={styles.viewInfomation}>
                        <Text style={textStyles(22, "bold", "#222").textStyle}>Pullover</Text>
                        <Text style={textStyles(14, "300", "#9B9B9B").textStyle}>Mango</Text>
                        <View style={styles.viewStar}>
                            <StarRating
                                containerStyle={{
                                    justifyContent: "flex-start",
                                    marginVertical: 5,
                                }}
                                buttonStyle={{ marginRight: 5 }}
                                disabled={true}
                                maxStars={5}
                                rating={starRate}
                                starSize={15}
                                fullStarColor="#FFBA49"
                                halfStarColor="#FFBA49"
                                emptyStarColor="#FFBA49" />
                            <Text style={styles.textStarRate}>({starRate})</Text>
                        </View>
                        <Text style={textStyles(16, "600").textStyle}>51$</Text>
                        <IconButton
                            icon={favIcon.name}
                            color={favIcon.color}
                            style={styles.favIcon}
                            onPress={handleOnPressFavIcon} />
                        <View style={styles.viewBadge}>
                            <ProductBadge
                                type={badgeType}
                                content={badgeContent} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}

const textStyles = (fontsize = 10, fontweight = "bold", fontcolor = "black") => StyleSheet.create({
    textStyle: {
        fontSize: fontsize,
        fontWeight: fontweight,
        color: fontcolor,
    }
})

const styles = StyleSheet.create({
    containerTouch: {
        marginHorizontal: 15,
        marginBottom: 25,
    },
    viewProduct: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        //hide the oversize of borderRadius
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        //shadow - working on IOS
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        //shadow - working on android
        elevation: 3,
    },

    viewImg: {
        flex: 1,
        height: 110,
    },
    styleImg: {
        height: "100%",
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        left: -2,
    },

    viewInfomation: {
        flex: 3,
        marginLeft: 20,
    },
    viewStar: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
        marginLeft: 2,
    },
    textStarRate: {
        color: "#9B9B9B",
        fontSize: 14,
    },
    viewBadge: {
        position: "absolute",
        top: 5,
        right: 10,
    },
    favIcon: {
        position: "absolute",
        right: -15,
        bottom: -15,
        backgroundColor: "white",
    },
})

export default HorizontalProduct;