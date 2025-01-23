import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext<{ wishlist: any; setWishlist: any }>({
  wishlist: [],
  setWishlist: () => {},
});

export const WishlistProvider = ({ children }: any) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    console.log("wishlist is modified");
  }, [wishlist]);

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
