import React from "react";
import { View, ActivityIndicator, Image } from "react-native";

const Loading = () => {
  return (
    <View
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        flex: 1,
        zIndex: 10,
      }}
      className="px-0 bg-white w-full h-full dark:bg-[#131f24]"
    >
      <ActivityIndicator
        className="self-center -mt-[50%]"
        size={60}
        color="#0090ff"
      />
    </View>
  );
};

export default Loading;
