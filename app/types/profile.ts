export interface IProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updateAt: Date;
}

export interface IUpdateProfile {
  email: string;
  phone: string;
}
