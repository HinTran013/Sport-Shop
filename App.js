import React, { useState } from "react";
import "react-native-gesture-handler";

import { SafeAreaView } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import MainContainer from "./src/features/Navigation/MainContainer";
import SignUpScreen from "./src/screens/SignUpScreen";
import GlobalStyles from "./src/GlobalStyles";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import SuccessScreen from "./src/screens/SuccessScreen";
import OrderDetailScreen from "./src/screens/OrderDetailScreen";
import MyOrderScreen from "./src/screens/MyOrdersScreen";
import SettingScreen from "./src/screens/SettingScreen";
import AddressScreen from "./src/screens/AddressScreen";
import AddingAddressScreen from "./src/screens/AddingAddressScreen";
import MyReviewsScreen from "./src/screens/MyReviewsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./src/firebase-config";
import { getAuth } from "firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const Stack = createNativeStackNavigator();

function App() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const user = auth.currentUser;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
