import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getBook } from "../api/books";

export const BookScreen = ({ route, navigation }: any) => {
  const { worksKey } = route.params;
  const [book, setBook] = useState<any>({}); // book object
  const isFocused = useIsFocused();

  const init = async () => {
    const book = await getBook(worksKey);
    console.log("Book: ", book.title);
    setBook(book);
  };

  useEffect(() => {
    if (isFocused) {
      console.log("Nav on Book Page : ", worksKey);
      init();
    }
  }, [isFocused]);

  return (
    <View>
      <Text>{book.title}</Text>
    </View>
  );
};
