import React from "react";
import {
  SafeAreaView
} from "react-native";
import MainContainer from "./src/features/Navigation/MainContainer";
import GlobalStyles from './src/GlobalStyles';

function App() {
  return(
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <MainContainer />
    </SafeAreaView>
  );
}

export default App;
