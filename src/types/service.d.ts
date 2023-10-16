import { IUser } from "./user";

interface IService {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  description: string;
  image: string;
}

interface ISalon {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  owner_id: number;
  name: string;
  phone: string;
  address: string;
  description: string | null;
  image: string | null;
  video: string | null;
  map: string;
  verified: boolean;
  start: number;
  end: number;
  workingHours: any[];
  services: IService[];
}

interface IOrder {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  user_id: number;
  salon_id: number;
  reservedHour: string;
  price: string;
  status: string;
  time: string;
  user: IUser;
  salon: {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    owner_id: number;
    name: string;
    phone: string;
    address: string;
    description: string | null;
    image: string | null;
    video: string | null;
    map: string;
    workingHours: any[];
  };
  services: IService[];
}

export { ISalon, IService, IOrder };
