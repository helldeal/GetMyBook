import React, { createContext, useContext, useEffect, useState } from "react";

const CollecContext = createContext<{ collec: any; setCollec: any }>({
  collec: [],
  setCollec: () => {},
});

export const CollecProvider = ({ children }: any) => {
  const [collec, setCollec] = useState([]);

  useEffect(() => {
    console.log("collec is modified");
  }, [collec]);

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
