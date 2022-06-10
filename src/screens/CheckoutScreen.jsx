import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import getDefaultAddress from "../utils/getDefaultAddress";
import { useSelector, useDispatch } from "react-redux";
import { setDelivered } from "../redux/addressSlice";
import submitOrder from "../utils/submitOrder";
import { fetchCartList, resetCartList } from "../redux/cartSlice";

export default function CheckoutScreen({ navigation, route }) {
  const [isActived, setActived] = useState({
    name: "Giaohangtietkiem",
    fee: 15,
  });
  const [paymentMethod, setPaymentMethod] = useState(
    "Payment on receipt of products"
  );
  const dispatch = useDispatch();
  const defaultAddress = getDefaultAddress();
  if (tmp != null) dispatch(setDelivered(defaultAddress));
  const tmp = useSelector((state) => state.address.deliveredAddress);
  const cartList = useSelector((state) => state.cart.list);
  const [deliveredAddress, setDeliveredAddress] = useState(tmp);

  const orderPrice = route.params.totalPrice;
  useEffect(() => {
    setDeliveredAddress(tmp);
  }, [tmp, cartList]);

  const handleSubmit = () => {
    if (defaultAddress != null) {
      Alert.alert("Confirm", "Do you want to submit this order?", [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            submitOrder({
              payment: paymentMethod,
              addressId: deliveredAddress.id,
              delivery: isActived.name,
              deliveryFee: isActived.fee,
              orderPrice: orderPrice,
              cartList: cartList,
            });
            dispatch(resetCartList());
            dispatch(fetchCartList());
            navigation.navigate("Success");
          },
        },
      ]);
    } else {
      Alert.alert("Please choose an address!");
    }
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
          Check out
        </Text>
      </View>
      <View style={{ marginTop: 30, flex: 1 }}>
        <Text style={styles.title}>Shipping Address</Text>
        {deliveredAddress ? (
          <Address
            name={deliveredAddress.name}
            addressOne={deliveredAddress.address}
            addressTwo={`${deliveredAddress.ward}, ${deliveredAddress.district}`}
            addressThree={deliveredAddress.province}
            navigation={navigation}
          />
        ) : (
          <TouchableOpacity
            style={styles.addressContainer}
            onPress={() => navigation.navigate("ChooseAdd")}
          >
            <Text style={{ textAlign: "center" }}>
              Please choose an address
            </Text>
          </TouchableOpacity>
        )}
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
        <Delivery
          name="Giaohangtietkiem"
          image={require("../assets/ghtk.png")}
          isActived={isActived}
          setActived={setActived}
          fee={15}
        />
        <Delivery
          name="Giaohangnhanh"
          image={require("../assets/ghn.png")}
          isActived={isActived}
          setActived={setActived}
          fee={10}
        />
        <Delivery
          name="VNPost"
          image={require("../assets/vnpost.png")}
          isActived={isActived}
          setActived={setActived}
          fee={8}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>Order:</Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {orderPrice}$
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>Delivery:</Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {isActived.fee}$
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1, fontSize: 16 }}>Total:</Text>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {orderPrice + isActived.fee}$
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
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
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ChooseAdd")}
        >
          <Text style={{ color: "#DB3022" }}>Change</Text>
        </TouchableOpacity>
      </View>
      <Text>{props.addressOne}</Text>
      <Text>{props.addressTwo}</Text>
      <Text>{props.addressThree}</Text>
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

const Delivery = (props) => {
  const handleClick = () => {
    props.setActived({ name: props.name, fee: props.fee });
  };
  return (
    <TouchableOpacity
      style={[
        { flexDirection: "row", alignItems: "center" },
        styles.addressContainer,
        props.name == props.isActived.name ? styles.actived : null,
      ]}
      onPress={() => handleClick()}
    >
      <Image
        style={{ width: 32, height: 32, marginRight: 10 }}
        source={props.image}
      />
      <Text style={{ flex: 1 }}>{props.name}</Text>
      <Text>{props.fee}$</Text>
    </TouchableOpacity>
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
  actived: {
    borderWidth: 2,
    borderColor: "green",
  },
});
