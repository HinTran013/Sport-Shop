import React from "react";
import { SafeAreaView } from "react-native";
import OrderDetailScreen from "./screens/OrderDetailScreen";
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
