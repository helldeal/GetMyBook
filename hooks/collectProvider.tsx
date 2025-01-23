import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { readList, setList } from "../api/asyncStorage";

const CollecContext = createContext<{ collec: any; setCollec: any }>({
  collec: [],
  setCollec: () => {},
});

export const CollecProvider = ({ children }: any) => {
  const [collec, setCollec] = useState([]);

  const fetchCollection = async () => {
    const storedCollec = await readList("collection");
    if (storedCollec) {
      console.log(
        "Stored Collection:",
        storedCollec.map((item: any) => item.title)
      );
      setCollec(storedCollec);
    }
  };
  useEffect(() => {
    fetchCollection();
    console.log("Collection is loaded");
  }, []);
  const updateStorage = useCallback(async () => {
    await setList("collection", collec);
    console.log("Collection Storage is updated");
  }, [collec]);

  useEffect(() => {
    updateStorage();
  }, [updateStorage]);

  return (
    <CollecContext.Provider value={{ collec, setCollec }}>
      {children}
    </CollecContext.Provider>
  );
};

export const useCollec = () => {
  const context = useContext(CollecContext);
  if (context === undefined) {
    console.log("useCollec must be used within an CollecProvider");
  }
  return context;
};

export default CollecContext;
