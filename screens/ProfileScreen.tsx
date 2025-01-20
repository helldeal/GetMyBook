import React from "react";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";

const Profile = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const ical = require("cal-parser");

  useEffect(() => {
    if (isFocused) {
      console.log("ProfileScreen is focused");
    }
  }, [isFocused]);

  return (
    <View className="flex-1 bg-white  ">
      <View className=" flex-row mt-10 justify-around">
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text className=" text-[#0090ff]">Connexion</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ScanScreen")}>
          <Text className=" text-[#0090ff]">
            Scanner un nouvel emploi du temps
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
