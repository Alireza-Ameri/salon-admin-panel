import { customAxios } from "./api";

interface IData {
  verified: boolean;
}

interface IResponse {
  data: {};
}

const postSalonVerify = (verified: boolean , id:string) => {
  return customAxios.post<IData, any>(`/salon/verify-salon/${id}`, {
    verified,
  });
};

export { postSalonVerify };
