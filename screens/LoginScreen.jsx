import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { firebaseConfig } from "../src/firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Main");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Image source={require("../assets/arrow-left.png")} />
        </TouchableOpacity>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-end",
              marginTop: 15,
            }}
          >
            <Text style={styles.forgot}>Forgot your password?</Text>
            <Image source={require("../assets/arrow-right.png")} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontSize: 14,
            }}
          >
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ marginBottom: 30 }}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.social}>
          Don't have an account?{" "}
          <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 50,
  },
  container: {
    backgroundColor: "#f9f9f9",
    padding: 14,
    height: "100%",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  forgot: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 5,
  },
  button: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#DB3022",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  social: {
    fontSize: 14,
    textAlign: "center",
  },
});
