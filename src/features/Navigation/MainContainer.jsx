import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//screens
import HomeScreen from "../../../screens/HomeScreen";
import ShopScreen from "../../../screens/ShopScreen";
import CartScreen from "../../../screens/CartScreen";
import FavoritesScreen from "../../../screens/FavoritesScreen";
import ProfileScreen from "../../../screens/ProfileScreen";

//screen names
const homeName = "Home";
const shopName = "Shop";
const cartName = "Cart";
const favoritesName = "Favorites";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === shopName) {
              iconName = focused ? "pricetags" : "pricetags-outline";
            } else if (rn === cartName) {
              iconName = focused ? "cart" : "cart-outline";
            } else if (rn === favoritesName) {
              iconName = focused ? "heart" : "heart-outline";
            } else if (rn === profileName) {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#DB3022",
          tabBarStyle: {
            paddingBottom: 10,
            paddingTop: 10,
            height: 60,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            position: "absolute",
          },
        })}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={shopName} component={ShopScreen} />
        <Tab.Screen name={cartName} component={CartScreen} />
        <Tab.Screen name={favoritesName} component={FavoritesScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
