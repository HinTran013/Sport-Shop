import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const SimpleScreenHeader = ({
  headerTitle = "",
  isShared = false,
  onBackPress,
  onSharePress,
  containerStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onBackPress}>
        <Icon type="font-awesome" name="chevron-left" />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{headerTitle}</Text>
      </View>
      {isShared ? (
        <TouchableOpacity onPress={onSharePress}>
          <Icon type="Entypo" name="share" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 10 }}></View> //placeholder
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 5,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "white",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SimpleScreenHeader;
