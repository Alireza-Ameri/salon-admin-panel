import { customAxios } from "./api";
import { IUser } from "../types/user";

interface IData {
  email: string;
  password: string;
}

interface IResponse {
  data: { token: string; user: IUser };
}

const postLogin = (email: string, password: string) => {
  return customAxios.post<IData, IResponse>("/auth/login", {
    email,
    password,
  });
};

export { postLogin };
