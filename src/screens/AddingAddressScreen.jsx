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
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, updateAddress } from "../redux/addressSlice";

export default function AddingAddressScreen({ navigation, route }) {
  const data = route.params;
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
    if (data != null) {
      loadDistrictList(valueProvince);
      loadWardList(valueProvince, valueDistrict);
      fillData();
    }
  }, []);
  useEffect(() => {
    loadDistrictList(valueProvince);
  }, [valueProvince]);
  useEffect(() => {
    loadWardList(valueProvince, valueDistrict);
  }, [valueDistrict]);

  const saveNew = () => {
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
      set(ref(db, "users/" + currentUser.uid + "/addresses/index"), index + 1);
    }
    const newAddress = {
      id: "address" + index,
      name: name,
      phone: phone,
      address: address,
      province: valueProvince,
      district: valueDistrict,
      ward: valueWard,
      default: false,
    };
    set(
      ref(db, "users/" + currentUser.uid + `/addresses/address${index}`),
      newAddress
    );
    dispatch(setAddress(newAddress));
    Alert.alert("You have added 1 address successfully!");
  };
  const update = () => {
    const db = getDatabase();
    const updateAdd = {
      id: data.id,
      name: name,
      phone: phone,
      address: address,
      province: valueProvince,
      district: valueDistrict,
      ward: valueWard,
      default: data.default,
    };
    set(
      ref(db, "users/" + currentUser.uid + `/addresses/${data.id}`),
      updateAdd
    );
    dispatch(updateAddress(updateAdd));
    Alert.alert("You have updated successfully!");
  };
  const handleSave = () => {
    if (isFormValid()) {
      if (data == null) {
        saveNew();
      } else {
        update();
      }
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
  const fillData = () => {
    setName(data.name);
    setPhone(data.phone);
    setAddress1(data.addressOne);
    setValueProvince(data.addressThree);
    const array = data.addressTwo.split(", ");
    setValueDistrict(array[1]);
    setValueWard(array[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.replace("Address")}>
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
          {data ? "Change Address" : "New Address"}
        </Text>
      </View>
      <View style={{ marginTop: 50, flex: 1 }}>
        <Text>Full Name:</Text>
        <TextInput
          value={name}
          style={styles.input}
          onChangeText={(text) => setName(text)}
        />
        <Text>Phone:</Text>
        <TextInput
          value={phone}
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(text) => setPhone(text)}
        />
        <Text>Address:</Text>
        <TextInput
          value={address}
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
