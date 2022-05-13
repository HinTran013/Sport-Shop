import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import React from "react";

export default function AddressScreen({ navigation }) {
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
      <ScrollView style={{ marginTop: 50, flex: 1 }}>
        <Address
          name="Le Khai Hoan"
          addressOne="123 Pham Van Dong"
          addressTwo="Phuong Linh Trung, Tp. Thu Duc"
          navigation={navigation}
        />
        <Address
          name="Trần Thanh Hiền"
          addressOne="Nhà tình thương"
          addressTwo="Quan 3, Tp. Ho Chi Minh"
          navigation={navigation}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => navigation.navigate("AddAddress")}
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
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddAddress")}
        >
          <Text style={{ color: "#DB3022" }}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text>{props.addressOne}</Text>
      <Text>{props.addressTwo}</Text>
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
