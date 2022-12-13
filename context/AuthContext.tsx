import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation } from "react-query";
import UserStorage from "../lib/user-storage";
import UserService from "../services/user";
import { User } from "../types/User";

interface SignInData {
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  signIn: () => Promise.reject(new Error("Method not implemented")),
  signOut: () => Promise.reject(new Error("Method not implemented")),
};

const AuthContext = createContext(initialState);

const userService = new UserService();

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth hook must be used on children of AuthProvider");
  }

  return auth;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = Boolean(user);

  const signInMutation = useMutation(userService.signIn, {
    onSuccess: (user) => {
      UserStorage.setItem(user);
      setUser(user);
    },
    onError: () => {},
  });

  async function signIn({ username, password }: SignInData) {
    await signInMutation.mutateAsync({ username, password });
  }

  async function signOut() {
    UserStorage.removeItem();
    setUser(null);
  }

  useEffect(() => {
    setUser(UserStorage.getItem());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
