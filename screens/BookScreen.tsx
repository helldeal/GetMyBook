import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { getAuthor, getBook, getEditions } from "../api/books";
import * as Icon from "react-native-feather";
import { COVER_API_URL } from "../constants/Utils";
import Loading from "../components/Loading";
import Separator from "../components/Separator";
import BookScreenHeader from "../components/BookScreenHeader";

export const BookScreen = ({ route, navigation }: any) => {
  const { worksKey } = route.params;
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<any>({}); // book object
  const [authors, setAuthors] = useState<any>([]); // authors array
  const [editions, setEditions] = useState<any>([]); // editions array
  const isFocused = useIsFocused();

  const init = async () => {
    const book = await getBook(worksKey);
    console.log("Book: ", book.title);
    setBook(book);
    const authors = await Promise.all(
      book.authors.map(async (author: any) => {
        return await getAuthor(author.author.key);
      })
    );
    authors && setAuthors(authors);
    const editions = await getEditions(worksKey);
    setEditions(editions);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      console.log("Nav on Book Page : ", worksKey);
      init();
    }
  }, [isFocused]);

  return (
    <SafeAreaView className=" flex justify-start bg-white w-full h-full">
      <BookScreenHeader navigation={navigation} />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView className="flex gap-2 px-5">
          <View className="flex flex-col justify-start items-start gap-2 pb-4">
            <Text className="pt-4 text-3xl font-light ">
              {book.title.toUpperCase()}
            </Text>
            <View className="flex-row gap-2 flex-wrap justify-start">
              {book.subjects &&
                book.subjects
                  .slice(0, 10)
                  .map((subject: any, index: number) => (
                    <Text
                      key={index}
                      className="bg-zinc-400 text-xs text-white p-1 px-1.5 rounded-3xl"
                    >
                      {subject.charAt(0).toUpperCase() +
                        subject.slice(1).toLowerCase()}
                    </Text>
                  ))}
            </View>
          </View>
          <Separator />
          <View>
            <Text className="pt-2 text-xl">Auteur</Text>
            {authors &&
              authors.map((author: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  className="flex flex-row justify-between items-center py-4"
                  onPress={() =>
                    navigation.navigate("AuthorScreen", {
                      authorKey: author.key,
                    })
                  }
                >
                  <Text className=" text-red-700 text-lg">{author.name}</Text>
                  <Icon.ChevronRight color={"#a1a1aa"} />
                </TouchableOpacity>
              ))}
          </View>
          <Separator />
          <Text className="py-2  text-xl">Editions</Text>
          <View>
            {editions &&
              editions.slice(0, 10).map((edition: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  className="relative py-3 border-b-[1px] border-[#eeeeee] "
                  onPress={() => {
                    navigation.navigate("EditionScreen", {
                      editionKey: edition.key,
                    });
                  }}
                >
                  <Image
                    style={{ width: 80, height: 120 }}
                    className="bg-gray-100"
                    source={{
                      uri: `${COVER_API_URL}/b/olid${edition.key.replace(
                        "/books",
                        ""
                      )}-M.jpg`,
                    }}
                    alt="Cover"
                  />
                  <View className="ml-2 w-[70%]">
                    <Text className="text-red-700 text-lg">
                      {edition.title}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {edition.publishers && edition.publishers[0]}
                    </Text>
                  </View>
                  <Icon.ChevronRight
                    color={"#a1a1aa"}
                    className="absolute right-0"
                  />
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
