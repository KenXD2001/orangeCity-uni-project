import { createContext } from "react";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
