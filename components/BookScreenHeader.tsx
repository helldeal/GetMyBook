import React from "react";
import { View, ActivityIndicator, Image } from "react-native";
import * as Icon from "react-native-feather";

const BookScreenHeader = ({ navigation }: any) => {
  return (
    <View className="flex-row justify-between py-3 px-6  z-50">
      <Icon.ArrowLeft color={"#b70707"} onPress={() => navigation.goBack()} />
    </View>
  );
};

export default BookScreenHeader;
