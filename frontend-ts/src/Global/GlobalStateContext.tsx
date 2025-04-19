import React from "react";

export interface GlobalStateContextType {
  // Define your state type here
}

export const GlobalStateContext = React.createContext<GlobalStateContextType>({} as GlobalStateContextType)