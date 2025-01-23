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
      <StatusBar
        barStyle={"dark-content"}
        translucent={true}
        backgroundColor={"transparent"}
      />
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
        <Loading />
      ) : (
        <ScrollView
          className="px-5 gap-2 pt-60 bg-white"
          showsVerticalScrollIndicator={false}
        >
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
          <View>
            <Text>{book.title}</Text>
            <Text>Oeuvre</Text>
          </View>
          <Separator />
          <View>
            <Text>
              {edition.edition_name}
              {edition.publisher && " " + edition.publisher[0]}
            </Text>
            <Text>Edition</Text>
          </View>
          <Separator />
          {edition.isbn_10 || edition.identifiers?.amazon ? (
            <TouchableOpacity onPress={amazonHandlePress}>
              <Text className="text-red-600">Amazon</Text>
            </TouchableOpacity>
          ) : null}
          <Separator />
          <Text>{book.description}</Text>
          <Separator />
          <Text>{edition.number_of_pages}</Text>
          <Text>{edition.publish_date}</Text>
          <Text>
            ISBN:{" "}
            {edition.isbn_13
              ? edition.isbn_13[0]
              : edition.isbn_10 && edition.isbn_10[0]}
          </Text>
          <View className="h-60"></View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
