import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { COVER_API_URL } from "../constants/Utils";

export default function HomeScreen({ navigation }: any) {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle("dark-content");
      console.log("HomeScreen is focused");
    }
  }, [isFocused]);

  return (
    <SafeAreaView className=" flex bg-white w-full h-full">
      <ScrollView className="flex gap-2 px-5">
        <Text className="pt-4 text-3xl font-extralight ">
          Livres en vedette
        </Text>
        {dataFeatured.map((item: any) => (
          <TouchableOpacity
            key={item.key}
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
            <Icon.ChevronRight color={"#a1a1aa"} className="absolute right-0" />
          </TouchableOpacity>
        ))}
        <Text className="pt-4 text-3xl font-extralight ">
          Derniers livres consultés
        </Text>
        {dataLastViewed.map((item: any) => (
          <TouchableOpacity
            key={item.key}
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
            <Icon.ChevronRight color={"#a1a1aa"} className="absolute right-0" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const dataFeatured = [
  {
    title: "Lord of Flies",
    key: "/books/OL51726173M",
    publishers: ["Penguin Books"],
  },
  {
    title: "La Maison des Feuilles",
    key: "/books/OL51750163M",
    publishers: ["Monsieur Toussaint Louverture"],
  },
  {
    title: "Sorceleur, T4",
    key: "/books/OL30655987M",
    publishers: ["Milady"],
  },
];

const dataLastViewed = [
  {
    title: "Lord of Flies",
    key: "/books/OL51726173M",
    publishers: ["Penguin Books"],
  },
  {
    title: "La Maison des Feuilles",
    key: "/books/OL51750163M",
    publishers: ["Monsieur Toussaint Louverture"],
  },
  {
    title: "Sorceleur, T4",
    key: "/books/OL30655987M",
    publishers: ["Milady"],
  },
];
