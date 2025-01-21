import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView } from "react-native";
import { getBook, getAuthor, getEditions } from "../api/books";

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
      console.log("Nav on Book Page : ", authorKey);
      init();
    }
  }, [isFocused]);
  return (
    <SafeAreaView>
      <Text>{author.name}</Text>
    </SafeAreaView>
  );
};
