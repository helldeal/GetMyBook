import AsyncStorage from "@react-native-async-storage/async-storage";

export const readList = async (key: string) => {
  try {
    const val = await AsyncStorage.getItem(key);
    return val != null ? JSON.parse(val) : [];
  } catch (error) {
    console.error(`Erreur lors de la lecture de la liste ${key}:`, error);
  }
};

export const addItemToList = async (key: string, item: any) => {
  try {
    let existingList = await readList(key);
    existingList.push(item);
    await AsyncStorage.setItem(key, JSON.stringify(existingList));
    console.log(`Élément ajouté à la liste ${key}.`);
  } catch (error) {
    console.error(`Erreur lors de l'ajout à la liste ${key}:`, error);
  }
};

export const updateItemInList = async (
  key: string,
  index: number,
  newItem: any
) => {
  try {
    const existingList = await readList(key);
    if (index >= 0 && index < existingList.length) {
      existingList[index] = newItem;
      await AsyncStorage.setItem(key, JSON.stringify(existingList));
      console.log(`Élément mis à jour dans la liste ${key}.`);
    } else {
      console.error(`Index invalide pour la mise à jour dans la liste ${key}.`);
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour dans la liste ${key}:`, error);
  }
};

export const removeItemFromList = async (key: string, index: number) => {
  try {
    const existingList = await readList(key);
    if (index >= 0 && index < existingList.length) {
      existingList.splice(index, 1);
      await AsyncStorage.setItem(key, JSON.stringify(existingList));
      console.log(`Élément supprimé de la liste ${key}.`);
    } else {
      console.error(`Index invalide pour la suppression dans la liste ${key}.`);
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression dans la liste ${key}:`, error);
  }
};

export const saveNotifs = async (notificationsList: any) => {
  const newNotifs = notificationsList;
  const notifsAlreadySaved: any = await readList("notifications");
  const updatedNotifs = [...notifsAlreadySaved];
  newNotifs.forEach((notif: { type: string; date: string | number | Date }) => {
    console.log("NOTIF");
    if (
      !notifsAlreadySaved.find(
        (notifAlreadySaved: { type: string; date: string | number | Date }) =>
          notifAlreadySaved.type === "daily" &&
          new Date(notifAlreadySaved.date).getDate() ===
            new Date(notif.date).getDate()
      )
    ) {
      updatedNotifs.push(notif);
    }
  });
  console.log("Notifs Saved :", updatedNotifs.length);
  await AsyncStorage.setItem("notifications", JSON.stringify(updatedNotifs));
};
