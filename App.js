import React, { useState } from "react";
import "react-native-gesture-handler";

import { SafeAreaView } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import MainContainer from "./src/features/Navigation/MainContainer";
import SignUpScreen from "./screens/SignUpScreen";
import GlobalStyles from "./src/GlobalStyles";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import SuccessScreen from "./screens/SuccessScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import MyOrderScreen from "./screens/MyOrdersScreen";
import SettingScreen from "./screens/SettingScreen";
import AddressScreen from "./screens/AddressScreen";
import AddingAddressScreen from "./screens/AddingAddressScreen";
import MyReviewsScreen from "./screens/MyReviewsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./src/firebase-config";
import { getAuth } from "firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const Stack = createNativeStackNavigator();

function App() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const user = auth.currentUser;

  return (
    <Provider store={store}>
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Main"
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainContainer} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
            <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="Success" component={SuccessScreen} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
            <Stack.Screen name="Order" component={MyOrderScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="Address" component={AddressScreen} />
            <Stack.Screen name="AddAddress" component={AddingAddressScreen} />
            <Stack.Screen name="MyReviews" component={MyReviewsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
