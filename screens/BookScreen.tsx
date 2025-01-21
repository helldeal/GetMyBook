import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { getAuthor, getBook, getEditions } from "../api/books";
import * as Icon from "react-native-feather";
import { COVER_API_URL } from "../constants/Utils";

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
    const authors = await Promise.all(
      book.authors.map(async (author: any) => {
        return await getAuthor(author.author.key);
      })
    );
    const editions = await getEditions(worksKey);
    setBook(book);
    setAuthors(authors);
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
      <ScrollView className="gap-2" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-start pt-4 px-6">
          <Icon.ArrowLeft
            color={"#e82604"}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text>{book.title}</Text>
        <View className="flex-row justify-start items-center flex-wrap gap-2">
          {book.subjects &&
            book.subjects
              .slice(0, 10)
              .map((subject: any, index: number) => (
                <Text key={index}>{subject}</Text>
              ))}
        </View>
        <Text>Auteur</Text>
        {authors &&
          authors.map((author: any, index: number) => (
            <TouchableOpacity key={index}>
              <Text className=" text-red-500">{author.name}</Text>
            </TouchableOpacity>
          ))}
        <Text>Editions</Text>
        {editions &&
          editions.map((edition: any, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Image
                style={{ width: 70, height: 100 }}
                source={
                  edition.covers
                    ? {
                        uri: `${COVER_API_URL}/b/olid${edition.key.replace(
                          "/books",
                          ""
                        )}-M.jpg`,
                      }
                    : {
                        uri: `https://archive.org/download/placeholder-image/placeholder-image.jpg`,
                      }
                }
                alt="Cover"
              />
              <Text className="ml-2 text-red-500">{edition.title}</Text>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};
