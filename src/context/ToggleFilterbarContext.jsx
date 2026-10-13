"use client";
import { createContext, useState } from "react";
export const ToggleFilterbarContext = createContext();
export const ToggleFilterProvider = ({ children }) => {
  const [isFilterbarOpen, setIsFilterbarOpen] = useState(false);

  return (
    <ToggleFilterbarContext.Provider
      value={{ isFilterbarOpen, setIsFilterbarOpen }}>
      {children}
    </ToggleFilterbarContext.Provider>
  );
};
