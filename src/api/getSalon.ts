import { customAxios } from "./api";
import { ISalon } from "../types/service";

interface IResponse {
  data: {
    count: number;
    salons: ISalon[];
  };
}

const getSalon = (skip?: number, limit?: number, search?: string) => {
  return customAxios.get<never, IResponse>(`/salon/get-all-salons`, {
    params: { skip: skip, limit: limit, search: search },
  });
};

export { getSalon };
