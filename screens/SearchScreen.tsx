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
import { styles } from "../style/style";
import searchBook from "../api/books";

export default function SearchScreen({ navigation }: any) {
  const [search, setSearch] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log("Nav on Search Page");
    }
  }, [isFocused]);

  return (
    <SafeAreaView className=" flex bg-white w-full h-full dark:bg-[#131f24]">
      <View style={styles.searchBarwQR} className="mt-3 px-4">
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchBarInput}
            placeholder="Livre ..."
            placeholderTextColor="#000"
            onChangeText={async (text) => setSearch(await searchBook(text))}
          />
        </View>
      </View>
      {search.length < 1 && (
        <View className="flex w-full h-80 justify-center items-center"></View>
      )}
      <FlatList
        data={search}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            className="bg-white border-b-[#e5e5e5] flex justify-start align-middle dark:bg-[#131f24] dark:border-b-[#37464f]"
            // onPress={() =>
            //   navigation.navigate("Drug", { user: user, drugCIS: item.CIS })
            // }
          >
            <View className="ml-4 flex-1 flex-row justify-between items-center">
              <Text className="flex-1 dark:text-slate-50">{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
