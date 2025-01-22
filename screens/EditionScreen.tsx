import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, ScrollView } from "react-native";
import { getEdition } from "../api/books";
import Loading from "../components/Loading";

export const EditionScreen = ({ route, navigation }: any) => {
  const { editionKey } = route.params;
  const [edition, setEdition] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const init = async () => {
    const edition = await getEdition(editionKey);
    console.log("Edition: ", edition.title);
    setEdition(edition);
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
      {loading ? (
        <Loading />
      ) : (
        <ScrollView className="gap-2" showsVerticalScrollIndicator={false}>
          <Text>{edition.title}</Text>
          <Text>{edition.edition_name}</Text>
          <Text>{edition.number_of_pages}</Text>
          <Text>{edition.publish_date}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
