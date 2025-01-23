import React, { useState } from "react";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const WishScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [wishlist, setWishlist] = useState<any>([]);

  useEffect(() => {
    if (isFocused) {
      console.log("WishScreen is focused");
    }
  }, [isFocused]);

  return (
    <SafeAreaView className=" flex justify-start bg-white w-full h-full"></SafeAreaView>
  );
};
