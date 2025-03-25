// src/context/useSidebar.ts
import { useContext } from "react";
import SidebarContext from "./SidebarContext"; // Import the context

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}
