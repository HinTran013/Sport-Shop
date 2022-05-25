import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import md5 from "md5";

export default function SettingScreen({ navigation }) {
  //Set initial variables
  const currentUser = useSelector((state) => state.user);
  const [name, setName] = useState(currentUser.name);
  const [dob, setDOB] = useState(currentUser.dob);
  const [modalVisible, setModalVisible] = useState(false);

  //Set status radio buttons
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setModalVisible(false)}
          ></TouchableOpacity>
          <ResetPassword
            navigation={navigation}
            setModalVisible={setModalVisible}
          />
        </View>
      </Modal>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Image source={require("../assets/arrow-left.png")} />
      </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.title2}>Personal Information</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={name} />
      <TextInput style={styles.input} placeholder="Day of Birth" />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.title2, { flex: 1 }]}>Password</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ color: "#9b9b9b" }}>Change</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
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
      <TouchableOpacity style={styles.button}>
        <Text
          style={{
            color: "white",
            alignSelf: "flex-start",
            fontSize: 18,
            marginHorizontal: 10,
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const ResetPassword = ({ navigation, setModalVisible }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //Password change
  const isFormValid = () => {
    if (oldPassword == "" || newPassword == "" || confirmPassword == "") {
      Alert.alert("Vui lòng điền đầy đủ thông tin!");
      return false;
    }
    return true;
  };
  const pass = currentUser.password;
  const isCorrectPassword = () => {
    if (pass != md5(oldPassword)) {
      Alert.alert("Mật khẩu cũ chưa chính xác!");
      return false;
    }
    return true;
  };
  const isConfirmedPassword = () => {
    if (newPassword != confirmPassword) {
      Alert.alert("Mật khẩu mới chưa chính xác!");
      return false;
    }
    return true;
  };
  const changePassword = () => {
    if (isFormValid()) {
      if (isCorrectPassword()) {
        if (isConfirmedPassword()) {
          const auth = getAuth();
          const user = auth.currentUser;

          updatePassword(user, newPassword)
            .then(() => {
              const db = getDatabase();
              set(ref(db, "users/" + user.uid + "/password"), md5(newPassword));
              Alert.alert("Bạn đã đổi mật khẩu thành công!");
              setModalVisible(false);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };
  return (
    <View style={styles.resetContainer}>
      <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 16 }}>
        Password Change
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Old password"
        secureTextEntry={true}
        onChangeText={(text) => setOldPassword(text)}
      />
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={() => {
          navigation.navigate("Forgot");
          setModalVisible(false);
        }}
      >
        <Text style={{ color: "#9B9B9B" }}>Forgot Password?</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="New password"
        secureTextEntry={true}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={() => changePassword()}>
        <Text
          style={{
            color: "white",
            alignSelf: "flex-start",
            fontSize: 18,
            marginHorizontal: 10,
          }}
        >
          Save Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#DB3022",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    alignSelf: "center",
  },
  resetContainer: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
});
