import React from "react";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const ical = require("cal-parser");

  useEffect(() => {
    if (isFocused) {
      console.log("ProfileScreen is focused");
    }
  }, [isFocused]);

  return (
    <SafeAreaView className="flex-1 bg-white  ">
      <View className=" flex-row justify-around">
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text className=" text-[#0090ff]">Connexion</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ScanScreen")}>
          <Text className=" text-[#0090ff]">
            Scanner un nouvel emploi du temps
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
