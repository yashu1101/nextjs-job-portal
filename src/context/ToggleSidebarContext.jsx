"use client";
import { createContext, useEffect, useState } from "react";
export const ToggleSidebarContext = createContext();
export const ToggleSidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const windowWidth = window.innerWidth;
  // const sidebarHandleOnMobile = () => {
  //   if (window.innerWidth < 640) {
  //     setIsSidebarOpen(true);
  //   }
  // };

  // useEffect(() => {
  //   sidebarHandleOnMobile();
  // },);

  // console.log(isSidebarOpen);

  return (
    <ToggleSidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </ToggleSidebarContext.Provider>
  );
};
