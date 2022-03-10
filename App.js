import React from "react";
import {
  SafeAreaView
} from "react-native";
import LoginScreen from "./screens/LoginScreen";
import MainContainer from "./src/features/Navigation/MainContainer";
import GlobalStyles from './src/GlobalStyles';

function App() {
  return(
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <LoginScreen />
    </SafeAreaView>
  );
}

export default App;
