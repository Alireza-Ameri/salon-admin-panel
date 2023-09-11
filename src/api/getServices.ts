import { customAxios } from "./api";
import {IService} from '../types/service'

interface IResponse {
  data: IService[];
 
}

const getService = () => {
  return customAxios.get<never, IResponse>("/service");
};

export { getService };
