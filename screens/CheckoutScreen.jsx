import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";

export default function CheckoutScreen({ navigation }) {
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
          Check out
        </Text>
      </View>
      <View style={{ marginTop: 30, flex: 1 }}>
        <Text style={styles.title}>Shipping Address</Text>
        <Address
          name="Le Khai Hoan"
          addressOne="123 Pham Van Dong"
          addressTwo="Phuong Linh Trung, Tp. Thu Duc"
          navigation={navigation}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <Text style={[styles.title, { flex: 1 }]}>Payment</Text>
          <TouchableOpacity>
            <Text style={{ color: "#DB3022" }}>Change</Text>
          </TouchableOpacity>
        </View>
        <Payment
          image={require("../assets/payment-method.png")}
          name="Payment on receipt of products"
        />
        <Text style={styles.title}>Delivery Method</Text>
        <Delivery />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>Order:</Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>132$</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>Delivery:</Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>15$</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1, fontSize: 16 }}>Total:</Text>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>147$</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Success")}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontSize: 14,
              }}
            >
              SUBMIT ORDER
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Address = (props) => {
  return (
    <View style={styles.addressContainer}>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={{ flex: 1, fontWeight: "bold" }}>{props.name}</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Address")}>
          <Text style={{ color: "#DB3022" }}>Change</Text>
        </TouchableOpacity>
      </View>
      <Text>{props.addressOne}</Text>
      <Text>{props.addressTwo}</Text>
    </View>
  );
};

const Payment = (props) => {
  return (
    <View
      style={[
        { flexDirection: "row", alignItems: "center", marginBottom: 30 },
        styles.addressContainer,
      ]}
    >
      <Image
        source={props.image}
        style={{ width: 32, height: 32, marginRight: 10 }}
      />
      <Text>{props.name}</Text>
    </View>
  );
};

const Delivery = () => {
  return (
    <View
      style={[
        { flexDirection: "row", alignItems: "center" },
        styles.addressContainer,
      ]}
    >
      <Image
        style={{ width: 32, height: 32, marginRight: 10 }}
        source={require("../assets/ghtk.png")}
      />
      <Text style={{ flex: 1 }}>Giaohangtietkiem</Text>
      <Text style={{ color: "#bababa" }}>2-3 days</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    padding: 14,
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
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  addressContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
    padding: 10,
    marginTop: 10,
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
