import React from "react";

import {
  SafeAreaView
} from "react-native";
import LoginScreen from "./screens/LoginScreen";

import OrderDetailScreen from "./screens/OrderDetailScreen";
import SettingScreen from "./screens/SettingScreen";
import MainContainer from "./src/features/Navigation/MainContainer";
import GlobalStyles from "./src/GlobalStyles";

function App() {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      {/* <OrderDetailScreen /> */}
      <MainContainer />
    </SafeAreaView>
  );
}

export default App;
