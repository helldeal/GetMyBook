import React, { useState } from "react";
import { View, Image, StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCollec } from "../hooks/collectProvider";
import { useWishlist } from "../hooks/wishlistProvider";
import { FlatList } from "react-native-gesture-handler";
import { COVER_API_URL } from "../constants/Utils";
import * as Icon from "react-native-feather";

export const CollecScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const { collec, setCollec } = useCollec();
  const { wishlist, setWishlist } = useWishlist();
  const [loading, setLoading] = useState(true);
  const [collecBool, setCollecBool] = useState(true);

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle("dark-content");
      console.log("CollecScreen is focused");
    }
  }, [isFocused]);

  return (
    <SafeAreaView className=" flex justify-start bg-white w-full h-full">
      <View className="flex-row justify-around p-3 gap-10 px-10 bg-white z-50 border-b-[1px] border-[#eeeeee]">
        <TouchableOpacity
          className=" flex-1 p-1 px-4 rounded-3xl border-red-700 border-[1px] items-center"
          style={{ backgroundColor: collecBool ? "#b91c1c" : "white" }}
          onPress={() => setCollecBool(true)}
        >
          <Text style={{ color: !collecBool ? "#b91c1c " : "white" }}>
            COLLECTION
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 p-1 px-4 rounded-3xl border-red-700 border-[1px] items-center"
          style={{ backgroundColor: !collecBool ? "#b91c1c" : "white" }}
          onPress={() => setCollecBool(false)}
        >
          <Text style={{ color: collecBool ? "#b91c1c" : "white" }}>
            SUIVIS
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row pt-4 px-5 items-center">
        <Text className="text-3xl font-bold">
          {collecBool
            ? collec.length
            : wishlist.filter(
                (item: any) =>
                  !collec.some((collecItem: any) => collecItem.key === item.key)
              ).length}
        </Text>
        <Text className="text-xl font-light"> LIVRES</Text>
      </View>
      <View className="flex-row justify-start p-3 gap-5 px-10 pt-4">
        <TouchableOpacity
          className="flex-row p-2 px-4 rounded-3xl border-black border-[1px] items-center"
          onPress={() => navigation.navigate("ScanScreen")}
        >
          <Icon.Camera className="mr-2" color={"black"} />
          <Text>SCAN</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row p-2 px-4 rounded-3xl border-black border-[1px] items-center">
          <Icon.Share className="mr-2" color={"black"} />
          <Text>PARTAGER</Text>
        </TouchableOpacity>
      </View>
      {collecBool ? (
        <FlatList
          className="px-5"
          data={collec}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              className="relative py-3 border-b-[1px] border-[#eeeeee] "
              onPress={() => {
                navigation.navigate("EditionScreen", {
                  editionKey: item.key,
                });
              }}
            >
              <Image
                style={{ width: 80, height: 120 }}
                className="bg-gray-100"
                source={{
                  uri: `${COVER_API_URL}/b/olid${item.key.replace(
                    "/books",
                    ""
                  )}-M.jpg`,
                }}
                alt="Cover"
              />
              <View className="ml-2 w-[70%]">
                <Text className="text-red-700 text-lg">{item.title}</Text>
                <Text className="text-gray-500 text-sm">
                  {item.publishers && item.publishers[0]}
                </Text>
              </View>
              <Icon.ChevronRight
                color={"#a1a1aa"}
                className="absolute right-0"
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          className="px-5"
          data={wishlist.filter(
            (item: any) =>
              !collec.some((collecItem: any) => collecItem.key === item.key)
          )}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              className="relative py-3 border-b-[1px] border-[#eeeeee] "
              onPress={() => {
                navigation.navigate("EditionScreen", {
                  editionKey: item.key,
                });
              }}
            >
              <Image
                style={{ width: 80, height: 120 }}
                className="bg-gray-100"
                source={{
                  uri: `${COVER_API_URL}/b/olid${item.key.replace(
                    "/books",
                    ""
                  )}-M.jpg`,
                }}
                alt="Cover"
              />
              <View className="ml-2 w-[70%]">
                <Text className="text-red-700 text-lg">{item.title}</Text>
                <Text className="text-gray-500 text-sm">
                  {item.publishers && item.publishers[0]}
                </Text>
              </View>
              <Icon.ChevronRight
                color={"#a1a1aa"}
                className="absolute right-0"
              />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};
