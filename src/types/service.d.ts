interface IService {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    description: string;
    image: string;
  }
  
  export { IService };
  