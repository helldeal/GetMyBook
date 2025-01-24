import { readList, setList } from "./asyncStorage";

export const getCollection = async () => {
  try {
    const response = await readList("collection");
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération de la collection :", error);
  }
};

export const setCollection = async (collection: any) => {
  try {
    await setList("collection", collection);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la collection :", error);
  }
};

export const getWishlist = async () => {
  try {
    const response = await readList("wishlist");
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération de la wishlist :", error);
  }
};

export const setWishlist = async (wishlist: any) => {
  try {
    await setList("wishlist", wishlist);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la wishlist :", error);
  }
};
