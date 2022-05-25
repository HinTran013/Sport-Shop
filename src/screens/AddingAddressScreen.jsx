import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector, useDispatch } from "react-redux";
import provinceSlice from "../redux/provinceSlice";

export default function AddingAddressScreen({ navigation }) {
  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  const [valueProvince, setValueProvince] = useState(null);
  const [itemsProvince, setItemsProvince] = useState([]);
  const [valueDistrict, setValueDistrict] = useState(null);
  const [itemsDistrict, setItemsDistrict] = useState([]);
  const [valueWard, setValueWard] = useState(null);
  const [itemsWard, setItemsWard] = useState([]);

  //Set location
  const dispatch = useDispatch();
  const provinceList = useSelector((state) => state.province.provinceList);

  const districtList = useSelector((state) => state.province.districtList);

  useEffect(() => {
    for (let i = 0; i < provinceList.length; i++) {
      setItemsProvince((itemsProvince) => [
        ...itemsProvince,
        { label: provinceList[i], value: provinceList[i] },
      ]);
    }
  }, []);
  const handleSave = () => {
    console.log(valueProvince);
  };
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
          New Address
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
          placeholder="Select your province"
          placeholderStyle={{ color: "#bababa" }}
          value={valueProvince}
          items={itemsProvince}
          setOpen={setOpenProvince}
          setValue={setValueProvince}
          setItems={setItemsProvince}
        />
        <DropDownPicker
          style={styles.picker}
          open={openDistrict}
          placeholder="Select your district"
          placeholderStyle={{ color: "#bababa" }}
          value={valueDistrict}
          items={itemsDistrict}
          setOpen={setOpenDistrict}
          setValue={setValueDistrict}
          setItems={setItemsDistrict}
        />
        <DropDownPicker
          style={styles.picker}
          open={openWard}
          placeholder="Select your ward"
          placeholderStyle={{ color: "#bababa" }}
          value={valueWard}
          items={itemsWard}
          setOpen={setOpenWard}
          setValue={setValueWard}
          setItems={setItemsWard}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleSave()}>
        <Text
          style={{
            alignSelf: "center",
            color: "white",
            fontSize: 14,
          }}
        >
          Save
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
    borderColor: "#bababa",
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
