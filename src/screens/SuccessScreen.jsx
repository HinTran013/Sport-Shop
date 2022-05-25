import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/success.png")}
        resizeMode="cover"
        style={{ flex: 1, alignItems: "center" }}
      >
        <Text style={styles.title}>Success!</Text>
        <Text style={[styles.content, { marginTop: 10 }]}>
          Your order will be delivered soon.
        </Text>
        <Text style={styles.content}>Thank you for choosing our app!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("Main")}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontSize: 14,
            }}
          >
            SUBMIT ORDER
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    marginTop: 50,
  },
  content: {
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#DB3022",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 20,
  },
});
