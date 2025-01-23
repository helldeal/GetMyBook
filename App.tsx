import { View, StatusBar } from "react-native";
import Navigation from "./Navigation";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <View style={{ flex: 1 }} className="mt-0">
      <Navigation />
      <StatusBar
        animated
        barStyle={"dark-content"}
        backgroundColor="transparent"
      />
    </View>
  );
}
