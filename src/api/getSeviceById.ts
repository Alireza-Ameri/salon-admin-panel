import { customAxios } from "./api";
import { IService } from "../types/service";

interface IResponse {
  data: IService;
}

const getServiceById = (id: string) => {
  return customAxios.get<never, IResponse>(`/service/get-service-by-id/${id}`);
};

export { getServiceById };
