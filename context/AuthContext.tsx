import { createContext, ReactNode, useContext, useState } from "react";
import UserStorage from "../lib/user-storage";
import signInService from "../services/signIn";
import { User } from "../types/User";

interface SignInData {
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<User>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  signIn: () => Promise.reject(new Error("Method not implemented")),
};

const AuthContext = createContext(initialState);

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth hook must be used on children of AuthProvider");
  }

  return auth;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(UserStorage.getItem());

  const isAuthenticated = Boolean(user);

  async function signIn({ username, password }: SignInData) {
    const { user } = await signInService.signIn({ username, password });
    UserStorage.setItem(user);
    setUser(user);
    return user;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
