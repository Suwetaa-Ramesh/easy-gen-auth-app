import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../api/auth";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
    getUser()
      .then((response) => setUser(response.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
    } else {
      setLoading(false); 
    }
  }, []);

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
