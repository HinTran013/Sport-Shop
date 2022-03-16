import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState } from "react";

export default function SettingScreen() {
  const [isEnabledSales, setIsEnabledSales] = useState(false);
  const toggleSales = () =>
    setIsEnabledSales((previousState) => !previousState);

  const [isEnabledNew, setIsEnabledNew] = useState(false);
  const toggleNew = () => setIsEnabledNew((previousState) => !previousState);

  const [isEnabledStatus, setIsEnabledStatus] = useState(false);
  const toggleStatus = () =>
    setIsEnabledStatus((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={require("../assets/arrow-left.png")} />
      </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.title2}>Personal Information</Text>
      <TextInput style={styles.input} placeholder="Full Name" />
      <TextInput style={styles.input} placeholder="Day of Birth" />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.title2, { flex: 1 }]}>Password</Text>
        <TouchableOpacity>
          <Text style={{ color: "#9b9b9b" }}>Change</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Password"
          defaultValue="password"
          secureTextEntry={true}
          editable={false}
        />
      </TouchableOpacity>
      <Text style={styles.title2}>Notifications</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1 }}>Sales</Text>
        <Switch
          trackColor={{ false: "#e5e5e5", true: "#e5e5e5" }}
          thumbColor={isEnabledSales ? "#2AA952" : "#f0f0f0"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSales}
          value={isEnabledSales}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1 }}>New arrivals</Text>
        <Switch
          trackColor={{ false: "#e5e5e5", true: "#e5e5e5" }}
          thumbColor={isEnabledNew ? "#2AA952" : "#f0f0f0"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNew}
          value={isEnabledNew}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1 }}>Delivery status changes</Text>
        <Switch
          trackColor={{ false: "#e5e5e5", true: "#e5e5e5" }}
          thumbColor={isEnabledStatus ? "#2AA952" : "#f0f0f0"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleStatus}
          value={isEnabledStatus}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 20,
  },
  title2: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 20,
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
});
