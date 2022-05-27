import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AddressScreen({ navigation }) {
  const list = useSelector((state) => state.address.listAddresses);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image source={require("../assets/arrow-left.png")} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Shipping Addresses
        </Text>
      </View>
      {list.length != 0 ? (
        <ScrollView style={{ marginTop: 50, flex: 1 }}>
          {list.map((element) => {
            return (
              <Address
                name={element.name}
                addressOne={element.address}
                addressTwo={`${element.ward}, ${element.district}`}
                addressThree={element.province}
                navigation={navigation}
              />
            );
          })}
          
        </ScrollView>
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text>You don't have any addresses. Please add new one!</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => navigation.replace("AddAddress")}
      >
        <Text style={{ fontSize: 32, color: "white" }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const Address = (props) => {
  return (
    <View style={styles.addressContainer}>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={{ flex: 1, fontWeight: "bold" }}>{props.name}</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("AddAddress")}>
          <Text style={{ color: "#DB3022" }}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text>{props.addressOne}</Text>
      <Text>{props.addressTwo}</Text>
      <Text>{props.addressThree}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox />
        <Text>Use as default shipping address</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: -14,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  addressContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
    margin: 5,
  },
  buttonAdd: {
    alignSelf: "flex-end",
    backgroundColor: "#DB3022",
    paddingHorizontal: 12,
    borderRadius: 50,
  },
});
