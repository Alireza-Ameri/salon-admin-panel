import { customAxios } from "./api";
import { IUser } from "../types/user";

interface IResponse {
  data: IUser;
}

const getProfile = () => {
  return customAxios.get<never, IResponse>("/auth/profile");
};

export { getProfile };
