'use client';

// context/AppContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

// Define your context type
interface AppContextType {
  moreOption: boolean;
  setMoreOption: (option: boolean) => void;
}

// Create context with default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [moreOption, setMoreOption] = useState(false);

  return (
    <AppContext.Provider value={{ moreOption, setMoreOption }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
