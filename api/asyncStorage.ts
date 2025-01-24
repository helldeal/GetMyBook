import AsyncStorage from "@react-native-async-storage/async-storage";

export const readList = async (key: string) => {
  const val = await AsyncStorage.getItem(key);
  return val != null ? JSON.parse(val) : [];
};

export const setList = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};
