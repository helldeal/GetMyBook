import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import { readList } from "../hooks/storage";
import { SafeAreaView } from "react-native-safe-area-context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen({ navigation }: any) {
  const isFocused = useIsFocused();
  const ical = require("cal-parser");
  useEffect(() => {
    if (isFocused) {
      console.log("HomeScreen is focused");
    }
  }, [isFocused]);

  return <SafeAreaView className="flex-1 bg-white pb-20"></SafeAreaView>;
}
