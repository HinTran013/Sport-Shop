import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDefaultAddress,
  deleteAddressFromDatabase,
} from "../utils/loadAddresses";
import { setDefault, deleteAddress } from "../redux/addressSlice";
import { Icon } from "react-native-elements";

export default function AddressScreen({ navigation }) {
  const list = useSelector((state) => state.address.listAddresses);
  const dispatch = useDispatch();
  useEffect(() => {}, [list]);

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
                key={element.id}
                id={element.id}
                default={element.default}
                name={element.name}
                addressOne={element.address}
                addressTwo={`${element.ward}, ${element.district}`}
                addressThree={element.province}
                phone={element.phone}
                navigation={navigation}
                dispatch={dispatch}
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
  const handleCheck = () => {
    setDefaultAddress(props.id);
    props.dispatch(setDefault(props.id));
  };
  const handleDelete = () => {
    Alert.alert("Confirm", "Do you want to delete this address?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          deleteAddressFromDatabase(props.id);
          props.dispatch(deleteAddress(props.id));
        },
      },
    ]);
  };
  return (
    <View style={styles.addressContainer}>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={{ flex: 1, fontWeight: "bold" }}>{props.name}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.replace("AddAddress", props)}
        >
          <Text style={{ color: "#DB3022" }}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text>{props.addressOne}</Text>
      <Text>{props.addressTwo}</Text>
      <Text>{props.addressThree}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <CheckBox checked={props.default} onPress={() => handleCheck()} />
        <Text>Use as default shipping address</Text>
        <View style={styles.icon}>
          <Icon
            name="delete"
            type="material"
            color="#DB3022"
            onPress={() => handleDelete()}
          />
        </View>
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
  icon: {
    flex: 1,
    alignItems: "flex-end",
  },
});
