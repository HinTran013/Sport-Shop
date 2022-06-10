import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";

const OrderDetailScreen = ({ navigation }) => {
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
      <ScrollView style={{ flex: 1, backgroundColor: "#f9f9f9", padding: 14 }}>
        <Order
          idNumber="123456"
          date="11-03-2022"
          trackingNumber="IW12313216"
          status="Delivered"
          color="green"
        />
      </ScrollView>
    </View>
  );
};

const Order = (props) => {
  return (
    <View style={{ marginBottom: 5 }}>
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
      <Text style={{ marginTop: 10 }}>3 items</Text>
      <Item
        productName="Pullover"
        image="https://www.highsnobiety.com/static-assets/thumbor/UOlXEyATf-cqYEueiOJ18swhzKM=/1600x1067/www.highsnobiety.com/static-assets/wp-content/uploads/2019/10/03174252/louis-vuitton-pre-spring-summer-2020-mens-collection-141.jpg"
        brandName="Mango"
        color="Gray"
        quantity={1}
        totalPrice={51}
      />
      <Item
        productName="Pullover"
        image="data:image/jpeg;base64,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"
        brandName="Mango"
        color="Gray"
        quantity={1}
        totalPrice={51}
      />
      <Item
        productName="Pullover"
        image="https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-chain-print-t-shirt-dress-ready-to-wear--FLDR53FO8307_PM2_Front%20view.jpg"
        brandName="Mango"
        color="Gray"
        quantity={1}
        totalPrice={51}
      />
      <Text style={{ marginVertical: 20, fontSize: 16 }}>
        Order Information
      </Text>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Text style={{ flex: 1, color: "#9b9b9b" }}>Shipping Address: </Text>
        <Text style={{ flex: 2 }}>
          Khu phố 6, phường Linh Trung, Tp. Thủ Đức, Tp. Hồ Chí Minh
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Text style={{ flex: 1, color: "#9b9b9b" }}>Payment Method: </Text>
        <Text style={{ flex: 2 }}>Thanh toán khi nhận hàng</Text>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Text style={{ flex: 1, color: "#9b9b9b" }}>Delivery Method: </Text>
        <Text style={{ flex: 2 }}>Giao hàng tiết kiệm</Text>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Text style={{ flex: 1, color: "#9b9b9b" }}>Discount: </Text>
        <Text style={{ flex: 2 }}>0%</Text>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Text style={{ flex: 1, color: "#9b9b9b" }}>Total Amount: </Text>
        <Text style={{ flex: 2 }}>123$</Text>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 40 }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 30,
            borderRadius: 100,
            borderWidth: 1,
            paddingVertical: 10,
            flex: 1,
            marginHorizontal: 10,
          }}
        >
          <Text style={{ textAlign: "center" }}>Reorder</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 30,
            borderRadius: 100,
            paddingVertical: 10,
            backgroundColor: "#DB3022",
            flex: 1,
            marginHorizontal: 10,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Leave feedback
          </Text>
        </TouchableOpacity>
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
          height: 100,
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
