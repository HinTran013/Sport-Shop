import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDelivered } from "../redux/addressSlice";

export default function ChoosingAddressScreen({ navigation }) {
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
          Choose Address
        </Text>
      </View>
      {list.length != 0 ? (
        <ScrollView style={{ marginTop: 30, flex: 1 }}>
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
    </View>
  );
}

const Address = (props) => {
  const handleSet = () => {
    const data = {
      id: props.id,
      name: props.name,
      address: props.addressOne,
      phone: props.phone,
      ward: props.addressTwo.split(", ")[0],
      district: props.addressTwo.split(", ")[1],
      province: props.addressThree,
      default: props.default,
    };
    props.dispatch(setDelivered(data));
    props.navigation.pop();
  };
  return (
    <TouchableOpacity
      style={styles.addressContainer}
      onPress={() => handleSet()}
    >
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={{ flex: 1, fontWeight: "bold" }}>{props.name}</Text>
      </View>
      <Text>{props.addressOne}</Text>
      <Text>{props.addressTwo}</Text>
      <Text>{props.addressThree}</Text>
    </TouchableOpacity>
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
