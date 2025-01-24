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
      className="px-0 bg-white w-full h-full "
    >
      <ActivityIndicator
        className="self-center -mt-[50%]"
        size={60}
        color="#b70707"
      />
    </View>
  );
};

export default Loading;
