import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BottomSheet } from "react-native-elements";

const sortItems = [
    {
        id: 0,
        title: "Popular",
       
    },
    {
        id: 1,
        title: "Newest",
       
    },
    {
        id: 2,
        title: "Customer review",
        
    },
    {
        id: 3,
        title: "Price: lowest to high",
        
    },
    {
        id: 4,
        title: "Price: highest to low",
       
    },
]

// const SortItem = ({ title, selected, pressed }) => {
    
//     const [isSelected, setIsSelected] = useState(selected)

//     return (
//         <TouchableOpacity
//             style={itemStyle(isSelected).item}
//             onPress={pressed}>   
//             <Text style={titleStyle(isSelected).title}>{title}</Text>
//         </TouchableOpacity>
//     )
// }

const BottomSortModal = ({ visible, toggleModal }) => {


    const [selected, setSelected] = useState(0);
    const handleSelected = (index) => {
        setSelected(index)
        toggleModal()
    }
    
    const titleStyle = (index) => StyleSheet.create({
        title: {
            color: selected === index ? "white" : "black",
            fontSize: 15,
            fontWeight: "600",
        }
    })
    const itemStyle = (index) => StyleSheet.create({
        item: {
            backgroundColor: selected === index ? "#DB3022" : "transparent",
            justifyContent: "center",
            height: 50,
            paddingLeft: 30,
    
            borderBottomColor: "#f6f6f6",
            borderBottomWidth: 1,
        }
    })

    return (
        <BottomSheet
            isVisible={visible}
            modalProps={{
                onRequestClose: toggleModal
            }}>

            <View style={styles.containerView}>
                <View style={styles.textContainer}>
                    <Text style={styles.text }>Sort by</Text>
                </View>

                <View>
                    <View style={styles.sortContainer}>
                        {sortItems.map((item) =>
                            <TouchableOpacity
                                key={item.id}
                                style={itemStyle(item.id).item}
                                onPress={() => handleSelected(item.id)}>   
                                <Text style={titleStyle(item.id).title}>{item.title}</Text>
                            </TouchableOpacity>)}
                    </View>
                    
                </View>
            </View>

        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    containerView: {
        backgroundColor: "white",

        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    textContainer: {
        paddingTop: 15,
        paddingBottom: 5,
        alignItems: "center",
        marginBottom: 2,
        borderBottomColor: "#f0f0f0",
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
    },
    sortContainer: {
        marginVertical: 5,
    }
})


export default BottomSortModal;