import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function AddingAddressScreen({ navigation }) {
  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
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
      <View style={{ marginTop: 50, flex: 1 }}>
        <Text>Full Name:</Text>
        <TextInput style={styles.input} />
        <Text>Phone:</Text>
        <TextInput style={styles.input} keyboardType="number-pad" />
        <Text>Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Home number, street name"
        />
        <DropDownPicker
          style={[styles.picker, { zIndex: 2 }]}
          open={openProvince}
          value={value}
          items={items}
          setOpen={setOpenProvince}
          setValue={setValue}
          setItems={setItems}
        />
        <DropDownPicker
          style={styles.picker}
          open={openDistrict}
          value={value}
          items={items}
          setOpen={setOpenDistrict}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.pop()}>
        <Text
          style={{
            alignSelf: "center",
            color: "white",
            fontSize: 14,
          }}
        >
          SAVE
        </Text>
      </TouchableOpacity>
    </View>
  );
}

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
  picker: {
    marginTop: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#DB3022",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 5,
  },
});
