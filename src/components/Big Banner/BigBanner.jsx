import React from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import RoundedButton from "../Rounded Button/RoundedButton";

const BigBanner = ({ backgroundImage, text, buttonText }) => {
  return (
    <ImageBackground
      style={styles.background}
      source={backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.contentPosition}>
        <Text style={styles.text}>{text}</Text>
        <RoundedButton
          content={buttonText}
          width={160}
          height={40}
          fontSize={17}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  background: {
    width: "100%",
    height: 500,
  },
  contentPosition: {
    position: "absolute",
    left: 15,
    bottom: 35,
    width: "100%",
  },
  text: {
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
    fontSize: 48,
    width: "50%",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default BigBanner;
