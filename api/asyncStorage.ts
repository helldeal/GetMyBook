import AsyncStorage from "@react-native-async-storage/async-storage";

export const readList = async (key: string) => {
  try {
    const val = await AsyncStorage.getItem(key);
    return val != null ? JSON.parse(val) : [];
  } catch (error) {
    console.error(`Erreur lors de la lecture de la liste ${key}:`, error);
  }
};

export const setList = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erreur lors de l'écriture de la liste ${key}:`, error);
  }
};
