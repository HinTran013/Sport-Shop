import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const RoundedButton = ({
  width = 50,
  height = 25,
  color = "#DB3022",
  content,
  fontSize = 14,
  elevation = 0,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles(width, height, color, elevation).container}
    >
      <Text style={textStyle(fontSize).content}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = (width, height, color, elevation) =>
  StyleSheet.create({
    container: {
      width: width,
      height: height,
      borderRadius: 999,
      backgroundColor: color,
      alignItems: "center",
      justifyContent: "center",
      elevation: elevation,
    },
  });

const textStyle = (fontSize) =>
  StyleSheet.create({
    content: {
      fontSize: fontSize,
      color: "white",
    },
  });

export default RoundedButton;
