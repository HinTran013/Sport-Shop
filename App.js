import React, { useState } from "react";
import "react-native-gesture-handler";

import { SafeAreaView } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import MainContainer from "./src/features/Navigation/MainContainer";
import SignUpScreen from "./screens/SignUpScreen";
import GlobalStyles from "./src/GlobalStyles";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import { NavigationContainer } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./src/firebase-config";
import { getAuth } from "firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  const [beginScreen, setBeginScreen] = useState("Login");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  if (auth.currentUser != null) {
    setBeginScreen("Main");
    console.log(`User exist: ${auth.currentUser.uid} + ${beginScreen}`);
  } else {
    console.log("no");
  }
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={beginScreen}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainContainer} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
