interface IUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  username: string;
  image: string | null;
  firstName: string | null;
  lastName: string | null;
  lastLoginAt: string;
}

export { IUser };
