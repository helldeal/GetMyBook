import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import * as Icon from "react-native-feather";
import { getAuthor } from "../api/books";
import Loading from "../components/Loading";

export const AuthorScreen = ({ route, navigation }: any) => {
  const { authorKey } = route.params;
  const [author, setAuthor] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const init = async () => {
    const author = await getAuthor(authorKey);
    console.log("Author: ", author.name);
    setAuthor(author);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      console.log("Nav on Author Page : ", authorKey);
      init();
    }
  }, [isFocused]);
  return (
    <SafeAreaView className=" flex justify-start bg-white w-full h-full">
      <View className="flex-row justify-start py-3 px-6  z-50">
        <Icon.ArrowLeft color={"#b70707"} onPress={() => navigation.goBack()} />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView className="gap-2" showsVerticalScrollIndicator={false}>
          <Text>{author.name}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
