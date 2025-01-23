import React, { useState } from "react";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const CollecScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [collec, setCollec] = useState<any>([]);

  useEffect(() => {
    if (isFocused) {
      console.log("CollecScreen is focused");
    }
  }, [isFocused]);

  return (
    <SafeAreaView className=" flex justify-start bg-white w-full h-full"></SafeAreaView>
  );
};
