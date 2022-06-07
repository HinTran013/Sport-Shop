import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function MyOrdersScreen({ navigation }) {
  const [status, setStatus] = useState("Delivery");
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Image source={require("../assets/arrow-left.png")} />
      </TouchableOpacity>
      <Text style={styles.title}>My Orders</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 10,
        }}
      >
        <CustomButton name="Delivery" setStatus={setStatus} status={status} />
        <CustomButton name="Processing" setStatus={setStatus} status={status} />
        <CustomButton name="Cancelled" setStatus={setStatus} status={status} />
      </View>
      {status == "Delivery" ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Order
            idNumber="123456"
            date="10-03-2022"
            trackingNumber="IW1231151615"
            quantity={3}
            price="123$"
            status="Delivered"
            color="green"
            navigation={navigation}
          />
          <Order
            idNumber="123456"
            date="10-03-2022"
            trackingNumber="IW1231151615"
            quantity={3}
            price="123$"
            status="Delivered"
            color="green"
            navigation={navigation}
          />
          <Order
            idNumber="123456"
            date="10-03-2022"
            trackingNumber="IW1231151615"
            quantity={3}
            price="123$"
            status="Delivered"
            color="green"
            navigation={navigation}
          />
        </ScrollView>
      ) : null}
      {status == "Processing" ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Order
            idNumber="123456"
            date="10-03-2022"
            trackingNumber="IW1231151615"
            quantity={3}
            price="123$"
            status="Processing"
            color="orange"
            navigation={navigation}
          />
          <Order
            idNumber="123456"
            date="10-03-2022"
            trackingNumber="IW1231151615"
            quantity={3}
            price="123$"
            status="Processing"
            color="orange"
            navigation={navigation}
          />
          <Order
            idNumber="123456"
            date="10-03-2022"
            trackingNumber="IW1231151615"
            quantity={3}
            price="123$"
            status="Processing"
            color="orange"
            navigation={navigation}
          />
        </ScrollView>
      ) : null}
      {status == "Cancelled" ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Order
            idNumber="123456"
            date="10-03-2022"
            trackingNumber="IW1231151615"
            quantity={3}
            price="123$"
            status="Cancelled"
            color="red"
            navigation={navigation}
          />
          <Order
            idNumber="123456"
            date="10-03-2022"
            trackingNumber="IW1231151615"
            quantity={3}
            price="123$"
            status="Cancelled"
            color="red"
            navigation={navigation}
          />
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: "#F9F9F9",
    height: "100%",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
});

const CustomButton = ({ name, setStatus, status }) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(name == status ? true : false);
  }, [status]);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: checked ? "black" : "white",
        paddingHorizontal: 25,
        paddingVertical: 6,
        borderRadius: 50,
      }}
      onPress={() => setStatus(name)}
    >
      <Text style={{ color: checked ? "white" : "black", fontSize: 14 }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const Order = (props) => {
  return (
    <View
      style={{
        margin: 5,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Order No. {props.idNumber}
        </Text>
        <Text style={{ color: "#9B9B9B" }}>{props.date}</Text>
      </View>
      <View
        style={{ flexDirection: "row", marginTop: 15, alignItems: "center" }}
      >
        <Text style={{ color: "#9B9B9B" }}>Tracking number: </Text>
        <Text>{props.trackingNumber}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#9B9B9B" }}>Quantity: </Text>
          <Text style={{ fontSize: 16 }}>{props.quantity}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#9B9B9B" }}>Total Amount: </Text>
          <Text style={{ fontSize: 16 }}>{props.price}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 30,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 50,
          }}
          onPress={() => props.navigation.navigate("OrderDetail")}
        >
          <Text style={{ fontSize: 16 }}>Detail</Text>
        </TouchableOpacity>
        <Text style={{ color: props.color }}>{props.status}</Text>
      </View>
    </View>
  );
};
