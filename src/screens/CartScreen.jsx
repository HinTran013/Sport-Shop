import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  decrease,
  fetchCartList,
  increase,
  resetCartList,
} from "../redux/cartSlice";

export default function CartScreen({ navigation }) {
  const auth = getAuth();
  const list = useSelector((state) => state.cart.list);
  const dispatch = useDispatch();
  let totalPrice = 0;
  list.map((item) => (totalPrice += item.quantity * item.price));
  useEffect(() => {
    dispatch(fetchCartList());
  }, [list]);

  const handleIncrease = (props) => {
    dispatch(increase(props));
  };
  const handleDecrease = (props) => {
    dispatch(decrease(props));
  };

  return auth.currentUser ? (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      {list.length == 0 ? (
        <View style={styles.container2}>
          <Text>There is no items in your cart!</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView>
            {list.map((item) => {
              return (
                <Item
                  key={item.id}
                  image={item.productImage}
                  name={item.name}
                  color={item.currentColor}
                  size={item.currentSize}
                  quantity={item.quantity}
                  price={item.price}
                  handleIncrease={handleIncrease}
                  handleDecrease={handleDecrease}
                />
              );
            })}
          </ScrollView>
          <View style={{ marginBottom: 50, marginTop: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <Text>Total:</Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {totalPrice}$
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Checkout", { totalPrice })}
            >
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontSize: 14,
                }}
              >
                CHECK OUT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  ) : (
    <View style={styles.container2}>
      <Image
        source={require("../assets/login-warning.jpg")}
        style={{ width: 300, height: 300 }}
      />
      <Text style={{ fontSize: 20 }}>Please sign in to add products!</Text>
    </View>
  );
}

const Item = (props) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri: props.image,
        }}
        style={styles.image}
      />
      <View style={{ padding: 5, marginLeft: 10, flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{props.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#bababa" }}>Color: </Text>
          <Text style={{ fontWeight: "bold", color: "#75736d" }}>
            {props.color}{" "}
          </Text>
          <Text style={{ color: "#bababa" }}>Size: </Text>
          <Text style={{ fontWeight: "bold", color: "#75736d" }}>
            {props.size}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.countButton}
            onPress={() => props.handleDecrease(props)}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{props.quantity}</Text>
          <TouchableOpacity
            style={styles.countButton}
            onPress={() => props.handleIncrease(props)}
          >
            <Text>+</Text>
          </TouchableOpacity>
          <Text style={styles.itemPrice}>{props.price * props.quantity}$</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 14,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    height: 90,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  countButton: {
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: 10,
    minHeight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
    alignSelf: "center",
    marginRight: 5,
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
  container2: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  title2: {
    fontSize: 34,
    margin: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
});
