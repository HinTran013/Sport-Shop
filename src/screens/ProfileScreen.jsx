import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { firebaseConfig } from "../firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { resetAddress } from "../redux/addressSlice";
import { resetCartList } from "../redux/cartSlice";
import { resetOrderList } from "../redux/orderSlice";
import { resetReviewList } from "../redux/reviewSlice";
import { resetUser } from "../redux/userSlice";

export default function ProfileScreen({ navigation }) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const person = useSelector((state) => state.user);
  const listAddress = useSelector((state) => state.address.listAddresses);
  const listReview = useSelector((state) => state.review.list);
  const listOrder = useSelector((state) => state.order.list);
  const dispatch = useDispatch();

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        dispatch(resetAddress());
        dispatch(resetCartList());
        dispatch(resetOrderList());
        dispatch(resetReviewList());
        dispatch(resetUser());
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return auth.currentUser ? (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <PersonalInformation
        name={person.name}
        image={person.image}
        email={person.email}
      />
      <Item
        title="My orders"
        content={`Already have ${listOrder.length} orders`}
        screen="Order"
        navigation={navigation}
      />
      <Item
        title="Shipping addresses"
        content={`${listAddress.length} addresses`}
        screen="Address"
        navigation={navigation}
      />
      <Item
        title="My reviews"
        content={`Review for ${listReview.length} items`}
        screen="MyReviews"
        navigation={navigation}
      />
      <Item
        title="Settings"
        content="Notifications, password"
        screen="Setting"
        navigation={navigation}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text
          style={{
            color: "white",
            alignSelf: "flex-start",
            fontSize: 18,
            marginHorizontal: 10,
          }}
        >
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container2}>
      <Image
        source={require("../assets/login-warning.jpg")}
        style={{ width: 300, height: 300 }}
      />
      <Text style={{ fontSize: 20 }}>You haven't signed in!</Text>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.replace("Login")}
      >
        <Text
          style={{
            color: "white",
            alignSelf: "flex-start",
            fontSize: 18,
            marginHorizontal: 10,
          }}
        >
          Sign In
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
  container2: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
  },
  button2: {
    marginTop: 10,
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
    <TouchableOpacity onPress={() => props.navigation.navigate(props.screen)}>
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
