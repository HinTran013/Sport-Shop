import React, { useState } from "react";
import { View, Modal, StyleSheet, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { BottomSheet } from "react-native-elements";

const screenWidth = Dimensions.get("window").width;

const GridBottomModal = ({
  visible,
  header,
  gridContent = [],
  closeModalFunc,
  setDataFunc,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(visible);
  const [chosenSize, setChosenSize] = useState(-1);

  function handleChosenSize(index) {
    setChosenSize(index);
  }

  return (
    <Modal
      animationType="slide"
      visible={visible}
      style={styles.container}
      transparent={true}
    >
      <View style={styles.contentContainer}>
        <View style={styles.modalView}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{header}</Text>
          </View>

          <View style={styles.sizeContainer}>
            {gridContent.map((item, index) => {
              return (
                <Button
                  key={index}
                  title={item}
                  buttonStyle={{
                    width: (screenWidth - 40 - 40) / 3,
                    backgroundColor: chosenSize === index ? "#DB3022" : "white",
                    borderColor: "#9b9b9b",
                    borderWidth: StyleSheet.hairlineWidth,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 8,
                  }}
                  containerStyle={{
                    marginTop: 20,
                  }}
                  titleStyle={{
                    color: chosenSize === index ? "white" : "black",
                    textTransform: "uppercase",
                  }}
                  onPress={() => {
                    handleChosenSize(index);
                    setDataFunc(item);
                  }}
                />
              );
            })}
          </View>

          {/* Close Modal Button */}
          <Button
            title={"Close"}
            buttonStyle={{
              marginTop: 20,
              backgroundColor: "#DB3022",
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 8,
            }}
            onPress={() => closeModalFunc()}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalView: {
    backgroundColor: "#f9f9f9",
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    elevation: 10,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default GridBottomModal;
