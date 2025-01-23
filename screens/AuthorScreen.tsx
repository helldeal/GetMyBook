import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { getAuthor, getEditionFromAuthor } from "../api/books";
import Loading from "../components/Loading";
import Separator from "../components/Separator";

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
      setBooks(booksData.entries || []);
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

  return (
    <SafeAreaView className="flex justify-start bg-white w-full h-full">
      <View className="flex-row justify-start py-3 px-6  z-50">
        <Icon.ArrowLeft color={"#b70707"} onPress={() => navigation.goBack()} />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView className="gap-2" showsVerticalScrollIndicator={false}>
          <Text>{author.name}</Text>
          <Text>{author.birth_date}</Text>
          <View className="px-5">
            {books.slice(0, 25).map((book) => (
              <View key={book.key}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("BookScreen", { worksKey: book.key })
                  }
                  className="bg-white border-b-[#e5e5e5] flex flex-row justify-between items-center dark:bg-[#131f24] dark:border-b-[#37464f]"
                >
                  <Text className="py-3 flex-1 flex-row justify-start items-center flex-wrap">
                    {book.title}
                  </Text>
                  <Icon.ChevronRight color={"#a1a1aa"} />
                </TouchableOpacity>
                <Separator />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
