import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Linking,
} from "react-native";
import { getBook, getEdition } from "../api/books";
import Loading from "../components/Loading";
import * as Icon from "react-native-feather";
import { COVER_API_URL } from "../constants/Utils";
import Separator from "../components/Separator";

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

  const amazonHandlePress = useCallback(async () => {
    console.log("Amazon Pressed");
    const url = edition.identifiers?.amazon
      ? "https://www.amazon.fr/dp/" + edition.identifiers.amazon[0]
      : "https://www.amazon.fr/s?k=" + edition.isbn_10[0];
    await Linking.openURL(url);
  }, []);

  useEffect(() => {
    if (isFocused) {
      console.log("Nav on Edition Page : ", editionKey);
      init();
    }
  }, [isFocused]);
  return (
    <SafeAreaView
      className=" flex justify-start bg-white w-full h-full"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <StatusBar translucent barStyle={"light-content"} />
      <View className="flex-row justify-start py-3 px-6  z-50">
        <Icon.ArrowLeft color={"#b70707"} onPress={() => navigation.goBack()} />
      </View>

      <View className=" absolute flex justify-center w-full h-72 bg-gray-100 top-0 z-20">
        <Image
          className="absolute w-full h-full"
          style={{ resizeMode: "cover" }}
          blurRadius={3}
          source={{
            uri: edition.key
              ? `${COVER_API_URL}/b/olid${edition.key.replace(
                  "/books",
                  ""
                )}-L.jpg`
              : undefined,
          }}
          alt="Cover"
        />

        <Image
          className="w-full h-[80%] z-30 top-3 bottom-0"
          style={{ resizeMode: "contain" }}
          source={{
            uri: edition.key
              ? `${COVER_API_URL}/b/olid${edition.key.replace(
                  "/books",
                  ""
                )}-L.jpg`
              : undefined,
          }}
          alt="Cover"
        />
      </View>

      {loading ? (
        <View className="mt-20 flex justify-center items-center h-full">
          <Loading />
        </View>
      ) : (
        <ScrollView className="px-5 pt-60 bg-white">
          <View>
            <Text className=" text-3xl font-extralight ">
              {edition.title.toUpperCase()}
            </Text>
            {edition.subtitle && (
              <Text className="pt-4 text-3xl font-light ">
                {edition.subtitle}
              </Text>
            )}
          </View>
          <View></View>
          <TouchableOpacity
            className="flex flex-row justify-between items-center py-4"
            onPress={() =>
              navigation.navigate("BookScreen", {
                worksKey: book.key,
              })
            }
          >
            <View>
              <Text className=" text-red-700 text-lg">{book.title}</Text>
              <Text className="text-gray-500 text-sm">Oeuvre</Text>
            </View>
            <Icon.ChevronRight color={"#a1a1aa"} />
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity className="flex flex-row justify-between items-center py-4">
            <View>
              <Text className=" text-red-700 text-lg">
                {edition.publishers && edition.publishers[0]}
              </Text>
              {edition.edition_name && (
                <Text className="text-gray-500 text-sm">
                  {edition.edition_name}
                </Text>
              )}
              <Text className="text-gray-500 text-sm">Edition</Text>
            </View>
            <Icon.ChevronRight color={"#a1a1aa"} />
          </TouchableOpacity>
          {edition.isbn_10 || edition.identifiers?.amazon ? (
            <TouchableOpacity
              className="bg-yellow-500 my-4 py-2 px-4 rounded-3xl flex justify-center items-center"
              onPress={amazonHandlePress}
            >
              <Text className="text-white">Amazon</Text>
            </TouchableOpacity>
          ) : null}
          <Separator />

          {book.description && (
            <View className="flex gap-2 py-6">
              <Text className=" text-xl">Résumé</Text>
              <Text>{book.description}</Text>
            </View>
          )}
          <Separator />
          <View className="flex gap-2 py-6">
            <Text className=" text-xl">Détails</Text>
            {edition.publish_date && (
              <View className="flex flex-row items-center pt-2">
                <Icon.Calendar className="mr-2" color={"#000"} width={20} />
                <Text>{edition.publish_date}</Text>
              </View>
            )}
            {edition.number_of_pages && (
              <View className="flex flex-row items-center">
                <Icon.BookOpen className="mr-2" color={"#000"} width={20} />
                <Text>{edition.number_of_pages}</Text>
              </View>
            )}
            {(edition.isbn_13 || edition.isbn_10) && (
              <View className="flex flex-row items-center">
                <Icon.Camera className="mr-2" color={"#000"} width={20} />
                <Text>
                  ISBN:{" "}
                  {edition.isbn_13
                    ? edition.isbn_13[0]
                    : edition.isbn_10 && edition.isbn_10[0]}
                </Text>
              </View>
            )}
          </View>
          <View className="h-60"></View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
