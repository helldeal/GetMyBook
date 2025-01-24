import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { getAuthor, getEditionFromAuthor } from "../api/books";
import Loading from "../components/Loading";
import Separator from "../components/Separator";
import BookScreenHeader from "../components/BookScreenHeader";

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
      StatusBar.setBarStyle("dark-content");
      console.log("Nav on Author Page : ", authorKey);
      init();
    }
  }, [isFocused]);

  return (
    <SafeAreaView className="flex justify-start bg-white w-full h-full">
      <BookScreenHeader navigation={navigation} />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView className="gap-2" showsVerticalScrollIndicator={false}>
          <Text className="px-5 text-3xl font-extralight">{author.name}</Text>
          {author.birth_date && (
            <View className=" px-5 flex flex-row items-center pt-2">
              <Icon.Calendar className="mr-2" color={"#000"} width={20} />
              <Text>{author.birth_date}</Text>
            </View>
          )}
          <View className="px-5">
            {books.slice(0, 25).map((book) => (
              <View key={book.key}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("BookScreen", { worksKey: book.key })
                  }
                  className="bg-white border-b-[#e5e5e5] flex flex-row justify-between items-center"
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
