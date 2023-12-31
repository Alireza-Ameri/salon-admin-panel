import { customAxios } from "./api";

interface IData {
  name: string;
  description: string;
  image: string;
}

interface IResponse {
  data: {};
}

const postService = (name: string, description: string, image: string) => {
  return customAxios.post<IData, any>("/service/create-service", {
    name,
    description,
    image,
  });
};

export { postService };
