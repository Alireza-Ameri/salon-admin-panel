import { customAxios } from "./api";
import { IUser } from "../types/user";

interface IResponse {
  data: {
    count: number;
    users: IUser[];
  };
}

const getUsers = (skip?: number, limit?: number, search?: string) => {
  return customAxios.get<never, IResponse>("/user/get-all-users", {
    params: { skip: skip, limit: limit, search: search },
  });
};

export { getUsers };
