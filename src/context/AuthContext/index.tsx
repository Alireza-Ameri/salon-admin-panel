import { createContext, ReactNode, useState, useEffect } from "react";
import { IUser } from "../../types/user";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  token: string;
  setToken: (newState: string) => void;
  user: IUser | null;
  setUser: (newState: IUser | null) => void;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
  token: "",
  setToken: () => {},
  user: null,
  setUser: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const { getItem } = useLocalStorage();

  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [token, setToken] = useState<string>(initialValue.token);
  const [user, setUser] = useState<IUser | null>(initialValue.user);

  useEffect(() => {
    const tokenStorage: string | null = getItem("token");
    const userStorage = getItem("user");
    if (userStorage && tokenStorage) {
      setAuthenticated(true);
      setToken(tokenStorage);
      setUser(JSON.parse(userStorage));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        token,
        setToken,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
