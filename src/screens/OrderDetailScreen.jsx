import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";

const OrderDetailScreen = ({ navigation, route }) => {
  const info = route.params;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 14 }}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image source={require("../assets/arrow-left.png")} />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            flex: 1,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Order Detail
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#f9f9f9",
          padding: 14,
        }}
      >
        <Order
          key={info.idNumber}
          idNumber={info.idNumber}
          date={info.date}
          trackingNumber={info.trackingNumber}
          status={info.status}
          color={info.color}
          address={info.address}
          payment={info.payment}
          delivery={info.delivery}
          totalAmount={info.price}
          productList={info.productList}
        />
      </ScrollView>
    </View>
  );
};

const Order = (props) => {
  return (
    <View style={{ marginBottom: 30 }}>
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
        <Text style={{ color: props.color, flex: 1, textAlign: "right" }}>
          {props.status}
        </Text>
      </View>
      <Text style={{ marginTop: 10 }}>{props.productList.length} items</Text>
      {props.productList.map((item) => {
        return (
          <Item
            productName={item.name}
            image={item.productImage}
            brandName={item.brand}
            color={item.currentColor}
            quantity={item.quantity}
            totalPrice={`${item.quantity * item.price}`}
          />
        );
      })}
      <Text style={{ marginVertical: 20, fontSize: 16 }}>
        Order Information
      </Text>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Text style={{ flex: 1, color: "#9b9b9b" }}>Shipping Address: </Text>
        <Text style={{ flex: 2 }}>{props.address}</Text>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Text style={{ flex: 1, color: "#9b9b9b" }}>Payment Method: </Text>
        <Text style={{ flex: 2 }}>{props.payment}</Text>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Text style={{ flex: 1, color: "#9b9b9b" }}>Delivery Method: </Text>
        <Text style={{ flex: 2 }}>{props.delivery}</Text>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Text style={{ flex: 1, color: "#9b9b9b" }}>Total Amount: </Text>
        <Text style={{ flex: 2 }}>{props.totalAmount}</Text>
      </View>
    </View>
  );
};

const Item = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "white",
        margin: 5,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <Image
        source={{ uri: props.image }}
        style={{
          width: 100,
          height: "100%",
          marginRight: 15,
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {props.productName}
        </Text>
        <Text style={{ color: "#9b9b9b" }}>{props.brandName}</Text>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Text style={{ color: "#9b9b9b" }}>Color: </Text>
          <Text style={{ color: "black" }}>{props.color}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#9b9b9b" }}>Units: </Text>
          <Text style={{ color: "black" }}>{props.quantity}</Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              fontSize: 18,
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            {props.totalPrice}$
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailScreen;
