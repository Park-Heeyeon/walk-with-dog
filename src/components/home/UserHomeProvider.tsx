import React, { createContext, ReactNode, useContext, useState } from "react";

interface HomeContextProps {
  isSideOpen: boolean;
  setIsSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBottomOpen: boolean;
  setIsBottomOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserHomeContext = createContext<HomeContextProps | undefined>(undefined);

export const UserHomeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSideOpen, setIsSideOpen] = useState<boolean>(false);
  const [isBottomOpen, setIsBottomOpen] = useState<boolean>(false);

  return (
    <UserHomeContext.Provider
      value={{ isSideOpen, setIsSideOpen, isBottomOpen, setIsBottomOpen }}
    >
      {children}
    </UserHomeContext.Provider>
  );
};

export const useUserHome = () => {
  const context = useContext(UserHomeContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
