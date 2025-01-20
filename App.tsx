import { View, StatusBar } from "react-native";
import Navigation from "./Navigation";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }} className="mt-0">
      <Navigation />
      <StatusBar barStyle={"dark-content"} backgroundColor="transparent" />
    </SafeAreaView>
  );
}
