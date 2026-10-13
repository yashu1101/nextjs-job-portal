"use client";
import { useContext } from "react";
import { ToggleFilterbarContext } from "@/context/ToggleFilterbarContext";
import { Filter } from "lucide-react";
export default function ToggleFilterbarButton() {
  const { setIsFilterbarOpen, isFilterbarOpen } = useContext(
    ToggleFilterbarContext,

);
// console.log(isFilterbarOpen)
  return <Filter className="cursor-pointer" onClick={() => setIsFilterbarOpen(!isFilterbarOpen)}></Filter>;
}
