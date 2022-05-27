import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { setAddress } from "../redux/addressSlice";

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
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress1] = useState();

  //get current user
  const currentUser = getAuth().currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
    loadProvinceList();
    setValueDistrict("");
  }, []);
  useEffect(() => {
    loadDistrictList(valueProvince);
    setValueDistrict("");
    setValueWard("");
  }, [valueProvince]);
  useEffect(() => {
    loadWardList(valueProvince, valueDistrict);
    setValueWard("");
  }, [valueDistrict]);
  const handleSave = () => {
    if (isFormValid()) {
      const db = getDatabase();
      let index = 0;
      const starCountRef = ref(
        db,
        "users/" + currentUser.uid + "/addresses/index"
      );
      onValue(starCountRef, (snapshot) => {
        index = snapshot.val();
      });
      if (index == null) {
        set(ref(db, "users/" + currentUser.uid + "/addresses/index"), 1);
      } else {
        set(
          ref(db, "users/" + currentUser.uid + "/addresses/index"),
          index + 1
        );
      }
      const newAddress = {
        name: name,
        phone: phone,
        address: address,
        province: valueProvince,
        district: valueDistrict,
        ward: valueWard,
      };
      set(
        ref(db, "users/" + currentUser.uid + `/addresses/address${index}`),
        newAddress
      );
      dispatch(setAddress(newAddress));
      Alert.alert("You have added 1 address successfully!");
      navigation.replace("Address");
    }
  };
  const loadProvinceList = () => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((response) => response.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          setItemsProvince((itemsProvince) => [
            ...itemsProvince,
            { label: json[i].name, value: json[i].name },
          ]);
        }
      })
      .catch((error) => console.error(error));
  };
  const loadDistrictList = (provinceName) => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((response) => response.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          if (json[i].name == provinceName) {
            setItemsDistrict([]);
            setItemsWard([]);
            for (let j = 0; j < json[i].districts.length; j++) {
              setItemsDistrict((itemsDistrict) => [
                ...itemsDistrict,
                {
                  label: json[i].districts[j].name,
                  value: json[i].districts[j].name,
                },
              ]);
            }
          }
        }
      })
      .catch((error) => console.error(error));
  };
  const loadWardList = (provinceName, districtName) => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((response) => response.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          if (json[i].name == provinceName) {
            for (let j = 0; j < json[i].districts.length; j++) {
              if (json[i].districts[j].name == districtName) {
                setItemsWard([]);
                for (let k = 0; k < json[i].districts[j].wards.length; k++) {
                  setItemsWard((itemsWard) => [
                    ...itemsWard,
                    {
                      label: json[i].districts[j].wards[k].name,
                      value: json[i].districts[j].wards[k].name,
                    },
                  ]);
                }
              }
            }
          }
        }
      })
      .catch((error) => console.error(error));
  };
  const isFormValid = () => {
    if (
      name == "" ||
      phone == "" ||
      address == "" ||
      valueProvince == "" ||
      valueDistrict == "" ||
      valueWard == ""
    ) {
      Alert.alert("Please fill in all fields");
      return false;
    }
    return true;
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
        <TextInput
          style={styles.input}
          onChangeText={(text) => setName(text)}
        />
        <Text>Phone:</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(text) => setPhone(text)}
        />
        <Text>Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Home number, street name"
          onChangeText={(text) => setAddress1(text)}
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
