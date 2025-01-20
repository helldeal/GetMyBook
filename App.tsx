import { View, StatusBar } from "react-native";
import Navigation from "./Navigation";

export default function App() {
  return (
    <View style={{ flex: 1 }} className="mt-0">
      <Navigation />
      <StatusBar barStyle={"dark-content"} backgroundColor="transparent" />
    </View>
  );
}
