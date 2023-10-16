import { customAxios } from "./api";

interface IData {
  name: string;
  description: string;
  image: string;
}

interface IResponse {
  data: {};
}

const patchService = ( id:string,name: string, description: string, image: string) => {
  return customAxios.patch<IData, any>(`/service/update-service/${id}`, {
    name,
    description,
    image,
  });
};

export { patchService };
