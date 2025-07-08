"use client";

// context/AppContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

// Define your context type
interface AppContextType {
  moreOption: boolean;
  setMoreOption: (option: boolean) => void;
  isBottomNavBarFixed: boolean;
  setIsBottomNavBarFixed: (option: boolean) => void;
  isPartnerShipAccount: boolean;
  setIsPartnerShipAccount: (option: boolean) => void;
  isNewPartnershipUser: boolean;
  setIsNewPartnershipUser: (option: boolean) => void;
}

// Create context with default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [moreOption, setMoreOption] = useState(false);
  const [isBottomNavBarFixed, setIsBottomNavBarFixed] = useState(true);
  const [isPartnerShipAccount, setIsPartnerShipAccount] = useState(false);
  const [isNewPartnershipUser, setIsNewPartnershipUser] = useState(false);

  return (
    <AppContext.Provider
      value={{
        moreOption,
        setMoreOption,
        isBottomNavBarFixed,
        setIsBottomNavBarFixed,
        isPartnerShipAccount,
        setIsPartnerShipAccount,
        isNewPartnershipUser,
        setIsNewPartnershipUser,
      }}
    >
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
