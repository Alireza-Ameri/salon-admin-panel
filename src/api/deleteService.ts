import { customAxios } from "./api";



const deleteService = ( id:string) => {
  return customAxios.delete<never, any>(`/service/delete-service/${id}`);
};

export { deleteService };
