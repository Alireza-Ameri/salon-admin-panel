import { customAxios } from "./api";
import {IService} from '../types/service'

interface IResponse {
  data: {
    count:number,
    services:IService[]
  };
 
}

const getService = () => {
  return customAxios.get<never, IResponse>("/service/get-all-services");
};

export { getService };
