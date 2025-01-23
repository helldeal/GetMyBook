import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getAuthor, getEditionFromAuthor } from "../api/books";
import Loading from "../components/Loading";

export const AuthorScreen = ({ route, navigation }: any) => {
  const { authorKey } = route.params;
  const [author, setAuthor] = useState<any>({});
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const init = async () => {
    try {
      const authorData = await getAuthor(authorKey);
      setAuthor(authorData);

      const booksData = await getEditionFromAuthor(authorKey);
      setBooks(booksData.entries || []); // Assurez-vous que `entries` est défini
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      init();
    }
  }, [isFocused]);

  const renderBook = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="bg-white border-b-[#e5e5e5] flex justify-start align-middle dark:bg-[#131f24] dark:border-b-[#37464f]"
      onPress={() => navigation.navigate("BookScreen", { worksKey: item.key })}
    >
      <View className="ml-4 py-3 flex-1 flex-row justify-start items-center">
        <Text className="font-bold text-lg">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex justify-start bg-white w-full h-full">
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.key} // Utilise `key` comme identifiant unique
          renderItem={renderBook} // Rend chaque élément
        />
      )}
    </SafeAreaView>
  );
};
