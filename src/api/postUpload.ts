import { customAxios } from "./api";

interface IData {}

interface IResponse {}

const postUpload = (formData: any) => {
  return customAxios.post<any, any>("/user/upload", 
    formData,
  );
};

export { postUpload };
