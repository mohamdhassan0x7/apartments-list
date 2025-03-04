"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
  userRole: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChanged, setAuthChanged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token.split(".").length === 3) {
      try {
        const decoded: any = jwtDecode(token);
        setUserRole(decoded.role);
        setIsAuthenticated(true);
      } catch {
        logout();
      }
    }
  }, [authChanged]);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded: any = jwtDecode(token);
    setUserRole(decoded.role);
    setIsAuthenticated(true);
    setAuthChanged((prev) => !prev);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
    setIsAuthenticated(false);
    setAuthChanged((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ userRole, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
