import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { styles } from "../style/style";
import { searchBooks } from "../api/books";
import Separator from "../components/Separator";

export default function SearchScreen({ navigation }: any) {
  const [search, setSearch] = useState<any[]>(emptySearchArray);
  const [searchText, setSearchText] = useState<string>("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle("dark-content");
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
    const searchResult = await searchBooks(text);
    searchResult && setSearch(searchResult);
  };

  return (
    <SafeAreaView className="flex bg-white w-full h-full ">
      <View style={styles.searchBarwQR} className="my-2 px-4">
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
      <Separator />
      <FlatList
        className="px-5"
        data={search.slice(0, 20)}
        keyExtractor={(_item, index) => index.toString()}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            className="bg-white border-b-[#e5e5e5] flex flex-row justify-between items-center"
            onPress={() =>
              navigation.navigate("BookScreen", { worksKey: item.key })
            }
          >
            <View className="py-3 flex-1 flex-row justify-start items-center flex-wrap">
              {searchText ? (
                item.title
                  .split(new RegExp(`(${searchText})`, "gi"))
                  .map((part: string, index: number) =>
                    part.toLowerCase() === searchText.toLowerCase() ? (
                      <Text key={index} style={{ fontWeight: "bold" }}>
                        {part}
                      </Text>
                    ) : (
                      <Text key={index}>{part}</Text>
                    )
                  )
              ) : (
                <Text>{item.title}</Text>
              )}
            </View>
            <Icon.ChevronRight color={"#a1a1aa"} />
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
  {
    title: "Atomic Habits",
    key: "/works/OL17930368W",
  },
  {
    title: "It Ends With Us",
    key: "/works/OL18020194W",
  },
  {
    title: "The 48 Laws of Power",
    key: "/works/OL1968368W",
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    key: "/works/OL17590212W",
  },
  {
    title: "Rich Dad, Poor Dad",
    key: "/works/OL2010879W",
  },
  {
    title: "Um casamento arranjado",
    key: "/works/OL35351151W",
  },
  {
    title: "Control Your Mind and Master Your Feelings ",
    key: "/works/OL25312237W",
  },
];
