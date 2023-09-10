interface IUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  username: string;
  isAdmin: boolean;
  isStoreOwner: boolean;
  image: string | null;
  firstName: string | null;
  lastName: string | null;
  lastLoginAt: string;
}

export { IUser };
