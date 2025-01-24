import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { readList, setList } from "../api/asyncStorage";

const WishlistContext = createContext<{ wishlist: any; setWishlist: any }>({
  wishlist: [],
  setWishlist: () => {},
});

export const WishlistProvider = ({ children }: any) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    const storedWishlist = await readList("wishlist");
    if (storedWishlist) {
      console.log(
        "Stored Wishlist:",
        storedWishlist.map((item: any) => item.title)
      );
      setWishlist(storedWishlist);
    }
  };
  useEffect(() => {
    fetchWishlist();
    console.log("Wishlist is loaded");
  }, []);
  const updateStorage = useCallback(async () => {
    await setList("wishlist", wishlist);
    console.log("Wishlist Storage is updated");
  }, [wishlist]);

  useEffect(() => {
    updateStorage();
  }, [updateStorage]);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    console.log("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export default WishlistContext;
