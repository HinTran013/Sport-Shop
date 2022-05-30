import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function CartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <ScrollView>
        <Item
          image="https://cdn.webshopapp.com/shops/259039/files/343584140/terry-cloth-aqua.jpg"
          name="Clothe"
          color="Black"
          size="M"
          quantity={3}
          price={54}
        />
        <Item
          image="https://cdn.webshopapp.com/shops/259039/files/343584140/terry-cloth-aqua.jpg"
          name="Clothe"
          color="Black"
          size="M"
          quantity={3}
          price={54}
        />
        <Item
          image="https://cdn.webshopapp.com/shops/259039/files/343584140/terry-cloth-aqua.jpg"
          name="Clothe"
          color="Black"
          size="M"
          quantity={3}
          price={54}
        />
        <Item
          image="https://cdn.webshopapp.com/shops/259039/files/343584140/terry-cloth-aqua.jpg"
          name="Clothe"
          color="Black"
          size="M"
          quantity={3}
          price={54}
        />
        <Item
          image="https://cdn.webshopapp.com/shops/259039/files/343584140/terry-cloth-aqua.jpg"
          name="Clothe"
          color="Black"
          size="M"
          quantity={3}
          price={54}
        />
        <Item
          image="https://cdn.webshopapp.com/shops/259039/files/343584140/terry-cloth-aqua.jpg"
          name="Clothe"
          color="Black"
          size="M"
          quantity={3}
          price={54}
        />
        <Item
          image="https://cdn.webshopapp.com/shops/259039/files/343584140/terry-cloth-aqua.jpg"
          name="Clothe"
          color="Black"
          size="M"
          quantity={3}
          price={54}
        />
      </ScrollView>
      <View style={{ marginBottom: 50, marginTop: 20 }}>
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
            132$
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Checkout")}
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
        <Text style={{ color: "#bababa" }}>
          Color: {props.color} Size: {props.size}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={styles.countButton}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{props.quantity}</Text>
          <TouchableOpacity style={styles.countButton}>
            <Text>+</Text>
          </TouchableOpacity>
          <Text style={styles.itemPrice}>{props.price}$</Text>
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
});
