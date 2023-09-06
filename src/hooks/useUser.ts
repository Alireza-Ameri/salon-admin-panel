import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";
import { IUser } from "../types/user";

// NOTE: optimally move this into a separate file

export const useUser = () => {
  const { user, setUser, setAuthenticated, setToken } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: IUser) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const addUserToken = (token: string) => {
    setToken(token);
    setAuthenticated(true);
    setItem("token", JSON.stringify(token));
  };

  const removeUser = () => {
    setUser(null);
    setAuthenticated(false);
    setToken("");
    setItem("token", "");
    setItem("user", "");
  };

  return { user, addUser, removeUser, addUserToken };
};
