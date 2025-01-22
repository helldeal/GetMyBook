import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, ScrollView, View, Image } from "react-native";
import { getBook, getEdition } from "../api/books";
import Loading from "../components/Loading";
import * as Icon from "react-native-feather";
import { COVER_API_URL } from "../constants/Utils";

export const EditionScreen = ({ route, navigation }: any) => {
  const { editionKey } = route.params;
  const [edition, setEdition] = useState<any>({});
  const [book, setBook] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const init = async () => {
    const edition = await getEdition(editionKey);
    console.log("Edition: ", edition.title);
    setEdition(edition);
    const Book = await getBook(edition.works[0].key);
    setBook(Book);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      console.log("Nav on Edition Page : ", editionKey);
      init();
    }
  }, [isFocused]);
  return (
    <SafeAreaView className=" flex justify-start bg-white w-full h-full">
      <View className="flex-row justify-start py-3 px-6  z-50">
        <Icon.ArrowLeft color={"#e82604"} onPress={() => navigation.goBack()} />
      </View>

      {loading ? (
        <Loading />
      ) : (
        <>
          <View className=" absolute flex justify-center w-full h-80 bg-gray-100 top-0 z-20">
            <Image
              className="absolute w-full h-full"
              style={{ resizeMode: "cover" }}
              blurRadius={3}
              source={{
                uri: `${COVER_API_URL}/b/olid${edition.key.replace(
                  "/books",
                  ""
                )}-L.jpg`,
              }}
              alt="Cover"
            />

            <Image
              className="w-full h-[90%] py-4 z-30 top-0 bottom-0"
              style={{ resizeMode: "contain" }}
              source={{
                uri: `${COVER_API_URL}/b/olid${edition.key.replace(
                  "/books",
                  ""
                )}-L.jpg`,
              }}
              alt="Cover"
            />
          </View>
          <ScrollView
            className="gap-2 pt-72 bg-white"
            showsVerticalScrollIndicator={false}
          >
            <Text>{edition.title}</Text>
            <Text>
              {edition.edition_name} -{" "}
              {edition.publishers && edition.publishers[0]}
            </Text>
            <Text>{edition.number_of_pages}</Text>
            <Text>{edition.publish_date}</Text>
            <Text>{book.description}</Text>
            <Text>
              ISBN:{" "}
              {edition.isbn_13
                ? edition.isbn_13[0]
                : edition.isbn_10 && edition.isbn_10[0]}
            </Text>
            <View className="h-96"></View>
            <View className="h-96"></View>
            <View className="h-96"></View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};
