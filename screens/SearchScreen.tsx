import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Icon from "react-native-feather";
import { styles } from "../style/style";
import { searchBook } from "../api/books";
import Separator from "../components/Separator";

export default function SearchScreen({ navigation }: any) {
  const [search, setSearch] = useState<any[]>(emptySearchArray);
  const [searchText, setSearchText] = useState<string>("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log("Nav on Search Page");
    }
  }, [isFocused]);

  const handleSearchBook = async (text: string) => {
    setSearchText(text);
    if (text.length < 3) {
      setSearch(emptySearchArray);
      return;
    }
    console.log("Search for: ", text);
    const searchResult = await searchBook(text);
    searchResult && setSearch(searchResult);
  };

  return (
    <SafeAreaView className=" flex bg-white w-full h-full dark:bg-[#131f24]">
      <View style={styles.searchBarwQR} className="mt-3 px-4">
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchBarInput}
            placeholder="Rechercher un livre"
            placeholderTextColor="#000"
            onChangeText={(text) => handleSearchBook(text)}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ScanScreen");
            }}
          >
            <Icon.Camera color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {search.length < 1 && (
        <View className="flex w-full h-80 justify-center items-center"></View>
      )}
      <FlatList
        data={search.slice(0, 20)}
        keyExtractor={(_item, index) => index.toString()}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            className="bg-white border-b-[#e5e5e5] flex justify-start align-middle dark:bg-[#131f24] dark:border-b-[#37464f]"
            onPress={() =>
              navigation.navigate("BookScreen", { worksKey: item.key })
            }
          >
            <View className="ml-4 py-3 flex-1 flex-row justify-start items-center">
              {item.title
                .split(new RegExp(`(${searchText})`, "gi"))
                .map((part: string, index: number) =>
                  part.toLowerCase() === searchText.toLowerCase() ? (
                    <Text key={index} style={{ fontWeight: "bold" }}>
                      {part}
                    </Text>
                  ) : (
                    <Text key={index}>{part}</Text>
                  )
                )}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const emptySearchArray = [
  {
    title: "Lord of Flies",
    key: "/works/OL455327W",
  },
];
