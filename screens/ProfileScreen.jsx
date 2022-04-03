import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { firebaseConfig } from "../src/firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

export default function ProfileScreen({ navigation }) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [person, setPerson] = useState({});

  const dbRef = ref(getDatabase());
  if (auth.currentUser != null) {
    get(child(dbRef, `users/${auth.currentUser.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPerson(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <PersonalInformation
        name={person.name}
        image={person.image}
        email={person.email}
      />
      <Item title="My orders" content="Already have 12 orders" />
      <Item title="Shipping addresses" content="3 addresses" />
      <Item title="Payment methods" content="Visa **54" />
      <Item title="Promocodes" content="You have special promocodes" />
      <Item title="My reviews" content="Review for 4 items" />
      <Item title="Settings" content="Notifications, password" />
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={{ color: "white", alignSelf: "flex-start" }}>
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    height: "100%",
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontWeight: "bold",
    fontSize: 34,
    marginTop: 20,
  },
  button: {
    marginTop: "auto",
    marginBottom: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#DB3022",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    alignSelf: "center",
  },
});

const PersonalInformation = (props) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 10 }}>
      <TouchableOpacity>
        <Image
          source={
            props.image
              ? { uri: props.image }
              : require("../assets/avatar-empty.jpg")
          }
          style={{ width: 64, height: 64, borderRadius: 50 }}
        />
      </TouchableOpacity>
      <View style={{ justifyContent: "center", marginLeft: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{props.name}</Text>
        <Text style={{ fontSize: 14, color: "#9B9B9B", marginTop: 3 }}>
          {props.email}
        </Text>
      </View>
    </View>
  );
};
const Item = (props) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {props.title}
          </Text>
          <Text style={{ fontSize: 11, color: "#9B9B9B", marginTop: 5 }}>
            {props.content}
          </Text>
        </View>
        <Image
          source={require("../assets/arrow-right-2.png")}
          style={{ alignSelf: "center" }}
        />
      </View>
      <View
        style={{
          borderBottomColor: "#9B9B9B",
          borderBottomWidth: 1,
          opacity: 0.2,
          marginTop: 10,
        }}
      />
    </TouchableOpacity>
  );
};
