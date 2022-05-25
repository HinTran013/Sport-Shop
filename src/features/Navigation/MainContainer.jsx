import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { firebaseConfig } from "../../firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";

//screens
import HomeScreen from "../../screens/HomeScreen";
import ShopScreen from "../../screens/ShopScreen";
import CartScreen from "../../screens/CartScreen";
import FavoritesScreen from "../../screens/FavoritesScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import CategoriesScreen from "../../screens/CategoriesScreen";
import FiltersScreen from "../../screens/FiltersScreen";
import ProductDetailsScreen from "../../screens/ProductDetailsScreen";
import CustomerRatingScreen from "../../screens/CustomerRatingScreen";
//screen names
const homeName = "Home";
const shopName = "Shop";
const cartName = "Cart";
const favoritesName = "Favorites";
const profileName = "Profile";

const ShopStack = createNativeStackNavigator();
const ShopStackScreen = () => {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen
        name={"Shop Stack"}
        component={ShopScreen}
        options={{
          headerShown: false,
        }}
      />
      <ShopStack.Screen
        name="Category"
        component={CategoriesScreen}
        options={{
          presentation: "modal",
        }}
      />
      <ShopStack.Screen
        name="Filters"
        component={FiltersScreen}
        options={{
          presentation: "modal",
        }}
      />
    </ShopStack.Navigator>
  );
};

const homeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
  return (
    <homeStack.Navigator>
      <homeStack.Screen
        name={"HomeStack"}
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <homeStack.Screen
        name="ProductDetails"
        options={{ headerShown: false }}
        component={ProductDetailsScreen}
      />

      <homeStack.Screen
        name="Review"
        options={{ headerShown: false }}
        component={CustomerRatingScreen}
      />
    </homeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser != null) {
      const db = getDatabase();
      const starCountRef = ref(db, "users/" + currentUser.uid);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(setUserData(data));
      });
    }
  }, [currentUser]);

  return (
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
        headerShown: false,
      })}
    >
      <Tab.Screen name={homeName} component={HomeStackScreen} />
      <Tab.Screen name={shopName} component={ShopStackScreen} />
      <Tab.Screen name={cartName} component={CartScreen} />
      <Tab.Screen name={favoritesName} component={FavoritesScreen} />
      <Tab.Screen name={profileName} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
