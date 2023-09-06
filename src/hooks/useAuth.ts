import { useEffect } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import { IUser } from "../types/user";
import { loggedOut } from "../api";

export const useAuth = () => {
  const { user, addUser, removeUser, addUserToken } = useUser();
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    const token = getItem("token");
    if (user && token) {
      addUser(JSON.parse(user));
      addUserToken(JSON.parse(token));
    }
  }, []);

  const login = (user: IUser, token: string) => {
    addUserToken(token);
    addUser(user);
  };

  const logout = () => {
    removeUser();
    loggedOut();
  };

  return { user, login, logout };
};
