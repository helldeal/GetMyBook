import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { View, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";

export default function HomeScreen({ navigation }: any) {
  const isFocused = useIsFocused();
  const [dataFeatured, setDataFeatured] = useState<any>([]);
  const [dataLastViewed, setDataLastViewed] = useState<any>([]);
  const [modalBook, setModalBook] = useState<any>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    if (isFocused) {
      console.log("HomeScreen is focused");
    }
  }, [isFocused]);

  useEffect(() => {
    setDataFeatured([
      {
        isin: 1,
        title: "La trilogie des forces",
        review: {
          rating: 4.9,
          count: 281,
        },
        desc: "description de la trilogie des forces",
      },
      {
        isin: 2,
        title: "Le seigneur des anneaux",
        review: {
          rating: 5,
          count: 124,
        },
        desc: "description du seigneur des anneaux",
      },
      {
        isin: 3,
        title: "Harry Potter et la coupe du stylo",
        review: {
          rating: 4.8,
          count: 1923,
        },
        desc: "description de Harry Potter et la coupe du stylo",
      },
    ]);
    setDataLastViewed([
      {
        isin: 4,
        title: "La vierge marie",
        review: {
          rating: 2.3,
          count: 13,
        },
        desc: "description de la vierge marie",
      },
      {
        isin: 5,
        title: "Une histoire",
        review: {
          rating: 4.9,
          count: 23331213,
        },
        desc: "description d'une histoire",
      },
    ]);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white pb-20">
      <View>
        <Text className="text-2xl font-bold p-4">Home</Text>
        <View className="p-4">
          <Text
            className="text-lg font-bold"
            style={{
              marginBottom: 5,
            }}
          >
            Featured
          </Text>
          <FlatList
            data={dataFeatured}
            keyExtractor={(item) => item.isin.toString()}
            renderItem={({ item }) => {
              return (
                <View>
                  <ModalBook
                    visible={modalBook}
                    setVisible={setModalBook}
                    item={selectedItem}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setModalBook(true);
                      setSelectedItem(item);
                    }}
                  >
                    <View className="p-4 mb-4 bg-gray-100 rounded-lg ">
                      <Text className="text-xl font-semibold">
                        {item.title}
                      </Text>
                      <View className="flex-row justify-between mt-2">
                        <View
                          className="flex-row justify-between mt-2"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Text className="text-gray-700">
                            {item.review.rating}
                          </Text>
                          <Icon.Star
                            fill={"#FFD700"}
                            color={"#FFD700"}
                            width={15}
                            height={15}
                          />
                          <Text className="text-gray-700">
                            ({item.review.count})
                          </Text>
                        </View>
                        <Text className="text-gray-700">0.0013 BTC</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <View className="h-1 bg-gray-200" />
        <View className="p-4">
          <Text
            className="text-lg font-bold"
            style={{
              marginBottom: 5,
            }}
          >
            Recently viewed
          </Text>
          <FlatList
            data={dataLastViewed}
            keyExtractor={(item) => item.isin.toString()}
            renderItem={({ item }) => {
              return (
                <View>
                  <ModalBook
                    visible={modalBook}
                    setVisible={setModalBook}
                    item={selectedItem}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setModalBook(true);
                      setSelectedItem(item);
                    }}
                  >
                    <View className="p-4 mb-4 bg-gray-100 rounded-lg ">
                      <Text className="text-xl font-semibold">
                        {item.title}
                      </Text>
                      <View
                        className="flex-row justify-between mt-2"
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Text className="text-gray-700">
                          {item.review.rating}
                        </Text>
                        <Icon.Star
                          fill={"#FFD700"}
                          color={"#FFD700"}
                          width={15}
                          height={15}
                        />
                        <Text className="text-gray-700">
                          ({item.review.count})
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const ModalBook = ({ visible, setVisible, item }: any) => {
  const userReviews = [
    {
      username: "Alice",
      review:
        "Un livre captivant avec des rebondissements inattendus. Je recommande fortement !",
      rating: 5,
    },
    {
      username: "Bob",
      review: "Bonne lecture, mais quelques longueurs sur certains chapitres.",
      rating: 3.5,
    },
    {
      username: "Charlie",
      review:
        "Une véritable œuvre d'art. Je n'ai pas pu le poser avant de le finir.",
      rating: 5,
    },
  ];
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View
        className="absolute top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View className="bg-white p-4 w-11/12 h-4/5 rounded-lg shadow-lg">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold">{item?.title}</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon.X width={24} height={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Book Details */}
          <View className="mb-4">
            <View className="flex-row items-center gap-2">
              <Text className="text-gray-700 font-semibold text-lg">
                {item?.review.rating}
              </Text>
              <Icon.Star
                fill={"#FFD700"}
                color={"#FFD700"}
                width={20}
                height={20}
              />
              <Text className="text-gray-700">({item?.review.count})</Text>
            </View>
            <Text className="text-gray-500 mt-2">{item?.desc}</Text>
          </View>

          {/* User Reviews */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">
              Avis des utilisateurs
            </Text>
            <FlatList
              data={userReviews}
              keyExtractor={(review, index) => index.toString()}
              renderItem={({ item }) => (
                <View className="border-b border-gray-200 pb-2 mb-2">
                  <Text className="font-semibold text-gray-800">
                    {item.username}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-gray-700 text-sm">{item.rating}</Text>
                    <Icon.Star
                      fill={"#FFD700"}
                      color={"#FFD700"}
                      width={15}
                      height={15}
                    />
                  </View>
                  <Text className="text-gray-600 text-sm">{item.review}</Text>
                </View>
              )}
            />
          </View>

          {/* Footer */}
          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              style={{
                backgroundColor: "#4CAF50",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text className="text-white font-semibold">Voir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#2196F3",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
              onPress={() => setVisible(false)}
            >
              <Text className="text-white font-semibold">Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
