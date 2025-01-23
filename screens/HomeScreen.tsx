import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useIsFocused } from "@react-navigation/native";
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
