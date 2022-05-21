import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import md5 from 'md5';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSignUp = () => {
    if (password.length >= 8) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const db = getDatabase();
          set(ref(db, "users/" + user.uid), {
            name: name,
            email: email,
            password: md5(password),
          });
          Alert.alert("Bạn đã đăng ký thành công!");
          navigation.navigate("Login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorMessage);
        });
    } else {
      Alert.alert("Mật khẩu phải lớn hơn 8 ký tự!");
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Image source={require("../assets/arrow-left.png")} />
          </TouchableOpacity>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "flex-end",
                marginTop: 15,
              }}
            >
              <Text style={styles.forgot}>Already have an account?</Text>
              <Image source={require("../assets/arrow-right.png")} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontSize: 14,
              }}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: "space-between",
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
});
