import { customAxios } from "./api";
import { IOrder } from "../types/service";

interface IResponse {
  data: {
    count: number;
    orders: IOrder[];
  };
}

const getAllOrders = (skip?: number, limit?: number, search?: string) => {
  return customAxios.get<never, IResponse>("/order/get-all-orders", {
    params: { skip: skip, limit: limit, search: search },
  });
};

export { getAllOrders };
