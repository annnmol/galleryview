import { IMedia, dummyData } from "@/lib/dummy-data";

import React, { useState } from "react";

interface ProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  filesData: IMedia[];
  setFilesData: React.Dispatch<React.SetStateAction<IMedia[]>>;
}

export const AppStoreContext = React.createContext<ISocketContext>({
  setFilesData: () => {},
  filesData: dummyData,
});

export const AppStoreContextProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [filesData, setFilesData] = useState<IMedia[]>(dummyData);

  return (
    <AppStoreContext.Provider value={{ filesData, setFilesData }}>
      {children}
    </AppStoreContext.Provider>
  );
};
