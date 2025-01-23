import { View, StatusBar } from "react-native";
import Navigation from "./Navigation";
import { CollecProvider } from "./hooks/collectProvider";
import { WishlistProvider } from "./hooks/wishlistProvider";

export default function App() {
  return (
    <CollecProvider>
      <WishlistProvider>
        <View style={{ flex: 1 }} className="mt-0">
          <Navigation />
          <StatusBar barStyle={"dark-content"} backgroundColor="transparent" />
        </View>
      </WishlistProvider>
    </CollecProvider>
  );
}
