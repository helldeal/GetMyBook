import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import { readList } from "../hooks/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";

export default function HomeScreen({ navigation }: any) {
    const isFocused = useIsFocused();
    const [dataFeatured, setDataFeatured] = useState<any>([]);
    const [dataLastViewed, setDataLastViewed] = useState<any>([]);

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
            },
            {
                isin: 2,
                title: "Le seigneur des anneaux",
                review: {
                    rating: 5,
                    count: 124,
                },
            },
            {
                isin: 3,
                title: "Harry Potter et la coupe du pénis",
                review: {
                    rating: 4.8,
                    count: 1923,
                },
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
            },
            {
                isin: 5,
                title: "Une histoire",
                review: {
                    rating: 4.9,
                    count: 23331213,
                },
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
                                <TouchableOpacity>
                                    <View className="p-4 mb-4 bg-gray-100 rounded-lg ">
                                        <Text className="text-xl font-semibold">
                                            {item.title}
                                        </Text>
                                        <View className="flex-row justify-between mt-2">
                                            <View
                                                className="flex-row justify-between mt-2"
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "flex-start",
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
                                            <Text className="text-gray-700">
                                                0.0013 BTC
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
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
                                <TouchableOpacity>
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
                            );
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
