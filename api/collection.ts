import { readList, setList } from "./asyncStorage";

export const getCollectionStored = async () => {
  try {
    const response = await readList("collection");
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération de la collection :", error);
  }
};

export const setCollectionStored = async (collection: any) => {
  try {
    await setList("collection", collection);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la collection :", error);
  }
};
