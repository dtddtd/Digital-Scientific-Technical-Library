export enum UserRoles {
  user = "user",
  redactor = "redactor",
  admin = "admin",
}

export type TUser = {
  userID: number;
  email: string;
  fullName: string;
  role: UserRoles;
  department: string;
  phone: string;
};
