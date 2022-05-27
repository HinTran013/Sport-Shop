import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        Alert.alert("Link reset password đã được gửi vào email!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Image source={require("../assets/arrow-left.png")} />
      </TouchableOpacity>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={{ fontSize: 16 }}>
        Please, enter your email address. You will receive a link to create a
        new password via email.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text
          style={{
            alignSelf: "center",
            color: "white",
            fontSize: 14,
          }}
        >
          SEND
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
    marginTop: 50,
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
