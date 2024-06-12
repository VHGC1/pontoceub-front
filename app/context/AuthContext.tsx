import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../api";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "timesheet_access_token";

export const API_URL = "https://subtle-immortal-sailfish.ngrok-free.app/api";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
      });

      setAuthState({
        token: result.data,
        authenticated: true,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
      localStorage.setItem(TOKEN_KEY, result.data.token);

      return result;
    } catch (e) {
      return { error: true, msg: e };
    }
  };

  const logout = async () => {
    localStorage.removeItem(TOKEN_KEY);

    api.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
