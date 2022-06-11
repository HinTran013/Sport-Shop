import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getOrderID from "../utils/getOrderID";

export default function MyOrdersScreen({ navigation }) {
  const [status, setStatus] = useState("Processing");
  const list = useSelector((state) => state.order.list);
  const listDelivery = list.filter((item) => item.status == "Delivery");
  const listProcessing = list.filter((item) => item.status == "Processing");
  const listCancelled = list.filter((item) => item.status == "Cancelled");

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
        <CustomButton name="Processing" setStatus={setStatus} status={status} />
        <CustomButton name="Delivery" setStatus={setStatus} status={status} />
        <CustomButton name="Cancelled" setStatus={setStatus} status={status} />
      </View>
      {status == "Delivery" ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {listDelivery.length != 0 ? (
            listDelivery.map((item) => {
              return (
                <Order
                  idNumber={getOrderID(item.id)}
                  date={item.date}
                  trackingNumber={item.trackingNumber}
                  quantity={item.productList.length}
                  price={`${item.orderPrice + item.deliveryFee}$`}
                  status={item.status}
                  productList={item.productList}
                  address={item.address}
                  delivery={item.delivery}
                  payment={item.payment}
                  color="green"
                  navigation={navigation}
                />
              );
            })
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <Text>There is no delivery orders!</Text>
            </View>
          )}
        </ScrollView>
      ) : null}
      {status == "Processing" ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {listProcessing.length != 0 ? (
            listProcessing.map((item) => {
              return (
                <Order
                  idNumber={getOrderID(item.id)}
                  date={item.date}
                  trackingNumber={item.trackingNumber}
                  quantity={item.productList.length}
                  price={`${item.orderPrice + item.deliveryFee}$`}
                  status={item.status}
                  productList={item.productList}
                  address={item.address}
                  delivery={item.delivery}
                  payment={item.payment}
                  color="orange"
                  navigation={navigation}
                />
              );
            })
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <Text>There is no processing orders!</Text>
            </View>
          )}
        </ScrollView>
      ) : null}
      {status == "Cancelled" ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {listCancelled.length != 0 ? (
            listCancelled.map((item) => {
              return (
                <Order
                  idNumber={getOrderID(item.id)}
                  date={item.date}
                  trackingNumber={item.trackingNumber}
                  quantity={item.productList.length}
                  price={`${item.orderPrice + item.deliveryFee}$`}
                  status={item.status}
                  productList={item.productList}
                  address={item.address}
                  delivery={item.delivery}
                  payment={item.payment}
                  color="red"
                  navigation={navigation}
                />
              );
            })
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <Text>There is no cancelled orders!</Text>
            </View>
          )}
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
          onPress={() => props.navigation.navigate("OrderDetail", props)}
        >
          <Text style={{ fontSize: 16 }}>Detail</Text>
        </TouchableOpacity>
        <Text style={{ color: props.color }}>{props.status}</Text>
      </View>
    </View>
  );
};
