import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  const person1 = {
    image:
      "https://github.com/khaihoan2306/My-Wallet/blob/main/app/src/main/res/drawable/hien_bede.jpg?raw=true",
    name: "Trần Thanh Hiền",
    email: "noemail@gmail.com",
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <PersonalInformation
        name={person1.name}
        image={person1.image}
        email={person1.email}
      />
      <Item title="My orders" content="Already have 12 orders" />
      <Item title="Shipping addresses" content="3 addresses" />
      <Item title="Payment methods" content="Visa **54" />
      <Item title="Promocodes" content="You have special promocodes" />
      <Item title="My reviews" content="Review for 4 items" />
      <Item title="Settings" content="Notifications, password" />
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
});

const PersonalInformation = (props) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 10 }}>
      <Image
        source={{ uri: props.image }}
        style={{ width: 64, height: 64, borderRadius: 50 }}
      />
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
