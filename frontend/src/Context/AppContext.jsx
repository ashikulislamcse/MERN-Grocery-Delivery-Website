import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [isUser , setIsUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);

    const value = { isUser, setIsUser, isSeller, setIsSeller};
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}