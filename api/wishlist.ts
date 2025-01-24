import { readList, setList } from "./asyncStorage";

export const getWishlistStored = async () => {
  try {
    const response = await readList("wishlist");
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération de la wishlist :", error);
  }
};

export const setWishlistStored = async (wishlist: any) => {
  try {
    await setList("wishlist", wishlist);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la wishlist :", error);
  }
};
