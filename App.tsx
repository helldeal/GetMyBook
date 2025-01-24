import { View, StatusBar } from "react-native";
import Navigation from "./Navigation";
import { CollecProvider } from "./hooks/collectProvider";
import { WishlistProvider } from "./hooks/wishlistProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <CollecProvider>
        <WishlistProvider>
          <View style={{ flex: 1 }} className="mt-0">
            <Navigation />
            <StatusBar backgroundColor="transparent" />
          </View>
        </WishlistProvider>
      </CollecProvider>
    </SafeAreaProvider>
  );
}
