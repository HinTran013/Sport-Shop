import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const ProductContentItem = ({
  headerTitle = "",
  mainContent = "",
  containerStyle = {},
}) => {
  const [isShowContent, setIsShowContent] = useState(false);

  const handleShowContent = () => {
    setIsShowContent(!isShowContent);
  };

  return (
    <TouchableOpacity
      onPress={handleShowContent}
      style={[styles().container, containerStyle]}
    >
      <View style={styles().headerContainer}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{headerTitle}</Text>
        <Icon
          name={isShowContent ? "chevron-right" : "chevron-down"}
          type="font-awesome"
          size={12}
        />
      </View>

      {isShowContent && (
        <View style={styles().contentContainer}>
          <Text style={{ fontSize: 16 }}>{mainContent}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      borderTopWidth: 1,
      borderColor: "#e2e2e2",
      borderBottomWidth: 1,
    },
    headerContainer: {
      flexDirection: "row",
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 20,
      paddingBottom: 20,
    },
    contentContainer: {
      marginTop: -10,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
    },
  });

export default ProductContentItem;
